/**
 * Faroese [fo]
 */

import type { Locale } from '~/plugins/locale'

const localeFo: Readonly<Locale> = {
  name: 'fo',
  weekdays: [
    'sunnudagur',
    'mánadagur',
    'týsdagur',
    'mikudagur',
    'hósdagur',
    'fríggjadagur',
    'leygardagur',
  ],
  weekdaysShort: ['sun', 'mán', 'týs', 'mik', 'hós', 'frí', 'ley'],
  weekdaysMin: ['su', 'má', 'tý', 'mi', 'hó', 'fr', 'le'],
  months: [
    'januar',
    'februar',
    'mars',
    'apríl',
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
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D. MMMM, YYYY HH:mm',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'dddd D. MMMM, YYYY HH:mm',
  },
  calendar: {
    sameDay: '[Í dag kl.] LT',
    nextDay: '[Í morgin kl.] LT',
    nextWeek: 'dddd [kl.] LT',
    lastDay: '[Í gjár kl.] LT',
    lastWeek: '[síðstu] dddd [kl] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'um %s',
    past: '%s síðani',
    s: 'fá sekund',
    ss: '%d sekundir',
    m: 'ein minuttur',
    mm: '%d minuttir',
    h: 'ein tími',
    hh: '%d tímar',
    d: 'ein dagur',
    dd: '%d dagar',
    w: 'eina viku',
    ww: '%d vikum',
    M: 'ein mánaður',
    MM: '%d mánaðir',
    y: 'eitt ár',
    yy: '%d ár',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Faroese doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeFo
