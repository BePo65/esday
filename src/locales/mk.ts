/*
 * Macedonian [mk]
 */
import type { EsDay } from 'esday'
import type { Locale } from '~/plugins/locale'

const localeMk: Readonly<Locale> = {
  name: 'mk',
  weekdays: ['недела', 'понеделник', 'вторник', 'среда', 'четврток', 'петок', 'сабота'],
  weekdaysShort: ['нед', 'пон', 'вто', 'сре', 'чет', 'пет', 'саб'],
  weekdaysMin: ['нe', 'пo', 'вт', 'ср', 'че', 'пе', 'сa'],
  months: [
    'јануари',
    'февруари',
    'март',
    'април',
    'мај',
    'јуни',
    'јули',
    'август',
    'септември',
    'октомври',
    'ноември',
    'декември',
  ],
  monthsShort: ['јан', 'фев', 'мар', 'апр', 'мај', 'јун', 'јул', 'авг', 'сеп', 'окт', 'ное', 'дек'],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'D.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY H:mm',
    LLLL: 'dddd, D MMMM YYYY H:mm',
    l: 'D.MM.YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY H:mm',
    llll: 'dddd, D MMMM YYYY H:mm',
  },
  calendar: {
    sameDay: '[Денес во] LT',
    nextDay: '[Утре во] LT',
    nextWeek: '[Во] dddd [во] LT',
    lastDay: '[Вчера во] LT',
    lastWeek(this: EsDay) {
      switch (this.day()) {
        case 0:
        case 3:
        case 6:
          return '[Изминатата] dddd [во] LT'
        case 1:
        case 2:
        case 4:
        case 5:
          return '[Изминатиот] dddd [во] LT'
        default:
          return ''
      }
    },
    sameElse: 'L',
  },
  relativeTime: {
    future: 'после %s',
    past: 'пред %s',
    s: 'неколку секунди',
    ss: '%d секунди',
    m: 'минута',
    mm: '%d минути',
    h: 'час',
    hh: '%d часа',
    d: 'ден',
    dd: '%d дена',
    w: 'недела',
    ww: '%d недели',
    M: 'месец',
    MM: '%d месеци',
    y: 'година',
    yy: '%d години',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Macedonian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeMk
