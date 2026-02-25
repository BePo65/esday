/**
 * advancedParse plugin
 *
 * This plugin adds format definitions to date parsing.
 *
 * used esday parameters in '$conf':
 *   args_1           format parameter in call signature
 *   args_2           2nd parameter in call signature
 *   args_3           3rd parameter in call signature
 *
 * new esday parameters in '$conf':
 *   parseOptions     ParseOptions object containing parsing options
 *                    used by parser and postParser
 *
 * The plugin advancedParse must be activated before the plugin locale and before
 * the plugin localizedParse, as it terminates the parsing chain, when there is a
 * format property. Activation example:
 * esday.extend(advancedParsePlugin).extend(localizedParsePlugin).extend(localePlugin)
 */

import type { DateFromDateComponents, DateType, EsDay, EsDayPlugin } from 'esday'
import { C, isArray, isString, isUndefined, isValidDate } from '~/common'
import type {
  ParsedElements,
  ParsedResultRaw,
  ParseOptions,
  Parser,
  PostParser,
  TokenDefinitions,
  UpdateParsedElement,
} from './types'

/**
 * Function to create a Date object from its date components
 * is set to the corresponding function in the core module and
 * requires the correct this context (e.g. for the utc plugin)!
 */
let dateFromDateComponents: DateFromDateComponents

const invalidDate = new Date('')

const formattingSeparatorsRegex = '(\\[[^[]*\\])|([-_:/.,()\\s]+)'
let formattingTokensRegex: RegExp

// Regular expressions for parsing
const match1 = /\d/
const match2 = /\d{2}/
const match3 = /\d{3}/
const match4 = /\d{4}/
const match1to2 = /\d\d?/
const match1to4 = /\d{1,4}/
const matchSigned = /[+-]?\d+/
const matchUnsigned = /\d+/
const matchTimestamp = /[+-]?\d+(\.\d{1,3})?/ // 123456789 123456789.123
const matchOffset = /[+-]\d\d:?(\d\d)?|Z/

const parseTokensDefinitions: TokenDefinitions = {}

/**
 * Definition of parser that handles 1 token in the parsing format.
 * The parser is derived from the TokenDefinitions by selecting the
 * right regex (depending on normal or strict mode) and the related
 * update function.
 */
interface ParserDefinition {
  regex: RegExp
  updater: UpdateParsedElement
}

/**
 * Result of parsing after converting the parsed elements to
 * a Date object.
 */
interface ParsedResult {
  date: Date
  charsLeftOver: number
  unusedTokens: number
  separatorsMatch: boolean
}

/**
 * Convert 2-digit year to 4-digit year.
 * Years > 68 are converted to 19xx;
 * else they are converted to 20xx.
 * @param input value to convert to a year
 * @returns converted 4-digit year
 */
function parseTwoDigitYear(input: string): number {
  // 2-digitYears : use year+2000
  const inputLimited = input.slice(0, 2)
  const year = +inputLimited
  return year + (year > 68 ? 1900 : 2000)
}

function parseFourDigitYear(input: string): number {
  if (input.length === 2) {
    return parseTwoDigitYear(input)
  }
  return +input
}

/**
 * Convert 2-digit offset as string to offset as minutes (number)
 * @param offset - parsed string representing the offset (e.g. '+10:00)
 * @returns offset in minutes
 */
function offsetFromString(offset: string): number {
  if (offset === 'Z') return 0
  const parts = offset.match(/([+-]|\d\d)/g)
  // @ts-expect-error parts will never be null, as parser ensures 2-digit number
  const minutes = +parts[1] * 60 + (+parts[2] || 0)
  // @ts-expect-error parts will never be null, as parser ensures 2-digit number
  return parts[0] === '+' ? minutes : -minutes
}

/**
 * Create a function that will add a value from the input string
 * to parsedElements, containing the date&time components.
 * @param property - name of the date&time component to add
 * @returns function that will add the given value to date&time component
 */
function addInput(property: keyof ParsedElements) {
  return (parsedElements: ParsedElements, input: string) => {
    parsedElements[property] = +input
  }
}

/**
 * Create a function that will add a milliseconds value from the input
 * string to parsedElements, containing the date&time components.
 * If the input string has more than 3 characters, only the first 3 characters
 * get evaluated.
 * @returns function that will add the given value to the milliseconds property of date&time component
 */
function addMillisecondsToInput() {
  return (parsedElements: ParsedElements, input: string) => {
    const inputLimited = input.slice(0, 3)
    let value = +inputLimited
    switch (inputLimited.length) {
      case 1:
        value *= 100
        break
      case 2:
        value *= 10
        break
    }
    parsedElements.milliseconds = value
  }
}

/**
 * Compare 2 tokens for sorting.
 * Longer token and upper case token are sorted to the top.
 * As we sort here object keys, a and b can never be equal.
 * @param a - token 1
 * @param b - token 2
 * @returns -1 (a<b), 0 (a==b), 1 (a>b)
 */
function compareTokens(a: string, b: string) {
  if (a.length < b.length) {
    return 1
  }
  if (a.length > b.length) {
    return -1
  }

  // length are equal, so compare values
  if (a < b) {
    return 1
  }

  // as a can never be equal to b, '-1' is the only possible value
  return -1
}
/**
 * Get regex from list of supported tokens.
 */
function formattingTokensRegexFromDefinitions() {
  // we have to sort the keys to always catch the longest matches
  const tokenKeys = Object.keys(parseTokensDefinitions).sort(compareTokens)
  formattingTokensRegex = new RegExp(`${formattingSeparatorsRegex}|(${tokenKeys.join('|')})`, 'g')
}

/**
 * Build a parser that will parse an input string an return an
 * object with the components of a date&time, the number of characters in input
 * not parsed and the number of unused token (i.e. not enough characters in input).
 * @param format - format to parse
 * @param isStrict - must input match format exactly?
 * @returns function that will parse an input string to a 'parsedResultRaw' object
 */
function makeParser(format: string, isStrict: boolean): { parser: Parser; postParser: PostParser } {
  // Step 1: create list of steps that will analyze the input string based on given parsing format
  const splittedFormat: Array<string> =
    (format.match(formattingTokensRegex) as Array<string>) ?? ([] as Array<string>)
  const length = splittedFormat.length
  const parsingDefinitions = Array<string | ParserDefinition>(length)
  const postParseHandlers: PostParser[] = []

  // Evaluate input using all parsing tokens
  for (let i = 0; i < length; i += 1) {
    const token = splittedFormat[i]
    // get definition of current token to use
    const parseTo = parseTokensDefinitions[token]
    const regex = isStrict ? parseTo?.[1] : parseTo?.[0]
    const updater = parseTo?.[2]

    if (isUndefined(updater)) {
      // remove escaped text from input string (e.g. "[H]")
      parsingDefinitions[i] = token.replace(/^\[|\]$/g, '')
    } else {
      parsingDefinitions[i] = { regex, updater }
    }

    const postParseHandler = parseTo?.[3]
    if (postParseHandler !== undefined && !postParseHandlers.includes(postParseHandler)) {
      postParseHandlers.push(postParseHandler)
    }
  }

  // Function that evaluates all parsing tokens
  const parser = (
    input: string,
    isStrict: boolean,
    parseOptions: ParseOptions,
  ): ParsedResultRaw => {
    // Step 2: use the created list to extract the date parts from the input string
    let unusedTokens = 0
    let separatorsMatch = true
    const parsedDateElements: ParsedElements = {}

    // Evaluate input using all parsing tokens
    for (let i = 0, start = 0; i < length; i += 1) {
      if (input.length === 0) {
        unusedTokens = parsingDefinitions
          .slice(i)
          .reduce((accumulator, currentValue) => accumulator + (isString(currentValue) ? 0 : 1), 0)
        break
      }

      const token = parsingDefinitions[i]

      // is this a separator (i.e. has typeof string)?
      if (isString(token)) {
        const separatorLength = token.length
        // in strict mode parsed date part must match format token!
        if (isStrict && separatorsMatch) {
          separatorsMatch &&= input.substring(0, separatorLength) === token
        }
        input = input.slice(separatorLength)
      } else {
        const { regex, updater } = token
        const part = input.slice(start)
        const match = regex.exec(part)
        if (match !== null) {
          const value = match[0]
          input = input.replace(value, '')
          updater(parsedDateElements, value, parseOptions)
        }
      }
    }

    const result: ParsedResultRaw = {
      dateElements: parsedDateElements,
      charsLeftOver: input.length,
      unusedTokens,
      separatorsMatch,
    }
    return result
  }

  // Function that calls all post-parse handlers
  function postParser(
    this: EsDay,
    parsedDate: Date,
    parsedElements: ParsedElements,
    parseOptions: ParseOptions,
  ): Date {
    let modifiedParsedDate = parsedDate
    for (let i = 0; i < postParseHandlers.length; i++) {
      modifiedParsedDate = postParseHandlers[i].call(
        this,
        modifiedParsedDate,
        parsedElements,
        parseOptions,
      )
    }

    return modifiedParsedDate
  }

  return { parser, postParser }
}

/**
 * Create a Date from the tags generated by parsing the input string.
 * Must be called in the context of an EsDay instance.
 * @param this - context for this function (required by dateFromDateComponents)
 * @param elements - object containing the tags generated by parsing the input string
 * @returns Date object created from the parsed data
 */
function parsedElementsToDate(this: EsDay, elements: ParsedElements) {
  const { year, month, date, hours, minutes, seconds, milliseconds, zoneOffset, unix } = elements

  if (Object.keys(elements).length === 0) {
    return C.INVALID_DATE
  }

  if (!isUndefined(unix)) {
    return new Date(unix)
  }

  let offsetMs: number | undefined
  if (zoneOffset !== undefined) {
    offsetMs = zoneOffset * 60_000
  }

  return dateFromDateComponents.call(
    this,
    year,
    month,
    date,
    hours,
    minutes,
    seconds,
    milliseconds,
    offsetMs,
  )
}

/**
 * Parse the given input using the given format and create a Date
 * object from the parsed elements.
 * Must be called in the context of an EsDay instance (required by parsedElementsToDate and postParser).
 * @param this - context for this function
 * @param input - string to be parsed
 * @param format - format to use
 * @param isStrict - must input match format exactly?
 * @param parseOptions - options for parser and postParser
 * @returns Date object generated from the given data
 */
function parseFormattedInput(
  this: EsDay,
  input: string,
  format: string,
  isStrict: boolean,
  parseOptions: ParseOptions,
): ParsedResult {
  const { parser, postParser } = makeParser(format, isStrict)
  const parsedElements = parser(input, isStrict, parseOptions)
  let parsedDate = parsedElementsToDate.call(this, parsedElements.dateElements)
  parsedDate = postParser.call(this, parsedDate, parsedElements.dateElements, parseOptions)

  return {
    date: parsedDate,
    charsLeftOver: parsedElements.charsLeftOver,
    unusedTokens: parsedElements.unusedTokens,
    separatorsMatch: parsedElements.separatorsMatch,
  }
}

/**
 * Add parsing tokens to list of global parsing tokens.
 * @param newTokens - list of new parsing token definitions
 */
function addParseTokenDefinitions(newTokens: TokenDefinitions) {
  // add all entries from newTokens into parseTokensDefinitions (without duplicates!)
  for (const key in newTokens) {
    if (!Object.prototype.hasOwnProperty.call(parseTokensDefinitions, key)) {
      parseTokensDefinitions[key] = newTokens[key]
    }
  }

  formattingTokensRegexFromDefinitions()
}

const advancedParsePlugin: EsDayPlugin<{}> = (_, dayClass, dayFactory) => {
  dayFactory.addParseTokenDefinitions = addParseTokenDefinitions

  const proto = dayClass.prototype

  /**
   * List of parsing tokens; the key of an entry in this list is
   * the token to be parsed and the value is a 3-entries-array with
   * the 1st entry being the regex for parsing in 'standard' mode,
   * the 2nd entry being the regex for parsing in 'strict' mode and
   * the 3rd entry being a function that will add the corresponding
   * value to an object containing all the date&time elements (year,
   * month, day, ...).
   */
  const parseTokensDefinitions: TokenDefinitions = {
    Q: [
      match1,
      match1,
      (parsedElements: ParsedElements, input: string) => {
        parsedElements.month = (Number.parseInt(input, 10) - 1) * 3 + 1
      },
    ],
    S: [matchUnsigned, match1, addMillisecondsToInput()],
    SS: [matchUnsigned, match2, addMillisecondsToInput()],
    SSS: [matchUnsigned, match3, addMillisecondsToInput()],
    s: [match1to2, match1to2, addInput('seconds')],
    ss: [match1to2, match2, addInput('seconds')],
    m: [match1to2, match1to2, addInput('minutes')],
    mm: [match1to2, match2, addInput('minutes')],
    H: [match1to2, match1to2, addInput('hours')],
    HH: [match1to2, match2, addInput('hours')],
    D: [match1to2, match1to2, addInput('date')],
    DD: [match1to2, match2, addInput('date')],
    x: [
      matchSigned,
      matchSigned,
      (parsedElements: ParsedElements, input: string) => {
        parsedElements.unix = Number.parseInt(input, 10)
      },
    ],
    X: [
      matchTimestamp,
      matchTimestamp,
      (parsedElements: ParsedElements, input: string) => {
        parsedElements.unix = Number.parseFloat(input) * 1000
      },
    ],
    M: [match1to2, match1to2, addInput('month')],
    MM: [match1to2, match2, addInput('month')],
    Y: [
      matchSigned,
      matchSigned,
      (parsedElements: ParsedElements, input: string) => {
        parsedElements.year = Number.parseInt(input, 10)
      },
    ],
    YY: [
      match1to4,
      match2,
      (parsedElements: ParsedElements, input: string) => {
        parsedElements.year = parseTwoDigitYear(input)
      },
    ],
    YYYY: [
      match1to4,
      match4,
      (parsedElements: ParsedElements, input: string) => {
        parsedElements.year = parseFourDigitYear(input)
      },
    ],
    Z: [
      matchOffset,
      matchOffset,
      (parsedElements: ParsedElements, input: string) => {
        parsedElements.zoneOffset = offsetFromString(input)
      },
    ],
    ZZ: [
      matchOffset,
      matchOffset,
      (parsedElements: ParsedElements, input: string) => {
        parsedElements.zoneOffset = offsetFromString(input)
      },
    ],
  }

  // add new parsing tokens to existing list of parsing tokens
  dayFactory.addParseTokenDefinitions(parseTokensDefinitions)

  const oldParse = proto['$parse']
  proto['$parse'] = function (d?: Exclude<DateType, EsDay>) {
    const format = this['$conf'].args_1
    const arg2 = this['$conf'].args_2
    const arg3 = this['$conf'].args_3
    this['$conf'].parseOptions ??= {} as ParseOptions
    const parseOptions: ParseOptions = this['$conf'].parseOptions as ParseOptions

    let isStrict = false
    if (typeof arg2 === 'boolean') {
      isStrict = arg2
    } else if (arg3 !== undefined && typeof arg3 === 'boolean') {
      isStrict = arg3
    }

    if (isString(d) && !isUndefined(format)) {
      // format as single string
      if (isString(format)) {
        const parsingResult = parseFormattedInput.call(this, d, format, isStrict, parseOptions)
        this.$d = parsingResult.date

        if (
          isStrict &&
          (parsingResult.charsLeftOver > 0 ||
            parsingResult.unusedTokens > 0 ||
            !parsingResult.separatorsMatch)
        ) {
          this.$d = invalidDate
        }
      } else {
        /* istanbul ignore else -- @preserve */
        if (isArray(format)) {
          // format as array string
          let bestDate = invalidDate
          let scoreToBeat = 0 // score: always >= 0; lower value means format matches better
          let bestFormatIsValid = false

          // look for best matching format from array of formats
          for (let i = 0; i < format.length; i++) {
            let currentScore = 0
            let validFormatFound = false

            const formatUnderInspection = format[i]
            const parsingResult = parseFormattedInput.call(
              this,
              d,
              formatUnderInspection,
              isStrict,
              parseOptions,
            )

            if (
              isStrict &&
              (parsingResult.charsLeftOver > 0 ||
                parsingResult.unusedTokens > 0 ||
                !parsingResult.separatorsMatch)
            ) {
              parsingResult.date = invalidDate
            }

            if (isValidDate(parsingResult.date)) {
              validFormatFound = true
            }

            // if there are any unused tokens or if there is any input that was not parsed
            // add a penalty for that format
            currentScore += parsingResult.charsLeftOver
            currentScore += parsingResult.unusedTokens * 10

            if (bestFormatIsValid) {
              // we already have a valid format for the input (date string)
              if (validFormatFound && currentScore < scoreToBeat) {
                // this is a format better matching the date string
                scoreToBeat = currentScore
                bestDate = parsingResult.date
              }
            } else if (validFormatFound) {
              scoreToBeat = currentScore
              bestDate = parsingResult.date
              bestFormatIsValid = true
            }
          }
          this.$d = bestDate

          // remove properties required for parsing only from $conf
          if (Object.keys(this['$conf'].parseOptions).length) {
            delete this['$conf'].parseOptions
          }
        }
      }
    } else {
      oldParse.call(this, d)

      // remove properties required for parsing only from $conf
      if (Object.keys(this['$conf'].parseOptions).length) {
        delete this['$conf'].parseOptions
      }
    }
  }

  dateFromDateComponents = proto['dateFromDateComponents']
}

export default advancedParsePlugin
