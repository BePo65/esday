/**
 * Urdu [ur]
 */

import type { Locale } from '~/plugins/locale'

const localeUr: Readonly<Locale> = {
  name: 'ur',
  weekdays: ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
  weekdaysShort: ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
  weekdaysMin: ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
  months: [
    'جنوری',
    'فروری',
    'مارچ',
    'اپریل',
    'مئی',
    'جون',
    'جولائی',
    'اگست',
    'ستمبر',
    'اکتوبر',
    'نومبر',
    'دسمبر',
  ],
  monthsShort: [
    'جنوری',
    'فروری',
    'مارچ',
    'اپریل',
    'مئی',
    'جون',
    'جولائی',
    'اگست',
    'ستمبر',
    'اکتوبر',
    'نومبر',
    'دسمبر',
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
    sameDay: '[آج بوقت] LT',
    nextDay: '[کل بوقت] LT',
    nextWeek: 'dddd [بوقت] LT',
    lastDay: '[گذشتہ روز بوقت] LT',
    lastWeek: '[گذشتہ] dddd [بوقت] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s بعد',
    past: '%s قبل',
    s: 'چند سیکنڈ',
    ss: '%d سیکنڈ',
    m: 'ایک منٹ',
    mm: '%d منٹ',
    h: 'ایک گھنٹہ',
    hh: '%d گھنٹے',
    d: 'ایک دن',
    dd: '%d دن',
    w: 'ایک ہفتہ',
    ww: '%d ہفتے',
    M: 'ایک ماہ',
    MM: '%d ماہ',
    y: 'ایک سال',
    yy: '%d سال',
  },
  // eslint-disable-next-line unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => {
    if (hour < 12) {
      return 'صبح'
    }
    return 'شام'
  },
  preParse: (dateString: string) => dateString.replace(/،/g, ','),
  postFormat: (formattedDate: string) => formattedDate.replace(/,/g, '،'),
}

export default localeUr
