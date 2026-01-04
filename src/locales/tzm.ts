/**
 * Central Atlas Tamazight [tzm]
 */

import type { Locale } from '~/plugins/locale'

const localeTzm: Readonly<Locale> = {
  name: 'tzm',
  weekdays: ['ⴰⵙⴰⵎⴰⵙ', 'ⴰⵢⵏⴰⵙ', 'ⴰⵙⵉⵏⴰⵙ', 'ⴰⴽⵔⴰⵙ', 'ⴰⴽⵡⴰⵙ', 'ⴰⵙⵉⵎⵡⴰⵙ', 'ⴰⵙⵉⴹⵢⴰⵙ'],
  weekdaysShort: ['ⴰⵙⴰⵎⴰⵙ', 'ⴰⵢⵏⴰⵙ', 'ⴰⵙⵉⵏⴰⵙ', 'ⴰⴽⵔⴰⵙ', 'ⴰⴽⵡⴰⵙ', 'ⴰⵙⵉⵎⵡⴰⵙ', 'ⴰⵙⵉⴹⵢⴰⵙ'],
  weekdaysMin: ['ⴰⵙⴰⵎⴰⵙ', 'ⴰⵢⵏⴰⵙ', 'ⴰⵙⵉⵏⴰⵙ', 'ⴰⴽⵔⴰⵙ', 'ⴰⴽⵡⴰⵙ', 'ⴰⵙⵉⵎⵡⴰⵙ', 'ⴰⵙⵉⴹⵢⴰⵙ'],
  months: [
    'ⵉⵏⵏⴰⵢⵔ',
    'ⴱⵕⴰⵢⵕ',
    'ⵎⴰⵕⵚ',
    'ⵉⴱⵔⵉⵔ',
    'ⵎⴰⵢⵢⵓ',
    'ⵢⵓⵏⵢⵓ',
    'ⵢⵓⵍⵢⵓⵣ',
    'ⵖⵓⵛⵜ',
    'ⵛⵓⵜⴰⵏⴱⵉⵔ',
    'ⴽⵟⵓⴱⵕ',
    'ⵏⵓⵡⴰⵏⴱⵉⵔ',
    'ⴷⵓⵊⵏⴱⵉⵔ',
  ],
  monthsShort: [
    'ⵉⵏⵏⴰⵢⵔ',
    'ⴱⵕⴰⵢⵕ',
    'ⵎⴰⵕⵚ',
    'ⵉⴱⵔⵉⵔ',
    'ⵎⴰⵢⵢⵓ',
    'ⵢⵓⵏⵢⵓ',
    'ⵢⵓⵍⵢⵓⵣ',
    'ⵖⵓⵛⵜ',
    'ⵛⵓⵜⴰⵏⴱⵉⵔ',
    'ⴽⵟⵓⴱⵕ',
    'ⵏⵓⵡⴰⵏⴱⵉⵔ',
    'ⴷⵓⵊⵏⴱⵉⵔ',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: (n) => `${n}`,
  weekStart: 6, // Saturday is the first day of the week.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
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
    sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
    nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
    nextWeek: 'dddd [ⴴ] LT',
    lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
    lastWeek: 'dddd [ⴴ] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
    past: 'ⵢⴰⵏ %s',
    s: 'ⵉⵎⵉⴽ',
    ss: '%d ⵉⵎⵉⴽ',
    m: 'ⵎⵉⵏⵓⴺ',
    mm: '%d ⵎⵉⵏⵓⴺ',
    h: 'ⵙⴰⵄⴰ',
    hh: '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
    d: 'ⴰⵙⵙ',
    dd: '%d oⵙⵙⴰⵏ',
    w: 'ⴷⴷⵓⵔⵜ',
    ww: '%d ⵙⵎⴰⵏⴰⵜ',
    M: 'ⴰⵢoⵓⵔ',
    MM: '%d ⵉⵢⵢⵉⵔⵏ',
    y: 'ⴰⵙⴳⴰⵙ',
    yy: '%d ⵉⵙⴳⴰⵙⵏ',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Central Atlas Tamazight doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeTzm
