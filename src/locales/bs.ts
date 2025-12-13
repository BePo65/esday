/**
 * Bosnian [bs]
 */

import type { EsDay } from 'esday'
import type { Locale } from '~/plugins/locale'

const localeBs: Readonly<Locale> = {
  name: 'bs',
  weekdays: ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'],
  months: [
    'januar',
    'februar',
    'mart',
    'april',
    'maj',
    'juni',
    'juli',
    'august',
    'septembar',
    'oktobar',
    'novembar',
    'decembar',
  ],
  weekdaysShort: ['ned.', 'pon.', 'uto.', 'sri.', 'čet.', 'pet.', 'sub.'],
  monthsShort: [
    'jan.',
    'feb.',
    'mar.',
    'apr.',
    'maj.',
    'jun.',
    'jul.',
    'aug.',
    'sep.',
    'okt.',
    'nov.',
    'dec.',
  ],
  weekdaysMin: ['ne', 'po', 'ut', 'sr', 'če', 'pe', 'su'],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd, D. MMMM YYYY H:mm',
    l: 'DD.MM.YYYY',
    ll: 'D. MMMM YYYY',
    lll: 'D. MMMM YYYY H:mm',
    llll: 'dddd, D. MMMM YYYY H:mm',
  },
  calendar: {
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
        case 3:
          return '[prošlu] dddd [u] LT'
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
  },
  relativeTime: {
    future: 'za %s',
    past: 'prije %s',
    s: 'par sekundi',
    ss: '%d sekundi',
    m: 'minuta',
    mm: '%d minuta',
    h: 'sat',
    hh: '%d sati',
    d: 'dan',
    dd: '%d dana',
    w: 'sedmica',
    ww: '%d sedmice',
    M: 'mjesec',
    MM: '%d mjeseci',
    y: 'godina',
    yy: '%d godina',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Bosnian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeBs
