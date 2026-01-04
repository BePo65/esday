/**
 * Welsh [cy]
 */

import type { Locale } from '~/plugins/locale'

const localeCy: Readonly<Locale> = {
  name: 'cy',
  weekdays: [
    'Dydd Sul',
    'Dydd Llun',
    'Dydd Mawrth',
    'Dydd Mercher',
    'Dydd Iau',
    'Dydd Gwener',
    'Dydd Sadwrn',
  ],
  weekdaysShort: ['Sul', 'Llun', 'Maw', 'Mer', 'Iau', 'Gwe', 'Sad'],
  weekdaysMin: ['Su', 'Ll', 'Ma', 'Me', 'Ia', 'Gw', 'Sa'],
  months: [
    'Ionawr',
    'Chwefror',
    'Mawrth',
    'Ebrill',
    'Mai',
    'Mehefin',
    'Gorffennaf',
    'Awst',
    'Medi',
    'Hydref',
    'Tachwedd',
    'Rhagfyr',
  ],
  monthsShort: [
    'Ion',
    'Chwe',
    'Maw',
    'Ebr',
    'Mai',
    'Meh',
    'Gor',
    'Aws',
    'Med',
    'Hyd',
    'Tach',
    'Rhag',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
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
    sameDay: '[Heddiw am] LT',
    nextDay: '[Yfory am] LT',
    nextWeek: 'dddd [am] LT',
    lastDay: '[Ddoe am] LT',
    lastWeek: 'dddd [diwethaf am] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'mewn %s',
    past: '%s yn ôl',
    s: 'ychydig eiliadau',
    ss: '%d eiliad',
    m: 'munud',
    mm: '%d munud',
    h: 'awr',
    hh: '%d awr',
    d: 'diwrnod',
    dd: '%d diwrnod',
    w: 'wythnos',
    ww: '%d wythnos',
    M: 'mis',
    MM: '%d mis',
    y: 'blwyddyn',
    yy: '%d flynedd',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Welsh doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeCy
