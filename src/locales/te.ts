/**
 * Telugu [te]
 */

import type { Locale } from '~/plugins/locale'

const localeTe: Readonly<Locale> = {
  name: 'te',
  weekdays: ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'],
  weekdaysShort: ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'],
  weekdaysMin: ['ఆ', 'సో', 'మం', 'బు', 'గు', 'శు', 'శ'],
  months: [
    'జనవరి',
    'ఫిబ్రవరి',
    'మార్చి',
    'ఏప్రిల్',
    'మే',
    'జూన్',
    'జులై',
    'ఆగస్టు',
    'సెప్టెంబర్',
    'అక్టోబర్',
    'నవంబర్',
    'డిసెంబర్',
  ],
  monthsShort: [
    'జన.',
    'ఫిబ్ర.',
    'మార్చి',
    'ఏప్రి.',
    'మే',
    'జూన్',
    'జులై',
    'ఆగ.',
    'సెప్.',
    'అక్టో.',
    'నవ.',
    'డిసె.',
  ],
  dayOfMonthOrdinalParse: /\d{1,2}వ/,
  ordinal: (n) => `${n}`,
  weekStart: 0, // Sunday is the first day of the week.
  yearStart: 1, // The week that contains Jan 1st is the first week of the year.
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
    sameDay: '[నేడు] LT',
    nextDay: '[రేపు] LT',
    nextWeek: 'dddd, LT',
    lastDay: '[నిన్న] LT',
    lastWeek: '[గత] dddd, LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s లో',
    past: '%s క్రితం',
    s: 'కొన్ని క్షణాలు',
    ss: '%d సెకన్లు',
    m: 'ఒక నిమిషం',
    mm: '%d నిమిషాలు',
    h: 'ఒక గంట',
    hh: '%d గంటలు',
    d: 'ఒక రోజు',
    dd: '%d రోజులు',
    w: 'ఒక వారం',
    ww: '%d వారాలు',
    M: 'ఒక నెల',
    MM: '%d నెలలు',
    y: 'ఒక సంవత్సరం',
    yy: '%d సంవత్సరాలు',
  },
  // eslint-disable-next-line unused-imports/no-unused-vars
  meridiem(hour, _minute, _isLower) {
    if (hour < 4) {
      return 'రాత్రి'
    }
    if (hour < 10) {
      return 'ఉదయం'
    }
    if (hour < 17) {
      return 'మధ్యాహ్నం'
    }
    if (hour < 20) {
      return 'సాయంత్రం'
    }
    return 'రాత్రి'
  },
}

export default localeTe
