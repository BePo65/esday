import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { C } from '~/common'
import localeAr from '~/locales/ar'
import localeEn from '~/locales/en'
import advancedParsePlugin from '~/plugins/advancedParse'
import isoWeekPlugin from '~/plugins/isoWeek'
import localePlugin from '~/plugins/locale'
import localizedFormatPlugin from '~/plugins/localizedFormat'
import { expectSameObject } from '../util'

esday
  .extend(localePlugin)
  .extend(advancedParsePlugin)
  .extend(localizedFormatPlugin)
  .extend(isoWeekPlugin)
esday.registerLocale(localeAr)
esday.registerLocale(localeEn)

describe('isoWeek plugin - default locale ("en")', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    // set global locale
    esday.locale('en')
    moment.locale('en')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'Wo',
      expected: '52nd',
    },
    {
      sourceString: '2025-01-01T14:25:36',
      formatString: 'Wo',
      expected: '1st',
    },
  ])('format date string "$sourceString" with format "$formatString"', ({
    sourceString,
    formatString,
    expected,
  }) => {
    esday(sourceString).format(formatString)
    expect(esday(sourceString).format(formatString)).toBe(expected)
  })

  it.each([
    { sourceString: '2025-10-24 2', formatString: 'YYYY-MM-DD W' },
    { sourceString: '2025 2', formatString: 'YYYY W' },
    { sourceString: '2025 02', formatString: 'YYYY W' },
    { sourceString: '2025 W02', formatString: 'YYYY [W]W' },
    { sourceString: '2025 02', formatString: 'YYYY WW' },
    { sourceString: '2025 12', formatString: 'YYYY WW' },
    { sourceString: '2025 W12', formatString: 'YYYY [W]WW' },
  ])('parse "$sourceString" with isoWeek token "W" in "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameObject((esday) => esday(sourceString, formatString))
  })

  it.each([
    { sourceString: '2025-10-24 2', formatString: 'YYYY-MM-DD E' },
    { sourceString: '2025-10 2', formatString: 'YYYY-MM E' },
    { sourceString: '2025 3', formatString: 'YYYY E' },
    { sourceString: '2025 4', formatString: 'YYYY E' },
  ])('parse "$sourceString" with isoWeekday token "E" in "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameObject((esday) => esday(sourceString, formatString))
  })

  it.each([
    { sourceString: '84', formatString: 'GG' },
    { sourceString: '24', formatString: 'GG' },
    { sourceString: '2024', formatString: 'GG' },
    { sourceString: '2025 2', formatString: 'GG M' },
    { sourceString: '84-10-24', formatString: 'GG-MM-DD' },
    { sourceString: '25-10-24', formatString: 'GG-MM-DD' },
    { sourceString: '2025-10-24', formatString: 'GG-MM-DD' },
    { sourceString: '25 22', formatString: 'GG DD' },
    { sourceString: '2025 22', formatString: 'GG DD' },
    { sourceString: '22 2025', formatString: 'WW GG' },
    { sourceString: '22 25', formatString: 'WW GG' },
    { sourceString: '2025 22 4', formatString: 'GG WW E' },
    { sourceString: '25   W22 4', formatString: 'GG [W]WW E' },
    { sourceString: '2020', formatString: 'GGGG' },
    { sourceString: '2024', formatString: 'GGGG' },
    { sourceString: '2025 2', formatString: 'GGGG M' },
    { sourceString: '2025 06-24', formatString: 'GGGG MM-DD' },
    { sourceString: '2025-10-24', formatString: 'GGGG-MM-DD' },
    { sourceString: '2025 22', formatString: 'GGGG DD' },
    { sourceString: '22 2025', formatString: 'WW GGGG' },
    { sourceString: '2025 22 4', formatString: 'GGGG WW E' },
    { sourceString: '2025   W22 4', formatString: 'GGGG [W]WW E' },
  ])('parse "$sourceString" with isoWeekYear token in "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameObject((esday) => esday(sourceString, formatString))
  })
})

describe('isoWeek plugin - locale "ar"', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    // set global locale
    esday.locale('ar')
    moment.locale('ar')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    {
      sourceString: '2023-11-17T03:24:46.234',
      expectedRawString: '2023-11-13T00:00:00.000',
    },
    {
      sourceString: '2023-11-01T00:00:00.000',
      expectedRawString: '2023-10-30T00:00:00.000',
    },
    {
      sourceString: '2023-01-01T03:24:46.234',
      expectedRawString: '2022-12-26T00:00:00.000',
    },
    {
      sourceString: '2024-01-02T03:24:46.234',
      expectedRawString: '2024-01-01T00:00:00.000',
    },
  ])('should get startOf week for "$sourceString"', ({ sourceString }) => {
    expectSameObject((esday) => esday(sourceString).startOf(C.ISOWEEK))
  })

  it.each([
    { sourceString: '2023-01-01T00:00:00' },
    { sourceString: '2023-01-02T00:00:00' },
    { sourceString: '2023-11-12T00:00:00' },
    { sourceString: '2023-11-13T00:00:00' },
    { sourceString: '2023-11-14T00:00:00' },
    { sourceString: '2023-05-08T00:00:00' },
  ])('should handle edge case for startOf week for "$sourceString"', ({ sourceString }) => {
    expectSameObject((esday) => esday(sourceString).startOf(C.ISOWEEK))
  })

  it.each([
    {
      sourceString: '2023-11-17T03:24:46.234',
      expectedRawString: '2023-11-19T23:59:59.999',
    },
    {
      sourceString: '2023-10-31T00:00:00.000',
      expectedRawString: '2023-11-05T23:59:59.999',
    },
    {
      sourceString: '2023-01-01T03:24:46.234',
      expectedRawString: '2023-01-01T23:59:59.999',
    },
    {
      sourceString: '2022-12-31T03:24:46.234',
      expectedRawString: '2023-01-01T23:59:59.999',
    },
  ])('should get endOf week for "$sourceString"', ({ sourceString }) => {
    expectSameObject((esday) => esday(sourceString).endOf(C.ISOWEEK))
  })

  it.each([
    { sourceString: '2023-01-01T00:00:00' },
    { sourceString: '2022-12-31T00:00:00' },
    { sourceString: '2023-11-13T00:00:00' },
    { sourceString: '2023-11-14T00:00:00' },
    { sourceString: '2023-11-15T00:00:00' },
    { sourceString: '2023-05-08T00:00:00' },
  ])('should handle edge case for endOf week for "$sourceString"', ({ sourceString }) => {
    expectSameObject((esday) => esday(sourceString).endOf(C.ISOWEEK))
  })

  it.each([
    { sourceString: '2024-12-24T14:25:36', formatString: 'Wo', expected: '٥٢' },
    { sourceString: '2025-01-01T14:25:36', formatString: 'Wo', expected: '١' },
  ])('format date string "$sourceString" with format "$formatString"', ({
    sourceString,
    formatString,
    expected,
  }) => {
    esday(sourceString).format(formatString)
    expect(esday(sourceString).format(formatString)).toBe(expected)
  })

  it.each([
    { sourceString: '2025-10-24 2', formatString: 'YYYY-MM-DD W' },
    { sourceString: '2025 2', formatString: 'YYYY W' },
    { sourceString: '2025 02', formatString: 'YYYY W' },
    { sourceString: '2025 W02', formatString: 'YYYY [W]W' },
    { sourceString: '2025 02', formatString: 'YYYY WW' },
    { sourceString: '2025 12', formatString: 'YYYY WW' },
    { sourceString: '2025 W12', formatString: 'YYYY [W]WW' },
  ])('parse "$sourceString" with isoWeek token in "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameObject((esday) => esday(sourceString, formatString))
  })

  it.each([
    { sourceString: '2025-10-24 2', formatString: 'YYYY-MM-DD E' },
    { sourceString: '2025-10 2', formatString: 'YYYY-MM E' },
    { sourceString: '2025 3', formatString: 'YYYY E' },
    { sourceString: '2025 4', formatString: 'YYYY E' },
  ])('parse "$sourceString" with isoWeekday token in "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameObject((esday) => esday(sourceString, formatString))
  })

  it.each([
    { sourceString: '2020', formatString: 'GGGG' },
    { sourceString: '2024', formatString: 'GGGG' },
    { sourceString: '2025 2', formatString: 'GGGG M' },
    { sourceString: '2025 06-24', formatString: 'GGGG MM-DD' },
    { sourceString: '2025-10-24', formatString: 'GGGG-MM-DD' },
    { sourceString: '2025 22', formatString: 'GGGG DD' },
    { sourceString: '2025 22 4', formatString: 'GGGG WW E' },
  ])('parse "$sourceString" with isoWeekYear token in "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameObject((esday) => esday(sourceString, formatString))
  })
})
