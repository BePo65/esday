/**
 * Burmese [my]
 */

import type { Locale } from '~/plugins/locale'

// used in preParse function (number symbol => number)
const burmeseToEnglishNumbersMap = {
  '၁': '1',
  '၂': '2',
  '၃': '3',
  '၄': '4',
  '၅': '5',
  '၆': '6',
  '၇': '7',
  '၈': '8',
  '၉': '9',
  '၀': '0',
}

// used in postFormat function (number => number symbol)
const englishToBurmeseNumbersMap = {
  1: '၁',
  2: '၂',
  3: '၃',
  4: '၄',
  5: '၅',
  6: '၆',
  7: '၇',
  8: '၈',
  9: '၉',
  0: '၀',
}

const localeMy: Readonly<Locale> = {
  name: 'my',
  weekdays: ['တနင်္ဂနွေ', 'lတနင်္လာ', 'lအင်္ဂါ', 'lဗုဒ္ဓဟူး', 'lကြာသပတေး', 'lသောကြာ', 'lစနေ'],
  weekdaysShort: ['နွေ', 'lလာ', 'lဂါ', 'lဟူး', 'lကြာ', 'lသော', 'lနေ'],
  weekdaysMin: ['နွေ', 'lလာ', 'lဂါ', 'lဟူး', 'lကြာ', 'lသော', 'lနေ'],
  months: [
    'ဇန်နဝါရီ',
    'lဖေဖော်ဝါရီ',
    'lမတ်',
    'lဧပြီ',
    'lမေ',
    'lဇွန်',
    'lဇူလိုင်',
    'lသြဂုတ်',
    'lစက်တင်ဘာ',
    'lအောက်တိုဘာ',
    'lနိုဝင်ဘာ',
    'lဒီဇင်ဘာ',
  ],
  monthsShort: ['ဇန်', 'lဖေ', 'lမတ်', 'lပြီ', 'lမေ', 'lဇွန်', 'lလိုင်', 'lသြ', 'lစက်', 'lအောက်', 'lနို', 'lဒီ'],
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: (n) => `${n}`,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[ယနေ.] LT [မှာ]',
    nextDay: '[မနက်ဖြန်] LT [မှာ]',
    nextWeek: 'dddd LT [မှာ]',
    lastDay: '[မနေ.က] LT [မှာ]',
    lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'လာမည့် %s မှာ',
    past: 'လွန်ခဲ့သော %s က',
    s: 'စက္ကန်.အနည်းငယ်',
    ss: '%d စက္ကန့်',
    m: 'တစ်မိနစ်',
    mm: '%d မိနစ်',
    h: 'တစ်နာရီ',
    hh: '%d နာရီ',
    d: 'တစ်ရက်',
    dd: '%d ရက်',
    w: 'တစ်ပတ်',
    ww: '%d ပတ်',
    M: 'တစ်လ',
    MM: '%d လ',
    y: 'တစ်နှစ်',
    yy: '%d နှစ်',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Burmese doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
  preParse: (dateString: string) =>
    dateString.replace(
      /[၁၂၃၄၅၆၇၈၉၀]/g,
      (match) => burmeseToEnglishNumbersMap[match as keyof typeof burmeseToEnglishNumbersMap],
    ),
  postFormat: (formattedDate: string) =>
    formattedDate.replace(
      /\d/g,
      (match) =>
        englishToBurmeseNumbersMap[Number(match) as keyof typeof englishToBurmeseNumbersMap],
    ),
}

export default localeMy
