import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { C } from '~/common'
import localeAr from '~/locales/ar'
import localeDe from '~/locales/de'
import localeEn from '~/locales/en'
import localeFr from '~/locales/fr'
import localePlugin, { type Locale, type RelativeTimeElementFunction } from '~/plugins/locale'
import relativeTimePlugin, {
  type DiffAsUnit,
  type ThresholdRelativeTime,
} from '~/plugins/relativeTime'
import utcPlugin from '~/plugins/utc'
import { expectSameValue } from '../util'

esday.extend(localePlugin).extend(utcPlugin).extend(relativeTimePlugin)
esday
  .registerLocale(localeAr)
  .registerLocale(localeDe)
  .registerLocale(localeEn)
  .registerLocale(localeFr)

describe('relativeTime plugin - without locale', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'
  const targeTimeAsString = '2024-08-14T12:00:00.000Z'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // Only some test implemented as all formats are tested by .from tests
  it.each([
    {
      source: {
        s: 43,
        m: -1,
        h: -1,
        d: -1,
        w: -1,
        M: -1,
        y: -1,
      },
      expected: '43 seconds',
    },
    {
      source: {
        s: 2640,
        m: 44,
        h: 0.7333333333333333,
        d: 0.030555555555555555,
        w: 0.004365079365079365,
        M: 0.0010038992358957861,
        y: 0.00008365826965798217,
      },
      expected: '44 minutes',
    },
    {
      source: {
        s: 1000,
        m: 1000,
        h: 21,
        d: -1,
        w: -1,
        M: -1,
        y: -1,
      },
      expected: '21 hours',
    },
    {
      source: {
        s: 1000,
        m: 1000,
        h: 1000,
        d: 25,
        w: -1,
        M: -1,
        y: -1,
      },
      expected: '25 days',
    },
    {
      source: {
        s: 1000,
        m: 1000,
        h: 1000,
        d: 1000,
        w: 2,
        M: -1,
        y: -1,
      },
      expected: '2 weeks',
    },
    {
      source: {
        s: 1000,
        m: 1000,
        h: 1000,
        d: 1000,
        w: 1000,
        M: 10,
        y: -1,
      },
      expected: '10 months',
    },
    {
      source: {
        s: 1000,
        m: 1000,
        h: 1000,
        d: 1000,
        w: 1000,
        M: 1000,
        y: 5,
      },
      expected: '5 years',
    },
  ])('should format difference "$expected" without suffix', ({ source, expected }) => {
    const withoutSuffix = true
    const locale = esday.getLocale(esday.locale())
    const thresholdSomeUnits: ThresholdRelativeTime = {
      ss: 10,
      s: 45,
      m: 45,
      h: 22,
      d: 26,
      w: 3,
      M: 11,
    }

    expect(esday.formatDifference(source, withoutSuffix, locale, thresholdSomeUnits)).toBe(expected)
  })

  it('should format a difference without suffix with year only threshold', () => {
    const diffs: DiffAsUnit = {
      s: 1000,
      m: 1000,
      h: 1000,
      d: 1000,
      w: 1000,
      M: 1000,
      y: 5,
    }
    const withoutSuffix = true
    const locale = esday.getLocale(esday.locale())
    // use default thresholds for all units
    const thresholdSomeUnits: ThresholdRelativeTime = {}
    const expected = '5 years'

    expect(esday.formatDifference(diffs, withoutSuffix, locale, thresholdSomeUnits)).toBe(expected)
  })

  it('should format a difference with suffix', () => {
    // difference of 44min
    const diffs: DiffAsUnit = {
      s: 2640,
      m: 44,
      h: 0.7333333333333333,
      d: 0.030555555555555555,
      w: 0.004365079365079365,
      M: 0.0010038992358957861,
      y: 0.00008365826965798217,
    }
    const withoutSuffix = false
    const locale = esday.getLocale(esday.locale())
    const expected = 'in 44 minutes'

    expect(esday.formatDifference(diffs, withoutSuffix, locale)).toBe(expected)
  })

  it('should format a difference with different locale', () => {
    // difference of 44min
    const diffs: DiffAsUnit = {
      s: 2640,
      m: 44,
      h: 0.7333333333333333,
      d: 0.030555555555555555,
      w: 0.004365079365079365,
      M: 0.0010038992358957861,
      y: 0.00008365826965798217,
    }
    const withoutSuffix = false
    const locale = esday.getLocale('fr')
    const expected = 'dans 44 minutes'

    expect(esday.formatDifference(diffs, withoutSuffix, locale)).toBe(expected)
  })

  it('should format a difference with custom threshold', () => {
    // difference of 44min
    const diffs: DiffAsUnit = {
      s: 2640,
      m: 44,
      h: 0.7333333333333333,
      d: 0.030555555555555555,
      w: 0.004365079365079365,
      M: 0.0010038992358957861,
      y: 0.00008365826965798217,
    }
    const thresholdSomeUnits: ThresholdRelativeTime = {
      m: 44,
    }
    const withoutSuffix = true
    const locale = esday.getLocale(esday.locale())
    const expected = 'an hour'

    expect(esday.formatDifference(diffs, withoutSuffix, locale, thresholdSomeUnits)).toBe(expected)
  })

  it('should handle basic usage', () => {
    const nowDate = '2023-11-17T03:24:46.234'

    expectSameValue((esday) => esday(nowDate).fromNow())
    expectSameValue((esday) => esday(nowDate).fromNow(true))
    expectSameValue((esday) => esday(nowDate).toNow())
    expectSameValue((esday) => esday(nowDate).toNow(true))
    expectSameValue((esday) => esday(nowDate).from(targeTimeAsString))
    expectSameValue((esday) => esday(nowDate).from(targeTimeAsString, true))
    expectSameValue((esday) => esday(nowDate).to(targeTimeAsString))
    expectSameValue((esday) => esday(nowDate).to(targeTimeAsString, true))
  })

  it('should handle invalid input', () => {
    expectSameValue((esday) => esday(C.INVALID_DATE).fromNow().toLowerCase())
    expectSameValue((esday) => esday(C.INVALID_DATE).toNow().toLowerCase())
    expectSameValue((esday) => esday(C.INVALID_DATE).from(targeTimeAsString).toLowerCase())
    expectSameValue((esday) => esday(C.INVALID_DATE).to(targeTimeAsString).toLowerCase())
    expectSameValue((esday) => esday(C.INVALID_DATE).fromNow(true).toLowerCase())
    expectSameValue((esday) => esday(C.INVALID_DATE).toNow(true).toLowerCase())
    expectSameValue((esday) => esday(C.INVALID_DATE).from(targeTimeAsString, true).toLowerCase())
    expectSameValue((esday) => esday(C.INVALID_DATE).to(targeTimeAsString, true).toLowerCase())
  })

  it('should accept function as "future"', () => {
    const inTheFuture = 'in the future'
    esday.registerLocale({
      name: 'test',
      relativeTime: {
        future: (
          _timeValue: string | number,
          _withoutSuffix: boolean,
          _token: string,
          _isFuture: boolean,
        ) => inTheFuture,
        MM: '%d months',
      },
    } as Locale)
    const sourceDate = '2023-12-17T03:24:46.234Z'
    const referenceDate = '2024-08-14T12:00:00.000Z'
    const testDate = esday(sourceDate).locale('test')

    expect(testDate.to(referenceDate)).toBe('in the future')
  })

  it('should accept function as "past"', () => {
    const inThePast = 'in the past'
    esday.registerLocale({
      name: 'test',
      relativeTime: {
        past: (
          _timeValue: string | number,
          _withoutSuffix: boolean,
          _token: string,
          _isFuture: boolean,
        ) => inThePast,
        MM: '%d months',
      },
    } as Locale)
    const sourceDate = '2023-12-17T03:24:46.234Z'
    const referenceDate = '2024-08-14T12:00:00.000Z'
    const testDate = esday(sourceDate).locale('test')

    expect(testDate.from(referenceDate)).toBe('in the past')
  })

  it.each([
    {
      difference: 44,
      unit: C.SECOND,
      expected: 'key=s - value=44 ago',
    },
    {
      difference: 89,
      unit: C.SECOND,
      expected: 'key=m - value=1 ago',
    },
    {
      difference: 44,
      unit: C.MIN,
      expected: 'key=mm - value=44 ago',
    },
    {
      difference: 89,
      unit: C.MIN,
      expected: 'key=h - value=1 ago',
    },
    {
      difference: 21,
      unit: C.HOUR,
      expected: 'key=hh - value=21 ago',
    },
    {
      difference: 35,
      unit: C.HOUR,
      expected: 'key=d - value=1 ago',
    },
    {
      difference: 25,
      unit: C.DAY,
      expected: 'key=dd - value=25 ago',
    },
    {
      difference: 45,
      unit: C.DAY,
      expected: 'key=M - value=1 ago',
    },
    {
      difference: 10,
      unit: C.MONTH,
      expected: 'key=MM - value=10 ago',
    },
    {
      difference: 17,
      unit: C.MONTH,
      expected: 'key=y - value=1 ago',
    },
    {
      difference: 2,
      unit: C.YEAR,
      expected: 'key=yy - value=2 ago',
    },
  ])('should accept function for "$difference $unit" in the past', ({
    difference,
    unit,
    expected,
  }) => {
    const formatter: RelativeTimeElementFunction = (
      timeValue: string | number,
      _withoutSuffix: boolean,
      token: string,
      _isFuture: boolean,
    ) => `key=${token} - value=${timeValue}`
    esday.registerLocale({
      name: 'test',
      relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: formatter,
        ss: formatter,
        m: formatter,
        mm: formatter,
        h: formatter,
        hh: formatter,
        d: formatter,
        dd: formatter,
        M: formatter,
        MM: formatter,
        y: formatter,
        yy: formatter,
      },
    } as Locale)
    const testDate = esday().locale('test')
    const referenceDate = testDate.add(difference, unit)

    expect(testDate.from(referenceDate)).toBe(expected)
  })

  it.each([
    {
      difference: 44,
      unit: C.SECOND,
      expected: 'in key=s - value=44',
    },
    {
      difference: 89,
      unit: C.SECOND,
      expected: 'in key=m - value=1',
    },
    {
      difference: 44,
      unit: C.MIN,
      expected: 'in key=mm - value=44',
    },
    {
      difference: 89,
      unit: C.MIN,
      expected: 'in key=h - value=1',
    },
    {
      difference: 21,
      unit: C.HOUR,
      expected: 'in key=hh - value=21',
    },
    {
      difference: 35,
      unit: C.HOUR,
      expected: 'in key=d - value=1',
    },
    {
      difference: 25,
      unit: C.DAY_OF_MONTH,
      expected: 'in key=dd - value=25',
    },
    {
      difference: 45,
      unit: C.DAY_OF_MONTH,
      expected: 'in key=M - value=1',
    },
    {
      difference: 10,
      unit: C.MONTH,
      expected: 'in key=MM - value=10',
    },
    {
      difference: 17,
      unit: C.MONTH,
      expected: 'in key=y - value=1',
    },
    {
      difference: 2,
      unit: C.YEAR,
      expected: 'in key=yy - value=2',
    },
  ])('should accept function for "$difference $unit" in the future', ({
    difference,
    unit,
    expected,
  }) => {
    const formatter: RelativeTimeElementFunction = (
      timeValue: string | number,
      _withoutSuffix: boolean,
      token: string,
      _isFuture: boolean,
    ) => `key=${token} - value=${timeValue}`
    esday.registerLocale({
      name: 'test',
      relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: formatter,
        ss: formatter,
        m: formatter,
        mm: formatter,
        h: formatter,
        hh: formatter,
        d: formatter,
        dd: formatter,
        M: formatter,
        MM: formatter,
        y: formatter,
        yy: formatter,
      },
    } as Locale)
    const testDate = esday().locale('test')
    const referenceDate = testDate.subtract(difference, unit)

    expect(testDate.from(referenceDate)).toBe(expected)
  })

  it('should accept fractional difference', () => {
    expectSameValue((esday) => esday().from(esday().add(36.1, C.HOUR)))
  })

  it('should return default thresholds', () => {
    const thresholds: ThresholdRelativeTime = {
      ss: 44,
      s: 45,
      m: 45,
      h: 22,
      d: 26,
      w: null,
      M: 11,
    }
    expect(esday.defaultThresholds()).toEqual(thresholds)

    // test immutability
    const originalH = thresholds.h
    thresholds.h = 99
    expect(esday.defaultThresholds().h).toEqual(originalH)
  })

  it('should return default thresholds', () => {
    const thresholds: ThresholdRelativeTime = {
      ss: 44,
      s: 45,
      m: 45,
      h: 22,
      d: 26,
      w: null,
      M: 11,
    }
    expect(esday.globalThresholds()).toEqual(thresholds)

    // test immutability
    const originalH = thresholds.h
    thresholds.h = 99
    expect(esday.globalThresholds().h).toEqual(originalH)
  })
})

describe('relativeTime plugin - locale without relativeTime', () => {
  it('should use default relativeTime definitions', () => {
    esday.registerLocale({
      name: 'test',
    } as Locale)
    const sourceDate = '2023-12-17T03:24:46.234Z'
    const referenceDate = '2024-08-14T12:00:00.000Z'
    const testDate = esday(sourceDate).locale('test')

    expect(testDate.to(referenceDate)).toBe('in 8 months')
  })
})

describe('relativeTime plugin - utc', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'
  const sourceTimeAsString = '2023-12-17T03:24:46.234Z'
  const targetTimeAsString = '2024-08-14T12:00:00.000Z'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    { difference: 44, unit: C.SECOND, withoutSuffix: false, expected: 'a few seconds ago' },
    { difference: 44, unit: C.SECOND, withoutSuffix: true, expected: 'a few seconds' },
    { difference: 45, unit: C.SECOND, withoutSuffix: false, expected: 'a minute ago' },
    { difference: 45, unit: C.SECOND, withoutSuffix: true, expected: 'a minute' },
    { difference: 44, unit: C.MIN, withoutSuffix: false, expected: '44 minutes ago' },
    { difference: 44, unit: C.MIN, withoutSuffix: true, expected: '44 minutes' },
    { difference: 45, unit: C.MIN, withoutSuffix: false, expected: 'an hour ago' },
    { difference: 45, unit: C.MIN, withoutSuffix: true, expected: 'an hour' },
    { difference: 21, unit: C.HOUR, withoutSuffix: false, expected: '21 hours ago' },
    { difference: 21, unit: C.HOUR, withoutSuffix: true, expected: '21 hours' },
    { difference: 22, unit: C.HOUR, withoutSuffix: false, expected: 'a day ago' },
    { difference: 22, unit: C.HOUR, withoutSuffix: true, expected: 'a day' },
    { difference: 25, unit: C.DAY, withoutSuffix: false, expected: '25 days ago' },
    { difference: 25, unit: C.DAY, withoutSuffix: true, expected: '25 days' },
    { difference: 26, unit: C.DAY, withoutSuffix: false, expected: 'a month ago' },
    { difference: 26, unit: C.DAY, withoutSuffix: true, expected: 'a month' },
    { difference: -10, unit: C.MONTH, withoutSuffix: false, expected: 'in 10 months' },
    { difference: -10, unit: C.MONTH, withoutSuffix: true, expected: '10 months' },
    { difference: -11, unit: C.MONTH, withoutSuffix: false, expected: 'in a year' },
    { difference: -11, unit: C.MONTH, withoutSuffix: true, expected: 'a year' },
  ])('fromNow with difference "$difference $unit" withoutSuffix="$withoutSuffix"', ({
    difference,
    unit,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday.utc().subtract(difference, unit).fromNow(withoutSuffix))
    expect(esday.utc().subtract(difference, unit).fromNow(withoutSuffix)).toBe(expected)
  })

  it.each([
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: false,
      expected: '8 months ago',
    },
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: true,
      expected: '8 months',
    },
  ])('from "$sourceDate" to "$referenceDate" withoutSuffix="$withoutSuffix"', ({
    sourceDate,
    referenceDate,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday.utc(sourceDate).from(esday.utc(referenceDate), withoutSuffix))
    expect(esday.utc(sourceDate).from(esday.utc(referenceDate), withoutSuffix)).toBe(expected)
  })

  it.each([
    { difference: 44, unit: C.SECOND, withoutSuffix: false, expected: 'in a few seconds' },
    { difference: 44, unit: C.SECOND, withoutSuffix: true, expected: 'a few seconds' },
    { difference: 45, unit: C.SECOND, withoutSuffix: false, expected: 'in a minute' },
    { difference: 45, unit: C.SECOND, withoutSuffix: true, expected: 'a minute' },
    { difference: 44, unit: C.MIN, withoutSuffix: false, expected: 'in 44 minutes' },
    { difference: 44, unit: C.MIN, withoutSuffix: true, expected: '44 minutes' },
    { difference: 45, unit: C.MIN, withoutSuffix: false, expected: 'in an hour' },
    { difference: 45, unit: C.MIN, withoutSuffix: true, expected: 'an hour' },
    { difference: 21, unit: C.HOUR, withoutSuffix: false, expected: 'in 21 hours' },
    { difference: 21, unit: C.HOUR, withoutSuffix: true, expected: '21 hours' },
    { difference: 22, unit: C.HOUR, withoutSuffix: false, expected: 'in a day' },
    { difference: 22, unit: C.HOUR, withoutSuffix: true, expected: 'a day' },
    { difference: 25, unit: C.DAY, withoutSuffix: false, expected: 'in 25 days' },
    { difference: 25, unit: C.DAY, withoutSuffix: true, expected: '25 days' },
    { difference: 26, unit: C.DAY, withoutSuffix: false, expected: 'in a month' },
    { difference: 26, unit: C.DAY, withoutSuffix: true, expected: 'a month' },
    { difference: -10, unit: C.MONTH, withoutSuffix: false, expected: '10 months ago' },
    { difference: -10, unit: C.MONTH, withoutSuffix: true, expected: '10 months' },
    { difference: -11, unit: C.MONTH, withoutSuffix: false, expected: 'a year ago' },
    { difference: -11, unit: C.MONTH, withoutSuffix: true, expected: 'a year' },
  ])('toNow with difference "$difference $unit" withoutSuffix="$withoutSuffix"', ({
    difference,
    unit,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday.utc().subtract(difference, unit).toNow(withoutSuffix))
    expect(esday.utc().subtract(difference, unit).toNow(withoutSuffix)).toBe(expected)
  })

  it.each([
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: false,
      expected: 'in 8 months',
    },
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: true,
      expected: '8 months',
    },
  ])('to "$sourceDate" from "$referenceDate" withoutSuffix="$withoutSuffix"', ({
    sourceDate,
    referenceDate,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday.utc(sourceDate).to(esday.utc(referenceDate), withoutSuffix))
    expect(esday.utc(sourceDate).to(esday.utc(referenceDate), withoutSuffix)).toBe(expected)
  })
})

describe('relativeTime plugin - locale en', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'
  const sourceTimeAsString = '2023-12-17T03:24:46.234Z'
  const targetTimeAsString = '2024-08-14T12:00:00.000Z'

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
    { difference: 44, unit: C.SECOND, withoutSuffix: false, expected: 'a few seconds ago' },
    { difference: 44, unit: C.SECOND, withoutSuffix: true, expected: 'a few seconds' },
    { difference: 45, unit: C.SECOND, withoutSuffix: false, expected: 'a minute ago' },
    { difference: 45, unit: C.SECOND, withoutSuffix: true, expected: 'a minute' },
    { difference: 44, unit: C.MIN, withoutSuffix: false, expected: '44 minutes ago' },
    { difference: 44, unit: C.MIN, withoutSuffix: true, expected: '44 minutes' },
    { difference: 45, unit: C.MIN, withoutSuffix: false, expected: 'an hour ago' },
    { difference: 45, unit: C.MIN, withoutSuffix: true, expected: 'an hour' },
    { difference: 21, unit: C.HOUR, withoutSuffix: false, expected: '21 hours ago' },
    { difference: 21, unit: C.HOUR, withoutSuffix: true, expected: '21 hours' },
    { difference: 22, unit: C.HOUR, withoutSuffix: false, expected: 'a day ago' },
    { difference: 22, unit: C.HOUR, withoutSuffix: true, expected: 'a day' },
    { difference: 25, unit: C.DAY, withoutSuffix: false, expected: '25 days ago' },
    { difference: 25, unit: C.DAY, withoutSuffix: true, expected: '25 days' },
    { difference: 26, unit: C.DAY, withoutSuffix: false, expected: 'a month ago' },
    { difference: 26, unit: C.DAY, withoutSuffix: true, expected: 'a month' },
    { difference: 45, unit: C.DAY, withoutSuffix: false, expected: 'a month ago' },
    { difference: 45, unit: C.DAY, withoutSuffix: true, expected: 'a month' },
    { difference: 46, unit: C.DAY, withoutSuffix: false, expected: '2 months ago' },
    { difference: 46, unit: C.DAY, withoutSuffix: true, expected: '2 months' },
    { difference: 547, unit: C.DAY, withoutSuffix: false, expected: 'a year ago' },
    { difference: 547, unit: C.DAY, withoutSuffix: true, expected: 'a year' },
    { difference: 548, unit: C.DAY, withoutSuffix: false, expected: '2 years ago' },
    { difference: 548, unit: C.DAY, withoutSuffix: true, expected: '2 years' },
    { difference: -10, unit: C.MONTH, withoutSuffix: false, expected: 'in 10 months' },
    { difference: -10, unit: C.MONTH, withoutSuffix: true, expected: '10 months' },
    { difference: -11, unit: C.MONTH, withoutSuffix: false, expected: 'in a year' },
    { difference: -11, unit: C.MONTH, withoutSuffix: true, expected: 'a year' },
  ])('fromNow with difference "$difference $unit" withoutSuffix="$withoutSuffix"', ({
    difference,
    unit,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday().subtract(difference, unit).fromNow(withoutSuffix))
    expect(esday().subtract(difference, unit).fromNow(withoutSuffix)).toBe(expected)
  })

  it.each([
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: false,
      expected: '8 months ago',
    },
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: true,
      expected: '8 months',
    },
  ])('from "$sourceDate" to "$referenceDate" withoutSuffix="$withoutSuffix"', ({
    sourceDate,
    referenceDate,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday(sourceDate).from(esday(referenceDate), withoutSuffix))
    expect(esday(sourceDate).from(esday(referenceDate), withoutSuffix)).toBe(expected)
  })

  it.each([
    { difference: 44, unit: C.SECOND, withoutSuffix: false, expected: 'in a few seconds' },
    { difference: 44, unit: C.SECOND, withoutSuffix: true, expected: 'a few seconds' },
    { difference: 45, unit: C.SECOND, withoutSuffix: false, expected: 'in a minute' },
    { difference: 45, unit: C.SECOND, withoutSuffix: true, expected: 'a minute' },
    { difference: 44, unit: C.MIN, withoutSuffix: false, expected: 'in 44 minutes' },
    { difference: 44, unit: C.MIN, withoutSuffix: true, expected: '44 minutes' },
    { difference: 45, unit: C.MIN, withoutSuffix: false, expected: 'in an hour' },
    { difference: 45, unit: C.MIN, withoutSuffix: true, expected: 'an hour' },
    { difference: 21, unit: C.HOUR, withoutSuffix: false, expected: 'in 21 hours' },
    { difference: 21, unit: C.HOUR, withoutSuffix: true, expected: '21 hours' },
    { difference: 22, unit: C.HOUR, withoutSuffix: false, expected: 'in a day' },
    { difference: 22, unit: C.HOUR, withoutSuffix: true, expected: 'a day' },
    { difference: 25, unit: C.DAY, withoutSuffix: false, expected: 'in 25 days' },
    { difference: 25, unit: C.DAY, withoutSuffix: true, expected: '25 days' },
    { difference: 26, unit: C.DAY, withoutSuffix: false, expected: 'in a month' },
    { difference: 26, unit: C.DAY, withoutSuffix: true, expected: 'a month' },
    { difference: -10, unit: C.MONTH, withoutSuffix: false, expected: '10 months ago' },
    { difference: -10, unit: C.MONTH, withoutSuffix: true, expected: '10 months' },
    { difference: -11, unit: C.MONTH, withoutSuffix: false, expected: 'a year ago' },
    { difference: -11, unit: C.MONTH, withoutSuffix: true, expected: 'a year' },
  ])('toNow with difference "$difference $unit" withoutSuffix="$withoutSuffix"', ({
    difference,
    unit,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday().subtract(difference, unit).toNow(withoutSuffix))
    expect(esday().subtract(difference, unit).toNow(withoutSuffix)).toBe(expected)
  })

  it.each([
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: false,
      expected: 'in 8 months',
    },
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: true,
      expected: '8 months',
    },
  ])('to "$sourceDate" from "$referenceDate" withoutSuffix="$withoutSuffix"', ({
    sourceDate,
    referenceDate,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday(sourceDate).to(esday(referenceDate), withoutSuffix))
    expect(esday(sourceDate).to(esday(referenceDate), withoutSuffix)).toBe(expected)
  })
})

describe('relativeTime plugin - locale fr', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'
  const sourceTimeAsString = '2023-12-17T03:24:46.234Z'
  const targetTimeAsString = '2024-08-14T12:00:00.000Z'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    // set global locale
    esday.locale('fr')
    moment.locale('fr')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    { difference: 44, unit: C.SECOND, withoutSuffix: false, expected: 'il y a quelques secondes' },
    { difference: 44, unit: C.SECOND, withoutSuffix: true, expected: 'quelques secondes' },
    { difference: 45, unit: C.SECOND, withoutSuffix: false, expected: 'il y a une minute' },
    { difference: 45, unit: C.SECOND, withoutSuffix: true, expected: 'une minute' },
    { difference: 44, unit: C.MIN, withoutSuffix: false, expected: 'il y a 44 minutes' },
    { difference: 44, unit: C.MIN, withoutSuffix: true, expected: '44 minutes' },
    { difference: 45, unit: C.MIN, withoutSuffix: false, expected: 'il y a une heure' },
    { difference: 45, unit: C.MIN, withoutSuffix: true, expected: 'une heure' },
    { difference: 21, unit: C.HOUR, withoutSuffix: false, expected: 'il y a 21 heures' },
    { difference: 21, unit: C.HOUR, withoutSuffix: true, expected: '21 heures' },
    { difference: 22, unit: C.HOUR, withoutSuffix: false, expected: 'il y a un jour' },
    { difference: 22, unit: C.HOUR, withoutSuffix: true, expected: 'un jour' },
    { difference: 25, unit: C.DAY, withoutSuffix: false, expected: 'il y a 25 jours' },
    { difference: 25, unit: C.DAY, withoutSuffix: true, expected: '25 jours' },
    { difference: 26, unit: C.DAY, withoutSuffix: false, expected: 'il y a un mois' },
    { difference: 26, unit: C.DAY, withoutSuffix: true, expected: 'un mois' },
    { difference: 46, unit: C.DAY, withoutSuffix: false, expected: 'il y a 2 mois' },
    { difference: 46, unit: C.DAY, withoutSuffix: true, expected: '2 mois' },
    { difference: 547, unit: C.DAY, withoutSuffix: false, expected: 'il y a un an' },
    { difference: 547, unit: C.DAY, withoutSuffix: true, expected: 'un an' },
    { difference: 548, unit: C.DAY, withoutSuffix: false, expected: 'il y a 2 ans' },
    { difference: 548, unit: C.DAY, withoutSuffix: true, expected: '2 ans' },
    { difference: -10, unit: C.MONTH, withoutSuffix: false, expected: 'dans 10 mois' },
    { difference: -10, unit: C.MONTH, withoutSuffix: true, expected: '10 mois' },
    { difference: -11, unit: C.MONTH, withoutSuffix: false, expected: 'dans un an' },
    { difference: -11, unit: C.MONTH, withoutSuffix: true, expected: 'un an' },
  ])('fromNow with difference "$difference $unit" withoutSuffix="$withoutSuffix"', ({
    difference,
    unit,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday().subtract(difference, unit).fromNow(withoutSuffix))
    expect(esday().subtract(difference, unit).fromNow(withoutSuffix)).toBe(expected)
  })

  it.each([
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: false,
      expected: 'il y a 8 mois',
    },
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: true,
      expected: '8 mois',
    },
  ])('from "$sourceDate" to "$referenceDate" withoutSuffix="$withoutSuffix"', ({
    sourceDate,
    referenceDate,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday(sourceDate).from(esday(referenceDate), withoutSuffix))
    expect(esday(sourceDate).from(esday(referenceDate), withoutSuffix)).toBe(expected)
  })

  it.each([
    { difference: 44, unit: C.SECOND, withoutSuffix: false, expected: 'dans quelques secondes' },
    { difference: 44, unit: C.SECOND, withoutSuffix: true, expected: 'quelques secondes' },
    { difference: 45, unit: C.SECOND, withoutSuffix: false, expected: 'dans une minute' },
    { difference: 45, unit: C.SECOND, withoutSuffix: true, expected: 'une minute' },
    { difference: 44, unit: C.MIN, withoutSuffix: false, expected: 'dans 44 minutes' },
    { difference: 44, unit: C.MIN, withoutSuffix: true, expected: '44 minutes' },
    { difference: 45, unit: C.MIN, withoutSuffix: false, expected: 'dans une heure' },
    { difference: 45, unit: C.MIN, withoutSuffix: true, expected: 'une heure' },
    { difference: 21, unit: C.HOUR, withoutSuffix: false, expected: 'dans 21 heures' },
    { difference: 21, unit: C.HOUR, withoutSuffix: true, expected: '21 heures' },
    { difference: 22, unit: C.HOUR, withoutSuffix: false, expected: 'dans un jour' },
    { difference: 22, unit: C.HOUR, withoutSuffix: true, expected: 'un jour' },
    { difference: 25, unit: C.DAY, withoutSuffix: false, expected: 'dans 25 jours' },
    { difference: 25, unit: C.DAY, withoutSuffix: true, expected: '25 jours' },
    { difference: 26, unit: C.DAY, withoutSuffix: false, expected: 'dans un mois' },
    { difference: 26, unit: C.DAY, withoutSuffix: true, expected: 'un mois' },
    { difference: -10, unit: C.MONTH, withoutSuffix: false, expected: 'il y a 10 mois' },
    { difference: -10, unit: C.MONTH, withoutSuffix: true, expected: '10 mois' },
    { difference: -11, unit: C.MONTH, withoutSuffix: false, expected: 'il y a un an' },
    { difference: -11, unit: C.MONTH, withoutSuffix: true, expected: 'un an' },
  ])('toNow with difference "$difference $unit" withoutSuffix="$withoutSuffix"', ({
    difference,
    unit,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday().subtract(difference, unit).toNow(withoutSuffix))
    expect(esday().subtract(difference, unit).toNow(withoutSuffix)).toBe(expected)
  })

  it.each([
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: false,
      expected: 'dans 8 mois',
    },
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: true,
      expected: '8 mois',
    },
  ])('to "$sourceDate" from "$referenceDate" withoutSuffix="$withoutSuffix"', ({
    sourceDate,
    referenceDate,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday(sourceDate).to(esday(referenceDate), withoutSuffix))
    expect(esday(sourceDate).to(esday(referenceDate), withoutSuffix)).toBe(expected)
  })
})

describe('relativeTime plugin - locale de', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    // set global locale
    esday.locale('de')
    moment.locale('de')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    { difference: 45, unit: C.DAY, withoutSuffix: false, expected: 'vor einem Monat' },
    { difference: 45, unit: C.DAY, withoutSuffix: true, expected: 'ein Monat' },
    { difference: 46, unit: C.DAY, withoutSuffix: false, expected: 'vor 2 Monaten' },
    { difference: 46, unit: C.DAY, withoutSuffix: true, expected: '2 Monate' },
    { difference: 547, unit: C.DAY, withoutSuffix: false, expected: 'vor einem Jahr' },
    { difference: 547, unit: C.DAY, withoutSuffix: true, expected: 'ein Jahr' },
    { difference: 548, unit: C.DAY, withoutSuffix: false, expected: 'vor 2 Jahren' },
    { difference: 548, unit: C.DAY, withoutSuffix: true, expected: '2 Jahre' },
    { difference: 1094, unit: C.DAY, withoutSuffix: false, expected: 'vor 3 Jahren' },
    { difference: 1094, unit: C.DAY, withoutSuffix: true, expected: '3 Jahre' },
  ])('fromNow with difference "$difference $unit" withoutSuffix="$withoutSuffix"', ({
    difference,
    unit,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday().subtract(difference, unit).fromNow(withoutSuffix))
    expect(esday().subtract(difference, unit).fromNow(withoutSuffix)).toBe(expected)
  })
})

describe('relativeTime plugin - locale ar', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'
  const sourceTimeAsString = '2023-12-17T03:24:46.234Z'
  const targetTimeAsString = '2024-08-14T12:00:00.000Z'

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
    { difference: 44, unit: C.SECOND, withoutSuffix: false, expected: 'منذ ٤٤ ثانية' },
    { difference: 44, unit: C.SECOND, withoutSuffix: true, expected: '٤٤ ثانية' },
    { difference: 45, unit: C.SECOND, withoutSuffix: false, expected: 'منذ دقيقة واحدة' },
    { difference: 45, unit: C.SECOND, withoutSuffix: true, expected: 'دقيقة واحدة' },
    { difference: 44, unit: C.MIN, withoutSuffix: false, expected: 'منذ ٤٤ دقيقة' },
    { difference: 44, unit: C.MIN, withoutSuffix: true, expected: '٤٤ دقيقة' },
    { difference: 45, unit: C.MIN, withoutSuffix: false, expected: 'منذ ساعة واحدة' },
    { difference: 45, unit: C.MIN, withoutSuffix: true, expected: 'ساعة واحدة' },
    { difference: 21, unit: C.HOUR, withoutSuffix: false, expected: 'منذ ٢١ ساعة' },
    { difference: 21, unit: C.HOUR, withoutSuffix: true, expected: '٢١ ساعة' },
    { difference: 22, unit: C.HOUR, withoutSuffix: false, expected: 'منذ يوم واحد' },
    { difference: 22, unit: C.HOUR, withoutSuffix: true, expected: 'يوم واحد' },
    { difference: 25, unit: C.DAY, withoutSuffix: false, expected: 'منذ ٢٥ يومًا' },
    { difference: 25, unit: C.DAY, withoutSuffix: true, expected: '٢٥ يومًا' },
    { difference: 26, unit: C.DAY, withoutSuffix: false, expected: 'منذ شهر واحد' },
    { difference: 26, unit: C.DAY, withoutSuffix: true, expected: 'شهر واحد' },
    { difference: 547, unit: C.DAY, withoutSuffix: false, expected: 'منذ عام واحد' },
    { difference: 547, unit: C.DAY, withoutSuffix: true, expected: 'عام واحد' },
    { difference: 548, unit: C.DAY, withoutSuffix: false, expected: 'منذ عامين' },
    { difference: 548, unit: C.DAY, withoutSuffix: true, expected: 'عامان' },
    { difference: -10, unit: C.MONTH, withoutSuffix: false, expected: 'بعد ١٠ أشهر' },
    { difference: -10, unit: C.MONTH, withoutSuffix: true, expected: '١٠ أشهر' },
    { difference: -11, unit: C.MONTH, withoutSuffix: false, expected: 'بعد عام واحد' },
    { difference: -11, unit: C.MONTH, withoutSuffix: true, expected: 'عام واحد' },
  ])('fromNow with difference "$difference $unit" withoutSuffix="$withoutSuffix"', ({
    difference,
    unit,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday().subtract(difference, unit).fromNow(withoutSuffix))
    expect(esday().subtract(difference, unit).fromNow(withoutSuffix)).toBe(expected)
  })

  it.each([
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: false,
      expected: 'منذ ٨ أشهر',
    },
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: true,
      expected: '٨ أشهر',
    },
  ])('from "$sourceDate" to "$referenceDate" withoutSuffix="$withoutSuffix"', ({
    sourceDate,
    referenceDate,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday(sourceDate).from(esday(referenceDate), withoutSuffix))
    expect(esday(sourceDate).from(esday(referenceDate), withoutSuffix)).toBe(expected)
  })

  it.each([
    { difference: 44, unit: C.SECOND, withoutSuffix: false, expected: 'بعد ٤٤ ثانية' },
    { difference: 44, unit: C.SECOND, withoutSuffix: true, expected: '٤٤ ثانية' },
    { difference: 45, unit: C.SECOND, withoutSuffix: false, expected: 'بعد دقيقة واحدة' },
    { difference: 45, unit: C.SECOND, withoutSuffix: true, expected: 'دقيقة واحدة' },
    { difference: 44, unit: C.MIN, withoutSuffix: false, expected: 'بعد ٤٤ دقيقة' },
    { difference: 44, unit: C.MIN, withoutSuffix: true, expected: '٤٤ دقيقة' },
    { difference: 45, unit: C.MIN, withoutSuffix: false, expected: 'بعد ساعة واحدة' },
    { difference: 45, unit: C.MIN, withoutSuffix: true, expected: 'ساعة واحدة' },
    { difference: 21, unit: C.HOUR, withoutSuffix: false, expected: 'بعد ٢١ ساعة' },
    { difference: 21, unit: C.HOUR, withoutSuffix: true, expected: '٢١ ساعة' },
    { difference: 22, unit: C.HOUR, withoutSuffix: false, expected: 'بعد يوم واحد' },
    { difference: 22, unit: C.HOUR, withoutSuffix: true, expected: 'يوم واحد' },
    { difference: 25, unit: C.DAY, withoutSuffix: false, expected: 'بعد ٢٥ يومًا' },
    { difference: 25, unit: C.DAY, withoutSuffix: true, expected: '٢٥ يومًا' },
    { difference: 26, unit: C.DAY, withoutSuffix: false, expected: 'بعد شهر واحد' },
    { difference: 26, unit: C.DAY, withoutSuffix: true, expected: 'شهر واحد' },
    { difference: -10, unit: C.MONTH, withoutSuffix: false, expected: 'منذ ١٠ أشهر' },
    { difference: -10, unit: C.MONTH, withoutSuffix: true, expected: '١٠ أشهر' },
    { difference: -11, unit: C.MONTH, withoutSuffix: false, expected: 'منذ عام واحد' },
    { difference: -11, unit: C.MONTH, withoutSuffix: true, expected: 'عام واحد' },
  ])('toNow with difference "$difference $unit" withoutSuffix="$withoutSuffix"', ({
    difference,
    unit,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday().subtract(difference, unit).toNow(withoutSuffix))
    expect(esday().subtract(difference, unit).toNow(withoutSuffix)).toBe(expected)
  })

  it.each([
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: false,
      expected: 'بعد ٨ أشهر',
    },
    {
      sourceDate: sourceTimeAsString,
      referenceDate: targetTimeAsString,
      withoutSuffix: true,
      expected: '٨ أشهر',
    },
  ])('to "$sourceDate" from "$referenceDate" withoutSuffix="$withoutSuffix"', ({
    sourceDate,
    referenceDate,
    withoutSuffix,
    expected,
  }) => {
    expectSameValue((esday) => esday(sourceDate).to(esday(referenceDate), withoutSuffix))
    expect(esday(sourceDate).to(esday(referenceDate), withoutSuffix)).toBe(expected)
  })
})
