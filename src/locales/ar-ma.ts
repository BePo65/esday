/**
 * Arabic (Morocco) [ar-MA]
 */

import localeAr from '~/locales/ar'
import { cloneLocale, setLocaleProperty } from '~/plugins/locale'

const localeArMa = cloneLocale(localeAr)

const formats = structuredClone(localeArMa.formats)
formats.L = 'DD/MM/YYYY'
formats.l = 'DD/MM/YYYY'

const calendar = {
  sameDay: '[اليوم على الساعة] LT',
  nextDay: '[غدا على الساعة] LT',
  nextWeek: 'dddd [على الساعة] LT',
  lastDay: '[أمس على الساعة] LT',
  lastWeek: 'dddd [على الساعة] LT',
  sameElse: 'L',
}

// Use 'setLocaleProperty' as all properties are 'readonly'
setLocaleProperty(localeArMa, 'name', 'ar-MA')
setLocaleProperty(localeArMa, 'weekStart', 1) // Monday is the first day of the week.
setLocaleProperty(localeArMa, 'yearStart', 4) // The week that contains Jan 4th is the first week of the year.
setLocaleProperty(localeArMa, 'formats', formats)
setLocaleProperty(localeArMa, 'calendar', calendar)

export default localeArMa
