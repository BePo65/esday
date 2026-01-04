/**
 * Catalan [ca]
 */

import type { EsDay } from 'esday'
import type { Locale, MonthNames, MonthNamesStandaloneFormat } from '~/plugins/locale'

const monthFormat: MonthNames = [
  'de gener',
  'de febrer',
  'de març',
  `d'abril`,
  'de maig',
  'de juny',
  'de juliol',
  `d'agost`,
  'de setembre',
  `d'octubre`,
  'de novembre',
  'de desembre',
]
const monthStandalone: MonthNames = [
  'gener',
  'febrer',
  'març',
  'abril',
  'maig',
  'juny',
  'juliol',
  'agost',
  'setembre',
  'octubre',
  'novembre',
  'desembre',
]
const months: MonthNamesStandaloneFormat = {
  standalone: monthStandalone,
  format: monthFormat,
  isFormat: /D[oD]?(\s)+MMMM/,
}

const localeCa: Readonly<Locale> = {
  name: 'ca',
  weekdays: ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'],
  weekdaysShort: ['dg.', 'dl.', 'dt.', 'dc.', 'dj.', 'dv.', 'ds.'],
  weekdaysMin: ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'],
  months,
  monthsShort: [
    'gen.',
    'febr.',
    'març',
    'abr.',
    'maig',
    'juny',
    'jul.',
    'ag.',
    'set.',
    'oct.',
    'nov.',
    'des.',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/,
  ordinal: (n: number) => {
    let ord: string

    if (n === 1 || n === 3) ord = 'r'
    else if (n === 2) ord = 'n'
    else if (n === 4) ord = 't'
    else ord = 'è'

    return `${n}${ord}`
  },
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY [a les] H:mm',
    LLLL: 'dddd D [de] MMMM [de] YYYY [a les] H:mm',
    l: 'DD/MM/YYYY',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY, H:mm',
    llll: 'ddd D MMM YYYY, H:mm',
  },
  calendar: {
    sameDay(this: EsDay) {
      return `[avui a ${this.hour() !== 1 ? 'les' : 'la'}] LT`
    },
    nextDay() {
      return `[demà a ${this.hour() !== 1 ? 'les' : 'la'}] LT`
    },
    nextWeek() {
      return `dddd [a ${this.hour() !== 1 ? 'les' : 'la'}] LT`
    },
    lastDay() {
      return `[ahir a ${this.hour() !== 1 ? 'les' : 'la'}] LT`
    },
    lastWeek() {
      return `[el] dddd [passat a ${this.hour() !== 1 ? 'les' : 'la'}] LT`
    },
    sameElse: 'L',
  },
  relativeTime: {
    future: "d'aquí %s",
    past: 'fa %s',
    s: 'uns segons',
    ss: '%d segons',
    m: 'un minut',
    mm: '%d minuts',
    h: 'una hora',
    hh: '%d hores',
    d: 'un dia',
    dd: '%d dies',
    w: 'una setmana',
    ww: '%d setmanes',
    M: 'un mes',
    MM: '%d mesos',
    y: 'un any',
    yy: '%d anys',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Catalan doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeCa
