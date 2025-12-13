/**
 * Kurdish [ku]
 */

import type { Locale, MonthNames } from '~/plugins/locale'

// used in preParse function (number symbol => number)
const arabicToEnglishNumbersMap = {
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
  '٠': '0',
}

// used in postFormat function (number => number symbol)
const englishToArabicNumbersMap = {
  1: '١',
  2: '٢',
  3: '٣',
  4: '٤',
  5: '٥',
  6: '٦',
  7: '٧',
  8: '٨',
  9: '٩',
  0: '٠',
}

const months: MonthNames = [
  'کانوونی دووەم',
  'شوبات',
  'ئادار',
  'نیسان',
  'ئایار',
  'حوزەیران',
  'تەممووز',
  'ئاب',
  'ئەیلوول',
  'تشرینی یەکەم',
  'تشرینی دووەم',
  'کانوونی یەکەم',
]

const localeKu: Readonly<Locale> = {
  name: 'ku',
  weekdays: ['یەکشەممە', 'دووشەممە', 'سێشەممە', 'چوارشەممە', 'پێنجشەممە', 'هەینی', 'شەممە'],
  weekdaysShort: ['یەکشەم', 'دووشەم', 'سێشەم', 'چوارشەم', 'پێنجشەم', 'هەینی', 'شەممە'],
  weekdaysMin: ['ی', 'د', 'س', 'چ', 'پ', 'هـ', 'ش'],
  months,
  monthsShort: months,
  ordinal: (n) => `${n}`,
  weekStart: 6, // Saturday is the first day of the week.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
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
    sameDay: '[ئه‌مرۆ كاتژمێر] LT',
    nextDay: '[به‌یانی كاتژمێر] LT',
    nextWeek: 'dddd [كاتژمێر] LT',
    lastDay: '[دوێنێ كاتژمێر] LT',
    lastWeek: 'dddd [كاتژمێر] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'لە %s',
    past: 'لەمەوپێش %s',
    s: 'چەند چرکەیەک',
    ss: 'چركه‌ %d',
    m: 'یەک خولەک',
    mm: '%d خولەک',
    h: 'یەک کاتژمێر',
    hh: '%d کاتژمێر',
    d: 'یەک ڕۆژ',
    dd: '%d ڕۆژ',
    w: 'یەک هەفتە',
    ww: '%d هەفتەیەک',
    M: 'یەک مانگ',
    MM: '%d مانگ',
    y: 'یەک ساڵ',
    yy: '%d ساڵ',
  },
  // eslint-disable-next-line  unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => {
    return hour < 12 ? 'پ.ن' : 'د.ن'
  },
  preParse: (dateString: string) =>
    dateString
      .replace(
        /[١٢٣٤٥٦٧٨٩٠]/g,
        (match) => arabicToEnglishNumbersMap[match as keyof typeof arabicToEnglishNumbersMap],
      )
      .replace(/،/g, ','),
  postFormat: (formattedDate: string) =>
    formattedDate
      .replace(
        /\d/g,
        (match) =>
          englishToArabicNumbersMap[Number(match) as keyof typeof englishToArabicNumbersMap],
      )
      .replace(/,/g, '،'),
}

export default localeKu
