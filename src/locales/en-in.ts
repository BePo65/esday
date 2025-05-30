/**
 * English (India) [en-IN]
 */

import localeEn from '~/locales/en'
import { cloneLocale, setLocaleProperty } from '~/plugins/locale'

const localeEnIn = cloneLocale(localeEn)

const formats = {
  LT: 'h:mm A',
  LTS: 'h:mm:ss A',
  L: 'DD/MM/YYYY',
  LL: 'D MMMM YYYY',
  LLL: 'D MMMM YYYY h:mm A',
  LLLL: 'dddd, D MMMM YYYY h:mm A',
  l: 'DD/MM/YYYY',
  ll: 'D MMMM YYYY',
  lll: 'D MMMM YYYY h:mm A',
  llll: 'dddd, D MMMM YYYY h:mm A',
}

// Use 'setLocaleProperty' as all properties are 'readonly'
setLocaleProperty(localeEnIn, 'name', 'en-IN')
setLocaleProperty(localeEnIn, 'formats', formats)

export default localeEnIn
