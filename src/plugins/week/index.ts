/**
 * week plugin
 *
 * This plugin adds 'week', 'weeks', 'weekday', 'weekYear', 'weeksInYear'
 * and week related formatting and parsing tokens to EsDay.
 *
 * This plugin requires the 'locale' plugin and a locale to be loaded.
 * For the 'wo' formatting token, the 'localizedFormat' plugin is required too.
 *
 * To use the parsing tokens, the plugin AdvancedParse is required.
 */

import type {
  EsDay,
  EsDayFactory,
  EsDayPlugin,
  FormattingTokenDefinitions,
  UnitsObjectTypeSet,
  UnitType,
  UnitTypeGetSet,
} from 'esday'
import {
  C,
  createInstanceFromExist,
  isArray,
  isObject,
  isUndefined,
  normalizeUnitWithPlurals,
  padStart,
} from '~/common'
import type { DayNames, DayNamesStandaloneFormat } from '~/plugins/locale'
import type { ParsedElements, ParseOptions, TokenDefinitions } from '../advancedParse/types'

const match1to2NoLeadingZero = /^[1-9]\d?/ // 1-99
const match1 = /\d/ // 0 - 9
const match2 = /\d\d/ // 00 - 99
const match1to2 = /\d\d?/ // 0 - 99
const match4 = /\d{4}/ // 0000 - 9999
const match1to4 = /\d{1,4}/ // 0 - 9999
const matchWord = /\d*[^-_:/,()\s\d]+/

declare module 'esday' {
  interface EsDay {
    week(): number
    week(newWeek: number): EsDay
    weeks(): number
    weeks(newWeek: number): EsDay
    weekday(): number
    weekday(newWeekday: number): EsDay
    weekYear(): number
    weekYear(newWeekYear: number): EsDay
    weeksInYear(): number
  }
}

/**
 * Convert a number to an ordinal number, if a locale is available.
 * Otherwise return value as string.
 * @param sourceDate - date to take the locale from
 * @param value - value to convert
 * @returns value as ordinal
 */
function toOrdinal(sourceDate: EsDay, value: number) {
  const defaultValue = value.toString()
  return sourceDate.localeObject?.().ordinal?.(value) ?? defaultValue
}

/**
 * Create a function that will parse the input string as week, weekday or
 * weekYear number and add it to the given 'parsedElements' containing the
 * date&time components.
 * @param property - name of the property to set
 * @returns function that will add the given value to date&time component as new element
 */
function addWeek(property: 'week' | 'weekday' | 'weekYear') {
  return function weekPropUpdater(
    parsedElements: ParsedElements,
    input: string,
    _parseOptions: ParseOptions,
  ) {
    parsedElements[property] = +input
  }
}

/**
 * Create a function that will convert the value from the input string
 * to a day of week number and add it to the given 'parsedElements'
 * containing the date&time components.
 * @param property - name of the list of weekday names to use
 * @returns function that will add the weekday value to date&time component
 */
function addDayOfWeek(
  property: 'day' | 'weekdays' | 'weekdaysShort' | 'weekdaysMin',
  esday: EsDayFactory,
) {
  return function weekdayUpdater(
    parsedElements: ParsedElements,
    input: string,
    parseOptions: ParseOptions,
  ) {
    if (property === 'day') {
      parsedElements[property] = +input
    } else {
      const localeName = parseOptions['locale'] as string
      const weekdays = esday.getLocale(localeName)[property]
      let weekdayNames: DayNames

      if (isArray(weekdays)) {
        weekdayNames = weekdays as DayNames
      } else {
        weekdayNames = (weekdays as DayNamesStandaloneFormat).standalone
      }

      parsedElements.day = weekdayNames.indexOf(input)
    }
  }
}

// Helper functions
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
function twoDigitsYearUpdater(
  parsedElements: ParsedElements,
  input: string,
  _parseOptions: ParseOptions,
) {
  parsedElements['weekYear'] = parseTwoDigitYear(input)
}

const weekPlugin: EsDayPlugin<{}> = (_, dayClass, dayFactory) => {
  const proto = dayClass.prototype

  /**
   * Set the week of the parsed date.
   * Must be called in the context of an EsDay instance.
   * @param this - context for this function (required for getting the $conf settings)
   * @param parsedDate - Date object returned by parsing function
   * @param parsedElements - object containing the components of a parsed date
   * @returns parsedDate with week set to parsed value
   */
  function _postParseWeek(this: EsDay, parsedDate: Date, parsedElements: ParsedElements) {
    let modifiedDate = parsedDate

    // if the source string contains a valid day of month, the week
    // is ignored (like moment.js does).
    if (
      !(Number.isNaN(parsedDate.valueOf()) || isUndefined(parsedElements.week)) &&
      isUndefined(parsedElements.date)
    ) {
      const newEsday = createInstanceFromExist(parsedDate, this)
      const parsedWeek = parsedElements.week as number
      const modifiedEsday = newEsday.week(parsedWeek).weekday(0)
      modifiedDate = modifiedEsday.toDate()
    }
    return modifiedDate
  }

  /**
   * Set the dayOfWeek of the parsed date.
   * Must be called in the context of an EsDay instance.
   * @param this - context for this function (required for getting the $conf settings)
   * @param parsedDate - Date object returned by parsing function
   * @param parsedElements - object containing the components of a parsed date
   * @returns parsedDate or invalid date (if day of week does not match)
   */
  function _postParseWeekDay(this: EsDay, parsedDate: Date, parsedElements: ParsedElements) {
    const newWeekday = parsedElements.weekday as number
    if (!isUndefined(newWeekday) && newWeekday !== null && (newWeekday < 0 || newWeekday > 6)) {
      return C.INVALID_DATE
    }

    let modifiedDate = parsedDate

    // if the source string contains a valid day of month, the weekday
    // is ignored (like moment.js does).
    if (
      !(Number.isNaN(parsedDate.valueOf()) || isUndefined(newWeekday)) &&
      isUndefined(parsedElements.date)
    ) {
      let newEsday = dayFactory(parsedDate, {
        utc: this['$conf'].utc as boolean,
      })
      newEsday['$conf'] = structuredClone(this['$conf'])

      if (isUndefined(parsedElements.weekYear) && isUndefined(parsedElements.week)) {
        const now = new Date()
        newEsday = newEsday.month(now.getMonth()).date(now.getDate())
      }
      const modifiedEsday = newEsday.weekday(newWeekday)
      modifiedDate = modifiedEsday.toDate()
    }
    return modifiedDate
  }

  /**
   * Verify that parsed date is the expected day-of-week or set the day-of-week.
   * Must be called in the context of an EsDay instance.
   * @param this - context for this function (required for getting the $conf settings)
   * @param parsedDate - Date object returned by parsing function
   * @param parsedElements - object containing the components of a parsed date
   * @returns parsedDate or invalid date (if day of week does not match)
   */
  function _postParseDayOfWeek(this: EsDay, parsedDate: Date, parsedElements: ParsedElements) {
    let modifiedDate = parsedDate

    // is this a valid date and do we have parsed the day of week?
    if (!(Number.isNaN(parsedDate.valueOf()) || isUndefined(parsedElements.day))) {
      const now = createInstanceFromExist(new Date(), this)
      let newEsday = createInstanceFromExist(parsedDate, this)

      if (
        parsedElements.year !== undefined &&
        parsedElements.month === undefined &&
        parsedElements.date === undefined
      ) {
        // use current date as base for parsed date, if we have parsed only a year
        const currentWeek = now.week()
        const dayOfWeek = (parsedElements.day + 7 - newEsday.localeObject().weekStart) % 7
        newEsday = newEsday.week(currentWeek).weekday(dayOfWeek)
        modifiedDate = newEsday.toDate()
      }

      if (newEsday.day() !== parsedElements.day) {
        modifiedDate = C.INVALID_DATE
      }
    }
    return modifiedDate
  }

  /**
   * Set weekYear of parsed date.
   * Must be called in the context of an EsDay instance.
   * @param this - context for this function (required for getting the $conf settings)
   * @param parsedDate - Date object returned by parsing function
   * @param parsedElements - object containing the components of a parsed date
   * @returns parsedDate with weekYear set to parsed value
   */
  function _postParseYear(this: EsDay, parsedDate: Date, parsedElements: ParsedElements) {
    let modifiedDate = parsedDate

    // is this a valid date and do we have parsed the weekYear?
    if (!(Number.isNaN(parsedDate.valueOf()) || isUndefined(parsedElements.weekYear))) {
      const newEsday = createInstanceFromExist(parsedDate, this)
      const parsedWeekYear = parsedElements.weekYear as number

      if (Object.keys(parsedElements).length === 1) {
        const now = new Date()
        // we parsed isoYear only ('gg' or 'gggg')
        let modifiedEsday = newEsday.weekYear(parsedWeekYear)
        modifiedEsday = modifiedEsday
          .year(parsedWeekYear)
          .month(now.getMonth())
          .date(now.getDate())
          .weekday(0)
        modifiedDate = modifiedEsday.toDate()
      } else if (!isUndefined(parsedElements.week)) {
        const modifiedEsday = newEsday.weekYear(parsedWeekYear)
        modifiedDate = modifiedEsday.toDate()
      }
    }
    return modifiedDate
  }

  // @ts-expect-error function is compatible with its overload
  proto.week = function (newWeek?: number) {
    // Setter
    if (newWeek !== undefined) {
      // 'add(...,  C.DAY)' may change time, if we switch between DST and non-DST
      const currentWeekday = this.weekday()
      const h = this.hour()
      const m = this.minute()
      const s = this.second()
      const ms = this.millisecond()

      return this.add((newWeek - this.week()) * 7, C.DAY)
        .weekday(currentWeekday)
        .hour(h, m, s, ms)
    }

    // Getter
    const yearStart = this.localeObject?.().yearStart || C.INDEX_THURSDAY // default to Thursday according to ISO 8601
    if (this.month() === 11 && this.date() > 25) {
      const nextYearStartDay = this.startOf(C.YEAR).add(1, C.YEAR).date(yearStart)
      const thisEndOfWeek = this.endOf(C.WEEK)
      if (nextYearStartDay.isBefore(thisEndOfWeek)) {
        return 1
      }
    }
    const yearStartDay = this.startOf(C.YEAR).date(yearStart)
    const yearStartWeek = yearStartDay.startOf(C.WEEK).subtract(1, C.MS)
    const diffInWeek = this.diff(yearStartWeek, C.WEEK, true)
    if (diffInWeek < 0) {
      return this.startOf(C.WEEK).week()
    }
    return Math.ceil(diffInWeek)
  }

  proto.weeks = proto.week

  /**
   * Get or set the locale aware day of the week.
   * 0 is always the first day of the week (according to locale.weekStart property),
   * 6 is always the last day of the week.
   * E.g. in Europe 0=Monday ... 6=Sunday.
   * If no locale is loaded, Monday is used as start of week.
   */
  // @ts-expect-error function is compatible with its overload
  dayClass.prototype.weekday = function (newWeekday: number) {
    const weekStart = this.localeObject?.().weekStart ?? C.INDEX_MONDAY
    const dow = this.day() // day of week
    const weekday = (dow < weekStart ? dow + 7 : dow) - weekStart

    // Setter
    if (newWeekday !== undefined) {
      return this.subtract(weekday, C.DAY).add(newWeekday, C.DAY)
    }

    // Getter
    return weekday
  }

  /**
   * Gets or sets the year of the week. This year may differ from
   * the calendar year at the start or the end of a year (depending on
   * 'yearStart').
   * Setting the weekYear will keep the week number and the day of the week.
   * If no locale is loaded, Monday is used as start of week.
   */
  // @ts-expect-error function is compatible with its overload
  proto.weekYear = function (newWeekYear?: number) {
    // Setter
    if (newWeekYear !== undefined) {
      if (this.weekYear() === newWeekYear) {
        return this
      }
      const currentWeek = this.week()
      const currentWeekday = this.weekday()
      let newDate = this.year(newWeekYear).week(currentWeek).weekday(currentWeekday)
      if (newDate.weekYear() !== newWeekYear) {
        const yearDiff = newWeekYear - newDate.weekYear()
        newDate = newDate.add(yearDiff, C.YEAR).weekday(currentWeekday)
      }
      return newDate
    }

    // Getter
    const month = this.month()
    const weekOfYear = this.week()
    const year = this.year()
    if (weekOfYear === 1 && month === 11) {
      return year + 1
    }
    if (month === 0 && weekOfYear >= 52) {
      return year - 1
    }
    return year
  }

  /**
   * Get the number of weeks in the current year.
   * Most years have 52 weeks, some have 53 weeks.
   */
  proto.weeksInYear = function () {
    const weekStart = this.localeObject?.().weekStart ?? C.INDEX_MONDAY
    const yearStart = this.localeObject?.().yearStart ?? C.INDEX_THURSDAY
    const preWeekStart = (((weekStart + 6) % 7) + 8 - yearStart) % 7
    const prePreWeekStart = (preWeekStart + 6) % 7

    // get weekday of January 1st
    const yearStartWeekday = this.month(0).date(1).day()
    const year = this.year()
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    if (yearStartWeekday === preWeekStart || (isLeapYear && yearStartWeekday === prePreWeekStart)) {
      return 53
    }
    return 52
  }

  const oldStartOf = proto.startOf
  proto.startOf = function (units: UnitType) {
    if (units === C.WEEK) {
      let newDate = this.clone()
      // default start of week is Monday (according to ISO 8601)
      const weekStart = newDate.localeObject?.().weekStart ?? C.INDEX_MONDAY
      const newDateWeekday = newDate.day()
      const diff = (newDateWeekday < weekStart ? newDateWeekday + 7 : newDateWeekday) - weekStart
      const newDayOfMonth = newDate.date() - diff
      newDate = newDate.date(newDayOfMonth)
      return newDate['$set'](C.HOUR, [0, 0, 0, 0])
    }
    return oldStartOf.call(this, units)
  }

  const oldEndOf = proto.endOf
  proto.endOf = function (units: UnitType) {
    if (units === C.WEEK) {
      let newDate = this.clone()
      // default start of week is Monday (according to ISO 8601)
      const weekStart = newDate.localeObject?.().weekStart ?? C.INDEX_MONDAY
      const newDateWeekday = newDate.day()
      const diff = (newDateWeekday < weekStart ? newDateWeekday + 7 : newDateWeekday) - weekStart
      const newDayOfMonth = newDate.date() + (6 - diff)
      newDate = newDate.date(newDayOfMonth)
      return newDate['$set'](C.HOUR, [23, 59, 59, 999])
    }
    return oldEndOf.call(this, units)
  }

  const oldGet = proto.get
  proto.get = function (unit: UnitTypeGetSet) {
    const normalizedUnit = normalizeUnitWithPlurals(unit)
    if (normalizedUnit === C.WEEK) {
      return this.week()
    }
    return oldGet.call(this, unit)
  }

  const old$set = proto['$set']
  proto['$set'] = function (unit: UnitTypeGetSet | UnitsObjectTypeSet, values: number[]) {
    if (isObject(unit)) {
      // UnitsObjectTypeSet is implemented in plugin ObjectSupport
      // therefore we ignore the request here.
      return this.clone()
    }

    const normalizedUnit = normalizeUnitWithPlurals(unit)
    if (normalizedUnit === C.WEEK) {
      return this.week(values[0])
    }
    return old$set.call(this, unit, values)
  }

  // Add week related formatting tokens
  const additionalTokens: FormattingTokenDefinitions = {
    w: (sourceDate: EsDay) => sourceDate.week().toString(), // week 1..52
    ww: (sourceDate: EsDay) => padStart(sourceDate.week(), 2, '0'), // week 01..52
    wo: (sourceDate: EsDay) => toOrdinal(sourceDate, sourceDate.week()), // week 1st..52nd
    e: (sourceDate: EsDay) => sourceDate.weekday().toString(), // weekday 1..7
    gg: (sourceDate: EsDay) => padStart(sourceDate.weekYear(), 2, '0').slice(-2), // weekYear 70 .. 30
    gggg: (sourceDate: EsDay) => padStart(sourceDate.weekYear(), 4, '0'), // weekYear 1970 .. 2030
  }
  dayFactory.addFormatTokenDefinitions(additionalTokens)

  // Add week related parsing tokens
  const parseTokensDefinitions: TokenDefinitions = {
    d: [match1to2, match1to2, addDayOfWeek('day', dayFactory), _postParseDayOfWeek],
    dd: [matchWord, matchWord, addDayOfWeek('weekdaysMin', dayFactory), _postParseDayOfWeek],
    ddd: [matchWord, matchWord, addDayOfWeek('weekdaysShort', dayFactory), _postParseDayOfWeek],
    dddd: [matchWord, matchWord, addDayOfWeek('weekdays', dayFactory), _postParseDayOfWeek],
    w: [match1to2, match1to2NoLeadingZero, addWeek('week'), _postParseWeek], // isoWeek 1..52
    ww: [match1to2, match2, addWeek('week'), _postParseWeek], // isoWeek 01..52
    e: [match1to2, match1, addWeek('weekday'), _postParseWeekDay], // isoWeekday 1..7
    gg: [match1to4, match2, twoDigitsYearUpdater, _postParseYear], // isoWeekYear 70 .. 30
    gggg: [match1to4, match4, addWeek('weekYear'), _postParseYear], // isoWeekYear 1970 .. 2030
  }
  dayFactory.addParseTokenDefinitions?.(parseTokensDefinitions)
}

export default weekPlugin
