/**
 * Kazakh [kk]
 */

import type { Locale } from '~/plugins/locale'

const localeKk: Readonly<Locale> = {
  name: 'kk',
  weekdays: ['жексенбі', 'дүйсенбі', 'сейсенбі', 'сәрсенбі', 'бейсенбі', 'жұма', 'сенбі'],
  weekdaysShort: ['жек', 'дүй', 'сей', 'сәр', 'бей', 'жұм', 'сен'],
  weekdaysMin: ['жк', 'дй', 'сй', 'ср', 'бй', 'жм', 'сн'],
  months: [
    'қаңтар',
    'ақпан',
    'наурыз',
    'сәуір',
    'мамыр',
    'маусым',
    'шілде',
    'тамыз',
    'қыркүйек',
    'қазан',
    'қараша',
    'желтоқсан',
  ],
  monthsShort: ['қаң', 'ақп', 'нау', 'сәу', 'мам', 'мау', 'шіл', 'там', 'қыр', 'қаз', 'қар', 'жел'],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
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
    sameDay: '[Бүгін сағат] LT',
    nextDay: '[Ертең сағат] LT',
    nextWeek: 'dddd [сағат] LT',
    lastDay: '[Кеше сағат] LT',
    lastWeek: '[Өткен аптаның] dddd [сағат] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s ішінде',
    past: '%s бұрын',
    s: 'бірнеше секунд',
    ss: '%d секунд',
    m: 'бір минут',
    mm: '%d минут',
    h: 'бір сағат',
    hh: '%d сағат',
    d: 'бір күн',
    dd: '%d күн',
    w: 'бір апта',
    ww: '%d апта',
    M: 'бір ай',
    MM: '%d ай',
    y: 'бір жыл',
    yy: '%d жыл',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Kazakh doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeKk
