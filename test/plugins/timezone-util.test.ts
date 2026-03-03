import { describe, expect, it } from 'vitest'
import { getTimezoneNameFormat } from '~/plugins/timezone/timezone-util'

describe('getTimezoneNameFormat', () => {
  it('with empty timezone string', () => {
    const dtf = getTimezoneNameFormat('')
    const timestamp = 1740138745
    const date = new Date(timestamp)
    const formatResult = dtf.formatToParts(date)

    expect(formatResult.length).toBe(5)
    expect(formatResult[4].type).toBe('timeZoneName')
  })
})
