/**
 * Slovak [sk]
 */

import type { EsDay } from 'esday'
import type { Locale, RelativeTimeElementFunction } from '~/plugins/locale'

const calendar = {
  sameDay: '[dnes o] LT',
  nextDay: '[zajtra o] LT',
  nextWeek(this: EsDay) {
    switch (this.day()) {
      case 0:
        return '[v nedeľu o] LT'
      case 1:
      case 2:
        return '[v] dddd [o] LT'
      case 3:
        return '[v stredu o] LT'
      case 4:
        return '[vo štvrtok o] LT'
      case 5:
        return '[v piatok o] LT'
      case 6:
        return '[v sobotu o] LT'
      default:
        return ''
    }
  },
  lastDay: '[včera o] LT',
  lastWeek(this: EsDay) {
    switch (this.day()) {
      case 0:
        return '[minulú nedeľu o] LT'
      case 1:
      case 2:
        return '[minulý] dddd [o] LT'
      case 3:
        return '[minulú stredu o] LT'
      case 4:
      case 5:
        return '[minulý] dddd [o] LT'
      case 6:
        return '[minulú sobotu o] LT'
      default:
        return ''
    }
  },
  sameElse: 'L',
}

function usePlural(timeValue: number) {
  return timeValue > 1 && timeValue < 5 && ~~(timeValue / 10) !== 1
}

const relativeTimeWithPlural: RelativeTimeElementFunction = (
  timeValue: string | number,
  withoutSuffix: boolean,
  range: string,
  isFuture: boolean,
) => {
  const result = `${timeValue} `
  switch (range) {
    case 's': // a few seconds / in a few seconds / a few seconds ago
      return withoutSuffix || isFuture ? 'pár sekúnd' : 'pár sekundami'
    case 'ss': // 9 seconds / in 9 seconds / 9 seconds ago
      if (withoutSuffix || isFuture) {
        return `${result}${usePlural(+timeValue) ? 'sekundy' : 'sekúnd'}`
      }
      return `${result}sekundami`
    case 'm': // a minute / in a minute / a minute ago
      return withoutSuffix ? 'minúta' : isFuture ? 'minútu' : 'minútou'
    case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
      if (withoutSuffix || isFuture) {
        return `${result}${usePlural(+timeValue) ? 'minúty' : 'minút'}`
      }
      return `${result}minútami`
    case 'h': // an hour / in an hour / an hour ago
      return withoutSuffix ? 'hodina' : isFuture ? 'hodinu' : 'hodinou'
    case 'hh': // 9 hours / in 9 hours / 9 hours ago
      if (withoutSuffix || isFuture) {
        return result + (usePlural(+timeValue) ? 'hodiny' : 'hodín')
      }
      return `${result}hodinami`
    case 'd': // a day / in a day / a day ago
      return withoutSuffix || isFuture ? 'deň' : 'dňom'
    case 'dd': // 9 days / in 9 days / 9 days ago
      if (withoutSuffix || isFuture) {
        return result + (usePlural(+timeValue) ? 'dni' : 'dní')
      }
      return `${result}dňami`
    case 'w': // a day / in a day / a day ago
      return withoutSuffix || isFuture ? 'týždeň' : 'týždňom'
    case 'ww': // 9 days / in 9 days / 9 days ago
      if (withoutSuffix || isFuture) {
        return result + (usePlural(+timeValue) ? 'týždňov' : 'týždňov')
      }
      return `${result}týždňami`
    case 'M': // a month / in a month / a month ago
      return withoutSuffix || isFuture ? 'mesiac' : 'mesiacom'
    case 'MM': // 9 months / in 9 months / 9 months ago
      if (withoutSuffix || isFuture) {
        return result + (usePlural(+timeValue) ? 'mesiace' : 'mesiacov')
      }
      return `${result}mesiacmi`
    case 'y': // a year / in a year / a year ago
      return withoutSuffix || isFuture ? 'rok' : 'rokom'
    case 'yy': // 9 years / in 9 years / 9 years ago
      if (withoutSuffix || isFuture) {
        return result + (usePlural(+timeValue) ? 'roky' : 'rokov')
      }
      return `${result}rokmi`
    default:
      return ''
  }
}

const localeSk: Readonly<Locale> = {
  name: 'sk',
  weekdays: ['nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota'],
  weekdaysShort: ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so'],
  weekdaysMin: ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so'],
  months: [
    'január',
    'február',
    'marec',
    'apríl',
    'máj',
    'jún',
    'júl',
    'august',
    'september',
    'október',
    'november',
    'december',
  ],
  monthsShort: ['jan', 'feb', 'mar', 'apr', 'máj', 'jún', 'júl', 'aug', 'sep', 'okt', 'nov', 'dec'],
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: (n) => `${n}.`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd D. MMMM YYYY H:mm',
    l: 'D. M. YYYY',
    ll: 'D. MMMM YYYY',
    lll: 'D. MMMM YYYY H:mm',
    llll: 'dddd D. MMMM YYYY H:mm',
  },
  calendar,
  relativeTime: {
    future: 'za %s', // Should be `o %s` (change when moment/moment#5408 is fixed)
    past: 'pred %s',
    s: relativeTimeWithPlural,
    ss: relativeTimeWithPlural,
    m: relativeTimeWithPlural,
    mm: relativeTimeWithPlural,
    h: relativeTimeWithPlural,
    hh: relativeTimeWithPlural,
    d: relativeTimeWithPlural,
    dd: relativeTimeWithPlural,
    w: relativeTimeWithPlural,
    ww: relativeTimeWithPlural,
    M: relativeTimeWithPlural,
    MM: relativeTimeWithPlural,
    y: relativeTimeWithPlural,
    yy: relativeTimeWithPlural,
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Slovak doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeSk
