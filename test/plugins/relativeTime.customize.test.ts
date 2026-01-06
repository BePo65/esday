import { esday, type UnitTypeAddSub } from 'esday'
import moment, { type unitOfTime } from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import localeEn from '~/locales/en'
import localePlugin from '~/plugins/locale'
import type {
  RelativeTimeRound,
  ThresholdRelativeTime,
  ThresholdRelativeTimeKeys,
} from '~/plugins/relativeTime'
import relativeTimePlugin from '~/plugins/relativeTime'
import utcPlugin from '~/plugins/utc'
import { expectSameValue } from '../util'

esday.extend(localePlugin).extend(utcPlugin)
esday.registerLocale(localeEn)

esday.extend(relativeTimePlugin)

const defaultThresholds: ThresholdRelativeTime = {
  ss: 44,
  s: 45,
  m: 45,
  h: 22,
  d: 26,
  w: null,
  M: 11,
}

describe('relativeTime plugin - customize thresholds', () => {
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

    // reset all thresholds
    for (const key in defaultThresholds) {
      const keyToUse = key as ThresholdRelativeTimeKeys
      // @ts-expect-error 'key' always defines an existing property of defaultThresholds
      esday.relativeTimeThreshold(keyToUse, defaultThresholds[keyToUse])
      // @ts-expect-error moment.js accepts null as threshold anyway
      moment.relativeTimeThreshold(key, defaultThresholds[keyToUse])
    }

    // threshold for 'ss' is modified if 's' is set; fix by redoing it.
    // @ts-expect-error 'ss' always defines an existing property of defaultThresholds
    esday.relativeTimeThreshold('ss', defaultThresholds['ss'])
    // @ts-expect-error moment.js accepts null as threshold anyway
    moment.relativeTimeThreshold('ss', defaultThresholds['ss'])
  })

  it.each([
    { unit: 'ss', expected: 44 },
    { unit: 's', expected: 45 },
    { unit: 'm', expected: 45 },
    { unit: 'h', expected: 22 },
    { unit: 'd', expected: 26 },
    { unit: 'w', expected: null },
    { unit: 'M', expected: 11 },
    { unit: 'y', expected: false },
    { unit: 'hour', expected: false },
  ])('get threshold for "$unit"', ({ unit, expected }) => {
    expectSameValue((esday) => esday.relativeTimeThreshold(unit as ThresholdRelativeTimeKeys))
    expect(esday.relativeTimeThreshold(unit as ThresholdRelativeTimeKeys)).toBe(expected)
  })

  it.each([
    { unit: 'ss', newValue: 20 },
    { unit: 'ss', newValue: null },
    { unit: 's', newValue: 25 },
    { unit: 's', newValue: null },
    { unit: 'm', newValue: 50 },
    { unit: 'm', newValue: null },
    { unit: 'h', newValue: 19 },
    { unit: 'h', newValue: null },
    { unit: 'd', newValue: 23 },
    { unit: 'd', newValue: null },
    { unit: 'w', newValue: 3 },
    { unit: 'w', newValue: null },
    { unit: 'M', newValue: 9 },
    { unit: 'M', newValue: null },
  ])('set threshold for "$unit" to "$newValue"', ({ unit, newValue }) => {
    expectSameValue((esday) =>
      esday.relativeTimeThreshold(unit as ThresholdRelativeTimeKeys, newValue),
    )
    expect(esday.relativeTimeThreshold(unit as ThresholdRelativeTimeKeys, newValue)).toBeTruthy()
    expect(esday.relativeTimeThreshold(unit as ThresholdRelativeTimeKeys)).toBe(newValue)
  })

  it('setting threshold for unit "s" changes unit "ss"', () => {
    const newThresholdSecond = 50
    esday.relativeTimeThreshold('s', newThresholdSecond)

    expect(esday.relativeTimeThreshold('s')).toBe(newThresholdSecond)
    expect(esday.relativeTimeThreshold('ss')).toBe(newThresholdSecond - 1)
  })

  it.each([
    { difference: 43, unit: 'ss', expectedBefore: 'a few seconds', expectedAfter: 'a few seconds' },
    { difference: 44, unit: 'ss', expectedBefore: 'a few seconds', expectedAfter: 'a few seconds' },
    { difference: 44, unit: 's', expectedBefore: 'a few seconds', expectedAfter: 'a minute' },
    { difference: 45, unit: 's', expectedBefore: 'a minute', expectedAfter: 'a minute' },
    { difference: 44, unit: 'm', expectedBefore: '44 minutes', expectedAfter: 'an hour' },
    { difference: 45, unit: 'm', expectedBefore: 'an hour', expectedAfter: 'an hour' },
    { difference: 21, unit: 'h', expectedBefore: '21 hours', expectedAfter: 'a day' },
    { difference: 22, unit: 'h', expectedBefore: 'a day', expectedAfter: 'a day' },
    { difference: 25, unit: 'd', expectedBefore: '25 days', expectedAfter: 'a month' },
    { difference: 26, unit: 'd', expectedBefore: 'a month', expectedAfter: 'a month' },
    { difference: 10, unit: 'M', expectedBefore: '10 months', expectedAfter: 'a year' },
    { difference: 11, unit: 'M', expectedBefore: 'a year', expectedAfter: 'a year' },
  ])(
    'set threshold for "$unit" to null should format toNow() as "$expectedAfter"',
    ({ difference, unit, expectedBefore, expectedAfter }) => {
      // First: test before setting threshold to null
      expect(
        moment()
          .subtract(difference, unit as unitOfTime.Base)
          .toNow(true),
      ).toBe(expectedBefore)

      expect(
        esday()
          .subtract(difference, unit as UnitTypeAddSub)
          .toNow(true),
      ).toBe(expectedBefore)

      // Then: repeat test after setting threshold to null
      esday.relativeTimeThreshold(unit as ThresholdRelativeTimeKeys, null)
      // @ts-expect-error moment.js accepts null as threshold anyway
      moment.relativeTimeThreshold(unit, null)

      expect(
        moment()
          .subtract(difference, unit as unitOfTime.Base)
          .toNow(true),
      ).toBe(expectedAfter)

      expect(
        esday()
          .subtract(difference, unit as UnitTypeAddSub)
          .toNow(true),
      ).toBe(expectedAfter)
    },
  )

  it.each([
    { threshold: 55, unit: 's', difference: 54, expected: 'a few seconds ago' },
    { threshold: 55, unit: 's', difference: 55, expected: 'a minute ago' },
    { threshold: 50, unit: 'm', difference: 49, expected: '49 minutes ago' },
    { threshold: 50, unit: 'm', difference: 50, expected: 'an hour ago' },
    { threshold: 19, unit: 'h', difference: 18, expected: '18 hours ago' },
    { threshold: 19, unit: 'h', difference: 19, expected: 'a day ago' },
    { threshold: 23, unit: 'd', difference: 22, expected: '22 days ago' },
    { threshold: 23, unit: 'd', difference: 23, expected: 'a month ago' },
    { threshold: 3, unit: 'w', difference: 3, expected: '21 days ago' },
    { threshold: 3, unit: 'w', difference: 4, expected: 'a month ago' },
    { threshold: 9, unit: 'M', difference: 8, expected: '8 months ago' },
    { threshold: 9, unit: 'M', difference: 9, expected: 'a year ago' },
  ])(
    'format difference "$difference $unit" with customized threshold',
    ({ threshold, unit, difference, expected }) => {
      esday.relativeTimeThreshold(unit as ThresholdRelativeTimeKeys, threshold)

      expect(esday().from(esday().add(difference, unit as UnitTypeAddSub))).toBe(expected)
    },
  )
})

describe('relativeTime plugin - customize rounding', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'
  let defaultRounding: RelativeTimeRound

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    // set global locale
    esday.locale('en')
    moment.locale('en')

    defaultRounding = esday.relativeTimeRounding()
  })

  afterEach(() => {
    vi.useRealTimers()
    esday.relativeTimeRounding(defaultRounding)
  })

  it('get rounding default function', () => {
    const roundingFunction = esday.relativeTimeRounding()

    expect(roundingFunction).toBeTypeOf('function')
    expect(roundingFunction(1.6)).toBe(2)
  })

  it('use default rounding function', () => {
    // threshold 'h' = 22h
    // 21:29:59 is rounded to 21:00:00
    const modifiedDateBelowThreshold = esday()
      .subtract(21, 'hours')
      .subtract(29, 'minutes')
      .subtract(59, 'seconds')
    expect(modifiedDateBelowThreshold.toNow()).toBe('in 21 hours')

    // 21:30:00 is rounded to 22:00:00
    const modifiedDateAboveThreshold = modifiedDateBelowThreshold.subtract(1, 'second')
    expect(modifiedDateAboveThreshold.toNow()).toBe('in a day')
  })

  it('set custom rounding to new function', () => {
    const roundingFunctionSet = esday.relativeTimeRounding(Math.floor)

    expect(roundingFunctionSet).toBeTruthy()

    // threshold 'h' = 22h
    // 21:59:59 is rounded to 21:00:00
    const modifiedDateBelowThreshold = esday()
      .subtract(21, 'hours')
      .subtract(59, 'minutes')
      .subtract(59, 'seconds')
    expect(modifiedDateBelowThreshold.toNow()).toBe('in 21 hours')

    // 22:00:00 is rounded to 22:00:00
    const modifiedDateAboveThreshold = modifiedDateBelowThreshold.subtract(1, 'second')
    expect(modifiedDateAboveThreshold.toNow()).toBe('in a day')
  })

  it.each([
    { value: 'Math.round', description: 'string' },
    { value: 123, description: 'number' },
    { value: { a: 123 }, description: 'literal object' },
    { value: [1, 2, 3], description: 'array' },
  ])('set custom rounding to "$description" should return false', (value) => {
    const newFunction = value as unknown as RelativeTimeRound

    expectSameValue((esday) => esday.relativeTimeRounding(newFunction))
  })
})
