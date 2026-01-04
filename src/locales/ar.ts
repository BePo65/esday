/**
 * Arabic [ar]
 */

import type { Locale } from '~/plugins/locale'

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

// select which plural form to use
const pluralForm = (value: number): number =>
  value === 0
    ? 0
    : value === 1
      ? 1
      : value === 2
        ? 2
        : value % 100 >= 3 && value % 100 <= 10
          ? 3
          : value % 100 >= 11
            ? 4
            : 5

// list of 7 forms of plurals for different units
const plurals = {
  s: ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
  m: ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
  h: ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
  d: ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
  w: [
    'أقل من اسبوع',
    'أسبوع واحد',
    ['أسبوعان', 'في أسبوعين'],
    '%d أسابيع',
    '%d أسبوعًا',
    '%d أسبوع',
  ],
  M: ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
  y: ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام'],
}

const pluralize =
  (unit: keyof typeof plurals) =>
  (
    timeValue: string | number,
    withoutSuffix: boolean,
    _token: string,
    _isFuture: boolean,
  ): string => {
    const timeValueAsNumber = Number(timeValue)
    const pluralFormToUse = pluralForm(timeValueAsNumber)
    let plural = plurals[unit][pluralForm(timeValueAsNumber)]
    if (pluralFormToUse === 2) {
      plural = plural[withoutSuffix ? 0 : 1]
    } else {
      plural = plural as string
    }
    return plural.replace(/%d/i, `${timeValue}`)
  }

const locale: Readonly<Locale> = {
  name: 'ar',
  weekdays: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  weekdaysShort: ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  weekdaysMin: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
  months: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
  monthsShort: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: (n) => `${n}`,
  weekStart: 6, // Saturday is the first day of the week.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'D/\u200FM/\u200FYYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
    l: 'D/\u200FM/\u200FYYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[اليوم عند الساعة] LT',
    nextDay: '[غدًا عند الساعة] LT',
    nextWeek: 'dddd [عند الساعة] LT',
    lastDay: '[أمس عند الساعة] LT',
    lastWeek: 'dddd [عند الساعة] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'بعد %s',
    past: 'منذ %s',
    s: pluralize('s'),
    ss: pluralize('s'),
    m: pluralize('m'),
    mm: pluralize('m'),
    h: pluralize('h'),
    hh: pluralize('h'),
    d: pluralize('d'),
    dd: pluralize('d'),
    w: pluralize('w'),
    ww: pluralize('w'),
    M: pluralize('M'),
    MM: pluralize('M'),
    y: pluralize('y'),
    yy: pluralize('y'),
  },
  // eslint-disable-next-line  unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => (hour > 12 ? 'م' : 'ص'),
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

export default locale
