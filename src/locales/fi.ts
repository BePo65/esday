/**
 * Finnish [fi]
 */

import type { Locale, RelativeTimeElementFunction } from '~/plugins/locale'

const relativeTimeFormatter: RelativeTimeElementFunction = (
  timeValue: string | number,
  withoutSuffix: boolean,
  token: string,
  isFuture: boolean,
) => {
  const pastWords = {
    s: 'muutama sekunti',
    ss: '%d sekuntia',
    m: 'minuutti',
    mm: '%d minuuttia',
    h: 'tunti',
    hh: '%d tuntia',
    d: 'päivä',
    dd: '%d päivää',
    w: 'viikon',
    ww: '%d viikkoa',
    M: 'kuukausi',
    MM: '%d kuukautta',
    y: 'vuosi',
    yy: '%d vuotta',
  }
  const pastNumbers = [
    'nolla',
    'yksi',
    'kaksi',
    'kolme',
    'neljä',
    'viisi',
    'kuusi',
    'seitsemän',
    'kahdeksan',
    'yhdeksän',
  ]

  const futureWords = {
    s: 'muutaman sekunnin',
    ss: '%d sekunnin',
    m: 'minuutin',
    mm: '%d minuutin',
    h: 'tunnin',
    hh: '%d tunnin',
    d: 'päivän',
    dd: '%d päivän',
    w: 'viikko',
    ww: '%d viikon',
    M: 'kuukauden',
    MM: '%d kuukauden',
    y: 'vuoden',
    yy: '%d vuoden',
  }
  const futureNumbers = [
    'nollan',
    'yhden',
    'kahden',
    'kolmen',
    'neljän',
    'viiden',
    'kuuden',
    'seitsemän',
    'kahdeksan',
    'yhdeksän',
  ]

  const words = isFuture && !withoutSuffix ? futureWords : pastWords
  const numbers = isFuture && !withoutSuffix ? futureNumbers : pastNumbers

  const result = words[token as keyof typeof words]
  if (+timeValue < 10) {
    return result.replace('%d', numbers[+timeValue])
  }
  return result.replace('%d', timeValue.toString())
}

const localeFi: Readonly<Locale> = {
  name: 'fi',
  weekdays: [
    'sunnuntai',
    'maanantai',
    'tiistai',
    'keskiviikko',
    'torstai',
    'perjantai',
    'lauantai',
  ],
  weekdaysShort: ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
  weekdaysMin: ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
  months: [
    'tammikuu',
    'helmikuu',
    'maaliskuu',
    'huhtikuu',
    'toukokuu',
    'kesäkuu',
    'heinäkuu',
    'elokuu',
    'syyskuu',
    'lokakuu',
    'marraskuu',
    'joulukuu',
  ],
  monthsShort: [
    'tammi',
    'helmi',
    'maalis',
    'huhti',
    'touko',
    'kesä',
    'heinä',
    'elo',
    'syys',
    'loka',
    'marras',
    'joulu',
  ],
  ordinal: (n) => `${n}.`,
  weekStart: 1, // Monday is the first day of the week.
  yearStart: 4, // The week that contains Jan 4th is the first week of the year.
  formats: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM[ta] YYYY',
    LLL: 'D. MMMM[ta] YYYY, [klo] HH.mm',
    LLLL: 'dddd, D. MMMM[ta] YYYY, [klo] HH.mm',
    l: 'D.M.YYYY',
    ll: 'D. MMM YYYY',
    lll: 'D. MMM YYYY, [klo] HH.mm',
    llll: 'ddd, D. MMM YYYY, [klo] HH.mm',
  },
  calendar: {
    sameDay: '[tänään] [klo] LT',
    nextDay: '[huomenna] [klo] LT',
    nextWeek: 'dddd [klo] LT',
    lastDay: '[eilen] [klo] LT',
    lastWeek: '[viime] dddd[na] [klo] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s päästä',
    past: '%s sitten',
    s: relativeTimeFormatter,
    ss: relativeTimeFormatter,
    m: relativeTimeFormatter,
    mm: relativeTimeFormatter,
    h: relativeTimeFormatter,
    hh: relativeTimeFormatter,
    d: relativeTimeFormatter,
    dd: relativeTimeFormatter,
    w: relativeTimeFormatter,
    ww: relativeTimeFormatter,
    M: relativeTimeFormatter,
    MM: relativeTimeFormatter,
    y: relativeTimeFormatter,
    yy: relativeTimeFormatter,
  },
  meridiem: (hour: number, _minute: number, isLowercase: boolean) => {
    // Finnish doesn't have AM/PM, so return default values
    const m = hour < 12 ? 'AM' : 'PM'
    return isLowercase ? m.toLowerCase() : m
  },
}

export default localeFi
