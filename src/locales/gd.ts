/**
 * Scottish Gaelic [gd]
 */

import type { Locale } from '~/plugins/locale'

const localeGd: Readonly<Locale> = {
  name: 'gd',
  weekdays: [
    'Didòmhnaich',
    'Diluain',
    'Dimàirt',
    'Diciadain',
    'Diardaoin',
    'Dihaoine',
    'Disathairne',
  ],
  weekdaysShort: ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'],
  weekdaysMin: ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'],
  months: [
    'Am Faoilleach',
    'An Gearran',
    'Am Màrt',
    'An Giblean',
    'An Cèitean',
    'An t-Ògmhios',
    'An t-Iuchar',
    'An Lùnastal',
    'An t-Sultain',
    'An Dàmhair',
    'An t-Samhain',
    'An Dùbhlachd',
  ],
  monthsShort: [
    'Faoi',
    'Gear',
    'Màrt',
    'Gibl',
    'Cèit',
    'Ògmh',
    'Iuch',
    'Lùn',
    'Sult',
    'Dàmh',
    'Samh',
    'Dùbh',
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
    LLLL: 'dddd, D MMMM YYYY HH:mm',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'dddd, D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[An-diugh aig] LT',
    nextDay: '[A-màireach aig] LT',
    nextWeek: 'dddd [aig] LT',
    lastDay: '[An-dè aig] LT',
    lastWeek: 'dddd [seo chaidh] [aig] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'ann an %s',
    past: 'bho chionn %s',
    s: 'beagan diogan',
    ss: '%d diogan',
    m: 'mionaid',
    mm: '%d mionaidean',
    h: 'uair',
    hh: '%d uairean',
    d: 'latha',
    dd: '%d latha',
    w: 'seachdain ',
    ww: '%d seachdainean',
    M: 'mìos',
    MM: '%d mìosan',
    y: 'bliadhna',
    yy: '%d bliadhna',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Scottish Gaelic doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeGd
