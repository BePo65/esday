/**
 * isoWeek plugin
 *
 * This plugin adds 'isoWeek', 'isoWeeks', 'isoWeekDay', 'isoWeekYear', 'isoWeeksInYear'
 * and formatting and parsing tokens to EsDay.
 *
 * For the 'Wo' formatting token, the plugins 'locale' and 'localizedFormat'
 * and a loaded locale are required.
 *
 * To use the parsing tokens, the plugin AdvancedParse is required.
 */

import type { EsDay, EsDayPlugin, FormattingTokenDefinitions, UnitType } from 'esday'
import { C, createInstanceFromExist, isUndefined, padStart } from '~/common'
import type { ParsedElements, ParseOptions, TokenDefinitions } from '../advancedParse/types'

declare module 'esday' {
  interface EsDay {
    isoWeek(): number
    isoWeek(newIsoWeek: number): EsDay
    isoWeeks(): number
    isoWeeks(newIsoWeek: number): EsDay
    isoWeekday(): number
    isoWeekday(newIsoWeekday: number): EsDay
    isoWeekYear(): number
    isoWeekYear(newIsoWeekYear: number): EsDay
    isoWeeksInYear(): number
  }
}

// Definitions for ISO 8601
const weekStart = C.INDEX_MONDAY
const yearStart = 4 // Jan 4th

const match1to2NoLeadingZero = /^[1-9]\d?/ // 1-99
const match1 = /\d/ // 0 - 9
const match2 = /\d\d/ // 00 - 99
const match1to2 = /\d\d?/ // 0 - 99
const match4 = /\d{4}/ // 0000 - 9999
const match1to4 = /\d{1,4}/ // 0 - 9999

/**
 * Convert a number to an ordinal number, if a locale is available.
 * Otherwise return value as string.
 * @param sourceDate - date to take the locale from
 * @param value - value to convert
 * @returns value as ordinal
 */
function toOrdinal(sourceDate: EsDay, value: number) {
  const defaultValue = value.toString()
  return sourceDate.localeObject?.().ordinal(value) ?? defaultValue
}

/**
 * Create a function that will parse the input string as isoWeek, isoWeekday or
 * isoWeekYear number and add it to the given 'parsedElements' containing the
 * date&time components.
 * @param property - name of the property to set
 * @returns function that will add the given value to date&time component as new element
 */
function addIsoWeekProperty(property: 'isoWeek' | 'isoWeekday' | 'isoWeekYear') {
  return function isoWeekPropUpdater(
    parsedElements: ParsedElements,
    input: string,
    _parseOptions: ParseOptions,
  ) {
    parsedElements[property] = +input
  }
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

/**
 * Add parsed year as 2-digit value to parsedElements
 * @param parsedElements - object containing the components of a parsed date
 * @param input - parsed value (year)
 * @param _options - parsing options e.g. containing the locale to use
 */
function twoDigitsIsoYearUpdater(
  parsedElements: ParsedElements,
  input: string,
  _parseOptions: ParseOptions,
) {
  parsedElements['isoWeekYear'] = parseTwoDigitYear(input)
}

const isoWeekPlugin: EsDayPlugin<{}> = (_, dayClass, dayFactory) => {
  const proto = dayClass.prototype

  /**
   * Set the isoWeek of the parsed date.
   * Must be called in the context of an EsDay instance.
   * @param this - context for this function (required for getting the $conf settings)
   * @param parsedDate - Date object returned by parsing function
   * @param parsedElements - object containing the components of a parsed date
   * @returns parsedDate with iso week set to parsed value
   */
  function _postParseIsoWeek(this: EsDay, parsedDate: Date, parsedElements: ParsedElements) {
    let modifiedDate = parsedDate

    // if the source string contains a valid day of month, the isoWeek
    // is ignored (like moment.js does).
    if (
      !(Number.isNaN(parsedDate.valueOf()) || isUndefined(parsedElements.isoWeek)) &&
      isUndefined(parsedElements.date)
    ) {
      const newEsday = createInstanceFromExist(parsedDate, this)
      const parsedIsoWeek = parsedElements.isoWeek as number
      const modifiedEsday = newEsday.isoWeek(parsedIsoWeek).isoWeekday(weekStart)
      modifiedDate = modifiedEsday.toDate()
    }
    return modifiedDate
  }

  /**
   * Set the isoWeekDay of the parsed date.
   * Must be called in the context of an EsDay instance.
   * @param this - context for this function (required for getting the $conf settings)
   * @param parsedDate - Date object returned by parsing function
   * @param parsedElements - object containing the components of a parsed date
   * @returns parsedDate or invalid date (if iso day of week does not match)
   */
  function _postParseIsoDayOfWeek(this: EsDay, parsedDate: Date, parsedElements: ParsedElements) {
    let modifiedDate = parsedDate

    // if the source string contains a valid month, the isoWeekday
    // is ignored (like moment.js does).
    if (
      !(Number.isNaN(parsedDate.valueOf()) || isUndefined(parsedElements.isoWeekday)) &&
      isUndefined(parsedElements.month)
    ) {
      const newEsday = createInstanceFromExist(parsedDate, this)
      const newIsoWeekday = parsedElements.isoWeekday as number
      const modifiedEsday = newEsday.isoWeekday(newIsoWeekday)
      modifiedDate = modifiedEsday.toDate()
    }
    return modifiedDate
  }

  /**
   * Set isoWeekYear of parsed date.
   * Must be called in the context of an EsDay instance.
   * @param this - context for this function (required for getting the $conf settings)
   * @param parsedDate - Date object returned by parsing function
   * @param parsedElements - object containing the components of a parsed date
   * @returns parsedDate with isoWeekYear set to parsed value
   */
  function _postParseIsoYear(this: EsDay, parsedDate: Date, parsedElements: ParsedElements) {
    let modifiedDate = parsedDate

    // is this a valid date and do we have parsed the isoWeekYear?
    if (!(Number.isNaN(parsedDate.valueOf()) || isUndefined(parsedElements.isoWeekYear))) {
      const newEsday = createInstanceFromExist(parsedDate, this)
      const parsedIsoWeekYear = parsedElements.isoWeekYear as number

      if (Object.keys(parsedElements).length === 1) {
        // we parsed isoYear only ('GG' or 'GGGG')
        let modifiedEsday = newEsday.isoWeekYear(parsedIsoWeekYear)
        modifiedEsday = modifiedEsday.year(parsedIsoWeekYear).isoWeek(1).isoWeekday(1)
        modifiedDate = modifiedEsday.toDate()
      } else if (!isUndefined(parsedElements.isoWeek)) {
        const modifiedEsday = newEsday.isoWeekYear(parsedIsoWeekYear)
        modifiedDate = modifiedEsday.toDate()
      }
    }
    return modifiedDate
  }

  /**
   * Gets or sets the ISO week keeping the time.
   */
  // @ts-expect-error function is compatible with its overload
  proto.isoWeek = function (newIsoWeek?: number) {
    // Setter
    if (newIsoWeek !== undefined) {
      // 'add(...,  C.DAY)' may change time, if we switch between DST and non-DST;
      // therefore we have to set time again after setting the date.
      const currentWeekday = this.isoWeekday()
      const h = this.hour()
      const m = this.minute()
      const s = this.second()
      const ms = this.millisecond()

      return this.add((newIsoWeek - this.isoWeek()) * 7, C.DAY)
        .isoWeekday(currentWeekday)
        .hour(h, m, s, ms)
    }

    // Getter
    let yearStartDate = this.month(0, yearStart).hour(0, 0, 0, 0)
    const yearStartWeekday = yearStartDate.day()
    const diffToWeekStart = (7 + yearStartWeekday - weekStart) % 7
    yearStartDate = yearStartDate.subtract(diffToWeekStart, C.DAY)

    if (this.valueOf() < yearStartDate.valueOf()) {
      return this.subtract(1, C.YEAR).isoWeeksInYear()
    }
    return this.diff(yearStartDate, C.WEEK) + 1
  }

  proto.isoWeeks = proto.isoWeek

  /**
   * Gets or sets the ISO day of the week with 1 being Monday and 7 being Sunday.
   */
  // @ts-expect-error function is compatible with its overload
  proto.isoWeekday = function (newIsoWeekday?: number) {
    // Setter
    if (newIsoWeekday !== undefined) {
      return this.day(this.day() % 7 ? newIsoWeekday : newIsoWeekday - 7)
    }

    // Getter - default value is 'Sunday' represented by 7 not 0
    return this.day() || 7
  }

  /**
   * Gets or sets the year of the ISO week. This year may differ from
   * the calendar year at the start or the end of a year (depending on
   * 'yearStart').
   * According to ISO 8601 the week 01 is the week with the first Thursday
   * in it (see https://en.wikipedia.org/wiki/ISO_week_date).
   * Setting the IsoWeekYear will keep the week number and the day of the week.
   */
  // @ts-expect-error function is compatible with its overload
  proto.isoWeekYear = function (newIsoWeekYear?: number) {
    // Setter
    if (newIsoWeekYear !== undefined) {
      if (this.isoWeekYear() === newIsoWeekYear) {
        return this
      }
      const currentWeek = this.isoWeek()
      const currentWeekday = this.isoWeekday()
      let newDate = this.year(newIsoWeekYear).isoWeek(currentWeek).isoWeekday(currentWeekday)
      if (newDate.isoWeekYear() !== newIsoWeekYear) {
        const yearDiff = newIsoWeekYear - newDate.isoWeekYear()
        newDate = newDate.add(yearDiff, C.YEAR).isoWeekday(currentWeekday)
      }
      return newDate
    }

    // Getter
    return this.add(yearStart - this.isoWeekday(), C.DAY).year()
  }

  /**
   * Get the number of weeks in the current year.
   * Most years have 52 weeks, some have 53 weeks.
   */
  proto.isoWeeksInYear = function () {
    // get weekday of January 1st
    const yearStartWeekday = this.month(0).date(1).day()
    const year = this.year()
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    if (
      yearStartWeekday === C.INDEX_THURSDAY ||
      (isLeapYear && yearStartWeekday === C.INDEX_WEDNESDAY)
    ) {
      return 53
    }
    return 52
  }

  const oldStartOf = dayClass.prototype.startOf
  proto.startOf = function (units: UnitType) {
    if (units === C.ISOWEEK) {
      return this.date(this.date() - (this.isoWeekday() - weekStart)).startOf(C.DAY)
    }
    return oldStartOf.call(this, units)
  }

  const oldEndOf = proto.endOf
  proto.endOf = function (units: UnitType) {
    if (units === C.ISOWEEK) {
      const weekEnd = 7 // Sunday
      return this.date(this.date() + (weekEnd - this.isoWeekday())).endOf(C.DAY)
    }
    return oldEndOf.call(this, units)
  }

  // Add IsoWeek related formatting tokens
  const additionalTokens: FormattingTokenDefinitions = {
    W: (sourceDate: EsDay) => sourceDate.isoWeek().toString(), // isoWeek 1..52
    WW: (sourceDate: EsDay) => padStart(sourceDate.isoWeek(), 2, '0'), // isoWeek 01..52
    Wo: (sourceDate: EsDay) => toOrdinal(sourceDate, sourceDate.isoWeek()), // isoWeek 1st..52nd
    E: (sourceDate: EsDay) => sourceDate.isoWeekday().toString(), // isoWeekday 1..7
    GG: (sourceDate: EsDay) => padStart(sourceDate.isoWeekYear(), 2, '0').slice(-2), // isoWeekYear 70 .. 30
    GGGG: (sourceDate: EsDay) => padStart(sourceDate.isoWeekYear(), 4, '0'), // isoWeekYear 1970 .. 2030
  }
  dayFactory.addFormatTokenDefinitions(additionalTokens)

  // Add IsoWeek related parsing tokens
  const parseTokensDefinitions: TokenDefinitions = {
    W: [match1to2, match1to2NoLeadingZero, addIsoWeekProperty('isoWeek'), _postParseIsoWeek], // isoWeek 1..52
    WW: [match1to2, match2, addIsoWeekProperty('isoWeek'), _postParseIsoWeek], // isoWeek 01..52
    E: [match1to2, match1, addIsoWeekProperty('isoWeekday'), _postParseIsoDayOfWeek], // isoWeekday 1..7
    GG: [match1to4, match2, twoDigitsIsoYearUpdater, _postParseIsoYear], // isoWeekYear 70 .. 30
    GGGG: [match1to4, match4, addIsoWeekProperty('isoWeekYear'), _postParseIsoYear], // isoWeekYear 1970 .. 2030
  }
  dayFactory.addParseTokenDefinitions?.(parseTokensDefinitions)
}

export default isoWeekPlugin
