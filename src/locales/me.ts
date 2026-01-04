/**
 * Montenegrin [me]
 */

import type { EsDay } from 'esday'
import type { Locale } from '~/plugins/locale'

const calendar = {
  sameDay: '[danas u] LT',
  nextDay: '[sjutra u] LT',
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
  lastDay: '[juče u] LT',
  lastWeek(this: EsDay) {
    const lastWeekDays = [
      '[prošle] [nedjelje] [u] LT',
      '[prošlog] [ponedjeljka] [u] LT',
      '[prošlog] [utorka] [u] LT',
      '[prošle] [srijede] [u] LT',
      '[prošlog] [četvrtka] [u] LT',
      '[prošlog] [petka] [u] LT',
      '[prošle] [subote] [u] LT',
    ]
    return lastWeekDays[this.day()]
  },
  sameElse: 'L',
}

const localeMe: Readonly<Locale> = {
  name: 'me',
  weekdays: ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'],
  weekdaysShort: ['ned.', 'pon.', 'uto.', 'sri.', 'čet.', 'pet.', 'sub.'],
  weekdaysMin: ['ne', 'po', 'ut', 'sr', 'če', 'pe', 'su'],
  months: [
    'januar',
    'februar',
    'mart',
    'april',
    'maj',
    'jun',
    'jul',
    'avgust',
    'septembar',
    'oktobar',
    'novembar',
    'decembar',
  ],
  monthsShort: [
    'jan.',
    'feb.',
    'mar.',
    'apr.',
    'maj',
    'jun',
    'jul',
    'avg.',
    'sep.',
    'okt.',
    'nov.',
    'dec.',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}\./,
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
  calendar,
  relativeTime: {
    future: 'za %s',
    past: 'prije %s',
    s: 'nekoliko sekundi',
    ss: '%d sekundi',
    m: 'minut',
    mm: '%d minuta',
    h: 'sat',
    hh: '%d sati',
    d: 'dan',
    dd: '%d dana',
    w: 'tjedan',
    ww: '%d sedmicu',
    M: 'mjesec',
    MM: '%d mjeseci',
    y: 'godina',
    yy: '%d godina',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Montenegrin doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeMe
