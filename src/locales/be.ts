/**
 * Belarusian [be]
 */

import type {
  DayNames,
  DayNamesStandaloneFormat,
  Locale,
  MonthNames,
  MonthNamesStandaloneFormat,
} from '~/plugins/locale'

const dayNamesFormat: DayNames = [
  'нядзелю',
  'панядзелак',
  'аўторак',
  'сераду',
  'чацвер',
  'пятніцу',
  'суботу',
]
const dayNamesStandalone: DayNames = [
  'нядзеля',
  'панядзелак',
  'аўторак',
  'серада',
  'чацвер',
  'пятніца',
  'субота',
]
const weekdays: DayNamesStandaloneFormat = {
  standalone: dayNamesStandalone,
  format: dayNamesFormat,
  isFormat: /\[ ?[Ууў] ?(?:мінулую|наступную)? ?\] ?dddd/,
}

const monthFormat: MonthNames = [
  'студзеня',
  'лютага',
  'сакавіка',
  'красавіка',
  'траўня',
  'чэрвеня',
  'ліпеня',
  'жніўня',
  'верасня',
  'кастрычніка',
  'лістапада',
  'снежня',
]
const monthStandalone: MonthNames = [
  'студзень',
  'люты',
  'сакавік',
  'красавік',
  'травень',
  'чэрвень',
  'ліпень',
  'жнівень',
  'верасень',
  'кастрычнік',
  'лістапад',
  'снежань',
]
const months: MonthNamesStandaloneFormat = {
  standalone: monthStandalone,
  format: monthFormat,
}

const localeBe: Readonly<Locale> = {
  name: 'be',
  weekdays,
  weekdaysShort: ['нд', 'пн', 'ат', 'ср', 'чц', 'пт', 'сб'],
  weekdaysMin: ['нд', 'пн', 'ат', 'ср', 'чц', 'пт', 'сб'],
  months,
  monthsShort: [
    'студ',
    'лют',
    'сак',
    'крас',
    'трав',
    'чэрв',
    'ліп',
    'жнів',
    'вер',
    'каст',
    'ліст',
    'снеж',
  ],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY г.',
    LLL: 'D MMMM YYYY г., HH:mm',
    LLLL: 'dddd, D MMMM YYYY г., HH:mm',
    l: 'DD.MM.YYYY',
    ll: 'D MMMM YYYY г.',
    lll: 'D MMMM YYYY г., HH:mm',
    llll: 'dddd, D MMMM YYYY г., HH:mm',
  },
  calendar: {
    sameDay: '[Сёння ў] LT',
    nextDay: '[Заўтра ў] LT',
    nextWeek: '[У] dddd [ў] LT',
    lastDay: '[Учора ў] LT',
    lastWeek: '[апошні] dddd [ў] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'праз %s',
    past: '%s таму',
    s: 'некалькі секунд',
    ss: '%d секунд',
    m: 'хвіліна',
    mm: '%d хвілін',
    h: 'гадзіна',
    hh: '%d гадзін',
    d: 'дзень',
    dd: '%d дзён',
    w: 'тыдзень',
    ww: '%d тыдні',
    M: 'месяц',
    MM: '%d месяцаў',
    y: 'год',
    yy: '%d гадоў',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Belarusian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeBe
