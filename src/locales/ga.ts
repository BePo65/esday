/**
 * Irish or Irish Gaelic [ga]
 */

import type { Locale } from '~/plugins/locale'

const localeGa: Readonly<Locale> = {
  name: 'ga',
  weekdays: [
    'Dé Domhnaigh',
    'Dé Luain',
    'Dé Máirt',
    'Dé Céadaoin',
    'Déardaoin',
    'Dé hAoine',
    'Dé Satharn',
  ],
  weekdaysShort: ['Dom', 'Lua', 'Mái', 'Céa', 'Déa', 'hAo', 'Sat'],
  weekdaysMin: ['Do', 'Lu', 'Má', 'Ce', 'Dé', 'hA', 'Sa'],
  months: [
    'Eanáir',
    'Feabhra',
    'Márta',
    'Aibreán',
    'Bealtaine',
    'Méitheamh',
    'Iúil',
    'Lúnasa',
    'Meán Fómhair',
    'Deaireadh Fómhair',
    'Samhain',
    'Nollaig',
  ],
  monthsShort: [
    'Eaná',
    'Feab',
    'Márt',
    'Aibr',
    'Beal',
    'Méit',
    'Iúil',
    'Lúna',
    'Meán',
    'Deai',
    'Samh',
    'Noll',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
  ordinal: (n) => `${n}`,
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
    sameDay: '[Inniu ag] LT',
    nextDay: '[Amárach ag] LT',
    nextWeek: 'dddd [ag] LT',
    lastDay: '[Inné ag] LT',
    lastWeek: 'dddd [seo caite] [ag] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'i %s',
    past: '%s ó shin',
    s: 'cúpla soicind',
    ss: '%d soicind',
    m: 'nóiméad',
    mm: '%d nóiméad',
    h: 'uair an chloig',
    hh: '%d uair an chloig',
    d: 'lá',
    dd: '%d lá',
    w: 'seachtain ',
    ww: '%d seachtainí',
    M: 'mí',
    MM: '%d mí',
    y: 'bliain',
    yy: '%d bliain',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Irish Gaelic doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeGa
