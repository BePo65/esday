/**
 * Nepalese [ne]
 */

import type { Locale } from '~/plugins/locale'

const localeNe: Readonly<Locale> = {
  name: 'ne',
  weekdays: ['आइतबार', 'सोमबार', 'मङ्गलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'],
  weekdaysShort: ['आइत.', 'सोम.', 'मङ्गल.', 'बुध.', 'बिहि.', 'शुक्र.', 'शनि.'],
  weekdaysMin: ['आ.', 'सो.', 'मं.', 'बु.', 'बि.', 'शु.', 'श.'],
  months: [
    'जनवरी',
    'फेब्रुवरी',
    'मार्च',
    'अप्रिल',
    'मे',
    'जुन',
    'जुलाई',
    'अगष्ट',
    'सेप्टेम्बर',
    'अक्टोबर',
    'नोभेम्बर',
    'डिसेम्बर',
  ],
  monthsShort: [
    'जन.',
    'फेब्रु.',
    'मार्च',
    'अप्रि.',
    'मई',
    'जुन',
    'जुलाई.',
    'अग.',
    'सेप्ट.',
    'अक्टो.',
    'नोभे.',
    'डिसे.',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: (n) => `${n}`.replace(/\d/g, (i: string) => '०१२३४५६७८९'[+i]),
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'Aको h:mm बजे',
    LTS: 'Aको h:mm:ss बजे',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, Aको h:mm बजे',
    LLLL: 'dddd, D MMMM YYYY, Aको h:mm बजे',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY, Aको h:mm बजे',
    llll: 'dddd, D MMMM YYYY, Aको h:mm बजे',
  },
  calendar: {
    sameDay: '[आज] LT',
    nextDay: '[भोलि] LT',
    nextWeek: '[आउँदो] dddd[,] LT',
    lastDay: '[हिजो] LT',
    lastWeek: '[गएको] dddd[,] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s पछि',
    past: '%s अघि',
    s: 'सेकेन्ड',
    ss: '%d sekunder',
    m: 'एक मिनेट',
    mm: '%d मिनेट',
    h: 'घन्टा',
    hh: '%d घन्टा',
    d: 'एक दिन',
    dd: '%d दिन',
    w: 'ia हप्ता',
    ww: '%d हप्ता',
    M: 'एक महिना',
    MM: '%d महिना',
    y: 'एक वर्ष',
    yy: '%d वर्ष',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Nepalese doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeNe
