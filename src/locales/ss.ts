/**
 * siSwati [ss]
 */

import type { Locale } from '~/plugins/locale'

const localeSs: Readonly<Locale> = {
  name: 'ss',
  weekdays: [
    'Lisontfo',
    'Umsombuluko',
    'Lesibili',
    'Lesitsatfu',
    'Lesine',
    'Lesihlanu',
    'Umgcibelo',
  ],
  weekdaysShort: ['Lis', 'Umb', 'Lsb', 'Les', 'Lsi', 'Lsh', 'Umg'],
  weekdaysMin: ['Li', 'Us', 'Lb', 'Lt', 'Ls', 'Lh', 'Ug'],
  months: [
    'Bhimbidvwane',
    'Indlovana',
    "Indlov'lenkhulu",
    'Mabasa',
    'Inkhwekhweti',
    'Inhlaba',
    'Kholwane',
    'Ingci',
    'Inyoni',
    'Imphala',
    'Lweti',
    'Ingongoni',
  ],
  monthsShort: ['Bhi', 'Ina', 'Inu', 'Mab', 'Ink', 'Inh', 'Kho', 'Igc', 'Iny', 'Imp', 'Lwe', 'Igo'],
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
    sameDay: '[Namuhla nga] LT',
    nextDay: '[Kusasa nga] LT',
    nextWeek: 'dddd [nga] LT',
    lastDay: '[Itolo nga] LT',
    lastWeek: 'dddd [leliphelile] [nga] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'nga %s',
    past: 'wenteka nga %s',
    s: 'emizuzwana lomcane',
    ss: '%d mzuzwana',
    m: 'umzuzu',
    mm: '%d emizuzu',
    h: 'lihora',
    hh: '%d emahora',
    d: 'lilanga',
    dd: '%d emalanga',
    w: 'linye',
    ww: '%d emaviki',
    M: 'inyanga',
    MM: '%d tinyanga',
    y: 'umnyaka',
    yy: '%d iminyaka',
  },
  // eslint-disable-next-line  unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => {
    if (hour < 11) {
      return 'ekuseni'
    }
    if (hour < 15) {
      return 'emini'
    }
    if (hour < 19) {
      return 'entsambama'
    }
    return 'ebusuku'
  },
}

export default localeSs
