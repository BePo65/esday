/**
 * Tamil [ta]
 */

import type { Locale } from '~/plugins/locale'

// used in preParse function (number symbol => number)
const tamilToEnglishNumbersMap = {
  '௧': '1',
  '௨': '2',
  '௩': '3',
  '௪': '4',
  '௫': '5',
  '௬': '6',
  '௭': '7',
  '௮': '8',
  '௯': '9',
  '௦': '0',
}

// used in postFormat function (number => number symbol)
const englishToTamilNumbersMap = {
  1: '௧',
  2: '௨',
  3: '௩',
  4: '௪',
  5: '௫',
  6: '௬',
  7: '௭',
  8: '௮',
  9: '௯',
  0: '௦',
}

const localeTa: Readonly<Locale> = {
  name: 'ta',
  weekdays: [
    'ஞாயிற்றுக்கிழமை',
    'திங்கட்கிழமை',
    'செவ்வாய்கிழமை',
    'புதன்கிழமை',
    'வியாழக்கிழமை',
    'வெள்ளிக்கிழமை',
    'சனிக்கிழமை',
  ],
  weekdaysShort: ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'],
  weekdaysMin: ['ஞா', 'தி', 'செ', 'பு', 'வி', 'வெ', 'ச'],
  months: [
    'ஜனவரி',
    'பிப்ரவரி',
    'மார்ச்',
    'ஏப்ரல்',
    'மே',
    'ஜூன்',
    'ஜூலை',
    'ஆகஸ்ட்',
    'செப்டெம்பர்',
    'அக்டோபர்',
    'நவம்பர்',
    'டிசம்பர்',
  ],
  monthsShort: [
    'ஜனவரி',
    'பிப்ரவரி',
    'மார்ச்',
    'ஏப்ரல்',
    'மே',
    'ஜூன்',
    'ஜூலை',
    'ஆகஸ்ட்',
    'செப்டெம்பர்',
    'அக்டோபர்',
    'நவம்பர்',
    'டிசம்பர்',
  ],
  ordinal: (n) => `${n} வது`,
  weekStart: 0, // Sunday is the first day of the week.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, HH:mm',
    LLLL: 'dddd, D MMMM YYYY, HH:mm',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY, HH:mm',
    llll: 'dddd, D MMMM YYYY, HH:mm',
  },
  calendar: {
    sameDay: '[இன்று] LT',
    nextDay: '[நாளை] LT',
    nextWeek: 'dddd, LT',
    lastDay: '[நேற்று] LT',
    lastWeek: '[கடந்த வாரம்] dddd, LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s இல்',
    past: '%s முன்',
    s: 'ஒரு சில விநாடிகள்',
    ss: '%d விநாடிகள்',
    m: 'ஒரு நிமிடம்',
    mm: '%d நிமிடங்கள்',
    h: 'ஒரு மணி நேரம்',
    hh: '%d மணி நேரம்',
    d: 'ஒரு நாள்',
    dd: '%d நாட்கள்',
    w: 'ஒரு வாரம்',
    ww: '%d வாரங்கள்',
    M: 'ஒரு மாதம்',
    MM: '%d மாதங்கள்',
    y: 'ஒரு வருடம்',
    yy: '%d ஆண்டுகள்',
  },
  // eslint-disable-next-line unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => {
    if (hour < 2) {
      return 'யாமம்'
    }
    if (hour < 6) {
      return 'வைகறை' // வைகறை
    }
    if (hour < 10) {
      return 'காலை' // காலை
    }
    if (hour < 14) {
      return 'நண்பகல்' // நண்பகல்
    }
    if (hour < 18) {
      return 'எற்பாடு' // எற்பாடு
    }
    if (hour < 22) {
      return 'மாலை' // மாலை
    }
    return 'யாமம்'
  },
  preParse: (dateString: string) =>
    dateString.replace(
      /[௧௨௩௪௫௬௭௮௯௦]/g,
      (match) => tamilToEnglishNumbersMap[match as keyof typeof tamilToEnglishNumbersMap],
    ),
  postFormat: (formattedDate: string) =>
    formattedDate.replace(
      /\d/g,
      (match) => englishToTamilNumbersMap[Number(match) as keyof typeof englishToTamilNumbersMap],
    ),
}

export default localeTa
