import { type EsDay, esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import localeAr from '~/locales/ar'
import localeCa from '~/locales/ca'
import localeFr from '~/locales/fr'
import localeHr from '~/locales/hr'
import localeRu from '~/locales/ru'
import localeZhCn from '~/locales/zh-cn'
import localePlugin, {
  type Calendar,
  type LocaleFormatKeys,
  type RelativeTimeKeys,
} from '~/plugins/locale'
import localeDataPlugin from '~/plugins/localeData'
import weekPlugin from '~/plugins/week'
import { expectSameValue } from '../util'

esday.extend(localePlugin).extend(weekPlugin).extend(localeDataPlugin)

esday.registerLocale(localeAr)
esday.registerLocale(localeCa)
esday.registerLocale(localeFr)
esday.registerLocale(localeHr)
esday.registerLocale(localeRu)
esday.registerLocale(localeZhCn)

describe('locale en - local', () => {
  const fakeTimeAsString = '2023-12-13T03:24:46.234'
  const localeName = 'en'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
    // set global locale
    esday.locale(localeName)
    moment.locale(localeName)
  })

  afterEach(() => {
    esday.locale(localeName)
    vi.useRealTimers()
  })

  it('should have 7 weekday names', () => {
    const weekdaysEsday = esday().localeData().weekdays()
    const weekdaysMoment = moment().localeData().weekdays()

    expect(weekdaysEsday.length).toBe(7)
    expect(weekdaysEsday).toEqual(weekdaysMoment)
  })

  it('should format date as weekday name', () => {
    const formattedDateEsday = esday().localeData().weekdays(esday('2025-08-02'))

    expect(formattedDateEsday).toBe('Saturday')
    expectSameValue((esday) => esday().localeData().weekdays(esday('2025-08-02')))
  })

  it('should format date as weekday name using test-format', () => {
    const formattedDateEsday = esday().localeData().weekdays(esday('2025-08-02'), '-dddd-')

    expect(formattedDateEsday).toBe('Saturday')
    expectSameValue((esday) => esday().localeData().weekdays(esday('2025-08-02'), '-dddd-'))
  })

  it('should have 7 short weekday names', () => {
    const weekdaysEsday = esday().localeData().weekdaysShort()
    const weekdaysMoment = moment().localeData().weekdaysShort()

    expect(weekdaysEsday.length).toBe(7)
    expect(weekdaysEsday).toEqual(weekdaysMoment)
  })

  it('should format date as short weekday name', () => {
    const formattedDateEsday = esday().localeData().weekdaysShort(esday('2025-08-02'))

    expect(formattedDateEsday).toBe('Sat')
    expectSameValue((esday) => esday().localeData().weekdaysShort(esday('2025-08-02')))
  })

  it('should format date as short weekday name using test-format', () => {
    const formattedDateEsday = esday().localeData().weekdaysShort(esday('2025-08-02'), '-dddd-')

    expect(formattedDateEsday).toBe('Sat')
    expectSameValue((esday) => esday().localeData().weekdaysShort(esday('2025-08-02'), '-dddd-'))
  })

  it('should have 7 min weekday names', () => {
    const weekdaysEsday = esday().localeData().weekdaysMin()
    const weekdaysMoment = moment().localeData().weekdaysMin()

    expect(weekdaysEsday.length).toBe(7)
    expect(weekdaysEsday).toEqual(weekdaysMoment)
  })

  it('should format date as min weekday name', () => {
    const formattedDateEsday = esday().localeData().weekdaysMin(esday('2025-08-02'))

    expect(formattedDateEsday).toBe('Sa')
    expectSameValue((esday) => esday().localeData().weekdaysMin(esday('2025-08-02')))
  })

  it('should format date as min weekday name using test-format', () => {
    const formattedDateEsday = esday().localeData().weekdaysMin(esday('2025-08-02'), '-dddd-')

    expect(formattedDateEsday).toBe('Sa')
    expectSameValue((esday) => esday().localeData().weekdaysMin(esday('2025-08-02'), '-dddd-'))
  })

  it('should have 12 month names', () => {
    const monthsEsday = esday().localeData().months()
    const monthsMoment = moment().localeData().months()

    expect(monthsEsday.length).toBe(12)
    expect(monthsEsday).toEqual(monthsMoment)
  })

  it('should format date as month name', () => {
    const formattedDateEsday = esday().localeData().months(esday('2025-08-02'))

    expect(formattedDateEsday).toBe('August')
    expectSameValue((esday) => esday().localeData().months(esday('2025-08-02')))
  })

  it('should format date as month name using test-format', () => {
    const formattedDateEsday = esday().localeData().months(esday('2025-08-02'), 'DD MMMM')

    expect(formattedDateEsday).toBe('August')
    expectSameValue((esday) => esday().localeData().months(esday('2025-08-02'), 'DD MMMM'))
  })

  it('should have 12 short month names', () => {
    const monthsEsday = esday().localeData().monthsShort()
    const monthsMoment = moment().localeData().monthsShort()

    expect(monthsEsday.length).toBe(12)
    expect(monthsEsday).toEqual(monthsMoment)
  })

  it('should format date as short month name', () => {
    const formattedDateEsday = esday().localeData().monthsShort(esday('2025-08-02'))

    expect(formattedDateEsday).toBe('Aug')
    expectSameValue((esday) => esday().localeData().monthsShort(esday('2025-08-02')))
  })

  it('should format date as short month name using test-format', () => {
    const formattedDateEsday = esday().localeData().monthsShort(esday('2025-08-02'), 'DD MMMM')

    expect(formattedDateEsday).toBe('Aug')
    expectSameValue((esday) => esday().localeData().monthsShort(esday('2025-08-02'), 'DD MMMM'))
  })

  it('should format ordinal', () => {
    // (number: number, period?: 'W')
    expectSameValue((esday) => esday().localeData().ordinal(2))
  })

  it('should get 1st day of week', () => {
    expectSameValue((esday) => esday().localeData().firstDayOfWeek())
  })

  it('should get 1st day of year', () => {
    expect(esday().localeData().firstDayOfYear()).toBe(1)
    // cannot compare to moment.js here, as moment uses a different way of calculating the firstDayOfYear
  })

  it.each([
    { format: 'LTS', expected: 'h:mm:ss A' },
    { format: 'L', expected: 'MM/DD/YYYY' },
    { format: 'lll', expected: 'MMM D, YYYY h:mm A' },
  ])('should get the full format for the abbreviated format "$format"', ({ format, expected }) => {
    const formatTyped = format as LocaleFormatKeys

    expect(esday().localeData().longDateFormat(formatTyped)).toBe(expected)
    expectSameValue((esday) => esday().localeData().longDateFormat(formatTyped))
  })

  it.each([
    { format: 'invalid-format', expected: '' },
    { format: undefined, expected: '' },
  ])('should get the full format for the invalid format "$format"', ({ format, expected }) => {
    const formatTyped = format as LocaleFormatKeys

    expect(esday().localeData().longDateFormat(formatTyped)).toBe(expected)
  })

  it.each([
    { key: 'sameDay', expected: '[Today at] LT' },
    { key: 'nextWeek', expected: 'dddd [at] LT' },
    { key: undefined, expected: 'L' },
    { key: 'not-existing-key', expected: 'L' },
  ])('should get calendar format for "$key"', ({ key, expected }) => {
    const typedKey = key as keyof Calendar
    expect(esday().localeData().calendar(typedKey)).toBe(expected)
    expectSameValue((esday) => esday().localeData().calendar(typedKey))
  })

  it.each([
    {
      value: 5,
      token: 'm',
      withoutSuffix: false,
      isFuture: false,
      expected: 'a minute',
    },
    {
      value: 5,
      token: 'm',
      withoutSuffix: false,
      isFuture: true,
      expected: 'a minute',
    },
    {
      value: 5,
      token: 'mm',
      withoutSuffix: true,
      isFuture: false,
      expected: '5 minutes',
    },
    {
      value: 5,
      token: 'mm',
      withoutSuffix: true,
      isFuture: true,
      expected: '5 minutes',
    },
  ])('should format value "$value" as relative time using "$token", withoutSuffix "$withoutSuffix", , isFuture "$isFuture"', ({
    value,
    token,
    withoutSuffix,
    isFuture,
    expected,
  }) => {
    expect(
      esday()
        .localeData()
        .relativeTime(value, withoutSuffix, token as RelativeTimeKeys, isFuture),
    ).toBe(expected)
    expectSameValue((esday) =>
      esday()
        .localeData()
        .relativeTime(value, withoutSuffix, token as RelativeTimeKeys, isFuture),
    )
  })

  it('should update string with preParse', () => {
    expect(esday().localeData().preParse).toBeUndefined()
    expectSameValue((esday) => esday().localeData().preParse)
  })

  it('should update string with postFormat', () => {
    expect(esday().localeData().postFormat).toBeUndefined()
    expectSameValue((esday) => esday().localeData().postFormat)
  })

  it('should use different locale', () => {
    const weekdaysEsday = esday().locale('fr').localeData().weekdays()
    const weekdaysMoment = moment().locale('fr').localeData().weekdays()

    expect(weekdaysEsday.length).toBe(7)
    expect(weekdaysEsday).toEqual(weekdaysMoment)
  })
})

// tests with MonthNamesStandaloneFormat
describe('locale ca - local', () => {
  const fakeTimeAsString = '2023-12-13T03:24:46.234'
  const localeName = 'ca'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
    // set global locale
    esday.locale(localeName)
    moment.locale(localeName)
  })

  afterEach(() => {
    esday.locale(localeName)
    vi.useRealTimers()
  })

  it('should have 12 month names', () => {
    const monthsEsday = esday().localeData().months()
    const monthsMoment = moment().localeData().months()

    expect(monthsEsday.length).toBe(12)
    expect(monthsEsday).toEqual(monthsMoment)
  })

  it('should format date as month name', () => {
    const formattedDateEsday = esday().localeData().months(esday('2025-08-02'))

    expect(formattedDateEsday).toBe('agost')
    expectSameValue((esday) => esday().localeData().months(esday('2025-08-02')))
  })

  it('should format date as month name using test-format', () => {
    const formattedDateEsday = esday().localeData().months(esday('2025-08-02'), 'DD MMMM')

    expect(formattedDateEsday).toBe("d'agost")
    expectSameValue((esday) => esday().localeData().months(esday('2025-08-02'), 'DD MMMM'))
  })

  it('should have 12 short month names', () => {
    const monthsEsday = esday().localeData().monthsShort()
    const monthsMoment = moment().localeData().monthsShort()

    expect(monthsEsday.length).toBe(12)
    expect(monthsEsday).toEqual(monthsMoment)
  })

  it('should format date as short month name', () => {
    const formattedDateEsday = esday().localeData().monthsShort(esday('2025-02-02'))

    expect(formattedDateEsday).toBe('febr.')
    expectSameValue((esday) => esday().localeData().monthsShort(esday('2025-02-02')))
  })

  it('should format date as short month name using test-format', () => {
    const formattedDateEsday = esday().localeData().monthsShort(esday('2025-02-02'), 'DD MMMM')

    expect(formattedDateEsday).toBe('febr.')
    expectSameValue((esday) => esday().localeData().monthsShort(esday('2025-02-02'), 'DD MMMM'))
  })

  it('should format ordinal', () => {
    expectSameValue((esday) => esday().localeData().ordinal(2))
  })

  it('should get 1st day of week', () => {
    expectSameValue((esday) => esday().localeData().firstDayOfWeek())
  })

  it('should get 1st day of year', () => {
    expect(esday().localeData().firstDayOfYear()).toBe(4)
    // cannot compare to moment.js here, as moment uses a different way of calculating the firstDayOfYear
  })

  it.each([
    {
      key: 'sameDay',
      thisHour: 1,
      referenceHour: 3,
      expected: '[avui a la] LT',
    },
    {
      key: 'nextWeek',
      thisHour: 1,
      referenceHour: 3,
      expected: 'dddd [a la] LT',
    },
    { key: undefined, thisHour: 1, referenceHour: 3, expected: 'L' },
    { key: 'not-existing-key', thisHour: 1, referenceHour: 3, expected: 'L' },
  ])('should get calendar format for "$key"', ({ key, thisHour, referenceHour, expected }) => {
    const typedKey = key as keyof Calendar
    const thisDate = { hour: () => thisHour } as EsDay
    const referenceDate = { hour: () => referenceHour } as EsDay

    expect(esday().localeData().calendar(typedKey, thisDate, referenceDate)).toBe(expected)
  })
})

// tests with MonthNamesFunction
describe('locale hr - local', () => {
  const fakeTimeAsString = '2023-12-13T03:24:46.234'
  const localeName = 'hr'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
    // set global locale
    esday.locale(localeName)
    moment.locale(localeName)
  })

  afterEach(() => {
    esday.locale(localeName)
    vi.useRealTimers()
  })

  it('should have 12 month names', () => {
    const monthsEsday = esday().localeData().months()
    const monthsMoment = moment().localeData().months()

    expect(monthsEsday.length).toBe(12)
    expect(monthsEsday).toEqual(monthsMoment)
  })

  it('should format date as month name', () => {
    const formattedDateEsday = esday().localeData().months(esday('2025-08-02'))

    expect(formattedDateEsday).toBe('kolovoz')
    expectSameValue((esday) => esday().localeData().months(esday('2025-08-02')))
  })

  it('should format date as month name using test-format', () => {
    const formattedDateEsday = esday().localeData().months(esday('2025-08-02'), 'DD MMMM')

    expect(formattedDateEsday).toBe('kolovoza')
    // in moment.js the definition for months in locale 'hr' is of type
    // MonthNamesStandaloneFormat; therefore the result is not the same
    // as for esday (for this locale the definition in dayjs equals esday)
  })

  it('should have 12 short month names', () => {
    const monthsEsday = esday().localeData().monthsShort()
    const monthsMoment = moment().localeData().monthsShort()

    expect(monthsEsday.length).toBe(12)
    expect(monthsEsday).toEqual(monthsMoment)
  })

  it('should format date as short month name', () => {
    const formattedDateEsday = esday().localeData().monthsShort(esday('2025-02-02'))

    expect(formattedDateEsday).toBe('velj.')
    expectSameValue((esday) => esday().localeData().monthsShort(esday('2025-02-02')))
  })

  it('should format date as short month name using test-format', () => {
    const formattedDateEsday = esday().localeData().monthsShort(esday('2025-02-02'), 'DD MMMM')

    expect(formattedDateEsday).toBe('velj.')
    expectSameValue((esday) => esday().localeData().monthsShort(esday('2025-02-02'), 'DD MMMM'))
  })

  it.each([
    {
      value: 5,
      token: 'm',
      withoutSuffix: false,
      isFuture: false,
      expected: 'jedne minute',
    },
    {
      value: 5,
      token: 'm',
      withoutSuffix: false,
      isFuture: true,
      expected: 'jedne minute',
    },
    {
      value: 5,
      token: 'mm',
      withoutSuffix: true,
      isFuture: false,
      expected: '5 minuta',
    },
    {
      value: 5,
      token: 'mm',
      withoutSuffix: true,
      isFuture: true,
      expected: '5 minuta',
    },
  ])('should format value "$value" as relative time using "$token", withoutSuffix "$withoutSuffix", , isFuture "$isFuture"', ({
    value,
    token,
    withoutSuffix,
    isFuture,
    expected,
  }) => {
    expect(
      esday()
        .localeData()
        .relativeTime(value, withoutSuffix, token as RelativeTimeKeys, isFuture),
    ).toBe(expected)
    expectSameValue((esday) =>
      esday()
        .localeData()
        .relativeTime(value, withoutSuffix, token as RelativeTimeKeys, isFuture),
    )
  })
})

// tests with MonthNamesFunction
describe('locale ar - local', () => {
  const fakeTimeAsString = '2023-12-13T03:24:46.234'
  const localeName = 'ar'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
    // set global locale
    esday.locale(localeName)
    moment.locale(localeName)
  })

  afterEach(() => {
    esday.locale(localeName)
    vi.useRealTimers()
  })

  it('should update string with preParse', () => {
    const originalString = 'walk ١٠٠٠ steps a day'
    const convertedString = 'walk 1000 steps a day'

    expect(esday().localeData().preParse?.(originalString)).toBe(convertedString)
    expect(moment().localeData().preparse?.(originalString)).toBe(convertedString)
  })

  it('should update string with postFormat', () => {
    const originalString = 'walk 1000 steps a day'
    const convertedString = 'walk ١٠٠٠ steps a day'

    expect(esday().localeData().postFormat?.(originalString)).toBe(convertedString)
    expect(moment().localeData().postformat?.(originalString)).toBe(convertedString)
  })
})

// tests with DayNamesStandaloneFormat
describe('locale ru - local', () => {
  const fakeTimeAsString = '2023-12-13T03:24:46.234'
  const localeName = 'ru'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
    // set global locale
    esday.locale(localeName)
    moment.locale(localeName)
  })

  afterEach(() => {
    esday.locale(localeName)
    vi.useRealTimers()
  })

  it('should have 7 weekday names', () => {
    const weekdaysEsday = esday().localeData().weekdays()
    const weekdaysMoment = moment().localeData().weekdays()

    expect(weekdaysEsday.length).toBe(7)
    expect(weekdaysEsday).toEqual(weekdaysMoment)
  })

  it('should format date as weekday name', () => {
    const formattedDateEsday = esday().localeData().weekdays(esday('2025-08-02'))

    expect(formattedDateEsday).toBe('суббота')
    expectSameValue((esday) => esday().localeData().weekdays(esday('2025-08-02')))
  })

  it('should format date as weekday name using test-format', () => {
    const formattedDateEsday = esday().localeData().weekdays(esday('2025-08-02'), '[впрошлую] dddd')

    expect(formattedDateEsday).toBe('субботу')
    expectSameValue((esday) =>
      esday().localeData().weekdays(esday('2025-08-02'), '[впрошлую] dddd'),
    )
  })

  it('should have 7 short weekday names', () => {
    const weekdaysEsday = esday().localeData().weekdaysShort()

    expect(weekdaysEsday.length).toBe(7)
    // moment.js uses the weekdays min names as short names too;
    // therefore we cannot compare the 2 lists
  })

  it('should format date as short weekday name', () => {
    const formattedDateEsday = esday().localeData().weekdaysShort(esday('2025-08-02'))

    expect(formattedDateEsday).toBe('сбт')
    // moment.js uses the weekdays min names as short names too;
    // therefore we cannot compare the 2 lists
  })

  it('should format date as short weekday name using test-format', () => {
    const formattedDateEsday = esday()
      .localeData()
      .weekdaysShort(esday('2025-08-02'), '[впрошлую] dddd')

    expect(formattedDateEsday).toBe('сбт')
    // moment.js uses the weekdays min names as short names too;
    // therefore we cannot compare the 2 lists
  })

  it('should have 7 min weekday names', () => {
    const weekdaysEsday = esday().localeData().weekdaysMin()
    const weekdaysMoment = moment().localeData().weekdaysMin()

    expect(weekdaysEsday.length).toBe(7)
    expect(weekdaysEsday).toEqual(weekdaysMoment)
  })

  it('should format date as min weekday name', () => {
    const formattedDateEsday = esday().localeData().weekdaysMin(esday('2025-08-02'))

    expect(formattedDateEsday).toBe('сб')
    expectSameValue((esday) => esday().localeData().weekdaysMin(esday('2025-08-02')))
  })

  it('should format date as min weekday name using test-format', () => {
    const formattedDateEsday = esday()
      .localeData()
      .weekdaysMin(esday('2025-08-02'), '[впрошлую] dddd')

    expect(formattedDateEsday).toBe('сб')
    expectSameValue((esday) =>
      esday().localeData().weekdaysMin(esday('2025-08-02'), '[впрошлую] dddd'),
    )
  })
})

// tests ordinal with period
describe('locale zh - local', () => {
  const fakeTimeAsString = '2023-12-13T03:24:46.234'
  const localeName = 'zh-CN'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
    // set global locale
    esday.locale(localeName)
    moment.locale(localeName.toLowerCase())
  })

  afterEach(() => {
    esday.locale(localeName)
    vi.useRealTimers()
  })

  it('should format ordinal', () => {
    expectSameValue((esday) => esday().localeData().ordinal(2).toString())
  })

  it.each([
    { value: 2, period: 'd', expected: '2日' },
    { value: 3, period: 'D', expected: '3日' },
    { value: 4, period: 'DDD', expected: '4日' },
    { value: 5, period: 'M', expected: '5月' },
    { value: 2, period: 'w', expected: '2周' },
    { value: 2, period: 'W', expected: '2周' },
    { value: 3, period: 'MM', expected: '3' },
  ])('should format "$value" with period "$period"', ({ value, period, expected }) => {
    expect(esday().localeData().ordinal(value, period)).toBe(expected)
    // moment.js returns number if period does not require an pending string
    expectSameValue((esday) => esday().localeData().ordinal(value, period).toString())
  })

  it('should get 1st day of week', () => {
    expectSameValue((esday) => esday().localeData().firstDayOfWeek())
  })

  it('should get 1st day of year', () => {
    expect(esday().localeData().firstDayOfYear()).toBe(4)
    // cannot compare to moment.js here, as moment uses a different way of calculating the firstDayOfYear
  })
})

describe('locale en - global', () => {
  const fakeTimeAsString = '2023-12-13T03:24:46.234'
  const localeName = 'en'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
    // set global locale
    esday.locale(localeName)
    moment.locale(localeName)
  })

  afterEach(() => {
    esday.locale(localeName)
    vi.useRealTimers()
  })

  it('should have 7 weekday names', () => {
    const weekdaysEsday = esday.weekdays()
    const weekdaysMoment = moment.weekdays()

    expect(weekdaysEsday.length).toBe(7)
    expect(weekdaysEsday).toEqual(weekdaysMoment)
  })

  it('should have 7 short weekday names', () => {
    const weekdaysEsday = esday.weekdaysShort()
    const weekdaysMoment = moment.weekdaysShort()

    expect(weekdaysEsday.length).toBe(7)
    expect(weekdaysEsday).toEqual(weekdaysMoment)
  })

  it('should have 7 min weekday names', () => {
    const weekdaysEsday = esday.weekdaysMin()
    const weekdaysMoment = moment.weekdaysMin()

    expect(weekdaysEsday.length).toBe(7)
    expect(weekdaysEsday).toEqual(weekdaysMoment)
  })

  it('should have 12 month names', () => {
    const monthsEsday = esday.months()
    const monthsMoment = moment.months()

    expect(monthsEsday.length).toBe(12)
    expect(monthsEsday).toEqual(monthsMoment)
  })

  it('should have 12 short month names', () => {
    const monthsEsday = esday.monthsShort()
    const monthsMoment = moment.monthsShort()

    expect(monthsEsday.length).toBe(12)
    expect(monthsEsday).toEqual(monthsMoment)
  })

  it('should use global locale by default', () => {
    expect(esday.localeData().weekdays(esday('2025-08-02'))).toBe('Saturday')
    expectSameValue((esday) => esday.localeData().weekdays(esday('2025-08-02')))
  })

  it('should use locale defined as parameter', () => {
    const localeToUse = 'fr'

    expect(esday.localeData(localeToUse).weekdays(esday('2025-08-02'))).toBe('samedi')
    expectSameValue((esday) => esday.localeData(localeToUse).weekdays(esday('2025-08-02')))
  })
})

describe('locale fr - global', () => {
  const fakeTimeAsString = '2023-12-13T03:24:46.234'
  const localeName = 'fr'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
    // set global locale
    esday.locale(localeName)
    moment.locale(localeName)
  })

  afterEach(() => {
    esday.locale(localeName)
    vi.useRealTimers()
  })

  it('should have 7 weekday names', () => {
    const weekdaysEsday = esday.weekdays()
    const weekdaysMoment = moment.weekdays()

    expect(weekdaysEsday.length).toBe(7)
    expect(weekdaysEsday).toEqual(weekdaysMoment)
  })

  it('should have 7 short weekday names', () => {
    const weekdaysEsday = esday.weekdaysShort()
    const weekdaysMoment = moment.weekdaysShort()

    expect(weekdaysEsday.length).toBe(7)
    expect(weekdaysEsday).toEqual(weekdaysMoment)
  })

  it('should have 7 min weekday names', () => {
    const weekdaysEsday = esday.weekdaysMin()
    const weekdaysMoment = moment.weekdaysMin()

    expect(weekdaysEsday.length).toBe(7)
    expect(weekdaysEsday).toEqual(weekdaysMoment)
  })

  it('should have 12 month names', () => {
    const monthsEsday = esday.months()
    const monthsMoment = moment.months()

    expect(monthsEsday.length).toBe(12)
    expect(monthsEsday).toEqual(monthsMoment)
  })

  it('should have 12 short month names', () => {
    const monthsEsday = esday.monthsShort()
    const monthsMoment = moment.monthsShort()

    expect(monthsEsday.length).toBe(12)
    expect(monthsEsday).toEqual(monthsMoment)
  })

  it('should use locale defined as parameter', () => {
    const localeToUse = 'fr'

    expect(esday.localeData(localeToUse).weekdays(esday('2025-08-02'))).toBe('samedi')
    expectSameValue((esday) => esday.localeData(localeToUse).weekdays(esday('2025-08-02')))
  })
})
