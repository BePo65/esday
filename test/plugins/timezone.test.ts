/** biome-ignore-all lint/correctness/noUnusedVariables: HACK for debugging only */

import { EsDay, esday, type UnitTypeGetSet } from 'esday'
import moment from 'moment-timezone'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import timezonePLugin from '~/plugins/timezone'
import utcPlugin from '~/plugins/utc'
import {
  expectSameObjectTz,
  expectSameTimestampTz,
  expectSameValueTz,
  objectResultsAsJsonTz,
} from './timezone-test-util'

esday.extend(utcPlugin).extend(timezonePLugin)

describe('timezone plugin', () => {
  describe('parse', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()

      // reset default timezone
      esday.tz.setDefault()
      moment.tz.setDefault()
    })

    it.each([
      {
        timestamp: '2025-02-09 11:15:09',
        timezone: 'America/Toronto',
        comment: 'without DST ("winter")',
      },
      {
        timestamp: '2025-07-18 11:55:00',
        timezone: 'America/Toronto',
        comment: 'with DST ("summer")',
      },
      {
        timestamp: '2025-03-09 02:15:00',
        timezone: 'America/Toronto',
        comment: 'parse in DST spring forward gap',
      },
      {
        timestamp: '2025-03-09 03:00:00',
        timezone: 'America/Toronto',
        comment: 'parse past DST spring forward gap',
      },
      {
        timestamp: '2025-11-02 02:15:00',
        timezone: 'America/Toronto',
        comment: 'parse in DST fall back overlap',
      },
      {
        timestamp: '2025-11-02 03:00:00',
        timezone: 'America/Toronto',
        comment: 'parse past DST fall back overlap',
      },
      {
        timestamp: '2025-07-13 17:05',
        timezone: 'CET',
        comment: 'with DST ("summer")',
      },
      {
        timestamp: '2024-02-19 03:00:00',
        timezone: 'Europe/London',
        comment: 'without DST ("winter")',
      },
      {
        timestamp: '2022-07-19T03:00:00',
        timezone: 'Europe/London',
        comment: 'with DST ("summer")',
      },
      {
        timestamp: '2025-03-10T00:00:00',
        timezone: 'Europe/London',
        comment: 'dayjs pr#2981 test 1 and pr#2949',
      },
      {
        timestamp: '2025-06-10T00:00:00',
        timezone: 'Europe/London',
        comment: 'dayjs pr#2981 test 2',
      },
      {
        timestamp: '2025-03-30 02:15:00',
        timezone: 'Europe/London',
        comment: 'parse in DST spring forward gap',
      },
      {
        timestamp: '2025-03-30 03:00:00',
        timezone: 'Europe/London',
        comment: 'parse past DST spring forward gap',
      },
      {
        timestamp: '2025-10-26 01:15:00',
        timezone: 'Europe/London',
        comment: 'parse in DST fall back overlap',
      },
      {
        timestamp: '2025-10-26 03:00:00',
        timezone: 'Europe/London',
        comment: 'parse past DST fall back overlap',
      },
      {
        timestamp: '2025-01-30 02:15',
        timezone: 'Europe/Paris',
        comment: 'without DST ("winter")',
      },
      {
        timestamp: '2025-07-30 01:55:59',
        timezone: 'Europe/Paris',
        comment: 'with DST ("summer")',
      },
      {
        timestamp: '2025-10-26 02:15:00',
        timezone: 'Europe/Paris',
        comment: 'parse in DST fall back overlap',
      },
      {
        timestamp: '2025-11-18 11:55',
        timezone: 'Asia/Taipei',
        comment: 'country without DST',
      },
      {
        timestamp: '2025-05-09 00:15:00',
        timezone: 'America/Havana',
        comment: 'parse in DST spring forward gap',
      },
      {
        timestamp: '2025-05-09 01:00:00',
        timezone: 'America/Havana',
        comment: 'parse past DST spring forward gap',
      },
      {
        timestamp: '2025-05-09 00:15:00',
        timezone: 'America/Havana',
        comment: 'parse in DST fall back overlap',
      },
      {
        timestamp: '2025-11-02 01:00:00',
        timezone: 'America/Havana',
        comment: 'parse past DST fall back overlap',
      },
      {
        timestamp: '2025-11-02 02:15:00',
        timezone: 'Australia/Canberra',
        comment: 'parse in DST spring forward gap',
      },
      {
        timestamp: '2025-10-05 03:00:00',
        timezone: 'Australia/Canberra',
        comment: 'parse past DST spring forward gap',
      },
      {
        timestamp: '2025-04-06 02:15:00',
        timezone: 'Australia/Canberra',
        comment: 'parse in DST fall back overlap',
      },
      {
        timestamp: '2025-04-06 02:59:59',
        timezone: 'Australia/Canberra',
        comment: 'parse end of DST fall back overlap',
      },
      {
        timestamp: '2025-04-06 03:00:00',
        timezone: 'Australia/Canberra',
        comment: 'parse past DST fall back overlap',
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
    ])('parse "$timestamp" for "$timezone"', ({ timestamp, timezone }) => {
      expectSameObjectTz((esday) => esday.tz(timestamp, timezone))
      expect(esday.tz(timestamp, timezone).isValid()).toBeTruthy()
      expectSameValueTz((esday) => esday.tz(timestamp, timezone).format())
    })

    it('parse timezone with seconds in offset', () => {
      const timestamp = '1900-06-01T12:00:00'
      const timezone = 'Europe/Kiev'

      expectSameObjectTz((esday) => esday.tz(timestamp, timezone))
      expect(esday.tz(timestamp, timezone).isValid()).toBeTruthy()
    })

    it('parse current date with timezone', () => {
      const timestamp = undefined
      const timezone = 'Europe/Paris'

      expectSameObjectTz((esday) => esday.tz(timestamp, timezone))
      expect(esday.tz(timestamp, timezone).isValid()).toBeTruthy()
    })

    it.each([
      {
        timestamp: '2025-03-09 01:59:59',
        timezone: 'America/Toronto',
        comment: 'just before spring forward DST gap',
      },
      {
        timestamp: '2025-03-09 02:00:00',
        timezone: 'America/Toronto',
        comment: 'start of spring forward DST gap',
      },
      {
        timestamp: '2025-03-09 03:00:00',
        timezone: 'America/Toronto',
        comment: 'just after spring forward DST gap',
      },
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
        comment: 'just before fall back DST overlap',
      },
      {
        timestamp: '2012-11-04 01:00:00',
        timezone: 'America/New_York',
        comment: 'start of fall back DST overlap',
      },
      {
        timestamp: '2012-11-04 01:59:59',
        timezone: 'America/New_York',
        comment: 'end of fall back DST overlap',
      },
      {
        timestamp: '2012-11-04 02:00:00',
        timezone: 'America/New_York',
        comment: 'just after fall back DST overlap',
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
        timestamp: '2022-03-27 01:59:59',
        timezone: 'Europe/Berlin',
        comment: 'just before spring forward DST gap',
      },
      {
        timestamp: '2022-03-27 02:15',
        timezone: 'Europe/Berlin',
        comment: 'in gap of DST (date/time does not exist)',
      },
      {
        timestamp: '2025-03-27 03:00:00',
        timezone: 'Europe/Berlin',
        comment: 'just after spring forward DST',
      },
      {
        timestamp: '2012-10-28 01:59:59',
        timezone: 'Europe/Berlin',
        comment: 'just before fall back DST overlap',
      },
      {
        timestamp: '2012-10-28 02:00:00',
        timezone: 'Europe/Berlin',
        comment: 'start of fall back DST overlap',
      },
      {
        timestamp: '2012-10-28 02:59:59',
        timezone: 'Europe/Berlin',
        comment: 'end of fall back DST overlap',
      },
      {
        timestamp: '2012-10-28 03:00:00',
        timezone: 'Europe/Berlin',
        comment: 'just after fall back DST overlap',
      },
      {
        timestamp: '2012-10-28 03:00:01',
        timezone: 'Europe/Berlin',
        comment: 'after fall back DST overlap',
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
      {
        timestamp: '2025-10-05 01:59:59',
        timezone: 'Australia/Canberra',
        comment: 'just before spring forward DST gap',
      },
      {
        timestamp: '2025-10-05 02:00:00',
        timezone: 'Australia/Canberra',
        comment: 'start of spring forward DST gap',
      },
      {
        timestamp: '2025-10-05 02:59:59',
        timezone: 'Australia/Canberra',
        comment: 'end of spring forward DST gap',
      },
      {
        timestamp: '2025-10-05 03:00:00',
        timezone: 'Australia/Canberra',
        comment: 'just after spring forward DST gap',
      },
      {
        timestamp: '2025-04-06 01:59:59',
        timezone: 'Australia/Canberra',
        comment: 'just before fall back DST overlap',
      },
      {
        timestamp: '2025-04-06 03:00:00',
        timezone: 'Australia/Canberra',
        comment: 'just after fall back DST overlap',
      },
      {
        timestamp: '2021-03-26 00:30:00',
        timezone: 'Asia/Amman',
        comment: 'in gap of DST (date/time does not exist)',
      },
      {
        timestamp: '2021-10-28 23:59:59',
        timezone: 'Asia/Amman',
        comment: 'just before fall back DST overlap',
      },
      {
        timestamp: '2021-10-29 01:00:00',
        timezone: 'Asia/Amman',
        comment: 'just after fall back DST overlap',
      },
    ])('parse non existing time / overlap with DST for "$timestamp" in "$timezone"', ({
      timestamp,
      timezone,
    }) => {
      expectSameObjectTz((esday) => esday.tz(timestamp, timezone))
      expect(esday.tz(timestamp, timezone).isValid()).toBeTruthy()
      expectSameValueTz((esday) => esday.tz(timestamp, timezone).format())
    })

    it('parse number (unix timestamp as milliseconds)', () => {
      const time = 1762066800000
      const timezone = 'US/Pacific'

      expectSameObjectTz((esday) => esday.tz(time, timezone))
    })

    it('parse Date object', () => {
      const timestamp = new Date('2024-04-24T16:27:38.456Z')
      const timezone = 'US/Pacific'

      expectSameObjectTz((esday) => esday.tz(timestamp, timezone))
    })

    it('parse EsDay instance', () => {
      const timestamp = '2024-04-24T16:27:38.456'
      const timezone = 'US/Pacific'
      const esdayDate = esday.tz(timestamp, timezone)
      const esdayDateResults = objectResultsAsJsonTz(esdayDate)
      const momentDate = moment.tz(timestamp, timezone)
      const momentDateResults = objectResultsAsJsonTz(momentDate)

      expect(esdayDateResults).toEqual(momentDateResults)
      expect(esdayDate.isValid()).toBeTruthy()
    })

    it('parse array', () => {
      const timestamp = [2024, 5, 1, 13, 14, 15, 99]
      const timezone = 'US/Pacific'

      expectSameObjectTz((esday) => esday.tz(timestamp, timezone))
    })

    it('parse invalid date', () => {
      const time = Number.NaN
      const timezone = 'US/Pacific'

      expectSameObjectTz((esday) => esday.tz(time, timezone))
    })
  })

  describe('get timezone', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()

      // reset default timezone
      esday.tz.setDefault()
      moment.tz.setDefault()
    })

    it.each([
      {
        timestamp: '2025-07-18 11:55:00',
        timezone: 'America/Toronto',
      },
      {
        timestamp: '2025-01-30 02:15',
        timezone: 'Europe/Paris',
      },
    ])('get timezone of parsed date / time for "$timezone"', ({ timestamp, timezone }) => {
      expectSameValueTz((esday) => esday.tz(timestamp, timezone).tz())
      expect(esday.tz(timestamp, timezone).isValid()).toBeTruthy()
      expect(moment.tz(timestamp, timezone).isValid()).toBeTruthy()
    })

    it('get timezone of parsed date / time for undefined timezone', () => {
      const timestamp = '2025-03-10T00:00:00'
      const d = esday.tz(timestamp).tz()
      const m = moment.tz(timestamp).tz()

      expect(d).toBe(m)
    })
  })

  describe('convert', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()

      // reset default timezone
      esday.tz.setDefault()
      moment.tz.setDefault()
    })

    it.each([
      {
        timestamp: '2025-03-09 03:15',
        timezone: 'America/Toronto',
      },
      {
        timestamp: '2025-03-09 02:15',
        timezone: 'America/Toronto',
      },
      {
        timestamp: '2025-11-02 02:15',
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
      expectSameObjectTz((esday) => esday(timestamp).tz(timezone))
      expect(esday(timestamp).tz(timezone).isValid()).toBeTruthy()
      expectSameValueTz((esday) => esday(timestamp).tz(timezone).format())
    })

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
    ])('convert from UTC "$timestamp" to "$timezone"', ({ timestamp, timezone }) => {
      expectSameObjectTz((esday) => esday.utc(timestamp).tz(timezone))
      expect(esday.utc(timestamp).tz(timezone).isValid()).toBeTruthy()
    })

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
    ])('convert with keepLocalTime "$timestamp" to "$timezone"', ({ timestamp, timezone }) => {
      expectSameObjectTz((esday) => esday(timestamp).tz(timezone, true))
      expect(esday(timestamp).tz(timezone, true).isValid()).toBeTruthy()
      expectSameValueTz((esday) => esday(timestamp).tz(timezone, true).format())
    })

    it('convert with keepLocalTime for GMT - different than moment.js', () => {
      const timestamp = '2021-10-31T15:00:00+00:00'
      const timezone = 'Europe/London'
      const d = esday(timestamp).tz(timezone, true)
      const m = moment(timestamp).tz(timezone, true)

      expectSameObjectTz((esday) => esday(timestamp).tz(timezone, true))

      expect(d.isValid()).toBeTruthy()
      expect(m.isValid()).toBeTruthy()
      expect(d.valueOf()).toBe(m.valueOf())
      expect(d.toISOString()).toBe(m.toISOString())
      expect(d.toDate()).toEqual(m.toDate())
      expect(d.toJSON()).toBe(m.toJSON())
      expect(d.utcOffset()).toBe(m.utcOffset())

      // no differences to moment.js
      expect(d.isUTC()).toBeTruthy()
      expect(m.isUTC()).toBeTruthy()
    })

    it.each([
      {
        timestamp: '2025-07-21 08:15:00',
        timezone: 'America/Toronto',
      },
      {
        timestamp: '2025-11-09 01:15',
        timezone: 'America/Toronto',
      },
      {
        timestamp: '2025-07-21 08:15:00',
        timezone: 'Europe/Berlin',
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
    ])('convert from UTC with keepLocalTime "$timestamp" to "$timezone"', ({
      timestamp,
      timezone,
    }) => {
      expectSameObjectTz((esday) => esday.utc(timestamp).tz(timezone, true))
      expect(esday.utc(timestamp).tz(timezone, true).isValid()).toBeTruthy()
    })

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
      {
        timestamp: '2025-03-29 20:15:00',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Europe/Berlin',
      },
      {
        timestamp: '2025-03-29 21:15:00',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Europe/Berlin',
      },
      {
        timestamp: '2025-03-29 23:15:00',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Europe/Berlin',
      },
      {
        timestamp: '2026-10-24 20:15:00',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Europe/Berlin',
      },
      {
        timestamp: '2026-10-24 21:15:00',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Europe/Berlin',
      },
    ])('update timezone without keepLocalTime for "$timestamp" from "$timezoneOld" to "$timezoneNew"', ({
      timestamp,
      timezoneOld,
      timezoneNew,
    }) => {
      expectSameObjectTz((esday) => esday.tz(timestamp, timezoneOld).tz(timezoneNew))
      expect(esday.tz(timestamp, timezoneOld).tz(timezoneNew).isValid()).toBeTruthy()
      expectSameValueTz((esday) => esday.tz(timestamp, timezoneOld).tz(timezoneNew).format())
    })

    it.each([
      {
        timestamp: '2025-07-29 21:15',
        timezoneOld: 'Europe/Berlin',
        timezoneNew: 'America/Toronto',
        comment: 'convert with DST ("summer") in Toronto',
      },
      {
        timestamp: '2025-11-29 21:15:23',
        timezoneOld: 'Europe/Berlin',
        timezoneNew: 'America/Toronto',
        comment: 'convert without DST ("winter") in Toronto',
      },
      {
        timestamp: '2025-03-09 01:59:59',
        timezoneOld: 'Europe/Berlin',
        timezoneNew: 'America/Toronto',
        comment: 'convert to minute before DST spring forward gap in Toronto',
      },
      {
        timestamp: '2025-11-02 00:59:59',
        timezoneOld: 'Europe/Berlin',
        timezoneNew: 'America/Toronto',
        comment: 'convert to minute before DST fall back overlap in Toronto',
      },
      {
        timestamp: '2025-11-02 01:15:00',
        timezoneOld: 'Europe/Berlin',
        timezoneNew: 'America/Toronto',
        comment: 'convert to DST fall back overlap in Toronto',
      },
      {
        timestamp: '2025-07-29 21:15:35',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Europe/Berlin',
        comment: 'convert with DST ("summer")',
      },
      {
        timestamp: '2025-11-29 21:15',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Europe/Berlin',
        comment: 'convert without DST ("winter")',
      },
      {
        timestamp: '2025-03-30 03:00:00',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Europe/Berlin',
        comment: 'convert to hour after DST spring forward gap in Berlin',
      },
      {
        timestamp: '2025-10-26 03:00:00',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Europe/Berlin',
        comment: 'convert to hour after DST fall back overlap in Berlin',
      },
      {
        timestamp: '2025-11-02 02:15:00',
        timezoneOld: 'Europe/Berlin',
        timezoneNew: 'Australia/Canberra',
        comment: 'convert to DST spring forward gap in Canberra',
      },
      {
        timestamp: '2025-11-02 03:00:00',
        timezoneOld: 'Europe/Berlin',
        timezoneNew: 'Australia/Canberra',
        comment: 'convert to hour after DST spring forward gap in Canberra',
      },
      {
        timestamp: '2025-04-06 03:00:00',
        timezoneOld: 'Europe/Berlin',
        timezoneNew: 'Australia/Canberra',
        comment: 'convert to hour after DST fall back overlap in Canberra',
      },
      {
        timestamp: '2025-10-26 02:15:00',
        timezoneOld: 'Australia/Canberra',
        timezoneNew: 'Europe/Berlin',
        comment: 'convert to DST fall back overlap in Berlin',
      },
      {
        timestamp: '2025-11-02 02:15:00',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Australia/Canberra',
        comment: 'convert to DST spring forward gap in Canberra',
      },
      {
        timestamp: '2025-11-02 03:00:00',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Australia/Canberra',
        comment: 'convert to hour after DST spring forward gap in Canberra',
      },
      {
        timestamp: '2025-04-06 03:00:00',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Australia/Canberra',
        comment: 'convert to hour after DST fall back overlap in Canberra',
      },
      {
        timestamp: '2025-10-26 02:15:00',
        timezoneOld: 'Australia/Canberra',
        timezoneNew: 'America/Toronto',
        comment: 'convert to DST fall back overlap in Toronto',
      },
      {
        timestamp: '2025-07-29 21:15',
        timezoneOld: 'Europe/Berlin',
        timezoneNew: 'Africa/Cairo',
        comment: 'convert with DST ("summer") in Cairo (DST switches at 00:00)',
      },
      {
        timestamp: '2025-07-29 21:15',
        timezoneOld: 'Africa/Cairo',
        timezoneNew: 'Europe/Berlin',
        comment: 'convert with DST ("summer") in Cairo (DST switches at 00:00)',
      },
    ])('update timezone with keepLocalTime for "$timestamp" from "$timezoneOld" to "$timezoneNew"', ({
      timestamp,
      timezoneOld,
      timezoneNew,
    }) => {
      const dConverted = esday.tz(timestamp, timezoneOld).tz(timezoneNew, true)
      const dConvertedResults = objectResultsAsJsonTz(dConverted)
      const dParsed = esday.tz(timestamp, timezoneNew)
      const dParsedResults = objectResultsAsJsonTz(dParsed)

      expectSameObjectTz((esday) => esday.tz(timestamp, timezoneOld))
      expectSameObjectTz((esday) => esday.tz(timestamp, timezoneOld).tz(timezoneNew, true))
      expect(esday.tz(timestamp, timezoneOld).tz(timezoneNew, true).isValid()).toBeTruthy()
      expect(dConvertedResults).toEqual(dParsedResults)
    })

    // we fixed moment-timezone issue 1017, 935, 871, 649 and pr 1124 concerning DST handling
    it.each([
      {
        timestamp: '2025-03-09 02:15:00',
        timezoneOld: 'Europe/Berlin',
        timezoneNew: 'America/Toronto',
        comment: 'Berlin - convert to DST spring forward gap in Toronto',
      },
      {
        timestamp: '2025-03-09 03:00:00',
        timezoneOld: 'Europe/Berlin',
        timezoneNew: 'America/Toronto',
        comment: 'Berlin - convert to hour after DST spring forward gap in Toronto',
      },
      {
        timestamp: '2025-11-02 02:00:00',
        timezoneOld: 'Europe/Berlin',
        timezoneNew: 'America/Toronto',
        comment: 'convert to hour after DST fall back overlap in Toronto',
      },
      {
        timestamp: '2025-03-30 01:59:59',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Europe/Berlin',
        comment: 'convert to minute before DST spring forward gap in Berlin',
      },
      {
        timestamp: '2025-03-30 02:15:00',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Europe/Berlin',
        comment: 'Toronto - convert to DST spring forward gap in Berlin',
      },
      {
        timestamp: '2025-10-26 01:59:59',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Europe/Berlin',
        comment: 'convert to minute before DST fall back overlap in Berlin',
      },
      {
        timestamp: '2025-10-26 02:15:00',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Europe/Berlin',
        comment: 'convert to DST fall back overlap in Berlin',
      },
      {
        timestamp: '2025-04-06 02:15:00',
        timezoneOld: 'Europe/Berlin',
        timezoneNew: 'Australia/Canberra',
        comment: 'convert to DST fall back overlap in Canberra',
      },
      {
        timestamp: '2025-03-30 02:15:00',
        timezoneOld: 'Australia/Canberra',
        timezoneNew: 'Europe/Berlin',
        comment: 'Canberra - convert to DST spring forward gap in Berlin',
      },
      {
        timestamp: '2025-03-30 03:00:00',
        timezoneOld: 'Australia/Canberra',
        timezoneNew: 'Europe/Berlin',
        comment: 'Canberra - convert to hour after DST spring forward gap in Berlin',
      },
      {
        timestamp: '2025-04-06 02:15:00',
        timezoneOld: 'America/Toronto',
        timezoneNew: 'Australia/Canberra',
        comment: 'convert to DST fall back overlap in Canberra',
      },
    ])('fix errors in moment-timezone - update timezone with keepLocalTime for "$timestamp" from "$timezoneOld" to "$timezoneNew"', ({
      timestamp,
      timezoneOld,
      timezoneNew,
    }) => {
      const dConverted = esday.tz(timestamp, timezoneOld).tz(timezoneNew, true)
      const dConvertedResults = objectResultsAsJsonTz(dConverted)
      const dParsed = esday.tz(timestamp, timezoneNew)
      const dParsedResults = objectResultsAsJsonTz(dParsed)

      expect(dConverted.isValid()).toBeTruthy()
      expect(dConvertedResults).toEqual(dParsedResults)
    })
  })

  describe('default timezone', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()

      // reset default timezone
      esday.tz.setDefault()
      moment.tz.setDefault()
    })

    it('get default timezone if not set', () => {
      const tzEsday = esday.tz.getDefault()

      expect(tzEsday).toBe(undefined)
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
      expectSameTimestampTz(d, m)
    })
  })

  describe('guess / clone', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()

      // reset default timezone
      esday.tz.setDefault()
      moment.tz.setDefault()
    })

    it('guess', () => {
      expectSameValueTz((esday) => esday.tz.guess())
      expect(esday.tz.guess()).not.toBe('')
    })

    it('cloning a parsed date / time with a timezone keeps the timezone', () => {
      const timestamp = '2025-07-13 17:05:33'
      const timezone = 'America/Recife'
      const baseDate = esday.tz(timestamp, timezone)
      const clonedDate = baseDate.clone()

      expect(clonedDate.tz()).toBe(baseDate.tz())
    })
  })

  describe('startOf / endOf', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()

      // reset default timezone
      esday.tz.setDefault()
      moment.tz.setDefault()
    })

    it('startOf day keeps timezone', () => {
      const timestamp = '2010-01-01 00:00:00'
      const timezone = 'America/New_York'
      const originalStartOf = esday.tz(timestamp, timezone).startOf('day')
      const startOfDay = esday.tz(timestamp, timezone).startOf('day')

      expect(startOfDay.isValid()).toBeTruthy()
      expect(startOfDay.valueOf()).toEqual(originalStartOf.valueOf())
      expectSameObjectTz((esday) => esday.tz(timestamp, timezone).startOf('day'))
      expectSameValueTz((esday) => esday.tz(timestamp, timezone).startOf('day').tz())
    })

    it('endOf day keeps timezone', () => {
      const timestamp = '2009-12-31 23:59:59.999'
      const timezone = 'America/New_York'
      const originalEndOf = esday.tz(timestamp, timezone).endOf('day')
      const endOfDay = esday.tz(timestamp, timezone).endOf('day')

      expect(endOfDay.isValid()).toBeTruthy()
      expect(endOfDay.valueOf()).toEqual(originalEndOf.valueOf())
      expectSameObjectTz((esday) => esday.tz(timestamp, timezone).endOf('day'))
      expectSameValueTz((esday) => esday.tz(timestamp, timezone).endOf('day').tz())
    })

    it('startOf month keeps timezone - v1', () => {
      const timestamp = '2010-03-23 14:25:36'
      const timezone = 'Asia/Taipei'

      expect(esday.tz(timestamp, timezone).startOf('month').isValid()).toBeTruthy()
      expectSameObjectTz((esday) => esday.tz(timestamp, timezone).startOf('month'))
      expectSameValueTz((esday) => esday.tz(timestamp, timezone).startOf('month').tz())
    })

    it.each([
      {
        timestamp: '2012-03-23 14:25:36',
        timezone: 'America/New_York',
        comment: 'month with DST spring forward',
      },
      {
        timestamp: '2010-07-23 14:25:36',
        timezone: 'America/New_York',
        comment: 'without DST effects',
      },
      {
        timestamp: '2012-11-29 14:25:36',
        timezone: 'America/New_York',
        comment: 'month with DST fall back',
      },
    ])('startOf month keeps timezone for "$timestamp" in "$timezone', ({ timestamp, timezone }) => {
      expect(esday.tz(timestamp, timezone).startOf('month').isValid()).toBeTruthy()
      expectSameObjectTz((esday) => esday.tz(timestamp, timezone).startOf('month'))
      expectSameValueTz((esday) => esday.tz(timestamp, timezone).startOf('month').tz())
    })

    it('startOf for timezone "UTC" (dayjs pr#2895)', () => {
      const timestamp = '2025-01-31'
      const tz = 'UTC'
      const startOfUnit = 'month' as const

      expectSameObjectTz((esday) => esday.tz(timestamp, tz).startOf(startOfUnit))
    })

    it('startOf does not break other implementations', () => {
      const timestamp = '2025-07-21 14:25:36'

      expectSameObjectTz((esday) => esday(timestamp).startOf('month'))
    })

    it.each([
      {
        timestamp: '2012-03-02 14:25:36',
        timezone: 'America/New_York',
        comment: 'month with DST spring forward',
      },
      {
        timestamp: '2010-07-02 14:25:36',
        timezone: 'America/New_York',
        comment: 'without DST effects',
      },
      {
        timestamp: '2012-11-02 14:25:36',
        timezone: 'America/New_York',
        comment: 'month with DST fall back',
      },
    ])('endOf month keeps timezone for "$timestamp" in "$timezone', ({ timestamp, timezone }) => {
      expect(esday.tz(timestamp, timezone).endOf('month').isValid()).toBeTruthy()
      expectSameObjectTz((esday) => esday.tz(timestamp, timezone).endOf('month'))
      expectSameValueTz((esday) => esday.tz(timestamp, timezone).endOf('month').tz())
    })

    it('endOf does not break other implementations', () => {
      const timestamp = '2025-07-21 14:25:36'

      expectSameObjectTz((esday) => esday(timestamp).endOf('month'))
    })
  })

  describe('get / set', () => {
    const fakeTimeAsString = '2023-12-17T13:24:46.234' // 'Sunday 2023-12-17 13:24'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()

      // reset default timezone
      esday.tz.setDefault()
      moment.tz.setDefault()
    })

    it.each([
      'y',
      'year',
      'years',
      'M',
      'month',
      'months',
      'D',
      'date',
      'dates',
      'd',
      'day',
      'days',
      'h',
      'hour',
      'hours',
      'm',
      'minute',
      'minutes',
      's',
      'second',
      'seconds',
      'ms',
      'millisecond',
      'milliseconds',
    ])('get with unit "%s"', (unit) => {
      const timestamp = '2025-07-23 14:25:36.345'
      const timezone = 'America/New_York'

      expectSameValueTz((esday) => esday.tz(timestamp, timezone).get(unit as UnitTypeGetSet))
    })

    it.each([
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'y',
        value: 2026,
      },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'year',
        value: 2026,
      },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'years',
        value: 2026,
      },
      { timestamp: '2025-07-23 14:25:36.345', timezone: 'America/New_York', unit: 'M', value: 5 },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'month',
        value: 5,
      },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'months',
        value: 5,
      },
      { timestamp: '2025-07-23 14:25:36.345', timezone: 'America/New_York', unit: 'D', value: 5 },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'date',
        value: 5,
      },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'dates',
        value: 5,
      },
      { timestamp: '2025-07-23 14:25:36.345', timezone: 'America/New_York', unit: 'd', value: 5 },
      { timestamp: '2025-07-23 14:25:36.345', timezone: 'America/New_York', unit: 'day', value: 5 },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'days',
        value: 5,
      },
      { timestamp: '2025-07-23 14:25:36.345', timezone: 'America/New_York', unit: 'h', value: 5 },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'hour',
        value: 5,
      },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'hours',
        value: 5,
      },
      { timestamp: '2025-07-23 14:25:36.345', timezone: 'America/New_York', unit: 'm', value: 5 },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'minute',
        value: 5,
      },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'minutes',
        value: 5,
      },
      { timestamp: '2025-07-23 14:25:36.345', timezone: 'America/New_York', unit: 's', value: 5 },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'second',
        value: 5,
      },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'seconds',
        value: 5,
      },
      { timestamp: '2025-07-23 14:25:36.345', timezone: 'America/New_York', unit: 'ms', value: 5 },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'millisecond',
        value: 5,
      },
      {
        timestamp: '2025-07-23 14:25:36.345',
        timezone: 'America/New_York',
        unit: 'milliseconds',
        value: 5,
      },
      {
        timestamp: '2025-03-08 14:25:36.345',
        timezone: 'America/Toronto',
        unit: 'D',
        value: 10,
        comment: 'jump over gap',
      },
      {
        timestamp: '2025-11-01 14:25:36.345',
        timezone: 'America/Toronto',
        unit: 'D',
        value: 3,
        comment: 'jump over overlap',
      },
      {
        timestamp: '2025-11-01 02:15:00',
        timezone: 'America/Toronto',
        unit: 'D',
        value: 2,
        comment: 'jump into overlap',
      },
    ])('set "$unit" to "$value" for "$timestamp" in "$timezone', ({
      timestamp,
      timezone,
      unit,
      value,
    }) => {
      expectSameObjectTz((esday) =>
        esday.tz(timestamp, timezone).set(unit as UnitTypeGetSet, value),
      )
    })

    it('set month - clamp day-of-month', () => {
      const timestamp = '2025-07-31 14:25:36'
      const timezone = 'America/New_York'
      const newMonth = 5 // June

      expectSameObjectTz((esday) => esday.tz(timestamp, timezone).set('month', newMonth))
    })

    it.each([
      {
        timestamp: '2025-03-08 02:15:00',
        timezone: 'America/Toronto',
        unit: 'D',
        value: 9,
        targetTimestamp: '2025-03-09 03:15:00',
        comment: 'jump into gap',
      },
    ])('fix errors in moment-timezone - set "$unit" to "$value" for "$timestamp" in "$timezone', ({
      timestamp,
      timezone,
      unit,
      value,
      targetTimestamp,
    }) => {
      const dSetValue = esday.tz(timestamp, timezone).set(unit as UnitTypeGetSet, value)
      const dSetValueResults = objectResultsAsJsonTz(dSetValue)
      const dParsed = esday.tz(targetTimestamp, timezone)
      const dParsedResults = objectResultsAsJsonTz(dParsed)

      expect(dSetValue.isValid()).toBeTruthy()
      expect(dSetValueResults).toEqual(dParsedResults)
    })

    it('set year, month, day-of-month - offset unchanged - fix errors in moment-timezone', () => {
      const timestamp = '2025-09-04 14:25:36'
      const timezone = 'America/New_York'
      const newYear = 2025
      const newMonth = 7 // August
      const newDate = 23
      const esdayParsed = esday.tz(`${newYear}-${newMonth + 1}-${newDate}T14:25:36`, timezone)
      const esdaySet = esday.tz(timestamp, timezone).set('year', newYear, newMonth, newDate)

      expect(objectResultsAsJsonTz(esdaySet)).toEqual(objectResultsAsJsonTz(esdayParsed))
    })

    it('set year, month, day-of-month over overlap - fix errors in moment-timezone', () => {
      const timestamp = '2023-12-17 13:24:46'
      const timezone = 'America/New_York'
      const newYear = 2025
      const newMonth = 9 // October
      const newDate = 23
      const x = esday.tz(timestamp, timezone)
      const esdaySet = esday.tz(timestamp, timezone).set('year', newYear, newMonth, newDate)
      const esdayParsed = esday.tz(`${newYear}-${newMonth + 1}-${newDate}T13:24:46`, timezone)

      expect(objectResultsAsJsonTz(esdaySet)).toEqual(objectResultsAsJsonTz(esdayParsed))
    })

    it('set year, month - offset unchanged - fix errors in moment-timezone', () => {
      const timestamp = '2025-08-15 14:25:36'
      const timezone = 'America/New_York'
      const newYear = 2025
      const newMonth = 5 // June
      const esdayParsed = esday.tz(`${newYear}-${newMonth + 1}-15T14:25:36`, timezone)
      const esdaySet = esday.tz(timestamp, timezone).set('year', newYear, newMonth)

      expect(objectResultsAsJsonTz(esdaySet)).toEqual(objectResultsAsJsonTz(esdayParsed))
    })

    it('set year, month - clamp day-of-month - fix errors in moment-timezone', () => {
      const timestamp = '2024-07-31 14:25:36'
      const timezone = 'America/New_York'
      const newYear = 2025
      const newMonth = 5 // June
      const esdayParsed = esday.tz(`${newYear}-${newMonth + 1}-30T14:25:36`, timezone)
      const esdaySet = esday.tz(timestamp, timezone).set('year', newYear, newMonth)

      expect(objectResultsAsJsonTz(esdaySet)).toEqual(objectResultsAsJsonTz(esdayParsed))
    })

    it('set month, day-of-month - offset unchanged - fix errors in moment-timezone', () => {
      const timestamp = '2025-07-23 14:25:36'
      const timezone = 'America/New_York'
      const newMonth = 5 // June
      const newDate = 14
      const esdayParsed = esday.tz(`2025-${newMonth + 1}-${newDate}T14:25:36`, timezone)
      const esdaySet = esday.tz(timestamp, timezone).set('month', newMonth, newDate)

      expect(objectResultsAsJsonTz(esdaySet)).toEqual(objectResultsAsJsonTz(esdayParsed))
    })

    it('set month, day-of-month over overlap - fix errors in moment-timezone', () => {
      const timestamp = '2025-07-23 14:25:36'
      const timezone = 'America/New_York'
      const newMonth = 10 // November
      const newDate = 14
      const esdayParsed = esday.tz(`2025-${newMonth + 1}-${newDate}T14:25:36`, timezone)
      const esdaySet = esday.tz(timestamp, timezone).set('month', newMonth, newDate)

      expect(objectResultsAsJsonTz(esdaySet)).toEqual(objectResultsAsJsonTz(esdayParsed))
    })

    it('set hour, minute, second, millisecond', () => {
      const timestamp = '2025-09-04 14:25:36'
      const timezone = 'America/New_York'
      const newHour = 4
      const newMinute = 12
      const newSecond = 31
      const newMs = 987

      const esdaySet = esday
        .tz(timestamp, timezone)
        .set('hour', newHour, newMinute, newSecond, newMs)
      const esdayParsed = esday.tz(
        `2025-09-04T${newHour}:${newMinute}:${newSecond}.${newMs}`,
        timezone,
      )

      expect(objectResultsAsJsonTz(esdaySet)).toEqual(objectResultsAsJsonTz(esdayParsed))
    })

    it('set minute, second, millisecond', () => {
      const timestamp = '2025-09-04 14:25:36'
      const timezone = 'America/New_York'
      const newMinute = 43
      const newSecond = 3
      const newMs = 564

      const esdaySet = esday.tz(timestamp, timezone).set('minute', newMinute, newSecond, newMs)
      const esdayParsed = esday.tz(`2025-09-04T14:${newMinute}:${newSecond}.${newMs}`, timezone)

      expect(objectResultsAsJsonTz(esdaySet)).toEqual(objectResultsAsJsonTz(esdayParsed))
    })

    it('set second, millisecond', () => {
      const timestamp = '2025-09-04 14:25:36'
      const timezone = 'America/New_York'
      const newSecond = 25
      const newMs = 5

      const esdaySet = esday.tz(timestamp, timezone).set('second', newSecond, newMs)
      const esdayParsed = esday.tz(`2025-09-04T14:25:${newSecond}.${newMs}`, timezone)

      expect(objectResultsAsJsonTz(esdaySet)).toEqual(objectResultsAsJsonTz(esdayParsed))
    })

    it('set date to year before 1970', () => {
      const timestamp = '1875-09-04 14:25:36.234'
      const timezone = 'America/New_York'
      const newYear = 1921
      const esdayParsed = esday.tz(`${newYear}-09-04T14:25:36.234`, timezone)
      const esdaySet = esday.tz(timestamp, timezone).set('year', newYear)

      expect(objectResultsAsJsonTz(esdaySet)).toEqual(objectResultsAsJsonTz(esdayParsed))
    })

    it('set month will bubble up', () => {
      const timezone = 'America/New_York'
      const newMonth = 27

      expectSameObjectTz((esday) => esday().tz(timezone).set('month', newMonth))
    })

    it('set day of month will bubble up', () => {
      const timezone = 'America/New_York'
      const newDate = 45

      expectSameObjectTz((esday) => esday().tz(timezone).set('date', newDate))
    })

    it('set hour will bubble up', () => {
      const timezone = 'America/New_York'
      const newHour = 31

      expectSameObjectTz((esday) => esday().tz(timezone).set('hour', newHour))
    })

    it('set minute will bubble up', () => {
      const timezone = 'America/New_York'
      const newMinute = 131

      expectSameObjectTz((esday) => esday().tz(timezone).set('minute', newMinute))
    })

    it('set second will bubble up', () => {
      const timezone = 'America/New_York'
      const newSecond = 131

      expectSameObjectTz((esday) => esday().tz(timezone).set('second', newSecond))
    })

    it('set millisecond will bubble up', () => {
      const timezone = 'America/New_York'
      const newMillisecond = 1234

      expectSameObjectTz((esday) => esday().tz(timezone).set('ms', newMillisecond))
    })
  })

  describe('add / subtract', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()

      // reset default timezone
      esday.tz.setDefault()
      moment.tz.setDefault()
    })

    it.each([
      {
        timestamp: '2025-03-09 01:00:00',
        tz: 'US/Pacific',
        diffValue: 1,
        diffUnit: 'day' as const,
        expectedDiffMinutes: 1380, // 23h - keeps hour of day
        comment: 'add 1 day over DST spring forward gap - keep time',
      },
      {
        timestamp: '2025-03-09 00:00:00',
        tz: 'US/Pacific',
        diffValue: 1,
        diffUnit: 'week' as const,
        expectedDiffMinutes: 10020, // 6d 23h - keeps hour of day
        comment: 'add 1 week over DST spring forward gap - keep time',
      },
      {
        timestamp: '2025-03-09 01:00:00',
        tz: 'US/Pacific',
        diffValue: 1,
        diffUnit: 'month' as const,
        expectedDiffMinutes: 44580, // 30d 23h - keeps hour of day
        comment: 'add 1 month over DST spring forward gap - keep time',
      },
      {
        timestamp: '2025-03-09 01:45:00',
        tz: 'US/Pacific',
        diffValue: 90,
        diffUnit: 'minutes' as const,
        expectedDiffMinutes: 90,
        comment: 'add 90 minutes around DST over spring forward gap',
      },
      {
        timestamp: '2025-03-09 01:00:00',
        tz: 'US/Pacific',
        diffValue: 90,
        diffUnit: 'minutes' as const,
        expectedDiffMinutes: 90,
        comment: 'add 90 minutes around DST into spring forward gap',
      },
      {
        timestamp: '2025-03-09 02:15:00',
        tz: 'US/Pacific',
        diffValue: 30,
        diffUnit: 'minutes' as const,
        expectedDiffMinutes: 30,
        comment: 'add 30 minutes within DST spring forward gap',
      },
      {
        timestamp: '2025-11-02 00:00:00',
        tz: 'US/Pacific',
        diffValue: 1,
        diffUnit: 'day' as const,
        expectedDiffMinutes: 1500, // 25h - keeps hour of day
        comment: 'add 1 day over DST fall back overlap (dayjs pr#2961) - keep time',
      },
      {
        timestamp: '2025-11-02 00:00:00',
        tz: 'US/Pacific',
        diffValue: 1,
        diffUnit: 'week' as const,
        expectedDiffMinutes: 10140, // 7d 1h - keeps hour of day
        comment: 'add 1 week over DST fall back overlap - keep time',
      },
      {
        timestamp: '2025-11-02 00:00:00',
        tz: 'US/Pacific',
        diffValue: 1,
        diffUnit: 'month' as const,
        expectedDiffMinutes: 43260, // 30d 1h - keeps hour of day
        comment: 'add 1 month over DST fall back overlap - keep time',
      },
      {
        timestamp: '2025-11-02 00:30:00',
        tz: 'US/Pacific',
        diffValue: 4,
        diffUnit: 'hours' as const,
        expectedDiffMinutes: 240,
        comment: 'add 4 hours around DST over fall back overlap',
      },
      {
        timestamp: '2025-11-02 01:00:00',
        tz: 'US/Pacific',
        diffValue: 90,
        diffUnit: 'minutes' as const,
        expectedDiffMinutes: 90,
        comment: 'add 90 minutes around DST into fall back overlap',
      },
      {
        timestamp: '2025-11-02 01:15:00',
        tz: 'US/Pacific',
        diffValue: 60,
        diffUnit: 'minutes' as const,
        expectedDiffMinutes: 60,
        comment: 'add 60 minutes within DST fall back overlap',
      },
      {
        timestamp: '2025-03-29 23:00:00',
        tz: 'Europe/London',
        diffValue: 1,
        diffUnit: 'day' as const,
        expectedDiffMinutes: 1380,
        comment: 'add 1 day around DST spring forward',
      },
      {
        timestamp: '2025-03-29 23:00:00',
        tz: 'Europe/London',
        diffValue: 1,
        diffUnit: 'week' as const,
        expectedDiffMinutes: 10020,
        comment: 'add 1 week around DST spring forward',
      },
      {
        timestamp: '2025-03-29 23:00:00',
        tz: 'Europe/London',
        diffValue: 1,
        diffUnit: 'month' as const,
        expectedDiffMinutes: 44580,
        comment: 'add 1 month around DST spring forward',
      },
      {
        timestamp: '2025-10-25 23:00:00',
        tz: 'Europe/London',
        diffValue: 1,
        diffUnit: 'day' as const,
        expectedDiffMinutes: 1500,
        comment: 'add 1 day around DST fall back overlap (dayjs pr#2961)',
      },
      {
        timestamp: '2025-10-25 23:00:00',
        tz: 'Europe/London',
        diffValue: 1,
        diffUnit: 'week' as const,
        expectedDiffMinutes: 10140,
        comment: 'add 1 week around DST fall back overlap (dayjs pr#2961)',
      },
      {
        timestamp: '2025-10-25 00:00:00',
        tz: 'Europe/London',
        diffValue: 1,
        diffUnit: 'month' as const,
        expectedDiffMinutes: 44700,
        comment: 'add 1 month around DST fall back overlap (dayjs pr#2961)',
      },
      {
        timestamp: '2025-03-30 00:00:00',
        tz: 'Europe/London',
        diffValue: 90,
        diffUnit: 'minutes' as const,
        expectedDiffMinutes: 90,
        comment: 'add 90 minutes around DST into spring forward gap',
      },
      {
        timestamp: '2025-03-30 02:15:00',
        tz: 'Europe/London',
        diffValue: 30,
        diffUnit: 'minutes' as const,
        expectedDiffMinutes: 30,
        comment: 'add 30 minutes within DST spring forward gap',
      },
      {
        timestamp: '2025-10-26 00:00:00',
        tz: 'Europe/London',
        diffValue: 90,
        diffUnit: 'minutes' as const,
        expectedDiffMinutes: 90,
        comment: 'add 90 minutes around DST into fall back overlap',
      },
      {
        timestamp: '2025-10-26 02:15:00',
        tz: 'Europe/London',
        diffValue: 30,
        diffUnit: 'minutes' as const,
        expectedDiffMinutes: 30,
        comment: 'add 30 minutes within DST fall back overlap',
      },
      {
        timestamp: '2025-07-21 14:25:36',
        tz: 'Australia/Canberra',
        diffValue: 1,
        diffUnit: 'day' as const,
        expectedDiffMinutes: 1440,
        comment: 'no DST involved; 24h difference',
      },
      {
        timestamp: '2025-10-05 01:00:00',
        tz: 'Australia/Canberra',
        diffValue: 1,
        diffUnit: 'day' as const,
        expectedDiffMinutes: 1380,
        comment: 'add 1 day around DST spring forward gap',
      },
      {
        timestamp: '2025-04-06 01:00:00',
        tz: 'Australia/Canberra',
        diffValue: 1,
        diffUnit: 'day' as const,
        expectedDiffMinutes: 1500,
        comment: 'add 1 day around DST fall back overlap',
      },
      {
        timestamp: '2025-10-05 01:00:00',
        tz: 'Australia/Canberra',
        diffValue: 90,
        diffUnit: 'minutes' as const,
        expectedDiffMinutes: 90,
        comment: 'add 90 minutes around DST into spring forward gap',
      },
      {
        timestamp: '2025-10-05 02:15:00',
        tz: 'Australia/Canberra',
        diffValue: 30,
        diffUnit: 'minutes' as const,
        expectedDiffMinutes: 30,
        comment: 'add 30 minutes within DST spring forward gap',
      },
      {
        timestamp: '2025-04-06 01:00:00',
        tz: 'Australia/Canberra',
        diffValue: 90,
        diffUnit: 'minutes' as const,
        expectedDiffMinutes: 90,
        comment: 'add 90 minutes around DST into fall back overlap',
      },
      {
        timestamp: '2025-04-06 02:15:00',
        tz: 'Australia/Canberra',
        diffValue: 30,
        diffUnit: 'minutes' as const,
        expectedDiffMinutes: 30,
        comment: 'add 30 minutes within DST fall back overlap',
      },
    ])('add around DST for "$diffValue $diffUnit" to "$timestamp" in "$tz"', ({
      timestamp,
      tz,
      diffValue,
      diffUnit,
      expectedDiffMinutes,
    }) => {
      const dateBeforeDST = esday.tz(timestamp, tz)
      const diffInUnit = dateBeforeDST.add(diffValue, diffUnit).diff(dateBeforeDST, 'minutes')

      expectSameObjectTz((esday) => esday.tz(timestamp, tz).add(diffValue, diffUnit))
      expect(diffInUnit).toBe(expectedDiffMinutes)
      expectSameValueTz((esday) =>
        esday.tz(timestamp, tz).add(diffValue, diffUnit).diff(esday.tz(timestamp, tz)),
      )
    })

    it.each([
      {
        timestamp: '2025-07-21 14:25:36',
        tz: 'US/Pacific',
        diffValue: 1,
        diffUnit: 'year' as const,
      },
      {
        timestamp: '2025-07-21 14:25:36',
        tz: 'US/Pacific',
        diffValue: 1,
        diffUnit: 'month' as const,
      },
      {
        timestamp: '2025-07-21 14:25:36',
        tz: 'US/Pacific',
        diffValue: 1,
        diffUnit: 'week' as const,
      },
      {
        timestamp: '2025-07-21 14:25:36',
        tz: 'US/Pacific',
        diffValue: 1,
        diffUnit: 'day' as const,
      },
      {
        timestamp: '2025-07-21 14:25:36',
        tz: 'US/Pacific',
        diffValue: 1,
        diffUnit: 'hour' as const,
      },
      {
        timestamp: '2025-07-21 14:25:36',
        tz: 'US/Pacific',
        diffValue: 1,
        diffUnit: 'minute' as const,
      },
      {
        timestamp: '2025-07-21 14:25:36',
        tz: 'US/Pacific',
        diffValue: 1,
        diffUnit: 'second' as const,
      },
      {
        timestamp: '2025-07-21 14:25:36',
        tz: 'US/Pacific',
        diffValue: 1,
        diffUnit: 'millisecond' as const,
      },
    ])('add without DST "$diffValue $diffUnit" to "$timestamp" in "$tz"', ({
      timestamp,
      tz,
      diffValue,
      diffUnit,
    }) => {
      expectSameObjectTz((esday) => esday.tz(timestamp, tz).add(diffValue, diffUnit))
      expectSameValueTz((esday) =>
        esday.tz(timestamp, tz).add(diffValue, diffUnit).diff(esday.tz(timestamp, tz)),
      )
    })

    it('add preserves timezone context (dayjs pr#2961)', () => {
      const timestamp = '2025-07-21 14:25:36'
      const tz = 'US/Pacific'
      const diffValue = 1
      const diffUnit = 'day' as const
      const timestampValueOf = esday.tz(timestamp, tz).add(diffValue, diffUnit).valueOf()

      expectSameObjectTz((esday) => esday.tz(timestamp, tz).add(diffValue, diffUnit))
      expectSameObjectTz((esday) => esday.tz(timestampValueOf, tz))
    })

    it('add returns instance for chaining (dayjs pr#2961)', () => {
      const timestamp = '2025-07-21 14:25:36'
      const tz = 'US/Pacific'
      const diffValue = 1
      const diffUnit = 'day' as const
      const startOfUnit = 'second' as const

      expectSameObjectTz((esday) =>
        esday.tz(timestamp, tz).add(diffValue, diffUnit).startOf(startOfUnit),
      )
    })

    it('add after startOf (dayjs pr#2895)', () => {
      const timestamp = '2025-01-31'
      const tz = 'UTC'
      const diffValue = 3
      const diffUnit = 'months' as const
      const startOfUnit = 'month' as const

      expectSameObjectTz((esday) =>
        esday.tz(timestamp, tz).startOf(startOfUnit).add(diffValue, diffUnit),
      )
    })

    it('add after startOf (dayjs pr#2813 / issue#2810)', () => {
      const timestamp = '2023-01-31'
      const tz = 'UTC'
      const diffValue = 1
      const diffUnit = 'month' as const
      const startOfUnitParse = 'day' as const
      const startOfUnitAdd = 'month' as const

      expectSameObjectTz((esday) =>
        esday
          .utc(timestamp)
          .tz(tz)
          .startOf(startOfUnitParse)
          .add(diffValue, diffUnit)
          .startOf(startOfUnitAdd),
      )
    })

    it('add does not break other implementations', () => {
      const timestamp = '2025-07-21 14:25:36'
      const diffValue = 30
      const diffUnit = 'minutes' as const

      expectSameObjectTz((esday) => esday(timestamp).add(diffValue, diffUnit))
    })

    it.each([
      {
        timestamp: '2025-04-06 02:45:00',
        tz: 'Australia/Canberra',
        diffValue: 30,
        diffUnit: 'minutes' as const,
        expectedDiffMinutes: -30,
        comment: 'add 30 minutes within DST fall back overlap',
      },
    ])('subtract around DST for "$diffValue $diffUnit" to "$timestamp" in "$tz"', ({
      timestamp,
      tz,
      diffValue,
      diffUnit,
      expectedDiffMinutes,
    }) => {
      const dateBeforeDST = esday.tz(timestamp, tz)
      const diffInUnit = dateBeforeDST.subtract(diffValue, diffUnit).diff(dateBeforeDST, 'minutes')

      expectSameObjectTz((esday) => esday.tz(timestamp, tz).subtract(diffValue, diffUnit))
      expect(diffInUnit).toBe(expectedDiffMinutes)
      expectSameValueTz((esday) =>
        esday.tz(timestamp, tz).subtract(diffValue, diffUnit).diff(esday.tz(timestamp, tz)),
      )
    })

    it('subtract does not break other implementations', () => {
      const timestamp = '2025-07-21 14:25:36'
      const diffValue = 30
      const diffUnit = 'minutes' as const

      expectSameObjectTz((esday) => esday(timestamp).subtract(diffValue, diffUnit))
    })
  })

  describe('format', () => {
    it.each([
      { timestamp: '2025-02-09 11:15:09', timezone: 'America/Toronto', expected: 'EST' },
      { timestamp: '2025-07-09 11:15:09', timezone: 'America/Toronto', expected: 'EDT' },
      { timestamp: '2025-02-09 11:15:09', timezone: 'Europe/London', expected: 'GMT' },
      { timestamp: '2025-07-09 11:15:09', timezone: 'Europe/London', expected: 'GMT+1' },
      { timestamp: '2025-02-09 11:15:09', timezone: 'Europe/Paris', expected: 'GMT+1' },
      { timestamp: '2025-07-09 11:15:09', timezone: 'Europe/Paris', expected: 'GMT+2' },
      { timestamp: '2025-02-09 11:15:09', timezone: 'Australia/Canberra', expected: 'GMT+11' },
      { timestamp: '2025-07-09 11:15:09', timezone: 'Australia/Canberra', expected: 'GMT+10' },
    ])('format "$timestamp" for "$timezone" using "z"', ({ timestamp, timezone, expected }) => {
      expect(esday.tz(timestamp, timezone).format('z')).toBe(expected)
    })

    it.each([
      { timestamp: '2025-02-09 11:15:09', timezone: 'America/Toronto', expected: 'EST' },
      { timestamp: '2025-07-09 11:15:09', timezone: 'America/Toronto', expected: 'EDT' },
      { timestamp: '2025-02-09 11:15:09', timezone: 'Europe/London', expected: 'GMT' },
      { timestamp: '2025-07-09 11:15:09', timezone: 'Europe/London', expected: 'GMT+1' },
      { timestamp: '2025-02-09 11:15:09', timezone: 'Europe/Paris', expected: 'GMT+1' },
      { timestamp: '2025-07-09 11:15:09', timezone: 'Europe/Paris', expected: 'GMT+2' },
      { timestamp: '2025-02-09 11:15:09', timezone: 'Australia/Canberra', expected: 'GMT+11' },
      { timestamp: '2025-07-09 11:15:09', timezone: 'Australia/Canberra', expected: 'GMT+10' },
    ])('format "$timestamp" for "$timezone" using "zz"', ({ timestamp, timezone, expected }) => {
      expect(esday.tz(timestamp, timezone).format('zz')).toBe(expected)
    })
  })
})
