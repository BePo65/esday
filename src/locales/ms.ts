/**
 * Malay [ms]
 */

import type { Locale } from '~/plugins/locale'

const localeMs: Readonly<Locale> = {
  name: 'ms',
  weekdays: ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
  weekdaysShort: ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'],
  weekdaysMin: ['Ah', 'Is', 'Sl', 'Rb', 'Km', 'Jm', 'Sb'],
  months: [
    'Januari',
    'Februari',
    'Mac',
    'April',
    'Mei',
    'Jun',
    'Julai',
    'Ogos',
    'September',
    'Oktober',
    'November',
    'Disember',
  ],
  monthsShort: ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogs', 'Sep', 'Okt', 'Nov', 'Dis'],
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: (n) => `${n}.`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH.mm',
    LLLL: 'dddd, D MMMM YYYY HH.mm',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH.mm',
    llll: 'dddd, D MMMM YYYY HH.mm',
  },
  calendar: {
    sameDay: '[Hari ini pukul] LT',
    nextDay: '[Esok pukul] LT',
    nextWeek: 'dddd [pukul] LT',
    lastDay: '[Kelmarin pukul] LT',
    lastWeek: 'dddd [lepas pukul] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'dalam %s',
    past: '%s yang lepas',
    s: 'beberapa saat',
    ss: '%d saat',
    m: 'seminit',
    mm: '%d minit',
    h: 'sejam',
    hh: '%d jam',
    d: 'sehari',
    dd: '%d hari',
    w: 'seminggu',
    ww: '%d minggu',
    M: 'sebulan',
    MM: '%d bulan',
    y: 'setahun',
    yy: '%d tahun',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Malay doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeMs
