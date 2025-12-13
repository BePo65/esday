/**
 * Afrikaans [af]
 */

import type { Locale } from '~/plugins/locale'

const localeAf: Readonly<Locale> = {
  name: 'af',
  weekdays: ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag'],
  weekdaysShort: ['Son', 'Maa', 'Din', 'Woe', 'Don', 'Vry', 'Sat'],
  weekdaysMin: ['So', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Sa'],
  months: [
    'Januarie',
    'Februarie',
    'Maart',
    'April',
    'Mei',
    'Junie',
    'Julie',
    'Augustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
  monthsShort: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
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
    sameDay: '[Vandag om] LT',
    nextDay: '[Môre om] LT',
    nextWeek: 'dddd [om] LT',
    lastDay: '[Gister om] LT',
    lastWeek: '[Laas] dddd [om] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'oor %s',
    past: '%s gelede',
    s: 'n paar sekondes',
    ss: '%d sekondes',
    m: 'n minuut',
    mm: '%d minute',
    h: 'n uur',
    hh: '%d ure',
    d: 'n dag',
    dd: '%d dae',
    w: 'n week',
    ww: '%d weke',
    M: 'n maand',
    MM: '%d maande',
    y: 'n jaar',
    yy: '%d jaar',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Afrikaans doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeAf
