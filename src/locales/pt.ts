/**
 * Portuguese [pt]
 */

import type { EsDay } from 'esday'
import type { Locale } from '~/plugins/locale'

const localePt: Readonly<Locale> = {
  name: 'pt',
  weekdays: [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado',
  ],
  weekdaysShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
  weekdaysMin: ['Do', '2ª', '3ª', '4ª', '5ª', '6ª', 'Sa'],
  months: [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ],
  monthsShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: (n) => `${n}º`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm',
    l: 'DD/MM/YYYY',
    ll: 'D [de] MMMM [de] YYYY',
    lll: 'D [de] MMMM [de] YYYY [às] HH:mm',
    llll: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm',
  },
  calendar: {
    sameDay: '[Hoje às] LT',
    nextDay: '[Amanhã às] LT',
    nextWeek: 'dddd [às] LT',
    lastDay: '[Ontem às] LT',
    lastWeek(this: EsDay) {
      return this.day() === 0 || this.day() === 6
        ? '[Último] dddd [às] LT' // Saturday + Sunday
        : '[Última] dddd [às] LT' // Monday - Friday
    },
    sameElse: 'L',
  },
  relativeTime: {
    future: 'em %s',
    past: 'há %s',
    s: 'alguns segundos',
    ss: '%d segundos',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'um dia',
    dd: '%d dias',
    w: 'uma semana',
    ww: '%d semanas',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Portuguese doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localePt
