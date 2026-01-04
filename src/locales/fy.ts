/**
 * Frisian [fy]
 */

import type { Locale } from '~/plugins/locale'

const localeFy: Readonly<Locale> = {
  name: 'fy',
  weekdays: ['snein', 'moandei', 'tiisdei', 'woansdei', 'tongersdei', 'freed', 'sneon'],
  weekdaysShort: ['si.', 'mo.', 'ti.', 'wo.', 'to.', 'fr.', 'so.'],
  weekdaysMin: ['Si', 'Mo', 'Ti', 'Wo', 'To', 'Fr', 'So'],
  months: [
    'jannewaris',
    'febrewaris',
    'maart',
    'april',
    'maaie',
    'juny',
    'july',
    'augustus',
    'septimber',
    'oktober',
    'novimber',
    'desimber',
  ],
  monthsShort: [
    'jan.',
    'feb.',
    'mrt.',
    'apr.',
    'mai',
    'jun.',
    'jul.',
    'aug.',
    'sep.',
    'okt.',
    'nov.',
    'des.',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD-MM-YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
    l: 'DD-MM-YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[hjoed om] LT',
    nextDay: '[moarn om] LT',
    nextWeek: 'dddd [om] LT',
    lastDay: '[juster om] LT',
    lastWeek: '[ôfrûne] dddd [om] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'oer %s',
    past: '%s lyn',
    s: 'in pear sekonden',
    ss: '%d sekonden',
    m: 'ien minút',
    mm: '%d minuten',
    h: 'ien oere',
    hh: '%d oeren',
    d: 'ien dei',
    dd: '%d dagen',
    w: 'ien wike',
    ww: '%d wiken',
    M: 'ien moanne',
    MM: '%d moannen',
    y: 'ien jier',
    yy: '%d jierren',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Frisian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeFy
