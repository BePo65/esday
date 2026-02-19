// test with different sequence of activation of plugins ("extend")

import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { beforeEach, describe, expect, it } from 'vitest'
import localeDe from '~/locales/de'
import localeEn from '~/locales/en'
import localeFr from '~/locales/fr'
import localeHr from '~/locales/hr'
import advancedParsePlugin from '~/plugins/advancedParse'
import localePlugin from '~/plugins/locale'
import localizedParsePlugin from '~/plugins/localizedParse'
import weekPlugin from '~/plugins/week'
import { expectSameObject, expectSameValue } from '../util'

esday
  .extend(localePlugin)
  .extend(advancedParsePlugin)
  .extend(weekPlugin)
  .extend(localizedParsePlugin)
esday.registerLocale(localeDe)
esday.registerLocale(localeEn)
esday.registerLocale(localeFr)
esday.registerLocale(localeHr)

describe('localizedParse plugin - other plugin sequence', () => {
  beforeEach(() => {
    // set global locale
    esday.locale('en')
    moment.locale('en')
  })

  it.each([
    {
      sourceString: '2024 pro. 24. 8:10:21 PM utorak',
      formatString: 'YYYY MMM Do h:mm:ss A',
      locale: 'hr',
    },
    {
      sourceString: '2024 Dez. 24. 8:10:21 PM Dienstag',
      formatString: 'YYYY MMM Do h:mm:ss A',
      locale: 'de',
    },
    {
      sourceString: '2024 déc. 1er 8:10:21 AM mardi',
      formatString: 'YYYY MMM Do h:mm:ss A',
      locale: 'fr',
    },
  ])('parse in "en" with "$locale" as locale parameter', ({
    sourceString,
    formatString,
    locale,
  }) => {
    expect(esday(sourceString, formatString, locale).isValid()).toBeTruthy()
    expectSameObject((esday) => esday(sourceString, formatString, locale))
    expectSameValue((esday) => esday(sourceString, formatString, locale).locale())
  })

  it.each([
    {
      sourceString: '2024 pro. 24. 8:10:21 PM',
      formatString: 'YYYY MMM Do h:mm:ss A',
      locale: 'hr',
    },
    {
      sourceString: '2024 Dez. 24. 8:10:21 PM',
      formatString: 'YYYY MMM Do h:mm:ss A',
      locale: 'de',
    },
    {
      sourceString: '2024 déc. 1er 8:10:21 AM',
      formatString: 'YYYY MMM Do h:mm:ss A',
      locale: 'fr',
    },
  ])('parse in strict mode in "en" with "$locale" as locale parameter', ({
    sourceString,
    formatString,
    locale,
  }) => {
    expect(esday(sourceString, formatString, locale, true).isValid()).toBeTruthy()
    expectSameObject((esday) => esday(sourceString, formatString, locale, true))
    expectSameValue((esday) => esday(sourceString, formatString, locale, true).locale())
  })

  it('parse in strict mode with non-matching format with locale as parameter', () => {
    // Day should not have a trailing decimal point
    const sourceString = '2024 déc. 24. 8:10:21 AM'
    const formatString = 'YYYY MMM Do h:mm:ss A'
    const locale = 'fr'
    const d = esday(sourceString, formatString, locale, true)
    const m = moment(sourceString, formatString, locale, true)

    expect(d.isValid()).toBeFalsy()
    expect(m.isValid()).toBeFalsy()
    expectSameValue((esday) => esday(sourceString, formatString, locale, true).locale())
  })
})
