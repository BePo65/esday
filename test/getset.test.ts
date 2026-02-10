import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { esday } from '~/core'
import type { UnitsObjectTypeSet } from '~/types'
import { expectSameObject, expectSameValue, objectResultsAsJson } from './util'

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
    expectSameValue((esday) => esday().year())
    expectSameValue((esday) => esday().get('y'))
    expectSameValue((esday) => esday().get('year'))
    expectSameValue((esday) => esday().get('years'))
  })

  it('month', () => {
    expectSameValue((esday) => esday().month())
    expectSameValue((esday) => esday().get('M'))
    expectSameValue((esday) => esday().get('month'))
    expectSameValue((esday) => esday().get('months'))
  })

  it('day of month', () => {
    expectSameValue((esday) => esday().date())
    expectSameValue((esday) => esday().get('D'))
    expectSameValue((esday) => esday().get('date'))
    expectSameValue((esday) => esday().get('dates'))
  })

  it.each([
    { sourceString: '2024-02-03T13:14:15.678', expected: 6 },
    { sourceString: '2024-11-06T00:00:00', expected: 3 },
    { sourceString: '2024-11-14T00:00:00', expected: 4 },
  ])('day of week for "$sourceString"', ({ sourceString }) => {
    expectSameValue((esday) => esday(sourceString).day())
    expectSameValue((esday) => esday(sourceString).get('d'))
    expectSameValue((esday) => esday(sourceString).get('day'))
    expectSameValue((esday) => esday(sourceString).get('days'))
  })

  it('hour', () => {
    expectSameValue((esday) => esday().hour())
    expectSameValue((esday) => esday().get('h'))
    expectSameValue((esday) => esday().get('hour'))
    expectSameValue((esday) => esday().get('hours'))
  })

  it('minute', () => {
    expectSameValue((esday) => esday().minute())
    expectSameValue((esday) => esday().get('m'))
    expectSameValue((esday) => esday().get('minute'))
    expectSameValue((esday) => esday().get('minutes'))
  })

  it('second', () => {
    expectSameValue((esday) => esday().second())
    expectSameValue((esday) => esday().get('s'))
    expectSameValue((esday) => esday().get('second'))
    expectSameValue((esday) => esday().get('seconds'))
  })

  it('millisecond', () => {
    expectSameValue((esday) => esday().millisecond())
    expectSameValue((esday) => esday().get('ms'))
    expectSameValue((esday) => esday().get('millisecond'))
    expectSameValue((esday) => esday().get('milliseconds'))
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

    expectSameObject((esday) => esday().year(newYear))
    expectSameObject((esday) => esday().set('y', newYear))
    expectSameObject((esday) => esday().set('year', newYear))
    expectSameObject((esday) => esday().set('years', newYear))
  })

  it('year, month, day-of-month', () => {
    const newYear = 2025
    const newMonth = 9 // October
    const newDate = 23
    const esdaySet = esday().set('year', newYear, newMonth, newDate)
    const esdayParsed = esday(`${newYear}-${newMonth + 1}-${newDate}T13:24:46.234`)

    expect(objectResultsAsJson(esdaySet)).toEqual(objectResultsAsJson(esdayParsed))
  })

  it('month', () => {
    const newMonth = 5 // June

    expectSameObject((esday) => esday().month(newMonth))
    expectSameObject((esday) => esday().set('M', newMonth))
    expectSameObject((esday) => esday().set('month', newMonth))
    expectSameObject((esday) => esday().set('months', newMonth))
  })

  it('bubble up month', () => {
    const newMonth = 27

    expectSameObject((esday) => esday().set('month', newMonth))
  })

  it('month, day-of-month', () => {
    const newMonth = 5 // June
    const newDate = 23
    const esdaySet = esday().set('month', newMonth, newDate)
    const esdayParsed = esday(`2024-${newMonth + 1}-${newDate}T13:24:46.234`)

    expect(objectResultsAsJson(esdaySet)).toEqual(objectResultsAsJson(esdayParsed))
  })

  it('day of month', () => {
    const newDayOfMonth = 25

    expectSameObject((esday) => esday().date(newDayOfMonth))
    expectSameObject((esday) => esday().set('D', newDayOfMonth))
    expectSameObject((esday) => esday().set('date', newDayOfMonth))
    expectSameObject((esday) => esday().set('dates', newDayOfMonth))
  })

  it('bubble up day of month', () => {
    const newDate = 45

    expectSameObject((esday) => esday().set('date', newDate))
  })

  it.each([
    { sourceString: '2024-11-06T00:00:00', newDayOfWeek: 3 },
    { sourceString: '2024-11-14T00:00:00', newDayOfWeek: 4 },
    { sourceString: '2024-02-03T13:14:15.678', newDayOfWeek: 6 },
  ])('day of week for "$sourceString" to "$newDayOfWeek"', ({ sourceString, newDayOfWeek }) => {
    expectSameObject((esday) => esday(sourceString).day(newDayOfWeek))
    expectSameObject((esday) => esday(sourceString).set('d', newDayOfWeek))
    expectSameObject((esday) => esday(sourceString).set('day', newDayOfWeek))
    expectSameObject((esday) => esday(sourceString).set('days', newDayOfWeek))
  })

  it('hour', () => {
    const newHour = 4

    expectSameObject((esday) => esday().hour(newHour))
    expectSameObject((esday) => esday().set('h', newHour))
    expectSameObject((esday) => esday().set('hour', newHour))
    expectSameObject((esday) => esday().set('hours', newHour))
  })

  it('hour, minute, second, millisecond', () => {
    const newHour = 4
    const newMinute = 12
    const newSecond = 31
    const newMs = 987

    const esdaySet = esday().set('hour', newHour, newMinute, newSecond, newMs)
    const esdayParsed = esday(`2024-07-17T${newHour}:${newMinute}:${newSecond}.${newMs}`)

    expect(objectResultsAsJson(esdaySet)).toEqual(objectResultsAsJson(esdayParsed))
  })

  it('bubble up hour', () => {
    const newHour = 31

    expectSameObject((esday) => esday().set('hour', newHour))
  })

  it('minute', () => {
    const newMinute = 43

    expectSameObject((esday) => esday().minute(newMinute))
    expectSameObject((esday) => esday().set('m', newMinute))
    expectSameObject((esday) => esday().set('minute', newMinute))
    expectSameObject((esday) => esday().set('minutes', newMinute))
  })

  it('minute, second, millisecond', () => {
    const newMinute = 43
    const newSecond = 3
    const newMs = 564

    const esdaySet = esday().set('minute', newMinute, newSecond, newMs)
    const esdayParsed = esday(`2024-07-17T13:${newMinute}:${newSecond}.${newMs}`)

    expect(objectResultsAsJson(esdaySet)).toEqual(objectResultsAsJson(esdayParsed))
  })

  it('bubble up minute', () => {
    const newMinute = 131

    expectSameObject((esday) => esday().set('minute', newMinute))
  })

  it('second', () => {
    const newSecond = 25

    expectSameObject((esday) => esday().second(newSecond))
    expectSameObject((esday) => esday().set('s', newSecond))
    expectSameObject((esday) => esday().set('second', newSecond))
    expectSameObject((esday) => esday().set('seconds', newSecond))
  })

  it('second, millisecond', () => {
    const newSecond = 25
    const newMs = 5

    const esdaySet = esday().set('second', newSecond, newMs)
    const esdayParsed = esday(`2024-07-17T13:24:${newSecond}.${newMs}`)

    expect(objectResultsAsJson(esdaySet)).toEqual(objectResultsAsJson(esdayParsed))
  })

  it('bubble up second', () => {
    const newSecond = 131

    expectSameObject((esday) => esday().set('second', newSecond))
  })

  it('millisecond', () => {
    const newMillisecond = 25

    expectSameObject((esday) => esday().millisecond(newMillisecond))
    expectSameObject((esday) => esday().set('ms', newMillisecond))
    expectSameObject((esday) => esday().set('millisecond', newMillisecond))
    expectSameObject((esday) => esday().set('milliseconds', newMillisecond))
  })

  it('bubble up millisecond', () => {
    const newMillisecond = 1234

    expectSameObject((esday) => esday().set('ms', newMillisecond))
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
