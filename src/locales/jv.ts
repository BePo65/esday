/**
 * Javanese [jv]
 */

import type { Locale } from '~/plugins/locale'

const localeJv: Locale = {
  name: 'jv',
  weekdays: ['Minggu', 'Senen', 'Seloso', 'Rebu', 'Kemis', 'Jemuwah', 'Septu'],
  weekdaysShort: ['Min', 'Sen', 'Sel', 'Reb', 'Kem', 'Jem', 'Sep'],
  weekdaysMin: ['Mg', 'Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sp'],
  months: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'Nopember',
    'Desember',
  ],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nop', 'Des'],
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY [pukul] HH.mm',
    LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY [pukul] HH.mm',
    llll: 'dddd, D MMMM YYYY [pukul] HH.mm',
  },
  calendar: {
    sameDay: '[Dinten puniko pukul] LT',
    nextDay: '[Mbenjang pukul] LT',
    nextWeek: 'dddd [pukul] LT',
    lastDay: '[Kala wingi pukul] LT',
    lastWeek: 'dddd [kepengker pukul] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'wonten ing %s',
    past: '%s ingkang kepengker',
    s: 'sawetawis detik',
    ss: '%d detik',
    m: 'setunggal menit',
    mm: '%d menit',
    h: 'setunggal jam',
    hh: '%d jam',
    d: 'sedinten',
    dd: '%d dinten',
    w: 'seminggu',
    ww: '%d minggu',
    M: 'sewulan',
    MM: '%d wulan',
    y: 'setaun',
    yy: '%d taun',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Javanese doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeJv
