/**
 * Italian (Switzerland) [it-CH]
 */

import type { EsDay } from 'esday'
import localeIt from '~/locales/it'
import { cloneLocale, setLocaleProperty } from '~/plugins/locale'

const localeItCh = cloneLocale(localeIt)

const formats = structuredClone(localeItCh.formats)
formats.L = 'DD.MM.YYYY'
formats.l = 'DD.MM.YYYY'

const calendar = {
  sameDay: '[Oggi alle] LT',
  nextDay: '[Domani alle] LT',
  nextWeek: 'dddd [alle] LT',
  lastDay: '[Ieri alle] LT',
  lastWeek(this: EsDay) {
    switch (this.day()) {
      case 0:
        return '[la scorsa] dddd [alle] LT'
      default:
        return '[lo scorso] dddd [alle] LT'
    }
  },
  sameElse: 'L',
}

// Use 'setLocaleProperty' as all properties are 'readonly'
setLocaleProperty(localeItCh, 'name', 'it-CH')
setLocaleProperty(localeItCh, 'formats', formats)
setLocaleProperty(localeItCh, 'calendar', calendar)

export default localeItCh
