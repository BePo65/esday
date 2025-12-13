/**
 * Lao [lo]
 */
import type { Locale } from '~/plugins/locale'

const localeLo: Readonly<Locale> = {
  name: 'lo',
  weekdays: ['ອາທິດ', 'ຈັນ', 'ອັງຄານ', 'ພຸດ', 'ພະຫັດ', 'ສຸກ', 'ເສົາ'],
  weekdaysShort: ['ທິດ', 'ຈັນ', 'ອັງຄານ', 'ພຸດ', 'ພະຫັດ', 'ສຸກ', 'ເສົາ'],
  weekdaysMin: ['ທ', 'ຈ', 'ອຄ', 'ພ', 'ພຫ', 'ສກ', 'ສ'],
  months: [
    'ມັງກອນ',
    'ກຸມພາ',
    'ມີນາ',
    'ເມສາ',
    'ພຶດສະພາ',
    'ມິຖຸນາ',
    'ກໍລະກົດ',
    'ສິງຫາ',
    'ກັນຍາ',
    'ຕຸລາ',
    'ພະຈິກ',
    'ທັນວາ',
  ],
  monthsShort: [
    'ມັງກອນ',
    'ກຸມພາ',
    'ມີນາ',
    'ເມສາ',
    'ພຶດສະພາ',
    'ມິຖຸນາ',
    'ກໍລະກົດ',
    'ສິງຫາ',
    'ກັນຍາ',
    'ຕຸລາ',
    'ພະຈິກ',
    'ທັນວາ',
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
    LLLL: 'ວັນdddd D MMMM YYYY HH:mm',
    l: 'DD/MM/YYYY',
    ll: 'D MMMM YYYY',
    lll: 'D MMMM YYYY HH:mm',
    llll: 'ວັນdddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[ມື້ນີ້ເວລາ] LT',
    nextDay: '[ມື້ອື່ນເວລາ] LT',
    nextWeek: '[ວັນ]dddd[ໜ້າເວລາ] LT',
    lastDay: '[ມື້ວານນີ້ເວລາ] LT',
    lastWeek: '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'ອີກ %s',
    past: '%sຜ່ານມາ',
    s: 'ບໍ່ເທົ່າໃດວິນາທີ',
    ss: '%d ວິນາທີ',
    m: '1 ນາທີ',
    mm: '%d ນາທີ',
    h: '1 ຊົ່ວໂມງ',
    hh: '%d ຊົ່ວໂມງ',
    d: '1 ມື້',
    dd: '%d ມື້',
    w: '1 ອາທິດ',
    ww: '%d ອາທິດ',
    M: '1 ເດືອນ',
    MM: '%d ເດືອນ',
    y: '1 ປີ',
    yy: '%d ປີ',
  },
  // eslint-disable-next-line  unused-imports/no-unused-vars
  meridiem: (hour: number, _minute: number, _isLowercase: boolean) => {
    return hour < 12 ? 'ຕອນເຊົ້າ' : 'ຕອນແລງ'
  },
}

export default localeLo
