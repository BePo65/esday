/**
 * Chuvash [cv]
 */

import type { Locale } from '~/plugins/locale'

const localeCv: Readonly<Locale> = {
  name: 'cv',
  weekdays: ['вырсарникун', 'тунтикун', 'ытларикун', 'юнкун', 'кӗҫнерникун', 'эрнекун', 'шӑматкун'],
  weekdaysShort: ['выр', 'тун', 'ытл', 'юн', 'кӗҫ', 'эрн', 'шӑм'],
  weekdaysMin: ['вр', 'тн', 'ыт', 'юн', 'кҫ', 'эр', 'шм'],
  months: [
    'кӑрлач',
    'нарӑс',
    'пуш',
    'ака',
    'май',
    'ҫӗртме',
    'утӑ',
    'ҫурла',
    'авӑн',
    'юпа',
    'чӳк',
    'раштав',
  ],
  monthsShort: ['кӑр', 'нар', 'пуш', 'ака', 'май', 'ҫӗр', 'утӑ', 'ҫур', 'авн', 'юпа', 'чӳк', 'раш'],
  dayOfMonthOrdinalParse: /\d{1,2}-мӗш/,
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD-MM-YYYY',
    LL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
    LLL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
    LLLL: 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
    l: 'DD-MM-YYYY',
    ll: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
    lll: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
    llll: 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
  },
  calendar: {
    sameDay: '[Паян] LT [сехетре]',
    nextDay: '[Ыран] LT [сехетре]',
    lastDay: '[Ӗнер] LT [сехетре]',
    nextWeek: '[Ҫитес] dddd LT [сехетре]',
    lastWeek: '[Иртнӗ] dddd LT [сехетре]',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'в %s',
    past: '%s каялла',
    s: 'пӗр-ик ҫеккунт',
    ss: '%d ҫеккунт',
    m: 'пӗр минут',
    mm: '%d минут',
    h: 'пӗр сехет',
    hh: '%d сехет',
    d: 'пӗр кун',
    dd: '%d кун',
    w: 'пӗр Эрне',
    ww: '%d эрне',
    M: 'пӗр уйӑх',
    MM: '%d уйӑх',
    y: 'пӗр ҫул',
    yy: '%d ҫул',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Chuvash doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeCv
