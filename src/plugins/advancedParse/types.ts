import type { EsDay, SimpleType } from 'esday'

declare module 'esday' {
  interface EsDayFactory {
    /**
     * add new definitions for parsing tokens
     */
    addParseTokenDefinitions: (newTokens: TokenDefinitions) => void
  }
}

export interface ParsedElements {
  year?: number
  month?: number
  day?: number // day-of-week
  date?: number // day-of-month
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
  zoneOffset?: number
  unix?: number
  // parameters created by other parsing plugins (e.g. LocalizedParse)
  [key: string]: SimpleType
}

export type ParseOptions = Record<string, SimpleType>

/**
 * Update property of 'parsedElements' with value from 'input'.
 * This function is used when defining the parsing tokens.
 * @param parsedElements - object containing the components of a parsed date
 * @param input - parsed component of a date, to be transformed and inserted in parsedElements
 * @param options - parsing options e.g. containing the locale to use
 */
export type UpdateParsedElement = (
  parsedElements: ParsedElements,
  input: string,
  options: ParseOptions,
) => void

/**
 * Result of parsing with parsed elements.
 */
export interface ParsedResultRaw {
  dateElements: ParsedElements
  charsLeftOver: number
  unusedTokens: number
  separatorsMatch: boolean
}

export type Parser = (input: string, isStrict: boolean, options: ParseOptions) => ParsedResultRaw

/**
 * Fix a created 'parsedDate' using the 'parsedElements'; can be used
 * e.g. to convert meridiem time (12h) to iso time (24h).
 * Must be called in the context of an EsDay instance.
 * @param this - context for this function (required by the makeParser function)
 * @param parsedDate - the date created from 'parsedElements'
 * @param parsedElements - object containing the components of a parsed date
 * @param options - parsing options e.g. containing the locale to use
 * @returns updated parsed date
 */
export type PostParser = (
  this: EsDay,
  parsedDate: Date,
  parsedElements: ParsedElements,
  options: ParseOptions,
) => Date

export type TokenDefinitions = Record<string, [RegExp, RegExp, UpdateParsedElement, PostParser?]>
