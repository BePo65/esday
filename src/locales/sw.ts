/**
 * Swahili [sw]
 */

import type { Locale } from '~/plugins/locale'

const localeSw: Readonly<Locale> = {
  name: 'sw',
  weekdays: ['Jumapili', 'Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi'],
  weekdaysShort: ['Jpl', 'Jtat', 'Jnne', 'Jtan', 'Alh', 'Ijm', 'Jmos'],
  weekdaysMin: ['J2', 'J3', 'J4', 'J5', 'Al', 'Ij', 'J1'],
  months: [
    'Januari',
    'Februari',
    'Machi',
    'Aprili',
    'Mei',
    'Juni',
    'Julai',
    'Agosti',
    'Septemba',
    'Oktoba',
    'Novemba',
    'Desemba',
  ],
  monthsShort: ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ago', 'Sep', 'Okt', 'Nov', 'Des'],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm',
    l: 'DD.MM.YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'dddd, D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[leo saa] LT',
    nextDay: '[kesho saa] LT',
    nextWeek: '[wiki ijayo] dddd [saat] LT',
    lastDay: '[jana] LT',
    lastWeek: '[wiki iliyopita] dddd [saat] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s baadaye',
    past: 'tokea %s',
    s: 'hivi punde',
    ss: 'sekunde %d',
    m: 'dakika moja',
    mm: 'dakika %d',
    h: 'saa limoja',
    hh: 'masaa %d',
    d: 'siku moja',
    dd: 'masiku %d',
    w: 'wiki moja',
    ww: 'wiki %d',
    M: 'mwezi mmoja',
    MM: 'miezi %d',
    y: 'mwaka mmoja',
    yy: 'miaka %d',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Swahili doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeSw
