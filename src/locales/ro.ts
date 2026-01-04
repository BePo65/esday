/**
 * Romanian [ro]
 */

import type { Locale } from '~/plugins/locale'

const localeRo: Readonly<Locale> = {
  name: 'ro',
  weekdays: ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'],
  weekdaysShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
  weekdaysMin: ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ'],
  months: [
    'Ianuarie',
    'Februarie',
    'Martie',
    'Aprilie',
    'Mai',
    'Iunie',
    'Iulie',
    'August',
    'Septembrie',
    'Octombrie',
    'Noiembrie',
    'Decembrie',
  ],
  monthsShort: [
    'Ian.',
    'Febr.',
    'Mart.',
    'Apr.',
    'Mai',
    'Iun.',
    'Iul.',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY H:mm',
    LLLL: 'dddd, D MMMM YYYY H:mm',
    l: 'DD.MM.YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY H:mm',
    llll: 'dddd, D MMMM YYYY H:mm',
  },
  calendar: {
    sameDay: '[azi la] LT',
    nextDay: '[mâine la] LT',
    nextWeek: 'dddd [la] LT',
    lastDay: '[ieri la] LT',
    lastWeek: '[fosta] dddd [la] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'peste %s',
    past: 'acum %s',
    s: 'câteva secunde',
    ss: '%d secunde',
    m: 'un minut',
    mm: '%d minute',
    h: 'o oră',
    hh: '%d ore',
    d: 'o zi',
    dd: '%d zile',
    w: 'o săptămână',
    ww: '%d săptămâni',
    M: 'o lună',
    MM: '%d luni',
    y: 'un an',
    yy: '%d ani',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Romanian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeRo
