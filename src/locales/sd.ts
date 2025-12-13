/**
 * Sindhi [sd]
 */

import type { Locale } from '~/plugins/locale'

const localeSd: Readonly<Locale> = {
  name: 'sd',
  weekdays: ['آچر', 'سومر', 'اڱارو', 'اربع', 'خميس', 'جمع', 'ڇنڇر'],
  weekdaysShort: ['آچر', 'سومر', 'اڱارو', 'اربع', 'خميس', 'جمع', 'ڇنڇر'],
  weekdaysMin: ['آچر', 'سومر', 'اڱارو', 'اربع', 'خميس', 'جمع', 'ڇنڇر'],
  months: [
    'جنوري',
    'فيبروري',
    'مارچ',
    'اپريل',
    'مئي',
    'جون',
    'جولاءِ',
    'آگسٽ',
    'سيپٽمبر',
    'آڪٽوبر',
    'نومبر',
    'ڊسمبر',
  ],
  monthsShort: [
    'جنوري',
    'فيبروري',
    'مارچ',
    'اپريل',
    'مئي',
    'جون',
    'جولاءِ',
    'آگسٽ',
    'سيپٽمبر',
    'آڪٽوبر',
    'نومبر',
    'ڊسمبر',
  ],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd، D MMMM YYYY HH:mm',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'dddd، D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[اڄ] LT',
    nextDay: '[سڀاڻي] LT',
    nextWeek: 'dddd [اڳين هفتي تي] LT',
    lastDay: '[ڪالهه] LT',
    lastWeek: '[گزريل هفتي] dddd [تي] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s پوء',
    past: '%s اڳ',
    s: 'چند سيڪنڊ',
    ss: '%d سيڪنڊ',
    m: 'هڪ منٽ',
    mm: '%d منٽ',
    h: 'هڪ ڪلاڪ',
    hh: '%d ڪلاڪ',
    d: 'هڪ ڏينهن',
    dd: '%d ڏينهن',
    w: 'هڪ هفتو',
    ww: '%d هفتو',
    M: 'هڪ مهينو',
    MM: '%d مهينا',
    y: 'هڪ سال',
    yy: '%d سال',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Sindhi doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeSd
