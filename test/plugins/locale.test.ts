import type { EsDay } from 'esday'
import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import localeZh from '~/locales/zh'
import type { Locale } from '~/plugins/locale'
import localePlugin, { cloneLocale, setLocaleProperty } from '~/plugins/locale'

esday.extend(localePlugin)

const getLocaleName = (inst: EsDay) => inst['$conf']['localeName']

function createRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length)),
  ).join('')
}

describe('factory locale methods', () => {
  const fakeTimeAsString = '2023-12-13T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    esday.locale('en')
    esday.unregisterLocale('zh').unregisterLocale('zh-cn').unregisterLocale('test')
    vi.useRealTimers()
  })

  it('get Locale zh from LocaleStore', () => {
    esday.registerLocale(localeZh)
    const locale = esday.getLocale('zh')

    expect(locale).toBeTypeOf('object')
    expect(locale.name).toBe('zh')
  })

  it('get default Locale if not registered', () => {
    const locale = esday.getLocale('ar')

    expect(locale).toBeTypeOf('object')
    expect(locale.name).toBe('en')
  })

  it('register locale "zh"', () => {
    esday.registerLocale(localeZh)
    esday.locale('zh')
    expect(esday().localeObject()).toBe(localeZh)
  })

  it('register locale "zh-cn"', () => {
    esday.registerLocale(localeZh, 'zh-cn')
    esday.locale('zh-cn')
    expect(esday().localeObject()).toBe(localeZh)
  })

  it('get global locale "zh"', () => {
    esday.locale('zh')
    expect(esday.locale()).toBe('zh')
  })

  it('get global locale "non-exist"', () => {
    esday.locale('non-exist')
    expect(esday.locale()).toBe('non-exist')
  })

  it('set global locale "zh"', () => {
    esday.locale('zh')
    expect(getLocaleName(esday())).toBe('zh')
  })

  it('set global locale "non-exist"', () => {
    esday.locale('non-exist')
    expect(getLocaleName(esday())).toBe('non-exist')
  })
})

describe('instance locale methods', () => {
  const fakeTimeAsString = '2023-12-13T03:24:46.234'
  let globalLocale: string

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
    globalLocale = esday.locale()
    esday.locale('en')
  })

  afterEach(() => {
    esday.locale(globalLocale)
    vi.useRealTimers()
  })

  it('get locale of instance', () => {
    expect(esday().locale()).toBe('en')
  })

  it('set locale for instance', () => {
    // make sure that the current locale is not 'zh'
    expect(esday().locale()).toBe('en')

    // set locale to 'zh'
    const dayZh = esday().locale('zh')
    expect(dayZh.locale()).toBe('zh')
  })

  it('set locale-dependant startOf for "week" for weekStart=6', () => {
    esday.registerLocale({
      name: 'test',
      weekStart: 6, // Saturday
    } as Locale)
    const dayTest = esday().locale('test')

    expect(dayTest.startOf('week').format().slice(0, -6)).toBe('2023-12-09T03:24:46')
  })

  it('set locale-dependant startOf for "week" for weekStart=0', () => {
    esday.registerLocale({
      name: 'test',
      weekStart: 0, // Sunday
    } as Locale)
    const dayTest = esday().locale('test')

    expect(dayTest.startOf('week').format('YYYY-MM-DD')).toBe('2023-12-10')
  })

  it('set locale-dependant endOf for "week"', () => {
    esday.registerLocale({
      name: 'test',
      weekStart: 0, // Sunday
    } as Locale)
    const dayTest = esday().locale('test')

    expect(dayTest.endOf('week').format('YYYY-MM-DD')).toBe('2023-12-16')
  })
})

describe('Update locale', () => {
  const fakeTimeAsString = '2023-12-13T03:24:46.234'
  let globalLocaleName: string
  let globalLocale: Locale

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
    globalLocaleName = esday.locale()
    globalLocale = cloneLocale(esday.getLocale(globalLocaleName))
    esday.locale('en')
  })

  afterEach(() => {
    esday.registerLocale(globalLocale)
    esday.locale(globalLocaleName)
    vi.useRealTimers()
  })

  it('update single property', () => {
    const randomLocaleName = createRandomString(8)
    esday.registerLocale(localeZh)
    esday.registerLocale(localeZh, randomLocaleName)
    const newMonths = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ] as const

    esday.updateLocale(randomLocaleName, { months: newMonths })
    esday.locale(randomLocaleName)
    const globalLocaleObject = esday.getLocale(randomLocaleName)
    const esdayInstanceLocale = esday().localeObject()

    expect(globalLocaleObject.months).toEqual(newMonths)
    expect(esdayInstanceLocale.months).toEqual(newMonths)
    expect(esdayInstanceLocale.monthsShort).toEqual(globalLocaleObject.monthsShort)
  })

  it('update all properties', () => {
    const randomLocaleName = createRandomString(8)
    const oldLocaleData = esday.getLocale('zh')
    const newLocaleData = cloneLocale(oldLocaleData)

    const newWeekdays = [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag',
    ]
    setLocaleProperty(newLocaleData, 'weekdays', newWeekdays)
    const newWeekdaysShort = ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']
    setLocaleProperty(newLocaleData, 'weekdaysShort', newWeekdaysShort)
    const newWeekdaysMin = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
    setLocaleProperty(newLocaleData, 'weekdaysMin', newWeekdaysMin)
    esday.updateLocale(randomLocaleName, newLocaleData)

    esday.locale(randomLocaleName)
    const globalLocaleObject = esday.getLocale(randomLocaleName)
    const esdayInstanceLocale = esday().localeObject()

    // expect(globalLocaleObject.months).toEqual(oldLocaleData.months)
    expect(globalLocaleObject.weekdays).toEqual(newLocaleData.weekdays)
    expect(globalLocaleObject.weekdaysShort).toEqual(newLocaleData.weekdaysShort)
    expect(globalLocaleObject.weekdaysMin).toEqual(newLocaleData.weekdaysMin)

    expect(esdayInstanceLocale.months).toEqual(oldLocaleData.months)
    expect(esdayInstanceLocale.weekdays).toEqual(newLocaleData.weekdays)
    expect(esdayInstanceLocale.weekdaysShort).toEqual(newLocaleData.weekdaysShort)
    expect(esdayInstanceLocale.weekdaysMin).toEqual(newLocaleData.weekdaysMin)
  })

  it('update non-existing locale', () => {
    const randomLocaleName = createRandomString(8)
    const newMonths = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ] as const
    const newMonthsAsMutable = [...newMonths]

    moment.updateLocale(randomLocaleName, { months: newMonthsAsMutable })
    const momentGlobalDefaultLocaleObject = moment.localeData('en')
    const momentGlobalNewLocaleObject = moment.localeData(randomLocaleName)
    const momentWithRandomLocale = moment().locale(randomLocaleName)

    esday.updateLocale(randomLocaleName, { months: newMonths })
    const esdayGlobalDefaultLocaleObject = esday.getLocale('en')
    const esdayGlobalNewLocaleObject = esday.getLocale(randomLocaleName)
    const esdayWithRandomLocale = esday().locale(randomLocaleName)

    expect(momentWithRandomLocale.locale()).toEqual(randomLocaleName)
    expect(momentGlobalNewLocaleObject.months()).toEqual(newMonthsAsMutable)
    expect(momentGlobalNewLocaleObject.weekdays()).toEqual(
      momentGlobalDefaultLocaleObject.weekdays(),
    )

    expect(esdayWithRandomLocale.locale()).toEqual(randomLocaleName)
    expect(esdayGlobalNewLocaleObject.months).toEqual(newMonthsAsMutable)
    expect(esdayGlobalNewLocaleObject.weekdays).toEqual(esdayGlobalDefaultLocaleObject.weekdays)
  })
})
