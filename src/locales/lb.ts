/**
 * Luxembourgish [lb]
 */

import type { Locale, RelativeTimeElementFunction } from '~/plugins/locale'

/**
 * Returns true if the word before the given number loses the '-n' ending.
 * e.g. 'an 10 Deeg' but 'a 5 Deeg'
 *
 * @param timeValue - string to inspect
 * @returns true, if terminating 'n' must be dropped
 */
function eifelerRuleAppliesToNumber(timeValue: string) {
  let timeAsNumber = Number.parseInt(timeValue, 10)
  if (Number.isNaN(timeAsNumber)) {
    return false
  }
  if (timeAsNumber < 0) {
    // Negative Number --> always true
    return true
  }
  if (timeAsNumber < 10) {
    // Only 1 digit
    if (timeAsNumber >= 4 && timeAsNumber <= 7) {
      return true
    }
    return false
  }
  if (timeAsNumber < 100) {
    // 2 digits
    const lastDigit = timeAsNumber % 10
    const firstDigit = timeAsNumber / 10
    if (lastDigit === 0) {
      return eifelerRuleAppliesToNumber(firstDigit.toString())
    }
    return eifelerRuleAppliesToNumber(lastDigit.toString())
  }
  if (timeAsNumber < 10_000) {
    // 3 or 4 digits --> recursively check first digit
    while (timeAsNumber >= 10) {
      timeAsNumber = timeAsNumber / 10
    }
    return eifelerRuleAppliesToNumber(`${timeAsNumber}`)
  }
  // Anything larger than 4 digits: recursively check first n-3 digits
  timeAsNumber = timeAsNumber / 1000
  return eifelerRuleAppliesToNumber(`${timeAsNumber}`)
}
function processFutureTime(timeValue: string | number) {
  const timeValueAsString = timeValue.toString().trim()
  const indexOfSeparatorChar = timeValueAsString.indexOf(' ')
  let firstNumberString = timeValueAsString
  if (indexOfSeparatorChar > 0) {
    firstNumberString = timeValueAsString.substring(0, indexOfSeparatorChar)
  }

  if (eifelerRuleAppliesToNumber(firstNumberString)) {
    return `a ${timeValueAsString}`
  }
  return `an ${timeValueAsString}`
}
function processPastTime(timeValue: string | number) {
  const timeValueAsString = timeValue.toString().trim()
  const indexOfSeparatorChar = timeValueAsString.indexOf(' ')
  let firstNumberString = timeValueAsString
  if (indexOfSeparatorChar > 0) {
    firstNumberString = timeValueAsString.substring(0, indexOfSeparatorChar)
  }

  if (eifelerRuleAppliesToNumber(firstNumberString)) {
    return `viru ${timeValue}`
  }
  return `virun ${timeValue}`
}
const relativeTimeFormatter: RelativeTimeElementFunction = (
  timeValue: string | number,
  withoutSuffix: boolean,
  token: string,
  _isFuture: boolean,
) => {
  const format = {
    m: ['eng Minutt', 'enger Minutt'],
    h: ['eng Stonn', 'enger Stonn'],
    d: ['een Dag', 'engem Dag'],
    w: ['eng Woch', 'enger Woch'],
    M: ['ee Mount', 'engem Mount'],
    y: ['ee Joer', 'engem Joer'],
  }
  return (
    timeValue.toString() +
    (withoutSuffix
      ? format[token as keyof typeof format][0]
      : format[token as keyof typeof format][1])
  )
}

const localeLb: Readonly<Locale> = {
  name: 'lb',
  weekdays: ['Sonndeg', 'Méindeg', 'Dënschdeg', 'Mëttwoch', 'Donneschdeg', 'Freideg', 'Samschdeg'],
  weekdaysShort: ['So.', 'Mé.', 'Dë.', 'Më.', 'Do.', 'Fr.', 'Sa.'],
  weekdaysMin: ['So', 'Mé', 'Dë', 'Më', 'Do', 'Fr', 'Sa'],
  months: [
    'Januar',
    'Februar',
    'Mäerz',
    'Abrëll',
    'Mee',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ],
  monthsShort: [
    'Jan.',
    'Febr.',
    'Mrz.',
    'Abr.',
    'Mee',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sept.',
    'Okt.',
    'Nov.',
    'Dez.',
  ],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'H:mm [Auer]',
    LTS: 'H:mm:ss [Auer]',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm [Auer]',
    LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]',
    l: 'DD.MM.YYYY',
    ll: 'D. MMMM YYYY',
    lll: 'D. MMMM YYYY H:mm [Auer]',
    llll: 'dddd, D. MMMM YYYY H:mm [Auer]',
  },
  calendar: {
    sameDay: '[Haut um] LT',
    sameElse: 'L',
    nextDay: '[Muer um] LT',
    nextWeek: 'dddd [um] LT',
    lastDay: '[Gëschter um] LT',
    lastWeek() {
      // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
      switch (this.day()) {
        case 2:
        case 4:
          return '[Leschten] dddd [um] LT'
        default:
          return '[Leschte] dddd [um] LT'
      }
    },
  },
  relativeTime: {
    future: processFutureTime,
    past: processPastTime,
    s: 'e puer Sekonnen',
    ss: '%d Sekonnen',
    m: relativeTimeFormatter,
    mm: '%d Minutten',
    h: relativeTimeFormatter,
    hh: '%d Stonnen',
    d: relativeTimeFormatter,
    dd: '%d Deeg',
    w: relativeTimeFormatter,
    ww: '%d Wochen',
    M: relativeTimeFormatter,
    MM: '%d Méint',
    y: relativeTimeFormatter,
    yy: '%d Joer',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Luxembourgish doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeLb
