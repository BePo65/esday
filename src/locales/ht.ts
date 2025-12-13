/**
 * Haitian Creole (Haiti) [ht]
 */

import type { Locale } from '~/plugins/locale'

const localeHt: Readonly<Locale> = {
  name: 'ht',
  weekdays: ['dimanch', 'lendi', 'madi', 'mèkredi', 'jedi', 'vandredi', 'samdi'],
  weekdaysShort: ['dim.', 'len.', 'mad.', 'mèk.', 'jed.', 'van.', 'sam.'],
  weekdaysMin: ['di', 'le', 'ma', 'mè', 'je', 'va', 'sa'],
  months: [
    'janvye',
    'fevriye',
    'mas',
    'avril',
    'me',
    'jen',
    'jiyè',
    'out',
    'septanm',
    'oktòb',
    'novanm',
    'desanm',
  ],
  monthsShort: [
    'jan.',
    'fev.',
    'mas',
    'avr.',
    'me',
    'jen',
    'jiyè.',
    'out',
    'sept.',
    'okt.',
    'nov.',
    'des.',
  ],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[Jodi a nan] LT',
    nextDay: '[Demen nan] LT',
    nextWeek: 'dddd [nan] LT',
    lastDay: '[Yè nan] LT',
    lastWeek: '[Dènye] ddd [nan] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'nan %s',
    past: 'sa gen %s',
    s: 'kèk segond',
    ss: '%d segond',
    m: 'yon minit',
    mm: '%d minit',
    h: 'inèdtan',
    hh: '%d zè',
    d: 'yon jou',
    dd: '%d jou',
    w: 'yon semèn',
    ww: '%d semèn',
    M: 'yon mwa',
    MM: '%d mwa',
    y: 'yon ane',
    yy: '%d ane',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Haitian Creole doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeHt
