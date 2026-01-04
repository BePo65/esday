/**
 * Marathi [mr]
 */

import type { Locale } from '~/plugins/locale'

// used in preParse function (number symbol => number)
const marathiToEnglishNumbersMap = {
  '१': '1',
  '२': '2',
  '३': '3',
  '४': '4',
  '५': '5',
  '६': '6',
  '७': '7',
  '८': '8',
  '९': '9',
  '०': '0',
}

// used in postFormat function (number => number symbol)
const englishToMarathiNumbersMap = {
  1: '१',
  2: '२',
  3: '३',
  4: '४',
  5: '५',
  6: '६',
  7: '७',
  8: '८',
  9: '९',
  0: '०',
}

function relativeTimeFormatter(
  timeValue: string | number,
  withoutSuffix: boolean,
  token: string,
  _isFuture: boolean,
): string {
  let output = ''
  if (withoutSuffix) {
    switch (token) {
      case 's':
        output = 'काही सेकंद'
        break
      case 'ss':
        output = '%d सेकंद'
        break
      case 'm':
        output = 'एक मिनिट'
        break
      case 'mm':
        output = '%d मिनिटे'
        break
      case 'h':
        output = 'एक तास'
        break
      case 'hh':
        output = '%d तास'
        break
      case 'd':
        output = 'एक दिवस'
        break
      case 'dd':
        output = '%d दिवस'
        break
      case 'w':
        output = 'एक आठवडा'
        break
      case 'ww':
        output = '%d आठवडा'
        break
      case 'M':
        output = 'एक महिना'
        break
      case 'MM':
        output = '%d महिने'
        break
      case 'y':
        output = 'एक वर्ष'
        break
      case 'yy':
        output = '%d वर्षे'
        break
    }
  } else {
    switch (token) {
      case 's':
        output = 'काही सेकंदां'
        break
      case 'ss':
        output = '%d सेकंदां'
        break
      case 'm':
        output = 'एका मिनिटा'
        break
      case 'mm':
        output = '%d मिनिटां'
        break
      case 'h':
        output = 'एका तासा'
        break
      case 'hh':
        output = '%d तासां'
        break
      case 'd':
        output = 'एका दिवसा'
        break
      case 'dd':
        output = '%d दिवसां'
        break
      case 'w':
        output = 'एका आठवड्यात'
        break
      case 'ww':
        output = '%d आठवडे'
        break
      case 'M':
        output = 'एका महिन्या'
        break
      case 'MM':
        output = '%d महिन्यां'
        break
      case 'y':
        output = 'एका वर्षा'
        break
      case 'yy':
        output = '%d वर्षां'
        break
    }
  }
  return output.replace(/%d/i, timeValue.toString())
}

const localeMr: Readonly<Locale> = {
  name: 'mr',
  weekdays: ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरूवार', 'शुक्रवार', 'शनिवार'],
  weekdaysShort: ['रवि', 'सोम', 'मंगळ', 'बुध', 'गुरू', 'शुक्र', 'शनि'],
  weekdaysMin: ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श'],
  months: [
    'जानेवारी',
    'फेब्रुवारी',
    'मार्च',
    'एप्रिल',
    'मे',
    'जून',
    'जुलै',
    'ऑगस्ट',
    'सप्टेंबर',
    'ऑक्टोबर',
    'नोव्हेंबर',
    'डिसेंबर',
  ],
  monthsShort: [
    'जाने.',
    'फेब्रु.',
    'मार्च.',
    'एप्रि.',
    'मे.',
    'जून.',
    'जुलै.',
    'ऑग.',
    'सप्टें.',
    'ऑक्टो.',
    'नोव्हें.',
    'डिसें.',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: (n) => `${n}`,
  weekStart: 0, // Sunday is the first day of the week.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
  formats: {
    LT: 'A h:mm वाजता',
    LTS: 'A h:mm:ss वाजता',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm वाजता',
    LLLL: 'dddd, D MMMM YYYY, A h:mm वाजता',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY, A h:mm वाजता',
    llll: 'dddd, D MMMM YYYY, A h:mm वाजता',
  },
  calendar: {
    sameDay: '[आज] LT',
    nextDay: '[उद्या] LT',
    nextWeek: 'dddd, LT',
    lastDay: '[काल] LT',
    lastWeek: '[मागील] dddd, LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%sमध्ये',
    past: '%sपूर्वी',
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
  // eslint-disable-next-line  unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => {
    if (hour >= 0 && hour < 6) {
      return 'पहाटे'
    }
    if (hour < 12) {
      return 'सकाळी'
    }
    if (hour < 17) {
      return 'दुपारी'
    }
    if (hour < 20) {
      return 'सायंकाळी'
    }
    return 'रात्री'
  },
  preParse: (dateString: string) =>
    dateString.replace(
      /[१२३४५६७८९०]/g,
      (match) => marathiToEnglishNumbersMap[match as keyof typeof marathiToEnglishNumbersMap],
    ),
  postFormat: (formattedDate: string) =>
    formattedDate.replace(
      /\d/g,
      (match) =>
        englishToMarathiNumbersMap[Number(match) as keyof typeof englishToMarathiNumbersMap],
    ),
}

export default localeMr
