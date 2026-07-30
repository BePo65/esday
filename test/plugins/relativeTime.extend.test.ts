import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { C } from '~/common'
import localeEn from '~/locales/en'
import localePlugin from '~/plugins/locale'
import relativeTimePlugin, { type ThresholdRelativeTime } from '~/plugins/relativeTime'
import utcPlugin from '~/plugins/utc'

esday.extend(localePlugin).extend(utcPlugin)
esday.registerLocale(localeEn)

// Use custom options in .register(relativeTimePlugin, option)
// The modified threshold results in fractional difference between source and reference
const options = {
  thresholds: {
    ss: 35, // modified; default: 44
    s: 45,
    m: 50, // modified; default: 45
    h: 22,
    d: 7,
    w: 5, // modified; default: null (deactivated)
    M: 11,
  } as ThresholdRelativeTime,
}
esday.extend(relativeTimePlugin, options)

describe('relativeTime plugin - extend with custom thresholds', () => {
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
    { difference: 44, unit: C.SECOND, expected: '44 seconds ago' },
    { difference: 45, unit: C.SECOND, expected: 'a minute ago' },
    { difference: 44, unit: C.MIN, expected: '44 minutes ago' },
    { difference: 45, unit: C.MIN, expected: '45 minutes ago' },
    { difference: 49, unit: C.MIN, expected: '49 minutes ago' },
    { difference: 50, unit: C.MIN, expected: 'an hour ago' },
    { difference: 6, unit: C.DAY, expected: '6 days ago' },
    { difference: 7, unit: C.DAY, expected: 'a week ago' },
    { difference: 4, unit: C.WEEK, expected: '4 weeks ago' },
    { difference: 5, unit: C.WEEK, expected: 'a month ago' },
  ])(
    'fromNow with difference "$difference $unit" in the past',
    ({ difference, unit, expected }) => {
      expect(esday().from(esday().add(difference, unit))).toBe(expected)
    },
  )

  it.each([
    { difference: 44, unit: C.SECOND, expected: 'in 44 seconds' },
    { difference: 45, unit: C.SECOND, expected: 'in a minute' },
    { difference: 44, unit: C.MIN, expected: 'in 44 minutes' },
    { difference: 45, unit: C.MIN, expected: 'in 45 minutes' },
    { difference: 49, unit: C.MIN, expected: 'in 49 minutes' },
    { difference: 50, unit: C.MIN, expected: 'in an hour' },
    { difference: 6, unit: C.DAY, expected: 'in 6 days' },
    { difference: 7, unit: C.DAY, expected: 'in a week' },
    { difference: 4, unit: C.WEEK, expected: 'in 4 weeks' },
    { difference: 5, unit: C.WEEK, expected: 'in a month' },
  ])(
    'fromNow with difference "$difference $unit" in the future',
    ({ difference, unit, expected }) => {
      expect(esday().from(esday().subtract(difference, unit))).toBe(expected)
    },
  )
})
