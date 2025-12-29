import { esday } from 'esday'
import moment from 'moment-timezone'
import { afterEach, describe, expect, it } from 'vitest'
import advancedParsePlugin from '~/plugins/advancedParse'
import timezonePLugin from '~/plugins/timezone'
import utcPlugin from '~/plugins/utc'
import { expectSameResultTz, expectSameTz } from './timezone-util'

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
    { timestamp: '31.12.2019', timezone: 'America/New_York', formatString: 'DD.MM.YYYY' },
    { timestamp: '2025 14 05', timezone: 'America/New_York', formatString: 'YYYY DD MM' },
  ])(
    'parse "$timestamp" in "$timezone "with format "$formatString"',
    ({ timestamp, timezone, formatString }) => {
      expectSameResultTz((esday) => esday.tz(timestamp, formatString, timezone))
      expect(esday.tz(timestamp, formatString, timezone).isValid()).toBeTruthy()
      expectSameTz((esday) => esday.tz(timestamp, formatString, timezone).format())
    },
  )

  it.todo('parse with format and strict')
})
