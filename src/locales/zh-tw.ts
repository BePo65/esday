/**
 * Chinese (Taiwan) [zh-TW]
 */

import localeZh from '~/locales/zh'
import { cloneLocale, setLocaleProperty } from '~/plugins/locale'

const calendar = {
  sameDay: '[今天] LT',
  nextDay: '[明天] LT',
  nextWeek: '[下]dddd LT',
  lastDay: '[昨天] LT',
  lastWeek: '[上]dddd LT',
  sameElse: 'L',
}

const localeZhTw = cloneLocale(localeZh)

// Use 'setLocaleProperty' as all properties are 'readonly'
setLocaleProperty(localeZhTw, 'name', 'zh-TW')
setLocaleProperty(localeZhTw, 'calendar', calendar)

export default localeZhTw
