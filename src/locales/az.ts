/**
 * Azerbaijani [az]
 */

import type { Locale } from '~/plugins/locale'

const localeAz: Readonly<Locale> = {
  name: 'az',
  weekdays: [
    'Bazar',
    'Bazar ertəsi',
    'Çərşənbə axşamı',
    'Çərşənbə',
    'Cümə axşamı',
    'Cümə',
    'Şənbə',
  ],
  weekdaysShort: ['Baz', 'BzE', 'ÇAx', 'Çər', 'CAx', 'Cüm', 'Şən'],
  weekdaysMin: ['Bz', 'BE', 'ÇA', 'Çə', 'CA', 'Cü', 'Şə'],
  months: [
    'yanvar',
    'fevral',
    'mart',
    'aprel',
    'may',
    'iyun',
    'iyul',
    'avqust',
    'sentyabr',
    'oktyabr',
    'noyabr',
    'dekabr',
  ],
  monthsShort: ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avq', 'sen', 'okt', 'noy', 'dek'],
  dayOfMonthOrdinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY г.',
    LLL: 'D MMMM YYYY г., H:mm',
    LLLL: 'dddd, D MMMM YYYY г., H:mm',
    l: 'DD.MM.YYYY',
    ll: 'D MMMM YYYY г.',
    lll: 'D MMMM YYYY г., H:mm',
    llll: 'dddd, D MMMM YYYY г., H:mm',
  },
  calendar: {
    sameDay: '[bugün saat] LT',
    nextDay: '[sabah saat] LT',
    nextWeek: '[gələn həftə] dddd [saat] LT',
    lastDay: '[dünən] LT',
    lastWeek: '[keçən həftə] dddd [saat] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s sonra',
    past: '%s əvvəl',
    s: 'bir neçə saniyə',
    ss: '%d saniyə',
    m: 'bir dəqiqə',
    mm: '%d dəqiqə',
    h: 'bir saat',
    hh: '%d saat',
    d: 'bir gün',
    dd: '%d gün',
    w: 'bir həftə',
    ww: '%d gün',
    M: 'bir ay',
    MM: '%d ay',
    y: 'bir il',
    yy: '%d il',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Azerbaijani doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeAz
