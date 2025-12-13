/**
 * Arabic (Tunisia) [ar-TN]
 */

import localeAr from '~/locales/ar'
import { cloneLocale, setLocaleProperty } from '~/plugins/locale'

const localeArTn = cloneLocale(localeAr)

const formats = structuredClone(localeArTn.formats)
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
setLocaleProperty(localeArTn, 'name', 'ar-TN')
setLocaleProperty(localeArTn, 'weekStart', 1) // Monday is the first day of the week.
setLocaleProperty(localeArTn, 'yearStart', 4) // The week that contains Jan 4th is the first week of the year.
setLocaleProperty(localeArTn, 'formats', formats)
setLocaleProperty(localeArTn, 'calendar', calendar)

export default localeArTn
