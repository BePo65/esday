import { EsDay, esday } from 'esday'
import moment from 'moment-timezone'
import { afterEach, describe, expect, it } from 'vitest'
import timezonePLugin from '~/plugins/timezone'
import utcPlugin from '~/plugins/utc'
import { expectSameObjectTz, expectSameTimestamp, expectSameValueTz } from './timezone-util'

esday.extend(utcPlugin).extend(timezonePLugin)

describe('timezone plugin without plugins', () => {
  afterEach(() => {
    esday.tz.setDefault()
    moment.tz.setDefault()
  })

  it.each([
    {
      timestamp: '2025-02-09 11:15:09',
      timezone: 'America/Toronto',
      comment: 'without DST',
    },
    {
      timestamp: '2025-07-18 11:55:00',
      timezone: 'America/Toronto',
      comment: 'with DST',
    },
    {
      timestamp: '2025-01-30 02:15',
      timezone: 'Europe/Paris',
      comment: 'without DST',
    },
    {
      timestamp: '2025-07-30 01:55:59',
      timezone: 'Europe/Paris',
      comment: 'with DST',
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
  ])(
    'parse non existing time / overlap with DST for "$timestamp" in "$timezone"',
    ({ timestamp, timezone }) => {
      expectSameObjectTz((esday) => esday.tz(timestamp, timezone))
      expect(esday.tz(timestamp, timezone).isValid()).toBeTruthy()
      expectSameValueTz((esday) => esday.tz(timestamp, timezone).format())
    },
  )

  it.each([
    {
      description: 'start of fall back DST overlap in Canberra',
      timestamp: '2025-04-06 02:00:00',
      timezone: 'Australia/Canberra',
      isoStringEsday: '2025-04-05T16:00:00.000Z',
      isoStringMoment: '2025-04-05T15:00:00.000Z',
      valueEsday: 1743868800000,
      valueMoment: 1743865200000,
    },
    {
      description: 'within fall back DST overlap in Canberra',
      timestamp: '2025-04-06 02:30:00',
      timezone: 'Australia/Canberra',
      isoStringEsday: '2025-04-05T16:30:00.000Z',
      isoStringMoment: '2025-04-05T15:30:00.000Z',
      valueEsday: 1743870600000,
      valueMoment: 1743867000000,
    },
    {
      description: 'end of fall back DST overlap in Canberra',
      timestamp: '2025-04-06 02:59:59',
      timezone: 'Australia/Canberra',
      isoStringEsday: '2025-04-05T16:59:59.000Z',
      isoStringMoment: '2025-04-05T15:59:59.000Z',
      valueEsday: 1743872399000,
      valueMoment: 1743868799000,
    },
    {
      description: 'start of fall back DST overlap in Amman',
      timestamp: '2021-10-29 00:00:00',
      timezone: 'Asia/Amman',
      isoStringEsday: '2021-10-28T22:00:00.000Z',
      isoStringMoment: '2021-10-28T21:00:00.000Z',
      valueEsday: 1635458400000,
      valueMoment: 1635454800000,
    },
  ])(
    'parse special case "$description"',
    ({ timestamp, timezone, isoStringEsday, isoStringMoment, valueEsday, valueMoment }) => {
      const d = esday.tz(timestamp, timezone)
      const m = moment.tz(timestamp, timezone)

      expect(d.isValid()).toBeTruthy()
      expect(m.isValid()).toBeTruthy()
      expect(d.toISOString()).toBe(isoStringEsday)
      expect(m.toISOString()).toBe(isoStringMoment)
      expect(d.valueOf()).toBe(valueEsday)
      expect(m.valueOf()).toBe(valueMoment)
    },
  )

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

    expect(d.isValid()).toBeTruthy()
    expect(m.isValid()).toBeTruthy()
    expect(d.valueOf()).toBe(m.valueOf())
    expect(d.toISOString()).toBe(m.toISOString())
    expect(d.toDate()).toEqual(m.toDate())
    expect(d.toJSON()).toBe(m.toJSON())
    expect(d.utcOffset()).toBe(m.utcOffset())

    // differences to moment.js
    expect(d.isUTC()).toBeFalsy()
    expect(m.isUTC()).toBeTruthy()
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
  ])(
    'update timezone for "$timestamp" from "$timezoneOld" to "$timezoneNew"',
    ({ timestamp, timezoneOld, timezoneNew }) => {
      expectSameObjectTz((esday) => esday.tz(timestamp, timezoneOld).tz(timezoneNew, true))
      expect(esday.tz(timestamp, timezoneOld).tz(timezoneNew, true).isValid()).toBeTruthy()
      expectSameValueTz((esday) => esday.tz(timestamp, timezoneOld).tz(timezoneNew, true).format())
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
})

describe('timezone plugin with utc', () => {
  afterEach(() => {
    esday.tz.setDefault()
    moment.tz.setDefault()
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
  ])('convert "$timestamp" to "$timezone"', ({ timestamp, timezone }) => {
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
    expectSameObjectTz((esday) => esday.utc(timestamp).tz(timezone, true))
    expect(esday.utc(timestamp).tz(timezone, true).isValid()).toBeTruthy()
  })
})
