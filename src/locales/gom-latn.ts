/**
 * Konkani Latin script [gom-LATN]
 */

import type {
  Locale,
  MonthNames,
  MonthNamesStandaloneFormat,
  RelativeTimeElementFunction,
} from '~/plugins/locale'

const monthFormat: MonthNames = [
  'Janerachea',
  'Febrerachea',
  'Marsachea',
  'Abrilachea',
  'Maiachea',
  'Junachea',
  'Julaiachea',
  'Agostachea',
  'Setembrachea',
  'Otubrachea',
  'Novembrachea',
  'Dezembrachea',
]
const monthStandalone: MonthNames = [
  'Janer',
  'Febrer',
  'Mars',
  'Abril',
  'Mai',
  'Jun',
  'Julai',
  'Agost',
  'Setembr',
  'Otubr',
  'Novembr',
  'Dezembr',
]
const months: MonthNamesStandaloneFormat = {
  standalone: monthStandalone,
  format: monthFormat,
  isFormat: /MMMM(\s)+D[oD]?/,
}

const processRelativeTime: RelativeTimeElementFunction = (
  timeValue: string | number,
  _withoutSuffix: boolean,
  token: string,
  isFuture: boolean,
) => {
  const relativeTimeFormatStrings = {
    s: ['thoddea sekondamni', 'thodde sekond'],
    ss: [`${timeValue} sekondamni`, `${timeValue} sekond`],
    m: ['eka mintan', 'ek minut'],
    mm: [`${timeValue} mintamni`, `${timeValue} mintam`],
    h: ['eka voran', 'ek vor'],
    hh: [`${timeValue} voramni`, `${timeValue} voram`],
    d: ['eka disan', 'ek dis'],
    dd: [`${timeValue} disamni`, `${timeValue} dis`],
    w: ['eka saptakant', 'ek saptaka'],
    ww: [`${timeValue} saptakanta`, `${timeValue} saptakam`],
    M: ['eka mhoinean', 'ek mhoino'],
    MM: [`${timeValue} mhoineamni`, `${timeValue} mhoine`],
    y: ['eka vorsan', 'ek voros'],
    yy: [`${timeValue} vorsamni`, `${timeValue} vorsam`],
  }
  return isFuture
    ? relativeTimeFormatStrings[token as keyof typeof relativeTimeFormatStrings][0]
    : relativeTimeFormatStrings[token as keyof typeof relativeTimeFormatStrings][1]
}

const localeGomLatn: Readonly<Locale> = {
  name: 'gom-LATN',
  weekdays: ['Aitar', 'Somar', 'Mongllar', 'Budvar', 'Brestar', 'Sukrar', "Son'var"],
  weekdaysShort: ['Ait.', 'Som.', 'Mon.', 'Bud.', 'Bre.', 'Suk.', 'Son.'],
  weekdaysMin: ['Ai', 'Sm', 'Mo', 'Bu', 'Br', 'Su', 'Sn'],
  months,
  monthsShort: [
    'Jan.',
    'Feb.',
    'Mars',
    'Abr.',
    'Mai',
    'Jun',
    'Jul.',
    'Ago.',
    'Set.',
    'Otu.',
    'Nov.',
    'Dez.',
  ],
  ordinal: (n) => `${n}`,
  weekStart: 0, // Sunday is the first day of the week.
  yearStart: 4, // The week that contains Jan 3rd is the first week of the year.
  formats: {
    LT: 'A h:mm [vazta]',
    LTS: 'A h:mm:ss [vazta]',
    L: 'DD-MM-YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY A h:mm [vazta]',
    LLLL: 'dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]',
    l: 'DD-MM-YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY A h:mm [vazta]',
    llll: 'ddd, D MMM YYYY, A h:mm [vazta]',
  },
  calendar: {
    sameDay: '[Aiz] LT',
    nextDay: '[Faleam] LT',
    nextWeek: '[Fuddlo] dddd[,] LT',
    lastDay: '[Kal] LT',
    lastWeek: '[Fattlo] dddd[,] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s',
    past: '%s adim',
    s: processRelativeTime,
    ss: processRelativeTime,
    m: processRelativeTime,
    mm: processRelativeTime,
    h: processRelativeTime,
    hh: processRelativeTime,
    d: processRelativeTime,
    dd: processRelativeTime,
    w: processRelativeTime,
    ww: processRelativeTime,
    M: processRelativeTime,
    MM: processRelativeTime,
    y: processRelativeTime,
    yy: processRelativeTime,
  },
  // eslint-disable-next-line  unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => {
    if (hour < 4) {
      return 'rati'
    }
    if (hour < 12) {
      return 'sokallim'
    }
    if (hour < 16) {
      return 'donparam'
    }
    if (hour < 20) {
      return 'sanje'
    }
    return 'rati'
  },
}

export default localeGomLatn
