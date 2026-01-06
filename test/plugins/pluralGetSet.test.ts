import { esday } from 'esday'
import { afterEach, beforeEach, describe, it, vi } from 'vitest'
import pluralGetSetPlugin from '~/plugins/pluralGetSet'
import { expectSameObject, expectSameValue } from '../util'

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
    expectSameValue((esday) => esday().years())
  })

  it('months', () => {
    expectSameValue((esday) => esday().months())
  })

  it('days of month', () => {
    expectSameValue((esday) => esday().dates())
  })

  it.each([
    { sourceString: '2024-02-03T13:14:15.678', expected: 6 },
    { sourceString: '2024-11-06T00:00:00', expected: 3 },
    { sourceString: '2024-11-14T00:00:00', expected: 4 },
  ])('days of week for "$sourceString"', ({ sourceString }) => {
    expectSameValue((esday) => esday(sourceString).days())
  })

  it('hours', () => {
    expectSameValue((esday) => esday().hours())
  })

  it('minutes', () => {
    expectSameValue((esday) => esday().minutes())
  })

  it('seconds', () => {
    expectSameValue((esday) => esday().seconds())
  })

  it('milliseconds', () => {
    expectSameValue((esday) => esday().milliseconds())
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

    expectSameObject((esday) => esday().years(newYear))
  })

  it('months', () => {
    const newMonth = 5 // June

    expectSameObject((esday) => esday().months(newMonth))
  })

  it('days of month', () => {
    const newDayOfMonth = 25

    expectSameObject((esday) => esday().dates(newDayOfMonth))
  })

  it.each([
    { sourceString: '2024-11-06T00:00:00', newDayOfWeek: 3 },
    { sourceString: '2024-11-14T00:00:00', newDayOfWeek: 4 },
    { sourceString: '2024-02-03T13:14:15.678', newDayOfWeek: 6 },
  ])('days of week for "$sourceString" to "$newDayOfWeek"', ({ sourceString, newDayOfWeek }) => {
    expectSameObject((esday) => esday(sourceString).days(newDayOfWeek))
  })

  it('hours', () => {
    const newHour = 4

    expectSameObject((esday) => esday().hours(newHour))
  })

  it('minutes', () => {
    const newMinute = 43

    expectSameObject((esday) => esday().minutes(newMinute))
  })

  it('seconds', () => {
    const newSecond = 25

    expectSameObject((esday) => esday().seconds(newSecond))
  })

  it('milliseconds', () => {
    const newMillisecond = 25

    expectSameObject((esday) => esday().milliseconds(newMillisecond))
  })
})
