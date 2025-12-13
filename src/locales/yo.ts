/**
 * Yoruba Nigeria [yo]
 */

import type { Locale } from '~/plugins/locale'

const localeYo: Readonly<Locale> = {
  name: 'yo',
  weekdays: ['Àìkú', 'Ajé', 'Ìsẹ́gun', 'Ọjọ́rú', 'Ọjọ́bọ', 'Ẹtì', 'Àbámẹ́ta'],
  weekdaysShort: ['Àìk', 'Ajé', 'Ìsẹ́', 'Ọjr', 'Ọjb', 'Ẹtì', 'Àbá'],
  weekdaysMin: ['Àì', 'Aj', 'Ìs', 'Ọr', 'Ọb', 'Ẹt', 'Àb'],
  months: [
    'Sẹ́rẹ́',
    'Èrèlè',
    'Ẹrẹ̀nà',
    'Ìgbé',
    'Èbibi',
    'Òkùdu',
    'Agẹmo',
    'Ògún',
    'Owewe',
    'Ọ̀wàrà',
    'Bélú',
    'Ọ̀pẹ̀̀',
  ],
  monthsShort: ['Sẹ́r', 'Èrl', 'Ẹrn', 'Ìgb', 'Èbi', 'Òkù', 'Agẹ', 'Ògú', 'Owe', 'Ọ̀wà', 'Bél', 'Ọ̀pẹ̀̀'],
  ordinal: (n) => `ọjọ́ ${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY h:mm A',
    LLLL: 'dddd, D MMMM YYYY h:mm A',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY h:mm A',
    llll: 'dddd, D MMMM YYYY h:mm A',
  },
  calendar: {
    sameDay: '[Ònì ni] LT',
    nextDay: '[Ọ̀la ni] LT',
    nextWeek: "dddd [Ọsẹ̀ tón'bọ] [ni] LT",
    lastDay: '[Àna ni] LT',
    lastWeek: 'dddd [Ọsẹ̀ tólọ́] [ni] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'ní %s',
    past: '%s kọjá',
    s: 'ìsẹjú aayá die',
    ss: 'aayá %d',
    m: 'ìsẹjú kan',
    mm: 'ìsẹjú %d',
    h: 'wákati kan',
    hh: 'wákati %d',
    d: 'ọjọ́ kan',
    dd: 'ọjọ́ %d',
    w: 'ọsẹ kan',
    ww: 'ọsẹ %d',
    M: 'osù kan',
    MM: 'osù %d',
    y: 'ọdún kan',
    yy: 'ọdún %d',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Yoruba Nigeria doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeYo
