import { afterEach } from 'node:test'
import { EsDay, type EsDayFactory, esday } from 'esday'
import moment, { type Moment } from 'moment-timezone'
import { describe, expect, it } from 'vitest'
import timezonePLugin from '~/plugins/timezone'
import utcPlugin from '~/plugins/utc'

esday.extend(utcPlugin).extend(timezonePLugin)

describe('timezone plugin', () => {
  afterEach(() => {
    esday.tz.setDefault()
    moment.tz.setDefault()
  })

  it.each([
    {
      timestamp: '2025-03-09 01:15',
      timezone: 'America/Toronto',
      comment: 'without DST',
    },
    {
      timestamp: '2025-03-09 02:15',
      timezone: 'America/Toronto',
      comment: 'with DST',
    },
    {
      timestamp: '2025-11-18 11:55',
      timezone: 'America/Toronto',
      comment: 'without DST',
    },
    {
      timestamp: '2025-03-30 01:55',
      timezone: 'Europe/Paris',
      comment: 'just before start of DST',
    },
    {
      timestamp: '2025-03-30 02:15',
      timezone: 'Europe/Paris',
      comment: 'in gap of DST (date/time does not exist)',
    },
    {
      timestamp: '2025-03-30 03:05',
      timezone: 'Europe/Paris',
      comment: 'just after start of DST',
    },
    {
      timestamp: '2025-07-13 17:05',
      timezone: 'CET',
      comment: 'with DST',
    },
    {
      timestamp: '2025-11-18 11:55',
      timezone: 'Asia/Taipei',
      comment: 'without DST',
    },
    {
      timestamp: '2025-03-10T00:00:00',
      timezone: 'Europe/London',
      comment: 'dayjs pr#2981 test 1 and pr#2949',
    },
    {
      timestamp: '2025-03-10T00:00:00',
      timezone: 'Europe/London',
      comment: 'dayjs pr#2981 test 2',
    },
    {
      timestamp: '2022-03-11T14:29:26.319Z',
      timezone: 'America/Recife',
      comment: 'dayjs pr#2912 test 1',
    },
    {
      timestamp: '2012-02-01T13:50:21.01-03:00',
      timezone: 'America/Recife',
      comment: 'dayjs pr#2912 test 2',
    },
    {
      timestamp: '2022-02-03T13:50:21-00:00',
      timezone: 'America/Recife',
      comment: 'dayjs pr#2912 test 3',
    },
    {
      timestamp: '2024-09-30 12:43:00-0400',
      timezone: 'America/New_York',
      comment: 'dayjs pr#2774 test 1',
    },
    {
      timestamp: '2022-03-11T14:29:26.319Z',
      timezone: 'America/Manaus',
      comment: 'dayjs issue#1827 test 1',
    },
    {
      timestamp: '2024-02-19T03:00:00',
      timezone: 'Europe/London',
      comment: 'is not DST (utcOffset === 0)',
    },
    {
      timestamp: '2022-07-19T03:00:00',
      timezone: 'Europe/London',
      comment: 'is DST (utcOffset === 60)',
    },
    {
      timestamp: '2022-04-19T03:00:00-02:00',
      timezone: 'GMT',
      comment: 'dayjs pr#2118 test 1a',
    },
    {
      timestamp: '2022-04-19T03:00:00',
      timezone: 'GMT',
      comment: 'dayjs pr#2118 test 1b',
    },
    {
      timestamp: '2022-01-22 03:00:00-03:00',
      timezone: 'UTC',
      comment: 'dayjs pr#2118 test 2a',
    },
    {
      timestamp: '2022-01-22',
      timezone: 'UTC',
      comment: 'dayjs pr#2118 test 2b',
    },
    {
      timestamp: '1900-06-01T12:00:00',
      timezone: 'Europe/Kiev',
      comment: 'dayjs issue#1905',
    },
  ])('parse "$timestamp" for "$timezone"', ({ timestamp, timezone }) => {
    expectSameResultTz((esday) => esday.tz(timestamp, timezone))
    expect(esday.tz(timestamp, timezone).isValid()).toBeTruthy()
    expectSameTz((esday) => esday.tz(timestamp, timezone).format())
  })

  it.each([
    {
      timestamp: '2012-03-11 01:59:59',
      timezone: 'America/New_York',
      comment: 'just before spring forward DST gap',
    },
    {
      timestamp: '2012-03-11 02:00:00',
      timezone: 'America/New_York',
      comment: 'start of spring forward DST gap',
    },
    {
      timestamp: '2012-03-11 02:59:59',
      timezone: 'America/New_York',
      comment: 'end of spring forward DST gap',
    },
    {
      timestamp: '2012-03-11 03:00:00',
      timezone: 'America/New_York',
      comment: 'just after spring forward DST gap',
    },
    {
      timestamp: '2012-11-04 00:59:59',
      timezone: 'America/New_York',
      comment: 'just before fall back DST gap',
    },
    {
      timestamp: '2012-11-04 01:00:00',
      timezone: 'America/New_York',
      comment: 'start of fall back DST gap',
    },
    {
      timestamp: '2012-11-04 01:59:59',
      timezone: 'America/New_York',
      comment: 'end of fall back DST gap',
    },
    {
      timestamp: '2012-11-04 02:00:00',
      timezone: 'America/New_York',
      comment: 'just after fall back DST gap',
    },
    {
      timestamp: '2012-11-04 01:00:00-04:00',
      timezone: 'America/New_York',
      comment: 'with offset - before fall back to DST',
    },
    {
      timestamp: '2012-11-04 01:00:00-05:00',
      timezone: 'America/New_York',
      comment: 'with offset - after fall back to DST',
    },

    {
      timestamp: '2012-10-28 01:59:59',
      timezone: 'Europe/Berlin',
      comment: 'just before fall back DST gap',
    },
    {
      timestamp: '2012-10-28 02:00:00',
      timezone: 'Europe/Berlin',
      comment: 'start of fall back DST gap',
    },
    {
      timestamp: '2012-10-28 02:59:59',
      timezone: 'Europe/Berlin',
      comment: 'end of fall back DST gap',
    },
    {
      timestamp: '2012-10-28 03:00:00',
      timezone: 'Europe/Berlin',
      comment: 'just after fall back DST gap',
    },
    {
      timestamp: '2012-10-28 03:00:01',
      timezone: 'Europe/Berlin',
      comment: 'just after fall back DST gap',
    },
    {
      timestamp: '2012-10-28 02:00:00+02:00',
      timezone: 'Europe/Berlin',
      comment: 'with offset - before fall back from DST',
    },
    {
      timestamp: '2012-10-28 02:00:00+01:00',
      timezone: 'Europe/Berlin',
      comment: 'with offset - after fall back to DST',
    },
  ])(
    'parse non existing time around DST gap for "$timestamp" in "$timezone"',
    ({ timestamp, timezone }) => {
      expectSameResultTz((esday) => esday.tz(timestamp, timezone))
      expect(esday.tz(timestamp, timezone).isValid()).toBeTruthy()
      expectSameTz((esday) => esday.tz(timestamp, timezone).format())
    },
  )

  it.todo('parse with format')

  it.todo('parse with format and strict')

  it.each([
    {
      timestamp: '2025-11-09 01:15',
      timezone: 'America/Toronto',
    },
    {
      timestamp: '2025-11-09 01:15',
      timezone: 'Europe/Berlin',
    },
    {
      timestamp: '2023-10-02T00:00:00+02:00',
      timezone: 'Europe/Prague',
      comment: 'dayjs issue#2753',
    },
    {
      timestamp: '2021-10-31T15:00:00+00:00',
      timezone: 'Europe/London',
      comment: 'dayjs issue#1678; is not',
    },
  ])('convert "$timestamp" to "$timezone"', ({ timestamp, timezone }) => {
    expectSameResultTz((esday) => esday(timestamp).tz(timezone))
    expect(esday(timestamp).tz(timezone).isValid()).toBeTruthy()
    expectSameTz((esday) => esday(timestamp).tz(timezone).format())
  })

  it.todo('convert with keepLocalTime')

  it.todo('convert with format and strict')

  it('convert returns new instance', () => {
    const timestamp = '2025-07-13 17:05'
    const timezone = 'Asia/Taipei'
    const base = esday(timestamp)
    const withTimezone = base.tz(timezone)

    expect(base).toBeInstanceOf(EsDay)
    expect(withTimezone).toBeInstanceOf(EsDay)
    expect(base).toBe(base)
    expect(base).not.toBe(withTimezone)
    expect(base.valueOf()).toBe(withTimezone.valueOf())
  })

  it('esday.tz(x).tz(x) works like clone', () => {
    const timestamp = '2025-07-13 17:05'
    const timezone = 'Asia/Taipei'
    const base = esday.tz(timestamp, timezone)
    const cloned = base.tz(timezone)

    expect(base).toBeInstanceOf(EsDay)
    expect(cloned).toBeInstanceOf(EsDay)
    expect(base).toBe(base)
    expect(base).not.toBe(cloned)
    expect(base.valueOf()).toBe(cloned.valueOf())
  })

  it.each([
    {
      timestamp: '2025-11-09 01:15',
      timezoneOld: 'Europe/Berlin',
      timezoneNew: 'America/Toronto',
    },
    {
      timestamp: '2025-11-09 01:15',
      timezoneOld: 'America/Toronto',
      timezoneNew: 'Europe/Berlin',
    },
  ])(
    'update timezone for "$timestamp" from "$timezoneOld" to "$timezoneNew"',
    ({ timestamp, timezoneOld, timezoneNew }) => {
      expectSameResultTz((esday) => esday.tz(timestamp, timezoneOld).tz(timezoneNew, true))
      expect(esday.tz(timestamp, timezoneOld).tz(timezoneNew, true).isValid()).toBeTruthy()
      expectSameTz((esday) => esday.tz(timestamp, timezoneOld).tz(timezoneNew, true).format())
    },
  )

  it('get default timezone', () => {
    const tzEsday = esday.tz.getDefault()

    expect(tzEsday).toBe('')
  })

  it('set default timezone', () => {
    const timezone = 'Asia/Shanghai'
    esday.tz.setDefault(timezone)
    const tzEsday = esday.tz.getDefault()

    expect(tzEsday).toBe(timezone)
  })

  it.each([
    {
      timestamp: '2024-02-23 13:24:54',
      timezone: 'America/Toronto',
    },
    {
      timestamp: '2024-07-23 13:24:54',
      timezone: 'America/Toronto',
    },
    {
      timestamp: '2024-02-23 13:24:54',
      timezone: 'Europe/Berlin',
    },
    {
      timestamp: '2024-07-23 13:24:54',
      timezone: 'Europe/Berlin',
    },
    {
      timestamp: '2024-02-23 13:24:54',
      timezone: 'Asia/Shanghai',
    },
    {
      timestamp: '2024-07-23 13:24:54',
      timezone: 'Asia/Shanghai',
    },
  ])('parse "$timestamp" with default timezone "$timezone"', ({ timestamp, timezone }) => {
    esday.tz.setDefault(timezone)
    moment.tz.setDefault(timezone)
    const tzEsday = esday.tz.getDefault()
    const d = esday.tz(timestamp)
    // default timezone is used in moment() only
    const m = moment(timestamp)

    expect(tzEsday).toBe(timezone)
    expectSameTimestamp(d, m)
  })

  it('guess', () => {
    expectSameTz((esday) => esday.tz.guess())
    expect(esday.tz.guess()).not.toBe('')
  })
})

/**
 * Call a given function with esday and moment-timezone and
 * check, if the resulting date objects are the same.
 * To be used in a vitest test file.
 * This is a clone of 'expectSameResult' using 'moment-timezone'
 * instead of 'moment'.
 * Example:
 * expectSameResultTz((esday) => esday().utc().utcOffset(100, true))
 * @param fn function whose return value is to be checked
 */
const expectSameResultTz = (fn: (instance: EsDayFactory) => EsDay | Moment) => {
  const d = fn(esday)
  // call fn with moment; type casting avoids error from tsc
  const m = fn(moment as unknown as EsDayFactory)
  expect(d.isValid()).toBe(m.isValid())
  if (d.isValid()) {
    expect(d.toISOString()).toBe(m.toISOString())
    expect(d.valueOf()).toBe(m.valueOf())
    expect(d.millisecond()).toBe(m.millisecond())
    expect(d.toDate()).toEqual(m.toDate())
    expect(d.toJSON()).toBe(m.toJSON())
    expect(d.utcOffset()).toBe(m.utcOffset())
    expect(d.isUTC()).toBe(m.isUTC())
  } else {
    expect(d.toString().toLowerCase()).toBe(m.toString().toLowerCase())
  }
}

/**
 * Call a given function with esday and moment and
 * check, if the resulting values are the same.
 * To be used in a vitest test file.
 * Example:
 * expectSame((esday) => esday().format())
 * @param fn function whose return value is to be checked
 */
// biome-ignore lint/suspicious/noExplicitAny: this method checks arbitrary methods of esday / moment
const expectSameTz = (fn: (instance: EsDayFactory) => any) => {
  const d = fn(esday)
  // call fn with moment; type casting avoids error from tsc
  const m = fn(moment as unknown as EsDayFactory)
  expect(d).toBe(m)
}

/**
 * Compare an instance of EsDay with an instance of Moment
 * and check, if the most important values of the 2 date
 * objects are the same.
 * Example:
 * expectSameTimestamp(esdayTs, momentTs)
 * @param d - an EsDay instance
 * @param m - a Moment instance
 */
const expectSameTimestamp = (d: EsDay, m: Moment) => {
  expect(d.isValid()).toBe(m.isValid())
  expect(d.toISOString()).toBe(m.toISOString())
  expect(d.valueOf()).toBe(m.valueOf())
  expect(d.millisecond()).toBe(m.millisecond())
  expect(d.toDate()).toEqual(m.toDate())
  expect(d.toJSON()).toBe(m.toJSON())
  expect(d.format()).toBe(m.format())
}
