/**
 * Gujarati [gu]
 */

import type { Locale } from '~/plugins/locale'

const localeGu: Readonly<Locale> = {
  name: 'gu',
  weekdays: ['રવિવાર', 'સોમવાર', 'મંગળવાર', 'બુધ્વાર', 'ગુરુવાર', 'શુક્રવાર', 'શનિવાર'],
  weekdaysShort: ['રવિ', 'સોમ', 'મંગળ', 'બુધ્', 'ગુરુ', 'શુક્ર', 'શનિ'],
  weekdaysMin: ['ર', 'સો', 'મં', 'બુ', 'ગુ', 'શુ', 'શ'],
  months: [
    'જાન્યુઆરી',
    'ફેબ્રુઆરી',
    'માર્ચ',
    'એપ્રિલ',
    'મે',
    'જૂન',
    'જુલાઈ',
    'ઑગસ્ટ',
    'સપ્ટેમ્બર',
    'ઑક્ટ્બર',
    'નવેમ્બર',
    'ડિસેમ્બર',
  ],
  monthsShort: [
    'જાન્યુ.',
    'ફેબ્રુ.',
    'માર્ચ',
    'એપ્રિ.',
    'મે',
    'જૂન',
    'જુલા.',
    'ઑગ.',
    'સપ્ટે.',
    'ઑક્ટ્.',
    'નવે.',
    'ડિસે.',
  ],
  ordinal: (n) => `${n}`,
  weekStart: 0, // Sunday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'A h:mm વાગ્યે',
    LTS: 'A h:mm:ss વાગ્યે',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm વાગ્યે',
    LLLL: 'dddd, D MMMM YYYY, A h:mm વાગ્યે',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY, A h:mm વાગ્યે',
    llll: 'dddd, D MMMM YYYY, A h:mm વાગ્યે',
  },
  calendar: {
    sameDay: '[આજ] LT',
    nextDay: '[કાલે] LT',
    nextWeek: 'dddd, LT',
    lastDay: '[ગઇકાલે] LT',
    lastWeek: '[પાછલા] dddd, LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s મા',
    past: '%s પેહલા',
    s: 'અમુક પળો',
    ss: '%d સેકંડ',
    m: 'એક મિનિટ',
    mm: '%d મિનિટ',
    h: 'એક કલાક',
    hh: '%d કલાક',
    d: 'એક દિવસ',
    dd: '%d દિવસ',
    w: 'એક અઠવાડિયું',
    ww: '%d અઠવાડિયા',
    M: 'એક મહિનો',
    MM: '%d મહિનો',
    y: 'એક વર્ષ',
    yy: '%d વર્ષ',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Gujarati doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeGu
