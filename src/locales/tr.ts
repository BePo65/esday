/**
 * Turkish [tr]
 */

import type { Locale } from '~/plugins/locale'

const suffixes = {
  1: "'inci",
  5: "'inci",
  8: "'inci",
  70: "'inci",
  80: "'inci",
  2: "'nci",
  7: "'nci",
  20: "'nci",
  50: "'nci",
  3: "'üncü",
  4: "'üncü",
  100: "'üncü",
  6: "'ncı",
  40: "'ncı",
  9: "'uncu",
  10: "'uncu",
  30: "'uncu",
  60: "'ıncı",
  90: "'ıncı",
}

const localeTr: Readonly<Locale> = {
  name: 'tr',
  weekdays: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
  weekdaysShort: ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts'],
  weekdaysMin: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
  months: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  monthsShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
  ordinal: (n: number) => {
    if (n === 0) {
      // special case for zero
      return `${n}'ıncı`
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
    sameDay: '[bugün saat] LT',
    nextDay: '[yarın saat] LT',
    nextWeek: '[gelecek] dddd [saat] LT',
    lastDay: '[dün] LT',
    lastWeek: '[geçen] dddd [saat] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s sonra',
    past: '%s önce',
    s: 'birkaç saniye',
    ss: '%d saniye',
    m: 'bir dakika',
    mm: '%d dakika',
    h: 'bir saat',
    hh: '%d saat',
    d: 'bir gün',
    dd: '%d gün',
    w: 'bir hafta',
    ww: '%d hafta',
    M: 'bir ay',
    MM: '%d ay',
    y: 'bir yıl',
    yy: '%d yıl',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    if (hour < 12) {
      return isLowercase ? 'öö' : 'ÖÖ'
    }
    return isLowercase ? 'ös' : 'ÖS'
  },
}

export default localeTr
