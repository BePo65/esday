import { esday, type UnitTypeGetSet } from 'esday'
import moment from 'moment-timezone'
import { afterEach, describe, expect, it } from 'vitest'
import advancedParsePlugin from '~/plugins/advancedParse'
import objectSupportPlugin from '~/plugins/objectSupport'
import quarterOfYearPlugin from '~/plugins/quarterOfYear'
import timezonePLugin from '~/plugins/timezone'
import utcPlugin from '~/plugins/utc'
import { expectSameObjectTz, expectSameValueTz } from './timezone-test-util'

esday
  .extend(utcPlugin)
  .extend(quarterOfYearPlugin)
  .extend(advancedParsePlugin)
  .extend(objectSupportPlugin)
  .extend(timezonePLugin)

describe('with plugin advancedParse', () => {
  afterEach(() => {
    esday.tz.setDefault()
    moment.tz.setDefault()
  })

  it.each([
    {
      timestamp: '08-2023-14 21:43:12.123',
      timezone: 'America/New_York',
      formatString: 'MM-YYYY-DD HH:mm:ss.SSS',
    },
    {
      timestamp: '08-2023-14 21:43:12.123',
      timezone: 'America/New_York',
      formatString: 'M-YY-D H:m:s.SS',
    },
    { timestamp: '31.12.2019', timezone: 'Europe/Paris', formatString: 'DD.MM.YYYY' },
    { timestamp: '2025 14 05', timezone: 'Asia/Taipei', formatString: 'YYYY DD MM' },
  ])('parse "$timestamp" in "$timezone" with format "$formatString"', ({
    timestamp,
    timezone,
    formatString,
  }) => {
    expectSameObjectTz((esday) => esday.tz(timestamp, formatString, timezone))
    expect(esday.tz(timestamp, formatString, timezone).isValid()).toBeTruthy()
    expectSameValueTz((esday) => esday.tz(timestamp, formatString, timezone).format())
  })

  it.each([
    {
      timestamp: '08-2023-14 21:43:12.123',
      timezone: 'America/New_York',
      formatString: 'MM-YYYY-DD HH:mm:ss.SSS',
    },
    { timestamp: '31.12.2019', timezone: 'Europe/Paris', formatString: 'DD.MM.YYYY' },
    { timestamp: '2025 14 05', timezone: 'Asia/Taipei', formatString: 'YYYY DD MM' },
  ])('parse in matching strict mode "$timestamp" in "$timezone" with format "$formatString"', ({
    timestamp,
    timezone,
    formatString,
  }) => {
    expectSameObjectTz((esday) => esday.tz(timestamp, formatString, true, timezone))
    expect(esday.tz(timestamp, formatString, true, timezone).isValid()).toBeTruthy()
    expectSameValueTz((esday) => esday.tz(timestamp, formatString, true, timezone).format())
  })

  it.each([
    {
      timestamp: '08-2023-14 21:43:12',
      timezone: 'America/New_York',
      formatString: 'MM-YYYY-DD HH:mm:ss.SSS',
    },
    {
      timestamp: '08-2023-14 21:43:12.123',
      timezone: 'Europe/Paris',
      formatString: 'M-YY-D H:m:s.SS',
    },
    {
      timestamp: '08-2023-14 21:43:12.123',
      timezone: 'Asia/Taipei',
      formatString: 'M-YY-D H:m:s',
    },
    { timestamp: '31.12.2019', timezone: 'America/Toronto', formatString: 'DD.MM.YY' },
  ])('parse in non-matching strict mode "$timestamp" in "$timezone" with format "$formatString"', ({
    timestamp,
    timezone,
    formatString,
  }) => {
    expect(esday.tz(timestamp, formatString, true, timezone).isValid()).toBeFalsy()
    expect(moment.tz(timestamp, formatString, true, timezone).isValid()).toBeFalsy()
  })

  it('parse literal object', () => {
    const timestamp = { y: 2024, M: 4, d: 14, h: 15, m: 13, s: 34 }
    const timezone = 'US/Pacific'

    expectSameObjectTz((esday) => esday.tz(timestamp, timezone))
  })
})

describe('with plugin quarterOfYear', () => {
  it.each(['Q', 'quarter', 'quarters'])('get with unit "%s"', (unit) => {
    const timestamp = '2025-07-23 14:25:36.345'
    const timezone = 'America/New_York'

    expectSameValueTz((esday) => esday.tz(timestamp, timezone).get(unit as UnitTypeGetSet))
  })
})

describe('with plugin objectSupport', () => {
  it('set does not break with object as unit', () => {
    const timestamp = '2025-07-21 14:25:36'
    const subValues = { year: 2024, month: 4, date: 20 }

    expectSameObjectTz((esday) => esday(timestamp).set(subValues))
  })

  it.each([
    {
      value: { year: 2024, month: 4, date: 20 },
      expected: '2024-05-20T03:24:46',
      description: 'y-M-D',
    },
  ])('set with object ("$description")', ({ value }) => {
    const timestamp = '2025-07-23 14:25:36.345'
    const timezone = 'America/New_York'

    expectSameObjectTz((esday) => esday.tz(timestamp, timezone).set(value))
  })

  it('add does not break with object as value', () => {
    const timestamp = '2025-07-21 14:25:36'
    const subValues = { years: 1, months: 2, days: 3, hours: 1, minutes: 2, seconds: 3 }

    expectSameObjectTz((esday) => esday(timestamp).add(subValues))
  })

  it('subtract does not break with object as value', () => {
    const timestamp = '2025-07-21 14:25:36'
    const subValues = { years: 1, months: 2, days: 3, hours: 1, minutes: 2, seconds: 3 }

    expectSameObjectTz((esday) => esday(timestamp).subtract(subValues))
  })
})
