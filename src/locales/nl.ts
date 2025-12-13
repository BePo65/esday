/**
 * Dutch [nl]
 */

import type { Locale } from '~/plugins/locale'

const localeNl: Readonly<Locale> = {
  name: 'nl',
  weekdays: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
  weekdaysShort: ['zo.', 'ma.', 'di.', 'wo.', 'do.', 'vr.', 'za.'],
  weekdaysMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
  months: [
    'januari',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december',
  ],
  monthsShort: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
  ordinal: (n) => `[${n}${n === 1 || n === 8 || n >= 20 ? 'ste' : 'de'}]`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD-MM-YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
    l: 'DD-MM-YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[vandaag om] LT',
    nextDay: '[morgen om] LT',
    nextWeek: 'dddd [om] LT',
    lastDay: '[gisteren om] LT',
    lastWeek: '[afgelopen] dddd [om] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'over %s',
    past: '%s geleden',
    s: 'een paar seconden',
    ss: '%d seconden',
    m: 'een minuut',
    mm: '%d minuten',
    h: 'een uur',
    hh: '%d uur',
    d: 'een dag',
    dd: '%d dagen',
    w: 'één week',
    ww: '%d weken',
    M: 'een maand',
    MM: '%d maanden',
    y: 'een jaar',
    yy: '%d jaar',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Dutch doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeNl
