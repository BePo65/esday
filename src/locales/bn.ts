/**
 * Bengali [bn]
 */

import type { Locale } from '~/plugins/locale'

// used in preParse function (number symbol => number)
const bengaliToEnglishNumbersMap: Record<string, string> = {
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
  '০': '0',
}

// used in postFormat function (number => number symbol)
const englishToBengaliNumbersMap: Record<string, string> = {
  1: '১',
  2: '২',
  3: '৩',
  4: '৪',
  5: '৫',
  6: '৬',
  7: '৭',
  8: '৮',
  9: '৯',
  0: '০',
}

const localeBn: Readonly<Locale> = {
  name: 'bn',
  weekdays: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],
  weekdaysShort: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'],
  weekdaysMin: ['রবি', 'সোম', 'মঙ্গ', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'],
  months: [
    'জানুয়ারি',
    'ফেব্রুয়ারি',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর',
  ],
  monthsShort: [
    'জানু',
    'ফেব্রু',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্ট',
    'অক্টো',
    'নভে',
    'ডিসে',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: (n) => `${n}`, // No special ordinal format
  weekStart: 0, // The file did not contain this information, we will set it to zero as default.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
  formats: {
    LT: 'A h:mm সময়',
    LTS: 'A h:mm:ss সময়',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm সময়',
    LLLL: 'dddd, D MMMM YYYY, A h:mm সময়',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY, A h:mm সময়',
    llll: 'dddd, D MMMM YYYY, A h:mm সময়',
  },
  calendar: {
    sameDay: '[আজ] LT',
    nextDay: '[আগামীকাল] LT',
    nextWeek: 'dddd, LT',
    lastDay: '[গতকাল] LT',
    lastWeek: '[গত] dddd, LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s পরে',
    past: '%s আগে',
    s: 'কয়েক সেকেন্ড',
    ss: '%d সেকেন্ড',
    m: 'এক মিনিট',
    mm: '%d মিনিট',
    h: 'এক ঘন্টা',
    hh: '%d ঘন্টা',
    d: 'এক দিন',
    dd: '%d দিন',
    w: 'প্রতি সপ্তাহে',
    ww: '%d সপ্তাহ',
    M: 'এক মাস',
    MM: '%d মাস',
    y: 'এক বছর',
    yy: '%d বছর',
  },
  // eslint-disable-next-line  unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => {
    if (hour < 4) {
      return 'রাত'
    }
    if (hour < 10) {
      return 'সকাল'
    }
    if (hour < 17) {
      return 'দুপুর'
    }
    if (hour < 20) {
      return 'বিকাল'
    }
    return 'রাত'
  },
  preParse: (string) =>
    string.replace(/[১২৩৪৫৬৭৮৯০]/g, (match) => bengaliToEnglishNumbersMap[match]),
  postFormat: (string) => string.replace(/\d/g, (match) => englishToBengaliNumbersMap[match]),
}

export default localeBn
