/**
 * localizedFormat plugin
 *
 * This plugin adds localized formats to advancedFormat plugin and date formatting
 */

import type { EsDay, EsDayPlugin, FormattingTokenDefinitions } from 'esday'

import { isArray, isString, padNumberWithLeadingZeros } from '~/common'
import type {
  DayNamesStandaloneFormat,
  Locale,
  MonthNamesFunction,
  MonthNamesStandaloneFormat,
} from '../locale'

/**
 * Create a function that will format the day of week value from the sourceDate
 * to a day of week string using the given format.
 * @returns function that will format the day of the week of the given date
 */
function addWeekday() {
  return function weekdayFormatter(sourceDate: EsDay, format?: string) {
    const weekdays = sourceDate.localeObject().weekdays

    if (isArray(weekdays)) {
      return weekdays[sourceDate.day()]
    }

    const parseForUseFormat = (weekdays as DayNamesStandaloneFormat).isFormat
    const useFormatProperty = parseForUseFormat?.test(format as string)
    if (useFormatProperty) {
      return (weekdays as DayNamesStandaloneFormat).format[sourceDate.day()]
    }
    return (weekdays as DayNamesStandaloneFormat).standalone[sourceDate.day()]
  }
}

/**
 * Create a function that will format the month value from the sourceDate
 * to a month string using the given format.
 * @param property - name of the list of month names to use
 * @returns function that will format the month of the given date
 */
function addMonth(property: 'months' | 'monthsShort') {
  return function monthFormatter(sourceDate: EsDay, format?: string) {
    const MONTHS_IN_FORMAT = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/
    const months = sourceDate.localeObject()[property]

    if (isArray(months)) {
      return months[sourceDate.month()]
    }

    // is months an instance of 'MonthNamesFunction'?
    if (typeof months === 'function') {
      return months(sourceDate, format as string)
    }

    // if format is day or day-of-week before month then use 'format' else use 'standalone' parameter
    const parseForUseFormat = (months as MonthNamesStandaloneFormat).isFormat ?? MONTHS_IN_FORMAT
    const useFormatProperty = parseForUseFormat.test(format as string)
    if (useFormatProperty) {
      return (months as MonthNamesStandaloneFormat | MonthNamesFunction).format[sourceDate.month()]
    }
    return (months as MonthNamesStandaloneFormat | MonthNamesFunction).standalone[
      sourceDate.month()
    ]
  }
}

/**
 * Convert hours in 24h format to 12h format (for use with am/pm)
 * @param hour24h - hours in 24h format
 * @returns hours in 12h format
 */
function hour24hTo12h(hour24h: number): number {
  let hour12h = hour24h % 12
  if (hour12h === 0) {
    hour12h = 12
  }
  return hour12h
}

/**
 * Replace locale dependent token in given format with values from locale definition
 * e.g. 'LTS' with 'h:mm:ss A'
 * @param format - original format (with locale dependent tokens)
 * @param currentLocale - Locale to use
 * @returns format with locale dependent tokens replaced
 */
function replaceLocaleTokens(format: string, currentLocale: Locale) {
  const localFormattingTokens = /(\[[^[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g
  function replaceLongDateFormatTokens(input: string) {
    return currentLocale.formats[input as keyof typeof currentLocale.formats] ?? input
  }

  return format.replace(localFormattingTokens, replaceLongDateFormatTokens)
}

const localizedFormatPlugin: EsDayPlugin<{}> = (_, dayClass, dayFactory) => {
  const proto = dayClass.prototype

  // add new parsing tokens to existing list of parsing tokens
  const additionalTokens: FormattingTokenDefinitions = {
    MMM: addMonth('monthsShort'),
    MMMM: addMonth('months'),
    Do: (sourceDate: EsDay) => sourceDate.localeObject().ordinal(sourceDate.date()), // Day of month as ordinal
    dd: (sourceDate: EsDay, _formatStr?: string) =>
      sourceDate.localeObject().weekdaysMin[sourceDate.day()],
    ddd: (sourceDate: EsDay, _formatStr?: string) =>
      sourceDate.localeObject().weekdaysShort[sourceDate.day()],
    dddd: addWeekday(),
    h: (sourceDate: EsDay) => padNumberWithLeadingZeros(hour24hTo12h(sourceDate.hour()), 1),
    hh: (sourceDate: EsDay) => padNumberWithLeadingZeros(hour24hTo12h(sourceDate.hour()), 2),
    a: (sourceDate: EsDay) =>
      sourceDate.localeObject().meridiem(sourceDate.hour(), sourceDate.minute(), true),
    A: (sourceDate: EsDay) =>
      sourceDate.localeObject().meridiem(sourceDate.hour(), sourceDate.minute(), false),
  }
  dayFactory.addFormatTokenDefinitions(additionalTokens)

  // replace locale formats with values from Locale
  const oldFormat = proto['format']
  proto['format'] = function (formatStr?: string) {
    if (!isString(formatStr)) {
      return oldFormat.call(this, formatStr)
    }

    const newFormat = replaceLocaleTokens(formatStr, this.localeObject())
    const formattedValue = oldFormat.call(this, newFormat)

    // run postFormat if exists
    return this.localeObject?.().postFormat?.(formattedValue) ?? formattedValue
  }
}

export default localizedFormatPlugin
