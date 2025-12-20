import { afterEach } from 'node:test'
import { EsDay, type EsDayFactory, esday } from 'esday'
import moment, { type Moment } from 'moment-timezone'
import { describe, expect, it } from 'vitest'
import localePlugin from '~/plugins/locale'
import timezonePLugin from '~/plugins/timezone'
import utcPlugin from '~/plugins/utc'

esday.extend(localePlugin).extend(utcPlugin).extend(timezonePLugin)

describe('timezone plugin - without utc', () => {
  afterEach(() => {
    esday.tz.setDefault()
    moment.tz.setDefault()
  })

  it.each([
    {
      timestamp: '2025-03-09 01:15',
      timezone: 'America/Toronto',
      formatted: '2025-03-09T01:15:00-05:00',
      comment: 'without DST',
    },
    {
      timestamp: '2025-03-09 02:15',
      timezone: 'America/Toronto',
      formatted: '2025-03-09T03:15:00-04:00',
      comment: 'with DST',
    },
    {
      timestamp: '2025-11-18 11:55',
      timezone: 'America/Toronto',
      formatted: '2025-11-18T11:55:00-05:00',
      comment: 'without DST',
    },
    {
      timestamp: '2025-03-30 01:55',
      timezone: 'Europe/Paris',
      formatted: '2025-03-30T01:55:00+01:00',
      comment: 'without DST',
    },
    {
      timestamp: '2025-03-30 03:05',
      timezone: 'Europe/Paris',
      formatted: '2025-03-30T03:05:00+02:00',
      comment: 'with DST',
    },
    {
      timestamp: '2025-07-13 17:05',
      timezone: 'CET',
      formatted: '2025-07-13T17:05:00+02:00',
      comment: 'with DST',
    },
    {
      timestamp: '2025-11-18 11:55',
      timezone: 'Asia/Taipei',
      formatted: '2025-11-18T11:55:00+08:00',
      comment: 'without DST',
    },
  ])('parse "$timestamp" for "$timezone"', ({ timestamp, timezone, formatted }) => {
    expectSameResultTz((esday) => esday.tz(timestamp, timezone))
    expect(esday.tz(timestamp, timezone).isValid()).toBeTruthy()
    expect(esday.tz(timestamp, timezone).format()).toBe(formatted)
  })

  it.each([
    {
      timestamp: '2012-03-11 01:59:59',
      timezone: 'America/New_York',
      formatted: '2012-03-11T01:59:59-05:00',
      comment: 'just before spring forward DST gap',
    },
    {
      timestamp: '2012-03-11 02:00:00',
      timezone: 'America/New_York',
      formatted: '2012-03-11T03:00:00-04:00',
      comment: 'start of spring forward DST gap',
    },
    {
      timestamp: '2012-03-11 02:59:59',
      timezone: 'America/New_York',
      formatted: '2012-03-11T03:59:59-04:00',
      comment: 'end of spring forward DST gap',
    },
    {
      timestamp: '2012-03-11 03:00:00',
      timezone: 'America/New_York',
      formatted: '2012-03-11T03:00:00-04:00',
      comment: 'just after spring forward DST gap',
    },
    {
      timestamp: '2012-11-04 00:59:59',
      timezone: 'America/New_York',
      formatted: '2012-11-04T00:59:59-04:00',
      comment: 'just before fall back DST gap',
    },
    {
      timestamp: '2012-11-04 01:00:00',
      timezone: 'America/New_York',
      formatted: '2012-11-04T01:00:00-04:00',
      comment: 'start of fall back DST gap',
    },
    {
      timestamp: '2012-11-04 01:59:59',
      timezone: 'America/New_York',
      formatted: '2012-11-04T01:59:59-04:00',
      comment: 'end of fall back DST gap',
    },
    {
      timestamp: '2012-11-04 02:00:00',
      timezone: 'America/New_York',
      formatted: '2012-11-04T02:00:00-05:00',
      comment: 'just after fall back DST gap',
    },
    {
      timestamp: '2012-11-04 01:00:00-04:00',
      timezone: 'America/New_York',
      formatted: '2012-11-04T01:00:00-04:00',
      comment: 'with offset - just before fall back DST gap',
    },
    {
      timestamp: '2012-11-04 01:00:00-05:00',
      timezone: 'America/New_York',
      formatted: '2012-11-04T01:00:00-05:00',
      comment: 'with offset - just after fall back DST gap',
    },
    {
      timestamp: '2012-10-28 01:59:59',
      timezone: 'Europe/Berlin',
      formatted: '2012-10-28T01:59:59+02:00',
      comment: 'just before fall back DST gap',
    },
    {
      timestamp: '2012-10-28 02:00:00',
      timezone: 'Europe/Berlin',
      formatted: '2012-10-28T02:00:00+02:00',
      comment: 'start of fall back DST gap',
    },
    {
      timestamp: '2012-10-28 02:59:59',
      timezone: 'Europe/Berlin',
      formatted: '2012-10-28T02:59:59+02:00',
      comment: 'end of fall back DST gap',
    },
    {
      timestamp: '2012-10-28 03:00:00',
      timezone: 'Europe/Berlin',
      formatted: '2012-10-28T03:00:00+01:00',
      comment: 'just after fall back DST gap',
    },
    {
      timestamp: '2012-10-28 02:00:00+02:00',
      timezone: 'Europe/Berlin',
      formatted: '2012-10-28T02:00:00+01:00',
      comment: 'with offset - just before fall back DST gap',
    },
    {
      timestamp: '2012-10-28 03:00:00+01:00',
      timezone: 'Europe/Berlin',
      formatted: '2012-10-28T03:00:00+01:00',
      comment: 'with offset - just after fall back DST gap',
    },
  ])(
    'parse non existing time around DST gap for "$timestamp" in "$timezone"',
    ({ timestamp, timezone, formatted }) => {
      expectSameResultTz((esday) => esday.tz(timestamp, timezone))
      expect(esday.tz(timestamp, timezone).isValid()).toBeTruthy()
      expectSameTz((esday) => esday.tz(timestamp, timezone).format())
      expect(esday.tz(timestamp, timezone).format()).toBe(formatted)
    },
  )

  it('debug parse with offset', () => {
    const timezone = 'America/New_York'
    const timestamp0 = '2012-11-04 01:00:00'
    const formatted0 = '2012-11-04T01:00:00-04:00'
    const timestamp1 = '2012-11-04 01:00:00-04:00'
    const formatted1 = '2012-11-04T07:00:00+01:00'
    const timestamp2 = '2012-11-04 01:00:00-05:00'
    const formatted2 = '2012-11-04T07:00:00+01:00'
    const timestamp3 = '2012-11-04 01:00:00-08:00'
    const formatted3 = '2012-11-04T07:00:00+01:00'

    const d0 = esday.tz(timestamp0, timezone)
    const _d0Details = methodResultsAsJson(timestamp0, d0)
    const m0 = moment.tz(timestamp0, timezone)
    const _m0Details = methodResultsAsJson(timestamp0, m0)

    const d1 = esday.tz(timestamp1, timezone)
    const _d1Details = methodResultsAsJson(timestamp1, d1)
    const m1 = moment.tz(timestamp1, timezone)
    const _m1Details = methodResultsAsJson(timestamp1, m1)

    const d2 = esday.tz(timestamp2, timezone)
    const _d2Details = methodResultsAsJson(timestamp2, d2)
    const m2 = moment.tz(timestamp2, timezone)
    const _m2Details = methodResultsAsJson(timestamp2, m2)

    const d3 = esday.tz(timestamp3, timezone)
    const _d3Details = methodResultsAsJson(timestamp3, d3)
    const m3 = moment.tz(timestamp3, timezone)
    const _m3Details = methodResultsAsJson(timestamp3, m3)

    expectSameTimestamp(d0, m0)
    expect(m0.format()).toBe(formatted0)
    expectSameTimestamp(d1, m1)
    expect(m1.format()).toBe(formatted1)
    expectSameTimestamp(d2, m2)
    expect(m2.format()).toBe(formatted2)
    expectSameTimestamp(d3, m3)
    expect(m3.format()).toBe(formatted3)
  })

  it.todo('parse tz with default timezone')

  it.todo('parse with format')

  it.todo('parse with format and strict')

  it.each([
    {
      timestamp: '2025-11-09 01:15',
      timezone: 'America/Toronto',
      formatted: '2025-11-08T19:15:00-05:00',
    },
    {
      timestamp: '2025-11-09 01:15',
      timezone: 'Europe/Berlin',
      formatted: '2025-11-09T01:15:00+01:00',
    },
  ])('convert "$timestamp" to "$timezone"', ({ timestamp, timezone, formatted }) => {
    expectSameResultTz((esday) => esday(timestamp).tz(timezone))
    expect(esday(timestamp).tz(timezone).isValid()).toBeTruthy()
    expect(esday(timestamp).tz(timezone).format()).toBe(formatted)
    expect(esday(timestamp).tz(timezone).format()).toBe(formatted)
  })

  it.each([
    {
      timestamp: '2025-11-09 01:15',
      timezoneOld: 'Europe/Berlin',
      timezoneNew: 'America/Toronto',
      formatted: '2025-11-09T01:15:00-05:00',
    },
    {
      timestamp: '2025-11-09 01:15',
      timezoneOld: 'America/Toronto',
      timezoneNew: 'Europe/Berlin',
      formatted: '2025-11-09T01:15:00+01:00',
    },
  ])(
    'update timezone for "$timestamp" from "$timezoneOld" to "$timezoneNew"',
    ({ timestamp, timezoneOld, timezoneNew, formatted }) => {
      expectSameResultTz((esday) => esday.tz(timestamp, timezoneOld).tz(timezoneNew, true))
      expect(esday.tz(timestamp, timezoneOld).tz(timezoneNew, true).isValid()).toBeTruthy()
      expect(moment.tz(timestamp, timezoneOld).tz(timezoneNew, true).format()).toBe(formatted)
      expect(esday.tz(timestamp, timezoneOld).tz(timezoneNew, true).format()).toBe(formatted)
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
      formatted: '2024-02-23T13:24:54-05:00',
    },
    {
      timestamp: '2024-07-23 13:24:54',
      timezone: 'America/Toronto',
      formatted: '2024-07-23T13:24:54-04:00',
    },
    {
      timestamp: '2024-02-23 13:24:54',
      timezone: 'Europe/Berlin',
      formatted: '2024-02-23T13:24:54+01:00',
    },
    {
      timestamp: '2024-07-23 13:24:54',
      timezone: 'Europe/Berlin',
      formatted: '2024-07-23T13:24:54+02:00',
    },
    {
      timestamp: '2024-02-23 13:24:54',
      timezone: 'Asia/Shanghai',
      formatted: '2024-02-23T13:24:54+08:00',
    },
    {
      timestamp: '2024-07-23 13:24:54',
      timezone: 'Asia/Shanghai',
      formatted: '2024-07-23T13:24:54+08:00',
    },
  ])(
    'parse "$timestamp" with default timezone "$timezone"',
    ({ timestamp, timezone, formatted }) => {
      esday.tz.setDefault(timezone)
      moment.tz.setDefault(timezone)
      const tzEsday = esday.tz.getDefault()
      const d = esday.tz(timestamp)
      // default timezone is used in moment() only
      const m = moment(timestamp)

      expect(tzEsday).toBe(timezone)
      expectSameTimestamp(d, m)
      expect(m.format()).toBe(formatted)
    },
  )

  it('guess', () => {
    expectSameTz((esday) => esday.tz.guess())
    expect(esday.tz.guess()).not.toBe('')
  })
})

describe.todo('timezone plugin - with utc')

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

const methodResultsAsJson = (timestamp: string, instance: EsDay | Moment) => {
  let type = 'Moment'
  if (instance instanceof EsDay) {
    type = 'EsDay'
  }
  const result = { type, source: timestamp }
  const d = instance
  Object.defineProperty(result, 'isValid', { value: d.isValid(), enumerable: true })
  Object.defineProperty(result, 'toISOString', { value: d.toISOString(), enumerable: true })
  Object.defineProperty(result, 'valueOf', { value: d.valueOf(), enumerable: true })
  Object.defineProperty(result, 'millisecond', { value: d.millisecond(), enumerable: true })
  Object.defineProperty(result, 'toDate', { value: d.toDate(), enumerable: true })
  Object.defineProperty(result, 'toJSON', { value: d.toJSON(), enumerable: true })
  Object.defineProperty(result, 'format', { value: d.format(), enumerable: true })

  return result
}
