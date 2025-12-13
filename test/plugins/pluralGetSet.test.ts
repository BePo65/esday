import { esday } from 'esday'
import { afterEach, beforeEach, describe, it, vi } from 'vitest'
import pluralGetSetPlugin from '~/plugins/pluralGetSet'
import { expectSame, expectSameResult } from '../util'

esday.extend(pluralGetSetPlugin)

describe('plural get', () => {
  const fakeTimeAsString = '2024-07-17T13:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('years', () => {
    expectSame((esday) => esday().years())
  })

  it('months', () => {
    expectSame((esday) => esday().months())
  })

  it('days of month', () => {
    expectSame((esday) => esday().dates())
  })

  it.each([
    { sourceString: '2024-02-03T13:14:15.678', expected: 6 },
    { sourceString: '2024-11-06T00:00:00', expected: 3 },
    { sourceString: '2024-11-14T00:00:00', expected: 4 },
  ])('days of week for "$sourceString"', ({ sourceString }) => {
    expectSame((esday) => esday(sourceString).days())
  })

  it('hours', () => {
    expectSame((esday) => esday().hours())
  })

  it('minutes', () => {
    expectSame((esday) => esday().minutes())
  })

  it('seconds', () => {
    expectSame((esday) => esday().seconds())
  })

  it('milliseconds', () => {
    expectSame((esday) => esday().milliseconds())
  })
})

describe('plural set', () => {
  const fakeTimeAsString = '2024-07-17T13:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('years', () => {
    const newYear = 2025

    expectSameResult((esday) => esday().years(newYear))
  })

  it('months', () => {
    const newMonth = 5 // June

    expectSameResult((esday) => esday().months(newMonth))
  })

  it('days of month', () => {
    const newDayOfMonth = 25

    expectSameResult((esday) => esday().dates(newDayOfMonth))
  })

  it.each([
    { sourceString: '2024-11-06T00:00:00', newDayOfWeek: 3 },
    { sourceString: '2024-11-14T00:00:00', newDayOfWeek: 4 },
    { sourceString: '2024-02-03T13:14:15.678', newDayOfWeek: 6 },
  ])('days of week for "$sourceString" to "$newDayOfWeek"', ({ sourceString, newDayOfWeek }) => {
    expectSameResult((esday) => esday(sourceString).days(newDayOfWeek))
  })

  it('hours', () => {
    const newHour = 4

    expectSameResult((esday) => esday().hours(newHour))
  })

  it('minutes', () => {
    const newMinute = 43

    expectSameResult((esday) => esday().minutes(newMinute))
  })

  it('seconds', () => {
    const newSecond = 25

    expectSameResult((esday) => esday().seconds(newSecond))
  })

  it('milliseconds', () => {
    const newMillisecond = 25

    expectSameResult((esday) => esday().milliseconds(newMillisecond))
  })
})
