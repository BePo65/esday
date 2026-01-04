/**
 * Bislama [bi]
 */

import type { Locale } from '~/plugins/locale'

const localeBi: Readonly<Locale> = {
  name: 'bi',
  weekdays: ['Sande', 'Mande', 'Tusde', 'Wenesde', 'Tosde', 'Fraede', 'Sarade'],
  weekdaysShort: ['San', 'Man', 'Tus', 'Wen', 'Tos', 'Frae', 'Sar'],
  weekdaysMin: ['San', 'Ma', 'Tu', 'We', 'To', 'Fr', 'Sar'],
  months: [
    'Januari',
    'Februari',
    'Maj',
    'Eprel',
    'Mei',
    'Jun',
    'Julae',
    'Okis',
    'Septemba',
    'Oktoba',
    'Novemba',
    'Disemba',
  ],
  monthsShort: ['Jan', 'Feb', 'Maj', 'Epr', 'Mai', 'Jun', 'Jul', 'Oki', 'Sep', 'Okt', 'Nov', 'Dis'],
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY h:mm A',
    LLLL: 'dddd, D MMMM YYYY h:mm A',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY h:mm A',
    llll: 'dddd, D MMMM YYYY h:mm A',
  },
  calendar: {
    sameDay: '[Tede long] LT',
    nextDay: '[Tumora long] LT',
    nextWeek: 'dddd [long] LT',
    lastDay: '[Yestede long] LT',
    lastWeek: '[Las] dddd [long] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'lo %s',
    past: '%s bifo',
    s: 'sam seken',
    ss: '%d seken',
    m: 'wan minit',
    mm: '%d minit',
    h: 'wan haoa',
    hh: '%d haoa',
    d: 'wan dei',
    dd: '%d dei',
    w: 'wan wik',
    ww: '%d wik',
    M: 'wan manis',
    MM: '%d manis',
    y: 'wan yia',
    yy: '%d yia',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Bislama doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeBi
