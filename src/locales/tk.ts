/**
 * Turkmen [tk]
 */

import type { Locale } from '~/plugins/locale'

const suffixes = {
  1: "'inji",
  5: "'inji",
  8: "'inji",
  70: "'inji",
  80: "'inji",
  2: "'nji",
  7: "'nji",
  20: "'nji",
  50: "'nji",
  3: "'ünji",
  4: "'ünji",
  100: "'ünji",
  6: "'njy",
  40: "'njy",
  9: "'unjy",
  10: "'unjy",
  30: "'unjy",
  60: "'ynjy",
  90: "'ynjy",
}

const localeTk: Readonly<Locale> = {
  name: 'tk',
  weekdays: ['Ýekşenbe', 'Duşenbe', 'Sişenbe', 'Çarşenbe', 'Penşenbe', 'Anna', 'Şenbe'],
  weekdaysShort: ['Ýek', 'Duş', 'Siş', 'Çar', 'Pen', 'Ann', 'Şen'],
  weekdaysMin: ['Ýk', 'Dş', 'Sş', 'Çr', 'Pn', 'An', 'Şn'],
  months: [
    'Ýanwar',
    'Fewral',
    'Mart',
    'Aprel',
    'Maý',
    'Iýun',
    'Iýul',
    'Awgust',
    'Sentýabr',
    'Oktýabr',
    'Noýabr',
    'Dekabr',
  ],
  monthsShort: ['Ýan', 'Few', 'Mar', 'Apr', 'Maý', 'Iýn', 'Iýl', 'Awg', 'Sen', 'Okt', 'Noý', 'Dek'],
  ordinal: (n) => {
    if (n === 0) {
      // special case for zero
      return `${n}'unjy`
    }
    const one = n % 10
    const ten = (n % 100) - one
    const cutoffNumber = n >= 100 ? 100 : null
    const suffix =
      suffixes[one as keyof typeof suffixes] ||
      suffixes[ten as keyof typeof suffixes] ||
      suffixes[cutoffNumber as keyof typeof suffixes]
    return `${n}${suffix}`
  },
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm',
    l: 'DD.MM.YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'dddd, D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[bugün sagat] LT',
    nextDay: '[ertir sagat] LT',
    nextWeek: '[indiki] dddd [sagat] LT',
    lastDay: '[düýn] LT',
    lastWeek: '[geçen] dddd [sagat] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s soň',
    past: '%s öň',
    s: 'birnäçe sekunt',
    ss: '%d sekunt',
    m: 'bir minut',
    mm: '%d minut',
    h: 'bir sagat',
    hh: '%d sagat',
    d: 'bir gün',
    dd: '%d gün',
    w: 'bir hepde',
    ww: '%d hepde',
    M: 'bir aý',
    MM: '%d aý',
    y: 'bir ýyl',
    yy: '%d ýyl',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Turkmen doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeTk
