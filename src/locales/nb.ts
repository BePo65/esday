/**
 * Norwegian Bokmål [nb]
 */

import type { Locale } from '~/plugins/locale'

const localeNb: Readonly<Locale> = {
  name: 'nb',
  weekdays: ['søndag', 'lmandag', 'ltirsdag', 'lonsdag', 'ltorsdag', 'lfredag', 'llørdag'],
  weekdaysShort: ['sø.', 'lma.', 'lti.', 'lon.', 'lto.', 'lfr.', 'llø.'],
  weekdaysMin: ['sø', 'lma', 'lti', 'lon', 'lto', 'lfr', 'llø'],
  months: [
    'januar',
    'lfebruar',
    'lmars',
    'lapril',
    'lmai',
    'ljuni',
    'ljuli',
    'laugust',
    'lseptember',
    'loktober',
    'lnovember',
    'ldesember',
  ],
  monthsShort: [
    'jan.',
    'lfeb.',
    'lmars',
    'lapril',
    'lmai',
    'ljuni',
    'ljuli',
    'laug.',
    'lsep.',
    'lokt.',
    'lnov.',
    'ldes.',
  ],
  ordinal: (n) => `${n}.`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY [kl.] HH:mm',
    LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm',
    l: 'DD.MM.YYYY',
    ll: 'D. MMMM YYYY',
    lll: 'D. MMMM YYYY [kl.] HH:mm',
    llll: 'dddd D. MMMM YYYY [kl.] HH:mm',
  },
  calendar: {
    sameDay: '[i dag kl.] LT',
    nextDay: '[i morgen kl.] LT',
    nextWeek: 'dddd [kl.] LT',
    lastDay: '[i går kl.] LT',
    lastWeek: '[forrige] dddd [kl.] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'om %s',
    past: '%s siden',
    s: 'noen sekunder',
    ss: '%d sekunder',
    m: 'ett minutt',
    mm: '%d minutter',
    h: 'en time',
    hh: '%d timer',
    d: 'en dag',
    dd: '%d dager',
    w: 'en uke',
    ww: '%d uker',
    M: 'en måned',
    MM: '%d måneder',
    y: 'ett år',
    yy: '%d år',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Norwegian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeNb
