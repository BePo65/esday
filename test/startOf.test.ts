import moment from 'moment/min/moment-with-locales'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { C } from '~/common'
import { esday } from '~/core'
import { expectSameObject } from './util'

describe('startOf', () => {
  const fakeTimeAsString = '2023-11-17T03:24:46.234'
  let momentDefaultLocale: string

  beforeAll(() => {
    momentDefaultLocale = moment.locale()

    // Change firstDayOfWeek to ISO 8601 used by esday
    moment.updateLocale('en', {
      week: {
        dow: 1,
      },
    })
  })

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  afterAll(() => {
    // reset changed locale settings for moment.js
    moment.locale(momentDefaultLocale)
  })

  it.each([
    { unit: C.YEAR, expectedAsString: '2023-01-01T00:00:00.000' },
    { unit: C.MONTH, expectedAsString: '2023-11-01T00:00:00.000' },
    { unit: C.DAY, expectedAsString: '2023-11-17T00:00:00.000' },
    { unit: C.DAY_OF_MONTH, expectedAsString: '2023-11-17T00:00:00.000' },
    { unit: C.HOUR, expectedAsString: '2023-11-17T03:00:00.000' },
    { unit: C.MIN, expectedAsString: '2023-11-17T03:24:00.000' },
    { unit: C.SECOND, expectedAsString: '2023-11-17T03:24:46.000' },
  ])('should return start of week for "$unit"', ({ unit, expectedAsString }) => {
    const esdayResult = esday().startOf(unit)

    expect(esdayResult.format('YYYY-MM-DDTHH:mm:ss.SSS')).toBe(expectedAsString)
    expectSameObject((esday) => esday().startOf(unit))
  })
})

describe('endOf', () => {
  const fakeTimeAsString = '2023-11-17T03:24:46.234'
  let momentDefaultLocale: string

  beforeAll(() => {
    momentDefaultLocale = moment.locale()

    // Change firstDayOfWeek to ISO 8601 used by esday
    moment.updateLocale('en', {
      week: {
        dow: 1,
      },
    })
  })

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  afterAll(() => {
    // reset changed locale settings for moment.js
    moment.locale(momentDefaultLocale)
  })

  it.each([
    { unit: C.YEAR, expectedAsString: '2023-12-31T23:59:59.999' },
    { unit: C.MONTH, expectedAsString: '2023-11-30T23:59:59.999' },
    { unit: C.DAY, expectedAsString: '2023-11-17T23:59:59.999' },
    { unit: C.DAY_OF_MONTH, expectedAsString: '2023-11-17T23:59:59.999' },
    { unit: C.HOUR, expectedAsString: '2023-11-17T03:59:59.999' },
    { unit: C.MIN, expectedAsString: '2023-11-17T03:24:59.999' },
    { unit: C.SECOND, expectedAsString: '2023-11-17T03:24:46.999' },
  ])('should return end of week for "$unit"', ({ unit, expectedAsString }) => {
    const resultDate = esday().endOf(unit)

    expect(resultDate.format('YYYY-MM-DDTHH:mm:ss.SSS')).toBe(expectedAsString)
    expectSameObject((esday) => esday().endOf(unit))
  })
})
