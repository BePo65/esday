/**
 * Albanian [sq]
 */

import type { Locale } from '~/plugins/locale'

const localeSq: Readonly<Locale> = {
  name: 'sq',
  weekdays: ['E Diel', 'E Hënë', 'E Martë', 'E Mërkurë', 'E Enjte', 'E Premte', 'E Shtunë'],
  weekdaysShort: ['Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht'],
  weekdaysMin: ['D', 'H', 'Ma', 'Më', 'E', 'P', 'Sh'],
  months: [
    'Janar',
    'Shkurt',
    'Mars',
    'Prill',
    'Maj',
    'Qershor',
    'Korrik',
    'Gusht',
    'Shtator',
    'Tetor',
    'Nëntor',
    'Dhjetor',
  ],
  monthsShort: ['Jan', 'Shk', 'Mar', 'Pri', 'Maj', 'Qer', 'Kor', 'Gus', 'Sht', 'Tet', 'Nën', 'Dhj'],
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: (n) => `${n}.`,
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
    sameDay: '[Sot në] LT',
    nextDay: '[Nesër në] LT',
    nextWeek: 'dddd [në] LT',
    lastDay: '[Dje në] LT',
    lastWeek: 'dddd [e kaluar në] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'në %s',
    past: '%s më parë',
    s: 'disa sekonda',
    ss: '%d sekonda',
    m: 'një minutë',
    mm: '%d minuta',
    h: 'një orë',
    hh: '%d orë',
    d: 'një ditë',
    dd: '%d ditë',
    w: 'një javë',
    ww: '%d javë',
    M: 'një muaj',
    MM: '%d muaj',
    y: 'një vit',
    yy: '%d vite',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Albanian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeSq
