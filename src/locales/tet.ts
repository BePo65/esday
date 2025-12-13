/**
 * Tetun Dili (East Timor) [tet]
 */

import type { Locale } from '~/plugins/locale'

const localeTet: Readonly<Locale> = {
  name: 'tet',
  weekdays: ['Domingu', 'Segunda', 'Tersa', 'Kuarta', 'Kinta', 'Sesta', 'Sabadu'],
  weekdaysShort: ['Dom', 'Seg', 'Ters', 'Kua', 'Kint', 'Sest', 'Sab'],
  weekdaysMin: ['Do', 'Seg', 'Te', 'Ku', 'Ki', 'Ses', 'Sa'],
  months: [
    'Janeiru',
    'Fevereiru',
    'Marsu',
    'Abril',
    'Maiu',
    'Juñu',
    'Jullu',
    'Agustu',
    'Setembru',
    'Outubru',
    'Novembru',
    'Dezembru',
  ],
  monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  ordinal: (n: number) => {
    const numberTens = n % 10
    const output =
      ~~((n % 100) / 10) === 1
        ? 'th'
        : numberTens === 1
          ? 'st'
          : numberTens === 2
            ? 'nd'
            : numberTens === 3
              ? 'rd'
              : 'th'
    return `${n}${output}`
  },
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
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
    sameDay: '[Ohin iha] LT',
    nextDay: '[Aban iha] LT',
    nextWeek: 'dddd [iha] LT',
    lastDay: '[Horiseik iha] LT',
    lastWeek: 'dddd [semana kotuk] [iha] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'iha %s',
    past: '%s liuba',
    s: 'minutu balun',
    ss: 'segundu %d',
    m: 'minutu ida',
    mm: 'minutu %d',
    h: 'oras ida',
    hh: 'oras %d',
    d: 'loron ida',
    dd: 'loron %d',
    w: 'semana ida',
    ww: 'semana %d',
    M: 'fulan ida',
    MM: 'fulan %d',
    y: 'tinan ida',
    yy: 'tinan %d',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Tetun Dili doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeTet
