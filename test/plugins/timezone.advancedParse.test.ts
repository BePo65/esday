import { esday } from 'esday'
import moment from 'moment-timezone'
import { afterEach, describe, expect, it } from 'vitest'
import advancedParsePlugin from '~/plugins/advancedParse'
import timezonePLugin from '~/plugins/timezone'
import utcPlugin from '~/plugins/utc'
import { expectSameObjectTz, expectSameValueTz } from './timezone-util'

esday.extend(utcPlugin).extend(advancedParsePlugin).extend(timezonePLugin)

describe('timezone plugin with advancedParse', () => {
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
  ])(
    'parse "$timestamp" in "$timezone" with format "$formatString"',
    ({ timestamp, timezone, formatString }) => {
      expectSameObjectTz((esday) => esday.tz(timestamp, formatString, timezone))
      expect(esday.tz(timestamp, formatString, timezone).isValid()).toBeTruthy()
      expectSameValueTz((esday) => esday.tz(timestamp, formatString, timezone).format())
    },
  )

  it.each([
    {
      timestamp: '08-2023-14 21:43:12.123',
      timezone: 'America/New_York',
      formatString: 'MM-YYYY-DD HH:mm:ss.SSS',
    },
    { timestamp: '31.12.2019', timezone: 'Europe/Paris', formatString: 'DD.MM.YYYY' },
    { timestamp: '2025 14 05', timezone: 'Asia/Taipei', formatString: 'YYYY DD MM' },
  ])(
    'parse in matching strict mode "$timestamp" in "$timezone" with format "$formatString"',
    ({ timestamp, timezone, formatString }) => {
      expectSameObjectTz((esday) => esday.tz(timestamp, formatString, true, timezone))
      expect(esday.tz(timestamp, formatString, true, timezone).isValid()).toBeTruthy()
      expectSameValueTz((esday) => esday.tz(timestamp, formatString, true, timezone).format())
    },
  )

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
  ])(
    'parse in non-matching strict mode "$timestamp" in "$timezone" with format "$formatString"',
    ({ timestamp, timezone, formatString }) => {
      expect(esday.tz(timestamp, formatString, true, timezone).isValid()).toBeFalsy()
      expect(moment.tz(timestamp, formatString, true, timezone).isValid()).toBeFalsy()
    },
  )
})
