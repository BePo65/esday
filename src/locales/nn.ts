/**
 * Nynorsk [nn]
 */

import type { Locale } from '~/plugins/locale'

const localeNn: Readonly<Locale> = {
  name: 'nn',
  weekdays: ['sundag', 'måndag', 'tysdag', 'onsdag', 'torsdag', 'fredag', 'laurdag'],
  weekdaysShort: ['sun', 'mån', 'tys', 'ons', 'tor', 'fre', 'lau'],
  weekdaysMin: ['su', 'må', 'ty', 'on', 'to', 'fr', 'la'],
  months: [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
  ],
  monthsShort: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],
  ordinal: (n) => `${n}.`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY [kl.] H:mm',
    LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm',
    l: 'DD.MM.YYYY',
    ll: 'D. MMMM YYYY',
    lll: 'D. MMMM YYYY [kl.] H:mm',
    llll: 'dddd D. MMMM YYYY [kl.] HH:mm',
  },
  calendar: {
    sameDay: '[I dag klokka] LT',
    nextDay: '[I morgon klokka] LT',
    nextWeek: 'dddd [klokka] LT',
    lastDay: '[I går klokka] LT',
    lastWeek: '[Føregåande] dddd [klokka] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'om %s',
    past: 'for %s sidan',
    s: 'nokre sekund',
    ss: '%d sekund',
    m: 'eitt minutt',
    mm: '%d minutt',
    h: 'ein time',
    hh: '%d timar',
    d: 'ein dag',
    dd: '%d dagar',
    w: 'ei veke',
    ww: '%d veker',
    M: 'ein månad',
    MM: '%d månadar',
    y: 'eitt år',
    yy: '%d år',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Nynorsk doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeNn
