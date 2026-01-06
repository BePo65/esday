import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { esday } from '~/core'
import objectSupportPlugin from '~/plugins/objectSupport'
import utcPlugin from '~/plugins/utc'
import { expectSameObject } from '../util'

esday.extend(utcPlugin).extend(objectSupportPlugin)

describe('objectSupport plugin with utc - default cases', () => {
  const fakeTimeAsString = '2025-07-17T03:24:46.234Z'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    {
      value: { y: 2024, M: 4, D: 14 },
      expected: '2024-05-14T00:00:00',
      description: 'y-M-D',
    },
    {
      value: { y: 2024, M: 4, d: 14 },
      expected: '2024-05-14T00:00:00',
      description: 'y-M-d',
    },
    {
      value: { y: 2024, M: 4, D: 14, h: 15, m: 13, s: 34 },
      expected: '2024-05-14T15:13:34',
      description: 'y-M-D-h-m-s',
    },
  ])('create date from object with short format "$description"', ({ value, expected }) => {
    expect(esday.utc(value).format().slice(0, -1)).toBe(expected)
    expectSameObject((esday) => esday.utc(value))
  })

  it.each([
    { value: { h: 14 }, expected: '14:00:00', description: 'h' },
    { value: { m: 25 }, expected: '00:25:00', description: 'm' },
    { value: { s: 36 }, expected: '00:00:36', description: 's' },
    {
      value: { h: 14, m: 25, s: 36 },
      expected: '14:25:36',
      description: 'h-m-s',
    },
  ])('create date from object with short format "$description"', ({ value, expected }) => {
    expect(esday.utc(value).format().slice(11, 19)).toBe(expected)
    expect(moment.utc(value).format().slice(11, 19)).toBe(expected)
  })

  it('create date from short format "ms"', () => {
    const value = { ms: 14 }

    expect(esday.utc(value).millisecond()).toBe(value.ms)
    expect(moment.utc(value).millisecond()).toBe(value.ms)
  })

  it.each([
    {
      value: { year: 2024, month: 4, day: 14 },
      expected: '2024-05-14T00:00:00',
      description: 'y-M-D',
    },
    {
      value: { year: 2024, month: 4, date: 14 },
      expected: '2024-05-14T00:00:00',
      description: 'y-M-d',
    },
    {
      value: {
        year: 2024,
        month: 4,
        day: 14,
        hour: 15,
        minute: 13,
        second: 34,
      },
      expected: '2024-05-14T15:13:34',
      description: 'y-M-D-h-m-s',
    },
    {
      value: {
        year: 2024,
        month: 4,
        date: 14,
        hour: 15,
        minute: 13,
        second: 34,
      },
      expected: '2024-05-14T15:13:34',
      description: 'y-M-d-h-m-s',
    },
  ])('create date from object with long format "$description"', ({ value, expected }) => {
    expect(esday.utc(value).format().slice(0, -1)).toBe(expected)
    expectSameObject((esday) => esday.utc(value))
  })

  it.each([
    { value: { hour: 14 }, expected: '14:00:00', description: 'h' },
    { value: { minute: 25 }, expected: '00:25:00', description: 'm' },
    { value: { second: 36 }, expected: '00:00:36', description: 's' },
    {
      value: { hour: 14, minute: 25, second: 36 },
      expected: '14:25:36',
      description: 'h-m-s',
    },
  ])('create date from object with long format "$description"', ({ value, expected }) => {
    expect(esday.utc(value).format().slice(11, 19)).toBe(expected)
    expect(moment.utc(value).format().slice(11, 19)).toBe(expected)
  })

  it('create date from long format "millisecond"', () => {
    const value = { millisecond: 14 }

    expect(esday.utc(value).millisecond()).toBe(value.millisecond)
    expect(moment.utc(value).millisecond()).toBe(value.millisecond)
  })

  it.each([
    {
      value: { years: 2024, months: 4, days: 14 },
      expected: '2024-05-14T00:00:00',
      description: 'y-M-D',
    },
    {
      value: { years: 2024, months: 4, dates: 14 },
      expected: '2024-05-14T00:00:00',
      description: 'y-M-d',
    },
    {
      value: {
        years: 2024,
        months: 4,
        days: 14,
        hours: 15,
        minutes: 13,
        seconds: 34,
      },
      expected: '2024-05-14T15:13:34',
      description: 'y-M-D-h-m-s',
    },
    {
      value: {
        years: 2024,
        months: 4,
        dates: 14,
        hours: 15,
        minutes: 13,
        seconds: 34,
      },
      expected: '2024-05-14T15:13:34',
      description: 'y-M-d-h-m-s',
    },
  ])('create date from object with plural format "$description"', ({ value, expected }) => {
    expect(esday.utc(value).format().slice(0, -1)).toBe(expected)
    expectSameObject((esday) => esday.utc(value))
  })

  it.each([
    { value: { hours: 14 }, expected: '14:00:00', description: 'h' },
    { value: { minutes: 25 }, expected: '00:25:00', description: 'm' },
    { value: { seconds: 36 }, expected: '00:00:36', description: 's' },
    {
      value: { hours: 14, minutes: 25, seconds: 36 },
      expected: '14:25:36',
      description: 'h-m-s',
    },
  ])('create date from object with plural format "$description"', ({ value, expected }) => {
    expect(esday.utc(value).format().slice(11, 19)).toBe(expected)
    expect(moment.utc(value).format().slice(11, 19)).toBe(expected)
  })

  it('create date from long plural "milliseconds"', () => {
    const value = { milliseconds: 14 }

    expect(esday.utc(value).millisecond()).toBe(value.milliseconds)
    expect(moment.utc(value).millisecond()).toBe(value.milliseconds)
  })

  it.each([
    { value: { years: 1 }, expected: '2026-07-17T03:24:46', description: 'y' },
    {
      value: { years: 1, month: 2 },
      expected: '2026-09-17T03:24:46',
      description: 'y-M',
    },
    {
      value: { years: 1, months: 2, days: 3 },
      expected: '2026-09-20T03:24:46',
      description: 'y-M-D',
    },
    { value: { hours: 1 }, expected: '2025-07-17T04:24:46', description: 'h' },
    {
      value: { hours: 1, minutes: 2 },
      expected: '2025-07-17T04:26:46',
      description: 'h-m',
    },
    {
      value: { hours: 1, minutes: 2, seconds: 3 },
      expected: '2025-07-17T04:26:49',
      description: 'h-m-s',
    },
    {
      value: { years: 1, months: 2, days: 3, hours: 1, minutes: 2, seconds: 3 },
      expected: '2026-09-20T04:26:49',
      description: 'all',
    },
    { value: {}, expected: '2025-07-17T03:24:46', description: 'none' },
  ])('add object ("$description")', ({ value, expected }) => {
    expect(esday.utc().add(value).format().slice(0, -1)).toBe(expected)
    expectSameObject((esday) => esday.utc().add(value))
  })

  it.each([
    { value: { years: 1 }, expected: '2024-07-17T03:24:46', description: 'y' },
    {
      value: { years: -1, month: 2 },
      expected: '2026-05-17T03:24:46',
      description: 'y-M',
    },
    {
      value: { years: 1, months: 2, days: -3 },
      expected: '2024-05-20T03:24:46',
      description: 'y-M-D',
    },
    { value: { hours: 1 }, expected: '2025-07-17T02:24:46', description: 'h' },
    {
      value: { hours: 1, minutes: -2 },
      expected: '2025-07-17T02:26:46',
      description: 'h-m',
    },
    {
      value: { hours: 1, minutes: 2, seconds: 3 },
      expected: '2025-07-17T02:22:43',
      description: 'h-m-s',
    },
    {
      value: { years: 1, months: 2, days: 3, hours: 1, minutes: 2, seconds: 3 },
      expected: '2024-05-14T02:22:43',
      description: 'all',
    },
    { value: {}, expected: '2025-07-17T03:24:46', description: 'none' },
  ])('subtract object ("$description")', ({ value, expected }) => {
    expect(esday.utc().subtract(value).format().slice(0, -1)).toBe(expected)
    expectSameObject((esday) => esday.utc().subtract(value))
  })

  it.each([
    {
      value: { year: 2024 },
      expected: '2024-07-17T03:24:46',
      description: 'y',
    },
    { value: { month: 5 }, expected: '2025-06-17T03:24:46', description: 'M' },
    { value: { date: 20 }, expected: '2025-07-20T03:24:46', description: 'D' },
    { value: { day: 3 }, expected: '2025-07-16T03:24:46', description: 'd' },
    {
      value: { year: 2026, month: 4 },
      expected: '2026-05-17T03:24:46',
      description: 'y-M',
    },
    {
      value: { year: 2024, month: 4, date: 20 },
      expected: '2024-05-20T03:24:46',
      description: 'y-M-D',
    },
    { value: { hour: 2 }, expected: '2025-07-17T02:24:46', description: 'h' },
    {
      value: { hour: 2, minute: 26 },
      expected: '2025-07-17T02:26:46',
      description: 'h-m',
    },
    {
      value: { hour: 2, minute: 22, second: 43 },
      expected: '2025-07-17T02:22:43',
      description: 'h-m-s',
    },
    {
      value: {
        year: 2024,
        month: 4,
        date: 14,
        hour: 2,
        minute: 22,
        second: 43,
      },
      expected: '2024-05-14T02:22:43',
      description: 'all',
    },
    { value: {}, expected: '2025-07-17T03:24:46', description: 'none' },
  ])('set object ("$description")', ({ value, expected }) => {
    expect(esday.utc().set(value).format().slice(0, -1)).toBe(expected)
    expectSameObject((esday) => esday.utc().set(value))
  })
})

describe('objectSupport plugin with utc - edge cases', () => {
  const fakeTimeAsString = '2025-07-17T23:59:00.000Z'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    {
      value: { y: 2024, M: 4, D: 14 },
      expected: '2024-05-14T00:00:00',
      description: 'y-M-D',
    },
    {
      value: { y: 2024, M: 4 },
      expected: '2024-05-01T00:00:00',
      description: 'y-M',
    },
    {
      value: { y: 2024, D: 14 },
      expected: '2024-01-14T00:00:00',
      description: 'y-D',
    },
    { value: { D: 14 }, expected: '2025-07-14T00:00:00', description: 'D' },
  ])('create date from object with short format "$description"', ({ value, expected }) => {
    expect(esday.utc(value).format().slice(0, -1)).toBe(expected)
    expectSameObject((esday) => esday.utc(value))
  })
})
