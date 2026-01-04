/**
 * Sinhalese [si]
 */

import type { Locale } from '~/plugins/locale'

const localeSi: Readonly<Locale> = {
  name: 'si',
  weekdays: ['ඉරිදා', 'සඳුදා', 'අඟහරුවාදා', 'බදාදා', 'බ්‍රහස්පතින්දා', 'සිකුරාදා', 'සෙනසුරාදා'],
  weekdaysShort: ['ඉරි', 'සඳු', 'අඟ', 'බදා', 'බ්‍රහ', 'සිකු', 'සෙන'],
  weekdaysMin: ['ඉ', 'ස', 'අ', 'බ', 'බ්‍ර', 'සි', 'සෙ'],
  months: ['දුරුතු', 'නවම්', 'මැදින්', 'බක්', 'වෙසක්', 'පොසොන්', 'ඇසළ', 'නිකිණි', 'බිනර', 'වප්', 'ඉල්', 'උඳුවප්'],
  monthsShort: ['දුරු', 'නව', 'මැදි', 'බක්', 'වෙස', 'පොසො', 'ඇස', 'නිකි', 'බින', 'වප්', 'ඉල්', 'උඳු'],
  dayOfMonthOrdinalParse: /\d{1,2} වැනි/,
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'a h:mm',
    LTS: 'a h:mm:ss',
    L: 'YYYY/MM/DD',
    LL: 'YYYY MMMM D',
    LLL: 'YYYY MMMM D, a h:mm',
    LLLL: 'YYYY MMMM D [වැනි] dddd, a h:mm:ss',
    l: 'YYYY/MM/DD',
    ll: 'YYYY MMMM D',
    lll: 'YYYY MMMM D, a h:mm',
    llll: 'YYYY MMMM D [වැනි] dddd, a h:mm:ss',
  },
  calendar: {
    sameDay: '[අද] LT[ට]',
    nextDay: '[හෙට] LT[ට]',
    nextWeek: 'dddd LT[ට]',
    lastDay: '[ඊයේ] LT[ට]',
    lastWeek: '[පසුගිය] dddd LT[ට]',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%sකින්',
    past: '%sකට පෙර',
    s: 'තත්පර කිහිපය',
    ss: 'තත්පර %d',
    m: 'විනාඩිය',
    mm: 'විනාඩි %d',
    h: 'පැය',
    hh: 'පැය %d',
    d: 'දිනය',
    dd: 'දින %d',
    w: 'සතියක්',
    ww: 'සති %d',
    M: 'මාසය',
    MM: 'මාස %d',
    y: 'වසර',
    yy: 'වසර %d',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    if (hour > 11) {
      return isLowercase ? 'ප.ව.' : 'පස් වරු'
    }
    return isLowercase ? 'පෙ.ව.' : 'පෙර වරු'
  },
}

export default localeSi
