/**
 * Slovenian [sl]
 */

import type { EsDay } from 'esday'
import type { Locale, RelativeTimeElementFunction } from '~/plugins/locale'

const calendar = {
  sameDay: '[danes ob] LT',
  nextDay: '[jutri ob] LT',
  nextWeek(this: EsDay) {
    switch (this.day()) {
      case 0:
        return '[v] [nedeljo] [ob] LT'
      case 3:
        return '[v] [sredo] [ob] LT'
      case 6:
        return '[v] [soboto] [ob] LT'
      case 1:
      case 2:
      case 4:
      case 5:
        return '[v] dddd [ob] LT'
      default:
        return ''
    }
  },
  lastDay: '[včeraj ob] LT',
  lastWeek(this: EsDay) {
    switch (this.day()) {
      case 0:
        return '[prejšnjo] [nedeljo] [ob] LT'
      case 3:
        return '[prejšnjo] [sredo] [ob] LT'
      case 6:
        return '[prejšnjo] [soboto] [ob] LT'
      case 1:
      case 2:
      case 4:
      case 5:
        return '[prejšnji] dddd [ob] LT'
      default:
        return ''
    }
  },
  sameElse: 'L',
}

function dual(timeValue: number) {
  return timeValue % 100 === 2
}
function threeFour(timeValue: number) {
  return timeValue % 100 === 3 || timeValue % 100 === 4
}

const relativeTimeFormatter: RelativeTimeElementFunction = (
  timeValue: string | number,
  withoutSuffix: boolean,
  token: string,
  isFuture: boolean,
) => {
  const result = `${timeValue} `
  switch (token) {
    case 's': // a few seconds / in a few seconds / a few seconds ago
      return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami'
    case 'ss': // 9 seconds / in 9 seconds / 9 seconds ago
      if (+timeValue === 1) {
        return `${result}${withoutSuffix ? 'sekundo' : 'sekundi'}`
      }
      if (+timeValue === 2) {
        return `${result}${withoutSuffix || isFuture ? 'sekundi' : 'sekundah'}`
      }
      if (+timeValue < 5) {
        return `${result}${withoutSuffix || isFuture ? 'sekunde' : 'sekundah'}`
      }
      return `${result}sekund`
    case 'm': // a minute / in a minute / a minute ago
      return withoutSuffix ? 'ena minuta' : 'eno minuto'
    case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
      if (dual(+timeValue)) {
        return `${result}${withoutSuffix || isFuture ? 'minuti' : 'minutama'}`
      }
      if (threeFour(+timeValue)) {
        return `${result}${withoutSuffix || isFuture ? 'minute' : 'minutami'}`
      }
      return `${result}${withoutSuffix || isFuture ? 'minut' : 'minutami'}`
    case 'h': // an hour / in an hour / an hour ago
      return withoutSuffix ? 'ena ura' : 'eno uro'
    case 'hh': // 9 hours / in 9 hours / 9 hours ago
      if (dual(+timeValue)) {
        return `${result}${withoutSuffix || isFuture ? 'uri' : 'urama'}`
      }
      if (threeFour(+timeValue)) {
        return `${result}${withoutSuffix || isFuture ? 'ure' : 'urami'}`
      }
      return `${result}${withoutSuffix || isFuture ? 'ur' : 'urami'}`
    case 'd': // a day / in a day / a day ago
      return withoutSuffix || isFuture ? 'en dan' : 'enim dnem'
    case 'dd': // 9 days / in 9 days / 9 days ago
      if (dual(+timeValue)) {
        return `${result}${withoutSuffix || isFuture ? 'dneva' : 'dnevoma'}`
      }
      return result + (withoutSuffix || isFuture ? 'dni' : 'dnevi')
    case 'w': // a day / in a day / a day ago
      return withoutSuffix || isFuture ? 'en teden' : 'enem tednu'
    case 'ww': // 9 days / in 9 days / 9 days ago
      if (dual(+timeValue)) {
        return `${result}${withoutSuffix || isFuture ? 'tedna' : 'tednoma'}`
      }
      return result + (withoutSuffix || isFuture ? 'tednih' : 'tedni')
    case 'M': // a month / in a month / a month ago
      return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem'
    case 'MM': // 9 months / in 9 months / 9 months ago
      if (dual(+timeValue)) {
        // 2 minutes / in 2 minutes
        return `${result}${withoutSuffix || isFuture ? 'meseca' : 'mesecema'}`
      }
      if (threeFour(+timeValue)) {
        return `${result}${withoutSuffix || isFuture ? 'mesece' : 'meseci'}`
      }
      return `${result}${withoutSuffix || isFuture ? 'mesecev' : 'meseci'}`
    case 'y': // a year / in a year / a year ago
      return withoutSuffix || isFuture ? 'eno leto' : 'enim letom'
    case 'yy': // 9 years / in 9 years / 9 years ago
      if (dual(+timeValue)) {
        // 2 minutes / in 2 minutes
        return `${result}${withoutSuffix || isFuture ? 'leti' : 'letoma'}`
      }
      if (threeFour(+timeValue)) {
        return `${result}${withoutSuffix || isFuture ? 'leta' : 'leti'}`
      }
      return `${result}${withoutSuffix || isFuture ? 'let' : 'leti'}`
    default:
      return ''
  }
}

const localeSl: Readonly<Locale> = {
  name: 'sl',
  weekdays: ['nedelja', 'ponedeljek', 'torek', 'sreda', 'četrtek', 'petek', 'sobota'],
  weekdaysShort: ['ned.', 'pon.', 'tor.', 'sre.', 'čet.', 'pet.', 'sob.'],
  weekdaysMin: ['ne', 'po', 'to', 'sr', 'če', 'pe', 'so'],
  months: [
    'januar',
    'februar',
    'marec',
    'april',
    'maj',
    'junij',
    'julij',
    'avgust',
    'september',
    'oktober',
    'november',
    'december',
  ],
  monthsShort: [
    'jan.',
    'feb.',
    'mar.',
    'apr.',
    'maj.',
    'jun.',
    'jul.',
    'avg.',
    'sep.',
    'okt.',
    'nov.',
    'dec.',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: (n) => `${n}.`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd, D. MMMM YYYY H:mm',
    l: 'D. M. YYYY',
    ll: 'D. MMMM YYYY',
    lll: 'D. MMMM YYYY H:mm',
    llll: 'dddd, D. MMMM YYYY H:mm',
  },
  calendar,
  relativeTime: {
    future: 'čez %s',
    past: 'pred %s',
    s: relativeTimeFormatter,
    ss: relativeTimeFormatter,
    m: relativeTimeFormatter,
    mm: relativeTimeFormatter,
    h: relativeTimeFormatter,
    hh: relativeTimeFormatter,
    d: relativeTimeFormatter,
    dd: relativeTimeFormatter,
    w: relativeTimeFormatter,
    ww: relativeTimeFormatter,
    M: relativeTimeFormatter,
    MM: relativeTimeFormatter,
    y: relativeTimeFormatter,
    yy: relativeTimeFormatter,
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Slovenian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeSl
