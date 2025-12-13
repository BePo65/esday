/**
 * Tajik [tg]
 */

import type { Locale, MonthNames, MonthNamesStandaloneFormat } from '~/plugins/locale'

const monthFormat: MonthNames = [
  'январи',
  'феврали',
  'марти',
  'апрели',
  'майи',
  'июни',
  'июли',
  'августи',
  'сентябри',
  'октябри',
  'ноябри',
  'декабри',
]
const monthStandalone: MonthNames = [
  'январ',
  'феврал',
  'март',
  'апрел',
  'май',
  'июн',
  'июл',
  'август',
  'сентябр',
  'октябр',
  'ноябр',
  'декабр',
]
const months: MonthNamesStandaloneFormat = {
  standalone: monthStandalone,
  format: monthFormat,
}

const localeTg: Readonly<Locale> = {
  name: 'tg',
  weekdays: ['якшанбе', 'душанбе', 'сешанбе', 'чоршанбе', 'панҷшанбе', 'ҷумъа', 'шанбе'],
  weekdaysShort: ['яшб', 'дшб', 'сшб', 'чшб', 'пшб', 'ҷум', 'шнб'],
  weekdaysMin: ['яш', 'дш', 'сш', 'чш', 'пш', 'ҷм', 'шб'],
  months,
  monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
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
    sameDay: '[Имрӯз соати] LT',
    nextDay: '[Фардо соати] LT',
    lastDay: '[Дирӯз соати] LT',
    nextWeek: 'dddd[и] [ҳафтаи оянда соати] LT',
    lastWeek: 'dddd[и] [ҳафтаи гузашта соати] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'баъди %s',
    past: '%s пеш',
    s: 'якчанд сония',
    ss: '%d сония',
    m: 'як дақиқа',
    mm: '%d дақиқа',
    h: 'як соат',
    hh: '%d соат',
    d: 'як рӯз',
    dd: '%d рӯз',
    w: 'як ҳафта',
    ww: '%d ҳафта',
    M: 'як моҳ',
    MM: '%d моҳ',
    y: 'як сол',
    yy: '%d сол',
  },
  // eslint-disable-next-line unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => {
    if (hour < 4) {
      return 'шаб'
    }
    if (hour < 11) {
      return 'субҳ'
    }
    if (hour < 16) {
      return 'рӯз'
    }
    if (hour < 19) {
      return 'бегоҳ'
    }
    return 'шаб'
  },
}

export default localeTg
