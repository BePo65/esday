/**
 * Maltese (Malta) [mt]
 */

import type { Locale } from '~/plugins/locale'

const localeMt: Readonly<Locale> = {
  name: 'mt',
  weekdays: ['Il-Ħadd', 'It-Tnejn', 'It-Tlieta', 'L-Erbgħa', 'Il-Ħamis', 'Il-Ġimgħa', 'Is-Sibt'],
  weekdaysShort: ['Ħad', 'Tne', 'Tli', 'Erb', 'Ħam', 'Ġim', 'Sib'],
  weekdaysMin: ['Ħa', 'Tn', 'Tl', 'Er', 'Ħa', 'Ġi', 'Si'],
  months: [
    'Jannar',
    'Frar',
    'Marzu',
    'April',
    'Mejju',
    'Ġunju',
    'Lulju',
    'Awwissu',
    'Settembru',
    'Ottubru',
    'Novembru',
    'Diċembru',
  ],
  monthsShort: ['Jan', 'Fra', 'Mar', 'Apr', 'Mej', 'Ġun', 'Lul', 'Aww', 'Set', 'Ott', 'Nov', 'Diċ'],
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
    sameDay: '[Illum fil-]LT',
    nextDay: '[Għada fil-]LT',
    nextWeek: 'dddd [fil-]LT',
    lastDay: '[Il-bieraħ fil-]LT',
    lastWeek: 'dddd [li għadda] [fil-]LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'f’ %s',
    past: '%s ilu',
    s: 'ftit sekondi',
    ss: '%d sekondi',
    m: 'minuta',
    mm: '%d minuti',
    h: 'siegħa',
    hh: '%d siegħat',
    d: 'ġurnata',
    dd: '%d ġranet',
    w: 'ġimgħa',
    ww: '%d ġimgħat',
    M: 'xahar',
    MM: '%d xhur',
    y: 'sena',
    yy: '%d sni',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Maltese doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeMt
