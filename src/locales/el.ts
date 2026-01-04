/**
 * Greek [el]
 */

import type { EsDay } from 'esday'
import type { Locale } from '~/plugins/locale'

const localeEl: Readonly<Locale> = {
  name: 'el',
  weekdays: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
  weekdaysShort: ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'],
  weekdaysMin: ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πε', 'Πα', 'Σα'],
  months: [
    'Ιανουάριος',
    'Φεβρουάριος',
    'Μάρτιος',
    'Απρίλιος',
    'Μάιος',
    'Ιούνιος',
    'Ιούλιος',
    'Αύγουστος',
    'Σεπτέμβριος',
    'Οκτώβριος',
    'Νοέμβριος',
    'Δεκέμβριος',
  ],
  monthsShort: [
    'Ιαν',
    'Φεβ',
    'Μαρ',
    'Απρ',
    'Μαι',
    'Ιουν',
    'Ιουλ',
    'Αυγ',
    'Σεπ',
    'Οκτ',
    'Νοε',
    'Δεκ',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}n/,
  ordinal: (n) => `${n}`,
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
    sameDay: '[Σήμερα {}] LT',
    nextDay: '[Αύριο {}] LT',
    nextWeek: 'dddd [{}] LT',
    lastDay: '[Χθες {}] LT',
    lastWeek(this: EsDay) {
      switch (this.day()) {
        case 6:
          if (this.hour() % 12 === 1) {
            return '[το προηγούμενο] dddd [στη] LT'
          }
          return '[το προηγούμενο] dddd [στις] LT'
        default:
          if (this.hour() % 12 === 1) {
            return '[την προηγούμενη] dddd [στη] LT'
          }
          return '[την προηγούμενη] dddd [στις] LT'
      }
    },
    sameElse: 'L',
  },
  relativeTime: {
    future: 'σε %s',
    past: 'πριν %s',
    s: 'μερικά δευτερόλεπτα',
    ss: '%d δευτερόλεπτα',
    m: 'ένα λεπτό',
    mm: '%d λεπτά',
    h: 'μία ώρα',
    hh: '%d ώρες',
    d: 'μία μέρα',
    dd: '%d μέρες',
    w: 'μια εβδομάδα',
    ww: '%d εβδομάδες',
    M: 'ένα μήνα',
    MM: '%d μήνες',
    y: 'ένα χρόνο',
    yy: '%d χρόνια',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Greek doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeEl
