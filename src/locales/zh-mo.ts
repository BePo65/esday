/**
 * Chinese (Macau) [zh-MO]
 */

import localeZh from '~/locales/zh'
import { cloneLocale, setLocaleProperty } from '~/plugins/locale'

const calendar = {
  sameDay: '[今天]LT',
  nextDay: '[明天]LT',
  nextWeek: '[下]ddddLT',
  lastDay: '[昨天]LT',
  lastWeek: '[上]ddddLT',
  sameElse: 'L',
}

const localeZhHk = cloneLocale(localeZh)

// Use 'setLocaleProperty' as all properties are 'readonly'
setLocaleProperty(localeZhHk, 'name', 'zh-MO')
setLocaleProperty(localeZhHk, 'calendar', calendar)

export default localeZhHk
