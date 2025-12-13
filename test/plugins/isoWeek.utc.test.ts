import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import localeAr from '~/locales/ar'
import localeEn from '~/locales/en'
import advancedParsePlugin from '~/plugins/advancedParse'
import isoWeekPlugin from '~/plugins/isoWeek'
import localePlugin from '~/plugins/locale'
import localizedFormatPlugin from '~/plugins/localizedFormat'
import utcPlugin from '~/plugins/utc'
import { expectSameResult } from '../util'

esday
  .extend(utcPlugin)
  .extend(localePlugin)
  .extend(advancedParsePlugin)
  .extend(localizedFormatPlugin)
  .extend(isoWeekPlugin)
esday.registerLocale(localeEn).registerLocale(localeAr)

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
    { sourceString: '2025-10-24 2', formatString: 'YYYY-MM-DD W' },
    { sourceString: '2025 2', formatString: 'YYYY W' },
    { sourceString: '2025 02', formatString: 'YYYY W' },
    { sourceString: '2025 W02', formatString: 'YYYY [W]W' },
    { sourceString: '2025 02', formatString: 'YYYY WW' },
    { sourceString: '2025 12', formatString: 'YYYY WW' },
    { sourceString: '2025 W12', formatString: 'YYYY [W]WW' },
  ])(
    'parse "$sourceString" with isoWeek token in "$formatString"',
    ({ sourceString, formatString }) => {
      expect(esday.utc(sourceString, formatString)).toBeTruthy()
      expectSameResult((esday) => esday.utc(sourceString, formatString))
    },
  )

  it.each([
    { sourceString: '2025-10-24 2', formatString: 'YYYY-MM-DD E' },
    { sourceString: '2025 3', formatString: 'YYYY E' },
    { sourceString: '2025 4', formatString: 'YYYY E' },
  ])(
    'parse "$sourceString" with isoWeekday token in "$formatString"',
    ({ sourceString, formatString }) => {
      expect(esday.utc(sourceString, formatString)).toBeTruthy()
      expectSameResult((esday) => esday.utc(sourceString, formatString))
    },
  )

  it.each([
    { sourceString: '24', formatString: 'GG' },
    { sourceString: '2024', formatString: 'GG' },
    { sourceString: '2025 2', formatString: 'GG M' },
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
  ])(
    'parse "$sourceString" with isoWeekYear token in "$formatString"',
    ({ sourceString, formatString }) => {
      expect(esday.utc(sourceString, formatString)).toBeTruthy()
      expectSameResult((esday) => esday.utc(sourceString, formatString))
    },
  )
})

describe('isoWeek plugin - locale ar', () => {
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
    { sourceString: '2025-10-24 2', formatString: 'YYYY-MM-DD W' },
    { sourceString: '2025 2', formatString: 'YYYY W' },
    { sourceString: '2025 02', formatString: 'YYYY W' },
    { sourceString: '2025 W02', formatString: 'YYYY [W]W' },
    { sourceString: '2025 02', formatString: 'YYYY WW' },
    { sourceString: '2025 12', formatString: 'YYYY WW' },
    { sourceString: '2025 W12', formatString: 'YYYY [W]WW' },
  ])(
    'parse "$sourceString" with isoWeek token in "$formatString"',
    ({ sourceString, formatString }) => {
      expect(esday.utc(sourceString, formatString)).toBeTruthy()
      expectSameResult((esday) => esday.utc(sourceString, formatString))
    },
  )

  it.each([
    { sourceString: '2025-10-24 2', formatString: 'YYYY-MM-DD E' },
    { sourceString: '2025 3', formatString: 'YYYY E' },
    { sourceString: '2025 4', formatString: 'YYYY E' },
  ])(
    'parse "$sourceString" with isoWeekday token in "$formatString"',
    ({ sourceString, formatString }) => {
      expect(esday.utc(sourceString, formatString)).toBeTruthy()
      expectSameResult((esday) => esday.utc(sourceString, formatString))
    },
  )

  it.each([
    { sourceString: '24', formatString: 'GG' },
    { sourceString: '2024', formatString: 'GG' },
    { sourceString: '2025 2', formatString: 'GG M' },
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
  ])(
    'parse "$sourceString" with isoWeekYear token in "$formatString"',
    ({ sourceString, formatString }) => {
      expect(esday.utc(sourceString, formatString)).toBeTruthy()
      expectSameResult((esday) => esday.utc(sourceString, formatString))
    },
  )
})
