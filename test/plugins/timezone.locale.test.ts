import { esday } from 'esday'
import moment from 'moment-timezone'
import { describe, expect, it } from 'vitest'
import localeFr from '~/locales/fr'
import localeZhCn from '~/locales/zh-cn'
import advancedParsePlugin from '~/plugins/advancedParse'
import localePlugin from '~/plugins/locale'
import localizedParsePlugin from '~/plugins/localizedParse'
import timezonePLugin from '~/plugins/timezone'
import utcPlugin from '~/plugins/utc'
import { expectSameObjectTz, expectSameValueTz } from './timezone-util'

esday
  .extend(localePlugin)
  .extend(utcPlugin)
  .extend(advancedParsePlugin)
  .extend(localizedParsePlugin)
  .extend(localePlugin)
  .extend(timezonePLugin)

esday.registerLocale(localeFr)
esday.registerLocale(localeZhCn)

describe('timezone plugin - with locale', () => {
  it.each([
    {
      timestamp: '2025 七月 15日 8:10:21 早上 星期日',
      timezone: 'Asia/Taipei',
      formatString: 'YYYY MMMM Do h:mm:ss A',
      locale: 'zh-CN',
    },
    {
      timestamp: '2024 Dec. 24. 8:10:21 AM mercredi',
      timezone: 'Europe/Paris',
      formatString: 'YYYY MMM Do h:mm:ss A',
      locale: 'fr',
    },
  ])(
    'parse "$timestamp" with locale "$locale" and timezone "$timezone" using format "$formatString"',
    ({ timestamp, timezone, formatString, locale }) => {
      // set locale to use
      moment.locale(locale)

      expectSameObjectTz((esday) => esday.tz(timestamp, formatString, locale, timezone))
      expect(esday.tz(timestamp, formatString, locale, timezone).isValid()).toBeTruthy()
      expectSameValueTz((esday) => esday.tz(timestamp, formatString, locale, timezone).tz())
    },
  )

  it.todo('parse with format, locale and strict')
  it.each([
    {
      timestamp: '2025 七月 15日 8:10:21 早上',
      timezone: 'Asia/Taipei',
      formatString: 'YYYY MMMM Do h:mm:ss A',
      locale: 'zh-CN',
    },
    {
      timestamp: '2024 Dec. 24. 8:10:21 AM',
      timezone: 'Europe/Paris',
      formatString: 'YYYY MMM Do h:mm:ss A',
      locale: 'fr',
    },
  ])(
    'parse strict "$timestamp" with locale "$locale" and timezone "$timezone" using format "$formatString"',
    ({ timestamp, timezone, formatString, locale }) => {
      // set locale to use
      moment.locale(locale)

      expectSameObjectTz((esday) => esday.tz(timestamp, formatString, locale, true, timezone))
      expect(esday.tz(timestamp, formatString, locale, true, timezone).isValid()).toBeTruthy()
      expectSameValueTz((esday) => esday.tz(timestamp, formatString, locale, true, timezone).tz())
    },
  )

  it('parse with format, locale and strict with non-matching format', () => {
    // HACK const timestamp = '2024 déc. 24. 8:10:21 AM'
    // const timestamp = '2024 déc. 24 8:10:21 AM'
    const timestamp = '2024 déc. 1er 8:10:21 AM'
    const timezone = 'Europe/Paris'
    // HACK const formatString = 'YYYY MMM Do h:mm:ss A'
    const formatString = 'YYYY MMM Do h:mm:ss A'
    const locale = 'fr'
    const d = esday.tz(timestamp, formatString, locale, true, timezone)
    const m = moment.tz(timestamp, formatString, locale, true, timezone)

    expect(d.isValid()).toBeFalsy()
    expect(m.isValid()).toBeFalsy()
  })

  it('convert keeps the locale', () => {
    const timestamp = '2025-07-13 17:05'
    const timezone = 'Europe/Paris'
    const locale = 'fr'
    const base = esday(timestamp).locale(locale)
    const converted = base.tz(timezone)

    expect(base.locale()).toBe(locale)
    expect(converted.locale()).toBe(locale)
  })
})
