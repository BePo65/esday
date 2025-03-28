/**
 * Kirundi [rn]
 */

import type { Locale } from '~/plugins/locale'

const localeRn: Readonly<Locale> = {
  name: 'rn',
  weekdays: [
    'Ku wa Mungu',
    'Ku wa Mbere',
    'Ku wa Kabiri',
    'Ku wa Gatatu',
    'Ku wa Kane',
    'Ku wa Gatanu',
    'Ku wa Gatandatu',
  ],
  weekdaysShort: ['Kngu', 'Kmbr', 'Kbri', 'Ktat', 'Kkan', 'Ktan', 'Kdat'],
  weekdaysMin: ['K7', 'K1', 'K2', 'K3', 'K4', 'K5', 'K6'],
  months: [
    'Nzero',
    'Ruhuhuma',
    'Ntwarante',
    'Ndamukiza',
    'Rusama',
    'Ruhenshi',
    'Mukakaro',
    'Myandagaro',
    'Nyakanga',
    'Gitugutu',
    'Munyonyo',
    'Kigarama',
  ],
  monthsShort: [
    'Nzer',
    'Ruhuh',
    'Ntwar',
    'Ndam',
    'Rus',
    'Ruhen',
    'Muk',
    'Myand',
    'Nyak',
    'Git',
    'Muny',
    'Kig',
  ],
  weekStart: 1,
  yearStart: 4,
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
  relativeTime: {
    future: 'mu %s',
    past: '%s',
    s: 'amasegonda',
    m: 'Umunota',
    mm: '%d iminota',
    h: 'isaha',
    hh: '%d amasaha',
    d: 'Umunsi',
    dd: '%d iminsi',
    M: 'ukwezi',
    MM: '%d amezi',
    y: 'umwaka',
    yy: '%d imyaka',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
  ordinal: (n) => `${n}.`,
}

export default localeRn
