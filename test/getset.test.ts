import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { esday } from '~/core'
import type { UnitsObjectTypeSet } from '~/types'
import { expectSame, expectSameResult } from './util'

describe('get', () => {
  const fakeTimeAsString = '2024-07-17T13:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('year', () => {
    expectSame((esday) => esday().year())
    expectSame((esday) => esday().get('y'))
    expectSame((esday) => esday().get('year'))
    expectSame((esday) => esday().get('years'))
  })

  it('month', () => {
    expectSame((esday) => esday().month())
    expectSame((esday) => esday().get('M'))
    expectSame((esday) => esday().get('month'))
    expectSame((esday) => esday().get('months'))
  })

  it('day of month', () => {
    expectSame((esday) => esday().date())
    expectSame((esday) => esday().get('D'))
    expectSame((esday) => esday().get('date'))
    expectSame((esday) => esday().get('dates'))
  })

  it.each([
    { sourceString: '2024-02-03T13:14:15.678', expected: 6 },
    { sourceString: '2024-11-06T00:00:00', expected: 3 },
    { sourceString: '2024-11-14T00:00:00', expected: 4 },
  ])('day of week for "$sourceString"', ({ sourceString }) => {
    expectSame((esday) => esday(sourceString).day())
    expectSame((esday) => esday(sourceString).get('d'))
    expectSame((esday) => esday(sourceString).get('day'))
    expectSame((esday) => esday(sourceString).get('days'))
  })

  it('hour', () => {
    expectSame((esday) => esday().hour())
    expectSame((esday) => esday().get('h'))
    expectSame((esday) => esday().get('hour'))
    expectSame((esday) => esday().get('hours'))
  })

  it('minute', () => {
    expectSame((esday) => esday().minute())
    expectSame((esday) => esday().get('m'))
    expectSame((esday) => esday().get('minute'))
    expectSame((esday) => esday().get('minutes'))
  })

  it('second', () => {
    expectSame((esday) => esday().second())
    expectSame((esday) => esday().get('s'))
    expectSame((esday) => esday().get('second'))
    expectSame((esday) => esday().get('seconds'))
  })

  it('millisecond', () => {
    expectSame((esday) => esday().millisecond())
    expectSame((esday) => esday().get('ms'))
    expectSame((esday) => esday().get('millisecond'))
    expectSame((esday) => esday().get('milliseconds'))
  })

  it('quarter without plugin quarter returns NaN', () => {
    expect(esday().get('Q')).toBeNaN()
    expect(esday().get('quarter')).toBeNaN()
    expect(esday().get('quarters')).toBeNaN()
  })

  it('week without plugin week returns NaN', () => {
    expect(esday().get('w')).toBeNaN()
    expect(esday().get('week')).toBeNaN()
    expect(esday().get('weeks')).toBeNaN()
  })
})

describe('set', () => {
  const fakeTimeAsString = '2024-07-17T13:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('year', () => {
    const newYear = 2025

    expectSameResult((esday) => esday().year(newYear))
    expectSameResult((esday) => esday().set('y', newYear))
    expectSameResult((esday) => esday().set('year', newYear))
    expectSameResult((esday) => esday().set('years', newYear))
  })

  it('month', () => {
    const newMonth = 5 // June

    expectSameResult((esday) => esday().month(newMonth))
    expectSameResult((esday) => esday().set('M', newMonth))
    expectSameResult((esday) => esday().set('month', newMonth))
    expectSameResult((esday) => esday().set('months', newMonth))
  })

  it('day of month', () => {
    const newDayOfMonth = 25

    expectSameResult((esday) => esday().date(newDayOfMonth))
    expectSameResult((esday) => esday().set('D', newDayOfMonth))
    expectSameResult((esday) => esday().set('date', newDayOfMonth))
    expectSameResult((esday) => esday().set('dates', newDayOfMonth))
  })

  it.each([
    { sourceString: '2024-11-06T00:00:00', newDayOfWeek: 3 },
    { sourceString: '2024-11-14T00:00:00', newDayOfWeek: 4 },
    { sourceString: '2024-02-03T13:14:15.678', newDayOfWeek: 6 },
  ])('day of week for "$sourceString" to "$newDayOfWeek"', ({ sourceString, newDayOfWeek }) => {
    expectSameResult((esday) => esday(sourceString).day(newDayOfWeek))
    expectSameResult((esday) => esday(sourceString).set('d', newDayOfWeek))
    expectSameResult((esday) => esday(sourceString).set('day', newDayOfWeek))
    expectSameResult((esday) => esday(sourceString).set('days', newDayOfWeek))
  })

  it('hour', () => {
    const newHour = 4

    expectSameResult((esday) => esday().hour(newHour))
    expectSameResult((esday) => esday().set('h', newHour))
    expectSameResult((esday) => esday().set('hour', newHour))
    expectSameResult((esday) => esday().set('hours', newHour))
  })

  it('minute', () => {
    const newMinute = 43

    expectSameResult((esday) => esday().minute(newMinute))
    expectSameResult((esday) => esday().set('m', newMinute))
    expectSameResult((esday) => esday().set('minute', newMinute))
    expectSameResult((esday) => esday().set('minutes', newMinute))
  })

  it('second', () => {
    const newSecond = 25

    expectSameResult((esday) => esday().second(newSecond))
    expectSameResult((esday) => esday().set('s', newSecond))
    expectSameResult((esday) => esday().set('second', newSecond))
    expectSameResult((esday) => esday().set('seconds', newSecond))
  })

  it('millisecond', () => {
    const newMillisecond = 25

    expectSameResult((esday) => esday().millisecond(newMillisecond))
    expectSameResult((esday) => esday().set('ms', newMillisecond))
    expectSameResult((esday) => esday().set('millisecond', newMillisecond))
    expectSameResult((esday) => esday().set('milliseconds', newMillisecond))
  })

  it('to year returns new instance', () => {
    const base = esday('2024-11-20T18:22:37.456Z')
    const year = base.year()
    const another = base.set('year', year + 1)

    expect(base.valueOf()).not.toBe(another.valueOf())
  })

  it('to month returns new instance', () => {
    const base = esday('2024-11-20T18:22:37.456Z')
    const month = base.month()
    const another = base.set('month', month + 1)

    expect(base.valueOf()).not.toBe(another.valueOf())
  })

  it('quarter without plugin quarter returns "now"', () => {
    expect(esday().set('Q', 3).format().slice(0, -6)).toBe('2024-07-17T13:24:46')
    expect(esday().set('quarter', 3).format().slice(0, -6)).toBe('2024-07-17T13:24:46')
    expect(esday().set('quarters', 3).format().slice(0, -6)).toBe('2024-07-17T13:24:46')
  })

  it('week without plugin week returns "now"', () => {
    expect(esday().set('w', 12).format().slice(0, -6)).toBe('2024-07-17T13:24:46')
    expect(esday().set('week', 12).format().slice(0, -6)).toBe('2024-07-17T13:24:46')
    expect(esday().set('weeks', 12).format().slice(0, -6)).toBe('2024-07-17T13:24:46')
  })

  it('set using an object without plugin ObjectSupport', () => {
    const value = { years: 1, months: 2, days: 3 } as UnitsObjectTypeSet
    const expected = '2024-07-17T13:24:46'

    expect(esday().set(value).format().slice(0, -6)).toBe(expected)
  })
})
