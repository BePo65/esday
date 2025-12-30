import { esday } from 'esday'
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
      timestamp: '07-2025-18 11:55:00',
      timezone: 'Asia/Taipei',
      formatString: 'MM-YYYY-DD HH:mm:ss',
      locale: 'zh-CN',
    },
    {
      timestamp: '2025 02:15 01-30',
      timezone: 'Europe/Paris',
      formatString: 'YYYY HH:mm MM-DD',
      locale: 'fr',
    },
  ])(
    'parse "$timestamp" with locale "$locale" and timezone "$timezone" using format "$formatString"',
    ({ timestamp, timezone, formatString, locale }) => {
      expectSameObjectTz((esday) => esday.tz(timestamp, formatString, locale, timezone))
      expect(esday.tz(timestamp, formatString, locale, timezone).isValid()).toBeTruthy()
      expectSameValueTz((esday) => esday.tz(timestamp, formatString, locale, timezone).tz())
    },
  )

  it.todo('parse with format, locale and strict')

  it.todo('parse with format, locale and strict with npn-matching format')

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
