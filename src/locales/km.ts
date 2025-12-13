/**
 * Cambodian [km]
 */

import type { Locale } from '~/plugins/locale'

const localeKm: Readonly<Locale> = {
  name: 'km',
  weekdays: ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'],
  weekdaysShort: ['អា', 'ច', 'អ', 'ព', 'ព្រ', 'សុ', 'ស'],
  weekdaysMin: ['អា', 'ច', 'អ', 'ព', 'ព្រ', 'សុ', 'ស'],
  months: [
    'មករា',
    'កុម្ភៈ',
    'មីនា',
    'មេសា',
    'ឧសភា',
    'មិថុនា',
    'កក្កដា',
    'សីហា',
    'កញ្ញា',
    'តុលា',
    'វិច្ឆិកា',
    'ធ្នូ',
  ],
  monthsShort: [
    'មករា',
    'កុម្ភៈ',
    'មីនា',
    'មេសា',
    'ឧសភា',
    'មិថុនា',
    'កក្កដា',
    'សីហា',
    'កញ្ញា',
    'តុលា',
    'វិច្ឆិកា',
    'ធ្នូ',
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
    sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
    nextDay: '[ស្អែក ម៉ោង] LT',
    nextWeek: 'dddd [ម៉ោង] LT',
    lastDay: '[ម្សិលមិញ ម៉ោង] LT',
    lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%sទៀត',
    past: '%sមុន',
    s: 'ប៉ុន្មានវិនាទី',
    ss: '%d វិនាទី',
    m: 'មួយនាទី',
    mm: '%d នាទី',
    h: 'មួយម៉ោង',
    hh: '%d ម៉ោង',
    d: 'មួយថ្ងៃ',
    dd: '%d ថ្ងៃ',
    w: 'មួយសប្តាហ៍',
    ww: '%d សប្តាហ៍',
    M: 'មួយខែ',
    MM: '%d ខែ',
    y: 'មួយឆ្នាំ',
    yy: '%d ឆ្នាំ',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Cambodian doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeKm
