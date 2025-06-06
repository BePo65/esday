/**
 * Tibetan [bo]
 */

import type { Locale } from '~/plugins/locale'

const localeBo: Readonly<Locale> = {
  name: 'bo',
  weekdays: [
    'གཟའ་ཉི་མ་',
    'གཟའ་ཟླ་བ་',
    'གཟའ་མིག་དམར་',
    'གཟའ་ལྷག་པ་',
    'གཟའ་ཕུར་བུ',
    'གཟའ་པ་སངས་',
    'གཟའ་སྤེན་པ་',
  ],
  weekdaysShort: ['ཉི་མ་', 'ཟླ་བ་', 'མིག་དམར་', 'ལྷག་པ་', 'ཕུར་བུ', 'པ་སངས་', 'སྤེན་པ་'],
  weekdaysMin: ['ཉི་མ་', 'ཟླ་བ་', 'མིག་དམར་', 'ལྷག་པ་', 'ཕུར་བུ', 'པ་སངས་', 'སྤེན་པ་'],
  months: [
    'ཟླ་བ་དང་པོ',
    'ཟླ་བ་གཉིས་པ',
    'ཟླ་བ་གསུམ་པ',
    'ཟླ་བ་བཞི་པ',
    'ཟླ་བ་ལྔ་པ',
    'ཟླ་བ་དྲུག་པ',
    'ཟླ་བ་བདུན་པ',
    'ཟླ་བ་བརྒྱད་པ',
    'ཟླ་བ་དགུ་པ',
    'ཟླ་བ་བཅུ་པ',
    'ཟླ་བ་བཅུ་གཅིག་པ',
    'ཟླ་བ་བཅུ་གཉིས་པ',
  ],
  monthsShort: [
    'ཟླ་དང་པོ',
    'ཟླ་གཉིས་པ',
    'ཟླ་གསུམ་པ',
    'ཟླ་བཞི་པ',
    'ཟླ་ལྔ་པ',
    'ཟླ་དྲུག་པ',
    'ཟླ་བདུན་པ',
    'ཟླ་བརྒྱད་པ',
    'ཟླ་དགུ་པ',
    'ཟླ་བཅུ་པ',
    'ཟླ་བཅུ་གཅིག་པ',
    'ཟླ་བཅུ་གཉིས་པ',
  ],
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
    sameDay: '[དི་རིང] LT',
    nextDay: '[སང་ཉིན] LT',
    nextWeek: '[བདུན་ཕྲག་རྗེས་མ], LT',
    lastDay: '[ཁ་སང] LT',
    lastWeek: '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s ལ་',
    past: '%s སྔོན་ལ་',
    s: 'ཏོག་ཙམ་',
    ss: '%d སྐར་ཆ།',
    m: 'སྐར་མ་གཅིག་',
    mm: 'སྐར་མ་ %d',
    h: 'ཆུ་ཚོད་གཅིག་',
    hh: 'ཆུ་ཚོད་ %d',
    d: 'ཉིན་གཅིག་',
    dd: 'ཉིན་ %d',
    M: 'ཟླ་བ་གཅིག་',
    MM: 'ཟླ་བ་ %d',
    y: 'ལོ་གཅིག་',
    yy: 'ལོ་ %d',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Tibetan doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeBo
