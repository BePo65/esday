/**
 * Bulgarian [bg]
 */

import type { Locale } from '~/plugins/locale'

const localeBg: Readonly<Locale> = {
  name: 'bg',
  weekdays: ['неделя', 'понеделник', 'вторник', 'сряда', 'четвъртък', 'петък', 'събота'],
  weekdaysShort: ['нед', 'пон', 'вто', 'сря', 'чет', 'пет', 'съб'],
  weekdaysMin: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  months: [
    'януари',
    'февруари',
    'март',
    'април',
    'май',
    'юни',
    'юли',
    'август',
    'септември',
    'октомври',
    'ноември',
    'декември',
  ],
  monthsShort: ['яну', 'фев', 'мар', 'апр', 'май', 'юни', 'юли', 'авг', 'сеп', 'окт', 'ное', 'дек'],
  dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
  ordinal: (n) => {
    const last2Digits = n % 100
    if (last2Digits > 10 && last2Digits < 20) {
      return `${n}-ти`
    }

    const lastDigit = n % 10
    if (lastDigit === 1) {
      return `${n}-ви`
    }
    if (lastDigit === 2) {
      return `${n}-ри`
    }
    if (lastDigit === 7 || lastDigit === 8) {
      return `${n}-ми`
    }

    return `${n}-ти`
  },
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
    sameDay: '[Днес в] LT',
    nextDay: '[Утре в] LT',
    nextWeek: 'dddd [в] LT',
    lastDay: '[Вчера в] LT',
    lastWeek() {
      switch (this.day()) {
        case 0:
        case 3:
        case 6:
          return '[Миналата] dddd [в] LT'
        case 1:
        case 2:
        case 4:
        case 5:
          return '[Миналия] dddd [в] LT'
        default:
          return ''
      }
    },
    sameElse: 'L',
  },
  relativeTime: {
    future: 'след %s',
    past: 'преди %s',
    s: 'няколко секунди',
    ss: '%d секунди',
    m: 'минута',
    mm: '%d минути',
    h: 'час',
    hh: '%d часа',
    d: 'ден',
    dd: '%d дена',
    w: 'седмица',
    ww: '%d седмици',
    M: 'месец',
    MM: '%d месеца',
    y: 'година',
    yy: '%d години',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Bulgarian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeBg
