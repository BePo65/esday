/**
 * calendar plugin
 *
 * This plugin adds 'calendar' method to EsDay
 *
 * This plugin requires the 'locale' plugin and a locale to be loaded.
 */

import type { EsDay, EsDayPlugin } from 'esday'
import type { Calendar, CalendarPartial } from '../locale'

declare module 'esday' {
  interface EsDay {
    calendar(referenceDate?: EsDay | null, formats?: CalendarPartial): string
  }
}

// Default Calendar definition is based on default locale 'en'
const defaultCalendar: Calendar = {
  sameDay: '[Today at] LT',
  nextDay: '[Tomorrow at] LT',
  nextWeek: 'dddd [at] LT',
  lastDay: '[Yesterday at] LT',
  lastWeek: '[Last] dddd [at] LT',
  sameElse: 'L',
}

const calendarPlugin: EsDayPlugin<{}> = (_, dayClass, dayFactory) => {
  const proto = dayClass.prototype

  proto.calendar = function (referenceDate?: EsDay | null, formats?: CalendarPartial) {
    const format = formats ?? this.localeObject?.().calendar ?? defaultCalendar
    // 'referenceDate ?? undefined' handles the null value (allowed by moment.js)
    const referenceStartOfDay = dayFactory(referenceDate ?? undefined).startOf('date')
    const diff = this.diff(referenceStartOfDay, 'day', true)
    const sameElse = 'sameElse'

    let retVal: keyof Calendar
    if (diff < -6) {
      retVal = sameElse
    } else if (diff < -1) {
      retVal = 'lastWeek'
    } else if (diff < 0) {
      retVal = 'lastDay'
    } else if (diff < 1) {
      retVal = 'sameDay'
    } else if (diff < 2) {
      retVal = 'nextDay'
    } else if (diff < 7) {
      retVal = 'nextWeek'
    } else {
      retVal = sameElse
    }

    // Use default value, if formats does not contain the required format
    let currentFormat = format[retVal] ?? defaultCalendar[retVal]
    if (typeof currentFormat === 'function') {
      currentFormat = currentFormat.call(this, referenceStartOfDay)
    }
    return this.format(currentFormat)
  }
}

export default calendarPlugin
