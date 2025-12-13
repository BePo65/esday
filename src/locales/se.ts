/**
 * Northern Sami [se]
 */

import type { Locale } from '~/plugins/locale'

const localeSe: Readonly<Locale> = {
  name: 'se',
  weekdays: [
    'sotnabeaivi',
    'vuossárga',
    'maŋŋebárga',
    'gaskavahkku',
    'duorastat',
    'bearjadat',
    'lávvardat',
  ],
  weekdaysShort: ['sotn', 'vuos', 'maŋ', 'gask', 'duor', 'bear', 'láv'],
  weekdaysMin: ['s', 'v', 'm', 'g', 'd', 'b', 'L'],
  months: [
    'ođđajagemánnu',
    'guovvamánnu',
    'njukčamánnu',
    'cuoŋománnu',
    'miessemánnu',
    'geassemánnu',
    'suoidnemánnu',
    'borgemánnu',
    'čakčamánnu',
    'golggotmánnu',
    'skábmamánnu',
    'juovlamánnu',
  ],
  monthsShort: [
    'ođđj',
    'guov',
    'njuk',
    'cuo',
    'mies',
    'geas',
    'suoi',
    'borg',
    'čakč',
    'golg',
    'skáb',
    'juov',
  ],
  ordinal: (n) => `${n}.`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'MMMM D. [b.] YYYY',
    LLL: 'MMMM D. [b.] YYYY [ti.] HH:mm',
    LLLL: 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm',
    l: 'DD.MM.YYYY',
    ll: 'MMMM D. [b.] YYYY',
    lll: 'MMMM D. [b.] YYYY [ti.] HH:mm',
    llll: 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm',
  },
  calendar: {
    sameDay: '[otne ti] LT',
    nextDay: '[ihttin ti] LT',
    nextWeek: 'dddd [ti] LT',
    lastDay: '[ikte ti] LT',
    lastWeek: '[ovddit] dddd [ti] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s geažes',
    past: 'maŋit %s',
    s: 'moadde sekunddat',
    ss: '%d sekunddat',
    m: 'okta minuhta',
    mm: '%d minuhtat',
    h: 'okta diimmu',
    hh: '%d diimmut',
    d: 'okta beaivi',
    dd: '%d beaivvit',
    w: 'okta vahkku',
    ww: '%d vahkkut',
    M: 'okta mánnu',
    MM: '%d mánut',
    y: 'okta jahki',
    yy: '%d jagit',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Northern Sami doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeSe
