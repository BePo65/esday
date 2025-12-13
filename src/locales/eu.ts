/**
 * Basque [eu]
 */

import type { Locale } from '~/plugins/locale'

const localeEu: Readonly<Locale> = {
  name: 'eu',
  weekdays: [
    'igandea',
    'astelehena',
    'asteartea',
    'asteazkena',
    'osteguna',
    'ostirala',
    'larunbata',
  ],
  weekdaysShort: ['ig.', 'al.', 'ar.', 'az.', 'og.', 'ol.', 'lr.'],
  weekdaysMin: ['ig', 'al', 'ar', 'az', 'og', 'ol', 'lr'],
  months: [
    'urtarrila',
    'otsaila',
    'martxoa',
    'apirila',
    'maiatza',
    'ekaina',
    'uztaila',
    'abuztua',
    'iraila',
    'urria',
    'azaroa',
    'abendua',
  ],
  monthsShort: [
    'urt.',
    'ots.',
    'mar.',
    'api.',
    'mai.',
    'eka.',
    'uzt.',
    'abu.',
    'ira.',
    'urr.',
    'aza.',
    'abe.',
  ],
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  ordinal: (n) => `${n}`,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY[ko] MMMM[ren] D[a]',
    LLL: 'YYYY[ko] MMMM[ren] D[a] HH:mm',
    LLLL: 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
    l: 'YYYY-M-D',
    ll: 'YYYY[ko] MMM D[a]',
    lll: 'YYYY[ko] MMM D[a] HH:mm',
    llll: 'ddd, YYYY[ko] MMM D[a] HH:mm',
  },
  calendar: {
    sameDay: '[gaur] LT[etan]',
    nextDay: '[bihar] LT[etan]',
    nextWeek: 'dddd LT[etan]',
    lastDay: '[atzo] LT[etan]',
    lastWeek: '[aurreko] dddd LT[etan]',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s barru',
    past: 'duela %s',
    s: 'segundo batzuk',
    ss: '%d segundo',
    m: 'minutu bat',
    mm: '%d minutu',
    h: 'ordu bat',
    hh: '%d ordu',
    d: 'egun bat',
    dd: '%d egun',
    w: 'astebete',
    ww: '%d aste',
    M: 'hilabete bat',
    MM: '%d hilabete',
    y: 'urte bat',
    yy: '%d urte',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Basque doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeEu
