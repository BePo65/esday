/**
 * Galician [gl]
 */

import type { EsDay } from 'esday'
import type { Locale } from '~/plugins/locale'

const localeGl: Readonly<Locale> = {
  name: 'gl',
  weekdays: ['domingo', 'luns', 'martes', 'mércores', 'xoves', 'venres', 'sábado'],
  weekdaysShort: ['dom.', 'lun.', 'mar.', 'mér.', 'xov.', 'ven.', 'sáb.'],
  weekdaysMin: ['do', 'lu', 'ma', 'mé', 'xo', 've', 'sá'],
  months: [
    'xaneiro',
    'febreiro',
    'marzo',
    'abril',
    'maio',
    'xuño',
    'xullo',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'decembro',
  ],
  monthsShort: [
    'xan.',
    'feb.',
    'mar.',
    'abr.',
    'mai.',
    'xuñ.',
    'xul.',
    'ago.',
    'set.',
    'out.',
    'nov.',
    'dec.',
  ],
  ordinal: (n) => `${n}º`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY H:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm',
    l: 'DD/MM/YYYY', // Added for consistency with cy.ts
    ll: 'D [de] MMMM [de] YYYY', // Added for consistency with cy.ts
    lll: 'D [de] MMMM [de] YYYY H:mm', // Added for consistency with cy.ts
    llll: 'dddd, D [de] MMMM [de] YYYY H:mm', // Added for consistency with cy.ts
  },
  calendar: {
    sameDay(this: EsDay) {
      return `[hoxe ${this.hour() !== 1 ? 'ás' : 'á'}] LT`
    },
    nextDay(this: EsDay) {
      return `[mañá ${this.hour() !== 1 ? 'ás' : 'á'}] LT`
    },
    nextWeek(this: EsDay) {
      return `dddd [${this.hour() !== 1 ? 'ás' : 'a'}] LT`
    },
    lastDay(this: EsDay) {
      return `[onte ${this.hour() !== 1 ? 'á' : 'a'}] LT`
    },
    lastWeek(this: EsDay) {
      return `[o] dddd [pasado ${this.hour() !== 1 ? 'ás' : 'a'}] LT`
    },
    sameElse: 'L',
  },
  relativeTime: {
    future: 'en %s',
    past: 'fai %s',
    s: 'uns segundos',
    ss: '%d segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'unha hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    w: 'nunha semana',
    ww: '%d semanas',
    M: 'un mes',
    MM: '%d meses',
    y: 'un ano',
    yy: '%d anos',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Galician doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeGl
