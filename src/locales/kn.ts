/**
 * Kannada [kn]
 */

import type { Locale } from '~/plugins/locale'

const localeKn: Readonly<Locale> = {
  name: 'kn',
  weekdays: ['ಭಾನುವಾರ', 'ಸೋಮವಾರ', 'ಮಂಗಳವಾರ', 'ಬುಧವಾರ', 'ಗುರುವಾರ', 'ಶುಕ್ರವಾರ', 'ಶನಿವಾರ'],
  weekdaysShort: ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ'],
  weekdaysMin: ['ಭಾ', 'ಸೋ', 'ಮಂ', 'ಬು', 'ಗು', 'ಶು', 'ಶ'],
  months: [
    'ಜನವರಿ',
    'ಫೆಬ್ರವರಿ',
    'ಮಾರ್ಚ್',
    'ಏಪ್ರಿಲ್',
    'ಮೇ',
    'ಜೂನ್',
    'ಜುಲೈ',
    'ಆಗಸ್ಟ್',
    'ಸೆಪ್ಟೆಂಬರ್',
    'ಅಕ್ಟೋಬರ್',
    'ನವೆಂಬರ್',
    'ಡಿಸೆಂಬರ್',
  ],
  monthsShort: ['ಜನ', 'ಫೆಬ್ರ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂ', 'ಅಕ್ಟೋ', 'ನವೆಂ', 'ಡಿಸೆಂ'],
  dayOfMonthOrdinalParse: /\d{1,2}(ನೇ)/,
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'A h:mm',
    LTS: 'A h:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm',
    LLLL: 'dddd, D MMMM YYYY, A h:mm',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY, A h:mm',
    llll: 'dddd, D MMMM YYYY, A h:mm',
  },
  calendar: {
    sameDay: '[ಇಂದು] LT',
    nextDay: '[ನಾಳೆ] LT',
    nextWeek: 'dddd, LT',
    lastDay: '[ನಿನ್ನೆ] LT',
    lastWeek: '[ಕೊನೆಯ] dddd, LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s ನಂತರ',
    past: '%s ಹಿಂದೆ',
    s: 'ಕೆಲವು ಕ್ಷಣಗಳು',
    ss: '%d ಸೆಕೆಂಡುಗಳು',
    m: 'ಒಂದು ನಿಮಿಷ',
    mm: '%d ನಿಮಿಷ',
    h: 'ಒಂದು ಗಂಟೆ',
    hh: '%d ಗಂಟೆ',
    d: 'ಒಂದು ದಿನ',
    dd: '%d ದಿನ',
    w: 'ಒಂದು ವಾರ',
    ww: '%d ವಾರಗಳು',
    M: 'ಒಂದು ತಿಂಗಳು',
    MM: '%d ತಿಂಗಳು',
    y: 'ಒಂದು ವರ್ಷ',
    yy: '%d ವರ್ಷ',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Kannada doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeKn
