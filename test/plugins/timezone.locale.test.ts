import { esday } from 'esday'
import { describe, expect, it } from 'vitest'
import localeFr from '~/locales/fr'
import localePlugin from '~/plugins/locale'
import timezonePLugin from '~/plugins/timezone'
import utcPlugin from '~/plugins/utc'

esday.extend(localePlugin).extend(utcPlugin).extend(timezonePLugin)
esday.registerLocale(localeFr)

describe('timezone plugin - with locale', () => {
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
