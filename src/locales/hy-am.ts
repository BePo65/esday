/**
 * Armenian [hy-AM]
 */

import type { Locale, MonthNames, MonthNamesStandaloneFormat } from '~/plugins/locale'

const monthFormat: MonthNames = [
  'հունվարի',
  'փետրվարի',
  'մարտի',
  'ապրիլի',
  'մայիսի',
  'հունիսի',
  'հուլիսի',
  'օգոստոսի',
  'սեպտեմբերի',
  'հոկտեմբերի',
  'նոյեմբերի',
  'դեկտեմբերի',
]
const monthStandalone: MonthNames = [
  'հունվար',
  'փետրվար',
  'մարտ',
  'ապրիլ',
  'մայիս',
  'հունիս',
  'հուլիս',
  'օգոստոս',
  'սեպտեմբեր',
  'հոկտեմբեր',
  'նոյեմբեր',
  'դեկտեմբեր',
]
const months: MonthNamesStandaloneFormat = {
  standalone: monthStandalone,
  format: monthFormat,
}

const localeHyAm: Readonly<Locale> = {
  name: 'hy-AM',
  weekdays: ['կիրակի', 'երկուշաբթի', 'երեքշաբթի', 'չորեքշաբթի', 'հինգշաբթի', 'ուրբաթ', 'շաբաթ'],
  weekdaysShort: ['կրկ', 'երկ', 'երք', 'չրք', 'հնգ', 'ուրբ', 'շբթ'],
  weekdaysMin: ['կրկ', 'երկ', 'երք', 'չրք', 'հնգ', 'ուրբ', 'շբթ'],
  months,
  monthsShort: ['հնվ', 'փտր', 'մրտ', 'ապր', 'մյս', 'հնս', 'հլս', 'օգս', 'սպտ', 'հկտ', 'նմբ', 'դկտ'],
  dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY թ.',
    LLL: 'D MMMM YYYY թ., HH:mm',
    LLLL: 'dddd, D MMMM YYYY թ., HH:mm',
    l: 'DD.MM.YYYY',
    ll: 'D MMMM YYYY թ.',
    lll: 'D MMMM YYYY թ., HH:mm',
    llll: 'dddd, D MMMM YYYY թ., HH:mm',
  },
  calendar: {
    sameDay: '[այսօր] LT',
    nextDay: '[վաղը] LT',
    lastDay: '[երեկ] LT',
    nextWeek: 'dddd [օրը ժամը] LT',
    lastWeek: '[անցած] dddd [օրը ժամը] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s հետո',
    past: '%s առաջ',
    s: 'մի քանի վայրկյան',
    ss: '%d վայրկյան',
    m: 'րոպե',
    mm: '%d րոպե',
    h: 'ժամ',
    hh: '%d ժամ',
    d: 'օր',
    dd: '%d օր',
    w: 'շաբաթից',
    ww: '%d շաբաթից',
    M: 'ամիս',
    MM: '%d ամիս',
    y: 'տարի',
    yy: '%d տարի',
  },
  // eslint-disable-next-line  unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => {
    if (hour < 4) {
      return 'գիշերվա'
    }
    if (hour < 12) {
      return 'առավոտվա'
    }
    if (hour < 17) {
      return 'ցերեկվա'
    }
    return 'երեկոյան'
  },
}

export default localeHyAm
