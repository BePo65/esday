/**
 * Danish [da]
 */

import type { Locale } from '~/plugins/locale'

const localeDa: Readonly<Locale> = {
  name: 'da',
  weekdays: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
  weekdaysShort: ['søn.', 'man.', 'tirs.', 'ons.', 'tors.', 'fre.', 'lør.'],
  weekdaysMin: ['sø.', 'ma.', 'ti.', 'on.', 'to.', 'fr.', 'lø.'],
  months: [
    'januar',
    'februar',
    'marts',
    'april',
    'maj',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'december',
  ],
  monthsShort: [
    'jan.',
    'feb.',
    'mar.',
    'apr.',
    'maj',
    'juni',
    'juli',
    'aug.',
    'sept.',
    'okt.',
    'nov.',
    'dec.',
  ],
  ordinal: (n) => `${n}.`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY HH:mm',
    LLLL: 'dddd [d.] D. MMMM YYYY [kl.] HH:mm',
    l: 'DD.MM.YYYY',
    ll: 'D. MMMM YYYY',
    lll: 'D. MMMM YYYY HH:mm',
    llll: 'dddd [d.] D. MMMM YYYY [kl.] HH:mm',
  },
  calendar: {
    sameDay: '[i dag kl.] LT',
    nextDay: '[i morgen kl.] LT',
    nextWeek: 'på dddd [kl.] LT',
    lastDay: '[i går kl.] LT',
    lastWeek: '[i] dddd[s kl.] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'om %s',
    past: '%s siden',
    s: 'få sekunder',
    ss: '%d sekunder',
    m: 'et minut',
    mm: '%d minutter',
    h: 'en time',
    hh: '%d timer',
    d: 'en dag',
    dd: '%d dage',
    w: 'en uge',
    ww: '%d uger',
    M: 'en måned',
    MM: '%d måneder',
    y: 'et år',
    yy: '%d år',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Danish doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeDa
