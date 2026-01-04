/**
 * Croatian [hr]
 */

import type { EsDay } from 'esday'
import type {
  Locale,
  MonthNames,
  MonthNamesFunction,
  RelativeTimeElementFunction,
} from '~/plugins/locale'

const monthFormat: MonthNames = [
  'siječnja',
  'veljače',
  'ožujka',
  'travnja',
  'svibnja',
  'lipnja',
  'srpnja',
  'kolovoza',
  'rujna',
  'listopada',
  'studenoga',
  'prosinca',
]
const monthStandalone: MonthNames = [
  'siječanj',
  'veljača',
  'ožujak',
  'travanj',
  'svibanj',
  'lipanj',
  'srpanj',
  'kolovoz',
  'rujan',
  'listopad',
  'studeni',
  'prosinac',
]

const months: MonthNamesFunction = (esdayInstance: EsDay, format: string) => {
  const MONTHS_IN_FORMAT = /D[oD]?(?:\[[^[\]]*\]|\s)+MMMM?/
  if (MONTHS_IN_FORMAT.test(format)) {
    return monthFormat[esdayInstance.month()]
  }
  return monthStandalone[esdayInstance.month()]
}
months.format = monthFormat
months.standalone = monthStandalone

const calendar = {
  sameDay: '[danas u] LT',
  nextDay: '[sutra u] LT',
  nextWeek(this: EsDay) {
    switch (this.day()) {
      case 0:
        return '[u] [nedjelju] [u] LT'
      case 3:
        return '[u] [srijedu] [u] LT'
      case 6:
        return '[u] [subotu] [u] LT'
      case 1:
      case 2:
      case 4:
      case 5:
        return '[u] dddd [u] LT'
      default:
        return ''
    }
  },
  lastDay: '[jučer u] LT',
  lastWeek(this: EsDay) {
    switch (this.day()) {
      case 0:
        return '[prošlu] [nedjelju] [u] LT'
      case 3:
        return '[prošlu] [srijedu] [u] LT'
      case 6:
        return '[prošle] [subote] [u] LT'
      case 1:
      case 2:
      case 4:
      case 5:
        return '[prošli] dddd [u] LT'
      default:
        return ''
    }
  },
  sameElse: 'L',
}

const relativeTimeFormatter: RelativeTimeElementFunction = (
  timeValue: string | number,
  withoutSuffix: boolean,
  token: string,
  _isFuture: boolean,
) => {
  // function translate(timeValue: string | number, withoutSuffix: boolean, range: string): string {
  let result = `${timeValue} `
  const timeValueAsNumber = +timeValue
  switch (token) {
    case 'ss':
      if (timeValueAsNumber === 1) {
        result += 'sekunda'
      } else if (timeValueAsNumber === 2 || timeValueAsNumber === 3 || timeValueAsNumber === 4) {
        result += 'sekunde'
      } else {
        result += 'sekundi'
      }
      return result
    case 'm':
      return withoutSuffix ? 'jedna minuta' : 'jedne minute'
    case 'mm':
      if (timeValueAsNumber === 1) {
        result += 'minuta'
      } else if (timeValueAsNumber === 2 || timeValueAsNumber === 3 || timeValueAsNumber === 4) {
        result += 'minute'
      } else {
        result += 'minuta'
      }
      return result
    case 'h':
      return withoutSuffix ? 'jedan sat' : 'jednog sata'
    case 'hh':
      if (timeValueAsNumber === 1) {
        result += 'sat'
      } else if (timeValueAsNumber === 2 || timeValueAsNumber === 3 || timeValueAsNumber === 4) {
        result += 'sata'
      } else {
        result += 'sati'
      }
      return result
    case 'dd':
      if (timeValueAsNumber === 1) {
        result += 'dan'
      } else {
        result += 'dana'
      }
      return result
    case 'ww':
      if (timeValueAsNumber === 1) {
        result += 'tjedan'
      } else if (timeValueAsNumber === 2 || timeValueAsNumber === 3 || timeValueAsNumber === 4) {
        result += 'tjedna'
      } else {
        result += 'tjedana'
      }
      return result
    case 'MM':
      if (timeValueAsNumber === 1) {
        result += 'mjesec'
      } else if (timeValueAsNumber === 2 || timeValueAsNumber === 3 || timeValueAsNumber === 4) {
        result += 'mjeseca'
      } else {
        result += 'mjeseci'
      }
      return result
    case 'yy':
      if (timeValueAsNumber === 1) {
        result += 'godina'
      } else if (timeValueAsNumber === 2 || timeValueAsNumber === 3 || timeValueAsNumber === 4) {
        result += 'godine'
      } else {
        result += 'godina'
      }
      return result
    default:
      return ''
  }
}

const localeHr: Readonly<Locale> = {
  name: 'hr',
  weekdays: ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'],
  weekdaysShort: ['ned.', 'pon.', 'uto.', 'sri.', 'čet.', 'pet.', 'sub.'],
  weekdaysMin: ['ne', 'po', 'ut', 'sr', 'če', 'pe', 'su'],
  months,
  monthsShort: [
    'sij.',
    'velj.',
    'ožu.',
    'tra.',
    'svi.',
    'lip.',
    'srp.',
    'kol.',
    'ruj.',
    'lis.',
    'stu.',
    'pro.',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: (n) => `${n}.`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'Do MMMM YYYY',
    LLL: 'Do MMMM YYYY H:mm',
    LLLL: 'dddd, Do MMMM YYYY H:mm',
    l: 'DD.MM.YYYY',
    ll: 'Do MMM YYYY',
    lll: 'Do MMM YYYY H:mm',
    llll: 'ddd, Do MMM YYYY H:mm',
  },
  calendar,
  relativeTime: {
    future: 'za %s',
    past: 'prije %s',
    s: 'sekunda',
    ss: relativeTimeFormatter,
    m: relativeTimeFormatter,
    mm: relativeTimeFormatter,
    h: relativeTimeFormatter,
    hh: relativeTimeFormatter,
    d: 'dan',
    dd: relativeTimeFormatter,
    w: 'jednog tjedna',
    ww: relativeTimeFormatter,
    M: 'mjesec',
    MM: relativeTimeFormatter,
    y: 'godina',
    yy: relativeTimeFormatter,
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Croatian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeHr
