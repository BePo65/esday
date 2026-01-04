/**
 * Punjabi (India) [pa-IN]
 */

import type { Locale, MonthNames } from '~/plugins/locale'

const months: MonthNames = [
  'ਜਨਵਰੀ',
  'ਫ਼ਰਵਰੀ',
  'ਮਾਰਚ',
  'ਅਪ੍ਰੈਲ',
  'ਮਈ',
  'ਜੂਨ',
  'ਜੁਲਾਈ',
  'ਅਗਸਤ',
  'ਸਤੰਬਰ',
  'ਅਕਤੂਬਰ',
  'ਨਵੰਬਰ',
  'ਦਸੰਬਰ',
]

// used in preParse function (number symbol => number)
const punjabiToEnglishNumbersMap = {
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
const englishToPunjabiNumbersMap = {
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

const localePaIn: Readonly<Locale> = {
  name: 'pa-IN',
  weekdays: ['ਐਤਵਾਰ', 'ਸੋਮਵਾਰ', 'ਮੰਗਲਵਾਰ', 'ਬੁਧਵਾਰ', 'ਵੀਰਵਾਰ', 'ਸ਼ੁੱਕਰਵਾਰ', 'ਸ਼ਨੀਚਰਵਾਰ'],
  weekdaysShort: ['ਐਤ', 'ਸੋਮ', 'ਮੰਗਲ', 'ਬੁਧ', 'ਵੀਰ', 'ਸ਼ੁਕਰ', 'ਸ਼ਨੀ'],
  weekdaysMin: ['ਐਤ', 'ਸੋਮ', 'ਮੰਗਲ', 'ਬੁਧ', 'ਵੀਰ', 'ਸ਼ੁਕਰ', 'ਸ਼ਨੀ'],
  months,
  monthsShort: months,
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: (n) => `${n}`,
  weekStart: 0, // Sunday is the first day of the week.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
  formats: {
    LT: 'A h:mm ਵਜੇ',
    LTS: 'A h:mm:ss ਵਜੇ',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm ਵਜੇ',
    LLLL: 'dddd, D MMMM YYYY, A h:mm ਵਜੇ',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY, A h:mm ਵਜੇ',
    llll: 'dddd, D MMMM YYYY, A h:mm ਵਜੇ',
  },
  calendar: {
    sameDay: '[ਅਜ] LT',
    nextDay: '[ਕਲ] LT',
    nextWeek: '[ਅਗਲਾ] dddd, LT',
    lastDay: '[ਕਲ] LT',
    lastWeek: '[ਪਿਛਲੇ] dddd, LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'بعد %s',
    past: 'منذ %s',
    s: 'ثانية واحدة',
    ss: '%d ثانية',
    m: 'دقيقة واحدة',
    mm: '%d دقائق',
    h: 'ساعة واحدة',
    hh: '%d ساعات',
    d: 'يوم واحد',
    dd: '%d أيام',
    w: 'أسبوع واحد',
    ww: '%d أسابيع',
    M: 'شهر واحد',
    MM: '%d أشهر',
    y: 'عام واحد',
    yy: '%d أعوام',
  },
  // eslint-disable-next-line  unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => {
    if (hour < 4) {
      return 'ਰਾਤ'
    }
    if (hour < 10) {
      return 'ਸਵੇਰ'
    }
    if (hour < 17) {
      return 'ਦੁਪਹਿਰ'
    }
    if (hour < 20) {
      return 'ਸ਼ਾਮ'
    }
    return 'ਰਾਤ'
  },
  preParse: (dateString: string) =>
    dateString.replace(
      /[١٢٣٤٥٦٧٨٩٠]/g,
      (match) => punjabiToEnglishNumbersMap[match as keyof typeof punjabiToEnglishNumbersMap],
    ),
  postFormat: (formattedDate: string) =>
    formattedDate.replace(
      /\d/g,
      (match) =>
        englishToPunjabiNumbersMap[Number(match) as keyof typeof englishToPunjabiNumbersMap],
    ),
}

export default localePaIn
