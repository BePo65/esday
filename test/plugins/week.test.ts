import { esday } from 'esday'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { C } from '~/common'
import localeEn from '~/locales/en'
import advancedParsePlugin from '~/plugins/advancedParse'
import localePlugin, { type Locale } from '~/plugins/locale'
import localizedFormatPlugin from '~/plugins/localizedFormat'
import localizedParsePlugin from '~/plugins/localizedParse'
import weekPlugin from '~/plugins/week'

esday
  .extend(advancedParsePlugin)
  .extend(localizedParsePlugin)
  .extend(localizedFormatPlugin)
  .extend(weekPlugin)
  .extend(localePlugin)
esday.registerLocale(localeEn)

describe('week plugin - default values', () => {
  const fakeTimeAsString = '2023-12-19T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    // set global locale
    esday.locale('en')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should get week using default weekStart', () => {
    esday.registerLocale({
      name: 'test',
    } as Locale)
    const testDate = esday('2023-12-19T03:24:46.234').locale('test')

    expect(testDate.week()).toBe(51)
  })

  it('should get weekDay using default weekStart', () => {
    esday.registerLocale({
      name: 'test',
    } as Locale)
    const testDate = esday('2023-12-19T03:24:46.234').locale('test')

    // default weekStart=1; therefore Monday is weekday 0
    expect(testDate.weekday()).toBe(1)
  })

  it('should get weeksInYear using default weekStart and yearStart', () => {
    esday.registerLocale({
      name: 'test',
    } as Locale)
    const testDate = esday('2020-12-19T03:24:46.234').locale('test')

    expect(testDate.weeksInYear()).toBe(53)
  })

  it('should get startOf week using default weekStart "1"', () => {
    esday.registerLocale({
      name: 'test',
    } as Locale)
    const testDate = esday().locale('test').startOf(C.WEEK)

    expect(testDate.format().slice(0, -6)).toBe('2023-12-18T00:00:00')
  })

  it('should get endOf week using default weekStart "1"', () => {
    esday.registerLocale({
      name: 'test',
    } as Locale)
    const testDate = esday().locale('test').endOf(C.WEEK)

    expect(testDate.format().slice(0, -6)).toBe('2023-12-24T23:59:59')
  })

  it('should parse weekday as ordinal using default ordinal function', () => {
    esday.registerLocale({
      name: 'test',
    } as Locale)
    const testDate = esday('2023-12-19T03:24:46.234').locale('test')

    expect(testDate.format('wo')).toBe('51')
  })
})
