/**
 * Latvian [lv]
 */

import type { Locale } from '~/plugins/locale'

const localeLv: Locale = {
  name: 'lv',
  weekdays: [
    'svētdiena',
    'pirmdiena',
    'otrdiena',
    'trešdiena',
    'ceturtdiena',
    'piektdiena',
    'sestdiena',
  ],
  weekdaysShort: ['Sv', 'P', 'O', 'T', 'C', 'Pk', 'S'],
  weekdaysMin: ['Sv', 'P', 'O', 'T', 'C', 'Pk', 'S'],
  months: [
    'janvāris',
    'februāris',
    'marts',
    'aprīlis',
    'maijs',
    'jūnijs',
    'jūlijs',
    'augusts',
    'septembris',
    'oktobris',
    'novembris',
    'decembris',
  ],
  monthsShort: ['jan', 'feb', 'mar', 'apr', 'mai', 'jūn', 'jūl', 'aug', 'sep', 'okt', 'nov', 'dec'],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY.',
    LL: 'YYYY. [gada] D. MMMM',
    LLL: 'YYYY. [gada] D. MMMM, HH:mm',
    LLLL: 'YYYY. [gada] D. MMMM, dddd, HH:mm',
    l: 'DD.MM.YYYY.',
    ll: 'YYYY. [gada] D. MMMM',
    lll: 'YYYY. [gada] D. MMMM, HH:mm',
    llll: 'YYYY. [gada] D. MMMM, dddd, HH:mm',
  },
  calendar: {
    sameDay: '[Šodien pulksten] LT',
    nextDay: '[Rīt pulksten] LT',
    nextWeek: 'dddd [pulksten] LT',
    lastDay: '[Vakar pulksten] LT',
    lastWeek: '[Pagājušā] dddd [pulksten] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'pēc %s',
    past: 'pirms %s',
    s: 'dažām sekundēm',
    ss: '%d sekundēm',
    m: 'minūtes',
    mm: '%d minūtēm',
    h: 'stundas',
    hh: '%d stundām',
    d: 'dienas',
    dd: '%d dienām',
    w: 'nedēļas',
    ww: '%d nedēļām',
    M: 'mēneša',
    MM: '%d mēnešiem',
    y: 'gada',
    yy: '%d gadiem',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Latvian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeLv
