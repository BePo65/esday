/**
 * Bambara [bm]
 */

import type { Locale } from '~/plugins/locale'

const localeBm: Readonly<Locale> = {
  name: 'bm',
  weekdays: ['Kari', 'Ntɛnɛn', 'Tarata', 'Araba', 'Alamisa', 'Juma', 'Sibiri'],
  weekdaysShort: ['Kar', 'Ntɛ', 'Tar', 'Ara', 'Ala', 'Jum', 'Sib'],
  weekdaysMin: ['Ka', 'Nt', 'Ta', 'Ar', 'Al', 'Ju', 'Si'],
  months: [
    'Zanwuyekalo',
    'Fewuruyekalo',
    'Marisikalo',
    'Awirilikalo',
    'Mɛkalo',
    'Zuwɛnkalo',
    'Zuluyekalo',
    'Utikalo',
    'Sɛtanburukalo',
    'ɔkutɔburukalo',
    'Nowanburukalo',
    'Desanburukalo',
  ],
  monthsShort: ['Zan', 'Few', 'Mar', 'Awi', 'Mɛ', 'Zuw', 'Zul', 'Uti', 'Sɛt', 'ɔku', 'Now', 'Des'],
  ordinal: (n) => `${n}`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'MMMM [tile] D [san] YYYY',
    LLL: 'MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm',
    LLLL: 'dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm',
    l: 'DD/MM/YYYY',
    ll: 'MMMM [tile] D [san] YYYY',
    lll: 'MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm',
    llll: 'dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm',
  },
  calendar: {
    sameDay: '[Bi lɛrɛ] LT',
    nextDay: '[Sini lɛrɛ] LT',
    nextWeek: 'dddd [don lɛrɛ] LT',
    lastDay: '[Kunu lɛrɛ] LT',
    lastWeek: 'dddd [tɛmɛnen lɛrɛ] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s kɔnɔ',
    past: 'a bɛ %s bɔ',
    s: 'sanga dama dama',
    ss: 'sekondi  %d',
    m: 'miniti kelen',
    mm: 'miniti %d',
    h: 'lɛrɛ kelen',
    hh: 'lɛrɛ %d',
    d: 'tile kelen',
    dd: 'tile %d',
    w: 'dɔgɔkun kelen',
    ww: 'dɔgɔkunw %d',
    M: 'kalo kelen',
    MM: 'kalo %d',
    y: 'san kelen',
    yy: 'san %d',
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Bambara doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeBm
