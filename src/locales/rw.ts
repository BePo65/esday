/**
 * Kinyarwanda (Rwanda) [rw]
 */

import type { Locale } from '~/plugins/locale'

const localeRw: Readonly<Locale> = {
  name: 'rw',
  weekdays: [
    'Ku Cyumweru',
    'Kuwa Mbere',
    'Kuwa Kabiri',
    'Kuwa Gatatu',
    'Kuwa Kane',
    'Kuwa Gatanu',
    'Kuwa Gatandatu',
  ],
  weekdaysShort: [
    'Ku Cyumweru',
    'Kuwa Mbere',
    'Kuwa Kabiri',
    'Kuwa Gatatu',
    'Kuwa Kane',
    'Kuwa Gatanu',
    'Kuwa Gatandatu',
  ],
  weekdaysMin: [
    'Ku Cyumweru',
    'Kuwa Mbere',
    'Kuwa Kabiri',
    'Kuwa Gatatu',
    'Kuwa Kane',
    'Kuwa Gatanu',
    'Kuwa Gatandatu',
  ],
  months: [
    'Mutarama',
    'Gashyantare',
    'Werurwe',
    'Mata',
    'Gicurasi',
    'Kamena',
    'Nyakanga',
    'Kanama',
    'Nzeri',
    'Ukwakira',
    'Ugushyingo',
    'Ukuboza',
  ],
  monthsShort: [
    'Mutarama',
    'Gashyantare',
    'Werurwe',
    'Mata',
    'Gicurasi',
    'Kamena',
    'Nyakanga',
    'Kanama',
    'Nzeri',
    'Ukwakira',
    'Ugushyingo',
    'Ukuboza',
  ],
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
    sameDay: '[Uyu munsi kuri] LT',
    nextDay: '[Ejo kuri] LT',
    nextWeek: 'dddd [kuri] LT',
    lastDay: '[Ejo kuri] LT',
    lastWeek: '[Iheruka] dddd [kuri] LT',
    sameElse: 'L',
  },

  relativeTime: {
    future: 'mu %s',
    past: '%s',
    s: 'amasegonda',
    ss: '%d amasegonda',
    m: 'Umunota',
    mm: '%d iminota',
    h: 'isaha',
    hh: '%d amasaha',
    d: 'Umunsi',
    dd: '%d iminsi',
    w: 'icyumweru',
    ww: '%d ibyumweru',
    M: 'ukwezi',
    MM: '%d amezi',
    y: 'umwaka',
    yy: '%d imyaka',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Kinyarwanda doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeRw
