/**
 * Maldivian [dv]
 */

import type { Locale } from '~/plugins/locale'

const localeDv: Readonly<Locale> = {
  name: 'dv',
  weekdays: ['އާދިއްތަ', 'ހޯމަ', 'އަންގާރަ', 'ބުދަ', 'ބުރާސްފަތި', 'ހުކުރު', 'ހޮނިހިރު'],
  weekdaysShort: ['އާދިއްތަ', 'ހޯމަ', 'އަންގާރަ', 'ބުދަ', 'ބުރާސްފަތި', 'ހުކުރު', 'ހޮނިހިރު'],
  weekdaysMin: ['އާދި', 'ހޯމަ', 'އަން', 'ބުދަ', 'ބުރާ', 'ހުކު', 'ހޮނި'],
  months: [
    'ޖެނުއަރީ',
    'ފެބްރުއަރީ',
    'މާރިޗު',
    'އޭޕްރީލު',
    'މޭ',
    'ޖޫން',
    'ޖުލައި',
    'އޯގަސްޓު',
    'ސެޕްޓެމްބަރު',
    'އޮކްޓޯބަރު',
    'ނޮވެމްބަރު',
    'ޑިސެމްބަރު',
  ],
  monthsShort: [
    'ޖެނުއަރީ',
    'ފެބްރުއަރީ',
    'މާރިޗު',
    'އޭޕްރީލު',
    'މޭ',
    'ޖޫން',
    'ޖުލައި',
    'އޯގަސްޓު',
    'ސެޕްޓެމްބަރު',
    'އޮކްޓޯބަރު',
    'ނޮވެމްބަރު',
    'ޑިސެމްބަރު',
  ],
  ordinal: (n) => `${n}`,
  weekStart: 0, // Sunday is the first day of the week.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'D/M/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
    l: 'D/M/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[މިއަދު] LT',
    nextDay: '[މާދަމާ] LT',
    nextWeek: 'dddd LT',
    lastDay: '[އިއްޔެ] LT',
    lastWeek: '[ފާއިތުވި] dddd LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'ތެރޭގައި %s',
    past: 'ކުރިން %s',
    s: 'ސިކުންތުކޮޅެއް',
    ss: 'd% ސިކުންތު',
    m: 'މިނިޓެއް',
    mm: 'މިނިޓު %d',
    h: 'ގަޑިއިރެއް',
    hh: 'ގަޑިއިރު %d',
    d: 'ދުވަހެއް',
    dd: 'ދުވަސް %d',
    w: 'ހަފްތާ',
    ww: 'ހަފްތާ %d',
    M: 'މަހެއް',
    MM: 'މަސް %d',
    y: 'އަހަރެއް',
    yy: 'އަހަރު %d',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Maldivian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeDv
