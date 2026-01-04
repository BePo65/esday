/**
 * Czech [cs]
 */

import type { EsDay } from 'esday'
import type {
  Locale,
  MonthNames,
  MonthNamesStandaloneFormat,
  RelativeTimeElementFunction,
} from '~/plugins/locale'

const monthFormat: MonthNames = [
  'ledna',
  'února',
  'března',
  'dubna',
  'května',
  'června',
  'července',
  'srpna',
  'září',
  'října',
  'listopadu',
  'prosince',
]
const monthStandalone: MonthNames = [
  'leden',
  'únor',
  'březen',
  'duben',
  'květen',
  'červen',
  'červenec',
  'srpen',
  'září',
  'říjen',
  'listopad',
  'prosinec',
]
const months: MonthNamesStandaloneFormat = {
  standalone: monthStandalone,
  format: monthFormat,
  isFormat: /DD?[o.]?(\[[^[\]]*\]|\s)+MMMM/,
}

const calendar = {
  sameDay: '[dnes v] LT',
  nextDay: '[zítra v] LT',
  nextWeek(this: EsDay) {
    switch (this.day()) {
      case 0:
        return '[v neděli v] LT'
      case 1:
      case 2:
        return '[v] dddd [v] LT'
      case 3:
        return '[ve středu v] LT'
      case 4:
        return '[ve čtvrtek v] LT'
      case 5:
        return '[v pátek v] LT'
      case 6:
        return '[v sobotu v] LT'
      default:
        return ''
    }
  },
  lastDay: '[včera v] LT',
  lastWeek(this: EsDay) {
    switch (this.day()) {
      case 0:
        return '[minulou neděli v] LT'
      case 1:
      case 2:
        return '[minulé] dddd [v] LT'
      case 3:
        return '[minulou středu v] LT'
      case 4:
      case 5:
        return '[minulý] dddd [v] LT'
      case 6:
        return '[minulou sobotu v] LT'
      default:
        return ''
    }
  },
  sameElse: 'L',
}

function usePlural(timeValue: number): boolean {
  return timeValue > 1 && timeValue < 5
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
      return withoutSuffix || isFuture ? 'pár sekund' : 'pár sekundami'
    case 'ss': // 9 seconds / in 9 seconds / 9 seconds ago
      if (withoutSuffix || isFuture) {
        return result + (usePlural(+timeValue) ? 'sekundy' : 'sekund')
      }
      return `${result}sekundami`
    case 'm': // a minute / in a minute / a minute ago
      return withoutSuffix ? 'minuta' : isFuture ? 'minutu' : 'minutou'
    case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
      if (withoutSuffix || isFuture) {
        return result + (usePlural(+timeValue) ? 'minuty' : 'minut')
      }
      return `${result}minutami`
    case 'h': // an hour / in an hour / an hour ago
      return withoutSuffix ? 'hodina' : isFuture ? 'hodinu' : 'hodinou'
    case 'hh': // 9 hours / in 9 hours / 9 hours ago
      if (withoutSuffix || isFuture) {
        return result + (usePlural(+timeValue) ? 'hodiny' : 'hodin')
      }
      return `${result}hodinami`
    case 'd': // a day / in a day / a day ago
      return withoutSuffix || isFuture ? 'den' : 'dnem'
    case 'dd': // 9 days / in 9 days / 9 days ago
      if (withoutSuffix || isFuture) {
        return result + (usePlural(+timeValue) ? 'dny' : 'dní')
      }
      return `${result}dny`
    case 'w': // a day / in a day / a day ago
      return withoutSuffix || isFuture ? 'týden' : 'týdnem'
    case 'ww': // 9 days / in 9 days / 9 days ago
      if (withoutSuffix || isFuture) {
        return result + (usePlural(+timeValue) ? 'týdny' : 'týdnů')
      }
      return `${result}týdny`
    case 'M': // a month / in a month / a month ago
      return withoutSuffix || isFuture ? 'měsíc' : 'měsícem'
    case 'MM': // 9 months / in 9 months / 9 months ago
      if (withoutSuffix || isFuture) {
        return result + (usePlural(+timeValue) ? 'měsíce' : 'měsíců')
      }
      return `${result}měsíci`
    case 'y': // a year / in a year / a year ago
      return withoutSuffix || isFuture ? 'rok' : 'rokem'
    case 'yy': // 9 years / in 9 years / 9 years ago
      if (withoutSuffix || isFuture) {
        return result + (usePlural(+timeValue) ? 'roky' : 'let')
      }
      return `${result}lety`
    default:
      return ''
  }
}

const localeCs: Readonly<Locale> = {
  name: 'cs',
  weekdays: ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
  weekdaysShort: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
  weekdaysMin: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
  months,
  monthsShort: ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'],
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
    LLLL: 'dddd Do MMMM YYYY H:mm',
    l: 'Do M. YYYY',
    ll: 'Do MMMM YYYY',
    lll: 'Do MMMM YYYY H:mm',
    llll: 'dddd Do MMMM YYYY H:mm',
  },
  calendar,
  relativeTime: {
    future: 'za %s',
    past: 'před %s',
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
    // Czech doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeCs
