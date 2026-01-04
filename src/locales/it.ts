/**
 * Italian [it]
 */

import type { EsDay } from 'esday'
import type { Locale } from '~/plugins/locale'

const calendar = {
  sameDay(this: EsDay) {
    return `[Oggi a${this.hour() > 1 ? 'lle ' : this.hour() === 0 ? ' ' : "ll'"}]LT`
  },
  nextDay(this: EsDay) {
    return `[Domani a${this.hour() > 1 ? 'lle ' : this.hour() === 0 ? ' ' : "ll'"}]LT`
  },
  nextWeek(this: EsDay) {
    return `dddd [a${this.hour() > 1 ? 'lle ' : this.hour() === 0 ? ' ' : "ll'"}]LT`
  },
  lastDay(this: EsDay) {
    return `[Ieri a${this.hour() > 1 ? 'lle ' : this.hour() === 0 ? ' ' : "ll'"}]LT`
  },
  lastWeek(this: EsDay) {
    switch (this.day()) {
      case 0:
        return `[La scorsa] dddd [a${this.hour() > 1 ? 'lle ' : this.hour() === 0 ? ' ' : "ll'"}]LT`
      default:
        return `[Lo scorso] dddd [a${this.hour() > 1 ? 'lle ' : this.hour() === 0 ? ' ' : "ll'"}]LT`
    }
  },
  sameElse: 'L',
}

const localeIt: Readonly<Locale> = {
  name: 'it',
  weekdays: ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
  weekdaysShort: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
  weekdaysMin: ['do', 'lu', 'ma', 'me', 'gi', 've', 'sa'],
  months: [
    'gennaio',
    'febbraio',
    'marzo',
    'aprile',
    'maggio',
    'giugno',
    'luglio',
    'agosto',
    'settembre',
    'ottobre',
    'novembre',
    'dicembre',
  ],
  monthsShort: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: (n) => `${n}º`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'dddd D MMMM YYYY HH:mm',
  },
  calendar,
  relativeTime: {
    future: 'tra %s',
    past: '%s fa',
    s: 'qualche secondo',
    ss: '%d secondi',
    m: 'un minuto',
    mm: '%d minuti',
    h: "un' ora",
    hh: '%d ore',
    d: 'un giorno',
    dd: '%d giorni',
    w: 'una settimana',
    ww: '%d settimane',
    M: 'un mese',
    MM: '%d mesi',
    y: 'un anno',
    yy: '%d anni',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Italian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeIt
