import { esday } from 'esday'
import moment, { type unitOfTime } from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { C } from '~/common'
import { INVALID_DATE_STRING } from '~/common/constants'
import durationPlugin, { type UnitTypeDuration } from '~/plugins/duration'
import { expectSameValue } from '../util'
import { expectSameDuration } from './duration-test-util'

esday.extend(durationPlugin)

describe('duration plugin - using default locale', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Create', () => {
    it('with no argument', () => {
      expectSameDuration((esday) => esday.duration())
      expect(esday.duration().isValid()).toBeTruthy()
    })

    it.each([
      { value: 1, unit: 'ms' },
      { value: 100, unit: 'millisecond' },
      { value: 1000, unit: 'milliseconds' },
      { value: '234', unit: 'milliseconds' },
      { value: 100, unit: undefined },
      { value: 1000, unit: undefined },
      { value: 73555760012, unit: undefined },
      { value: '123', unit: undefined },
    ])('from $value milliseconds', ({ value, unit }) => {
      expectSameDuration((esday) => esday.duration(value, unit as UnitTypeDuration))
      expect(esday.duration(value, unit as UnitTypeDuration).isValid()).toBeTruthy()
    })

    it.each([
      { value: 2 / 3, expected: 'PT0.001S' },
      { value: 1000.5, expected: 'PT1S' },
      { value: -1000.5, expected: '-PT1S' },
    ])('should round $value without unit to millisecond precision', ({ value, expected }) => {
      expectSameDuration((esday) => esday.duration(value))
      expect(esday.duration(value).isValid()).toBeTruthy()
      expect(esday.duration(value).toISOString()).toBe(expected)
    })

    it.each([
      { value: -2812, expected: '-PT2.812S' },
      { value: 3121632.27382247, expected: 'PT52M1.632S' },
      { value: 7647826.525774224, expected: 'PT2H7M27.827S' },
    ])('should handle floating point rounding errors for $value without unit', ({
      value,
      expected,
    }) => {
      // An example of this is when adding 2 to 0.812 seconds, which is how
      // the seconds component is calculated in .toISOString().
      // > 2 + 0.812
      // 2.8120000000000003
      expectSameDuration((esday) => esday.duration(value))
      expect(esday.duration(value).isValid()).toBeTruthy()
      expect(esday.duration(value).toISOString()).toBe(expected)
    })

    it.each([
      { value: 1, unit: 's' },
      { value: 100, unit: 'second' },
      { value: 1000, unit: 'seconds' },
      { value: '987', unit: 'seconds' },
    ])('from $value seconds', ({ value, unit }) => {
      expectSameDuration((esday) => esday.duration(value, unit as UnitTypeDuration))
      expect(esday.duration(value, unit as UnitTypeDuration).isValid()).toBeTruthy()
    })

    it.each([
      { value: 1, unit: 'm' },
      { value: 100, unit: 'minute' },
      { value: 1000, unit: 'minutes' },
      { value: '456', unit: 'minutes' },
    ])('from $value minutes', ({ value, unit }) => {
      expectSameDuration((esday) => esday.duration(value, unit as UnitTypeDuration))
      expect(esday.duration(value, unit as UnitTypeDuration).isValid()).toBeTruthy()
    })

    it.each([
      { value: 1, unit: 'h' },
      { value: 100, unit: 'hour' },
      { value: 1000, unit: 'hours' },
      { value: '27', unit: 'hours' },
    ])('from $value hours', ({ value, unit }) => {
      expectSameDuration((esday) => esday.duration(value, unit as UnitTypeDuration))
      expect(esday.duration(value, unit as UnitTypeDuration).isValid()).toBeTruthy()
    })

    it.each([
      { value: 1, unit: 'd' },
      { value: 100, unit: 'day' },
      { value: 1000, unit: 'days' },
      { value: '48', unit: 'days' },
    ])('from $value days', ({ value, unit }) => {
      expectSameDuration((esday) => esday.duration(value, unit as UnitTypeDuration))
      expect(esday.duration(value, unit as UnitTypeDuration).isValid()).toBeTruthy()
    })

    it.each([
      { value: 1, unit: 'w' },
      { value: 100, unit: 'week' },
      { value: 1000, unit: 'weeks' },
      { value: '43', unit: 'weeks' },
    ])('from $value weeks', ({ value, unit }) => {
      expectSameDuration((esday) => esday.duration(value, unit as UnitTypeDuration))
      expect(esday.duration(value, unit as UnitTypeDuration).isValid()).toBeTruthy()
    })

    it.each([
      { value: 1, unit: 'M' },
      { value: 100, unit: 'month' },
      { value: 1000, unit: 'months' },
      { value: '21', unit: 'months' },
    ])('from $value months', ({ value, unit }) => {
      expectSameDuration((esday) => esday.duration(value, unit as UnitTypeDuration))
      expect(esday.duration(value, unit as UnitTypeDuration).isValid()).toBeTruthy()
    })

    it.each([
      { value: 1, unit: 'y' },
      { value: 100, unit: 'year' },
      { value: 1000, unit: 'years' },
      { value: '123', unit: 'years' },
    ])('from $value years', ({ value, unit }) => {
      expectSameDuration((esday) => esday.duration(value, unit as UnitTypeDuration))
      expect(esday.duration(value, unit as UnitTypeDuration).isValid()).toBeTruthy()
    })

    it.each([
      { value: 61001, unit: 'ms', expected: 'PT1M1.001S' },
      { value: 59, unit: 's', expected: 'PT59S' },
      { value: 60, unit: 'second', expected: 'PT1M' },
      { value: 13213, unit: 'seconds', expected: 'PT3H40M13S' },
      { value: -59, unit: 's', expected: '-PT59S' },
      { value: -60, unit: 's', expected: '-PT1M' },
      { value: -13213, unit: 's', expected: '-PT3H40M13S' },
      { value: 350, unit: 'm', expected: 'PT5H50M' },
    ])('$value $unit exceeding unit range should bubble up to the next unit', ({
      value,
      unit,
      expected,
    }) => {
      expectSameDuration((esday) => esday.duration(value, unit as UnitTypeDuration))
      expect(esday.duration(value, unit as UnitTypeDuration).toISOString()).toBe(expected)
      expect(esday.duration(value, unit as UnitTypeDuration).isValid()).toBeTruthy()
    })

    it('from object with integers without weeks or quarters', () => {
      const durationDef = {
        seconds: 1,
        minutes: 2,
        hours: 3,
        days: 4,
        months: 6,
        years: 7,
      }
      const expected = 'P7Y6M4DT3H2M1S'

      expectSameDuration((esday) => esday.duration(durationDef))
      expect(esday.duration(durationDef).isValid()).toBeTruthy()
      expect(esday.duration(durationDef).toISOString()).toBe(expected)
    })

    it('from object with integers with weeks and quarters', () => {
      const durationDef = {
        seconds: 1,
        minutes: 2,
        hours: 3,
        days: 4,
        weeks: 5,
        months: 6,
        years: 8,
      }
      const expected = 'P8Y6M39DT3H2M1S'

      expectSameDuration((esday) => esday.duration(durationDef))
      expect(esday.duration(durationDef).isValid()).toBeTruthy()
      expect(esday.duration(durationDef).toISOString()).toBe(expected)
    })

    it('from valid object with floating point numbers', () => {
      const durationDef = {
        milliseconds: 1.1,
        seconds: 2,
        minutes: 3,
        hours: 4,
        days: 5,
        months: 7,
        years: 9,
      }
      const expected = 'P9Y7M5DT4H3M2.001S'

      expectSameDuration((esday) => esday.duration(durationDef))
      expect(esday.duration(durationDef).isValid()).toBeTruthy()
      expect(esday.duration(durationDef).toISOString()).toBe(expected)
    })

    it('from invalid object', () => {
      const durationDef = {
        milliseconds: 1.1,
        seconds: 1.1,
        minutes: 2.2,
        hours: 3.1,
        days: 4.3,
        weeks: 5.4,
        months: 6.5,
        quarters: 7.6,
        years: 8.7,
      }

      expectSameValue((esday) => esday.duration(durationDef).isValid())
      expect(esday.duration(durationDef).isValid()).toBeFalsy()
    })

    it('from object with strings', () => {
      const durationDef = {
        years: '2',
        months: '3',
        weeks: '2',
        days: '1',
        hours: '8',
        minutes: '9',
        seconds: '20',
        milliseconds: '12',
      }
      const expected = 'P2Y3M15DT8H9M20.012S'

      expectSameDuration((esday) => esday.duration(durationDef))
      expect(esday.duration(durationDef).isValid()).toBeTruthy()
      expect(esday.duration(durationDef).toISOString()).toBe(expected)
    })

    it('from object with millisecond', () => {
      const durationDef = {
        milliseconds: 1,
      }
      const expected = 'PT0.001S'

      expectSameDuration((esday) => esday.duration(durationDef))
      expect(esday.duration(durationDef).isValid()).toBeTruthy()
      expect(esday.duration(durationDef).toISOString()).toBe(expected)
    })

    it('from object with negative millisecond', () => {
      const durationDef = {
        milliseconds: -1,
      }
      const expected = '-PT0.001S'

      expectSameDuration((esday) => esday.duration(durationDef))
      expect(esday.duration(durationDef).isValid()).toBeTruthy()
      expect(esday.duration(durationDef).toISOString()).toBe(expected)
    })

    it('from object with short units as keys', () => {
      const durationDef = {
        s: 1,
        m: 2,
        h: 3,
        d: 4,
        w: 5,
        M: 6,
        y: 8,
      }
      const expected = 'P8Y6M39DT3H2M1S'

      expectSameDuration((esday) => esday.duration(durationDef))
      expect(esday.duration(durationDef).isValid()).toBeTruthy()
      expect(esday.duration(durationDef).toISOString()).toBe(expected)
    })

    it('from object with long units as keys', () => {
      const durationDef = {
        second: 1,
        minute: 2,
        hour: 3,
        day: 4,
        week: 5,
        month: 6,
        year: 8,
      }
      const expected = 'P8Y6M39DT3H2M1S'

      expectSameDuration((esday) => esday.duration(durationDef))
      expect(esday.duration(durationDef).isValid()).toBeTruthy()
      expect(esday.duration(durationDef).toISOString()).toBe(expected)
    })

    it('from object with mixed units as keys', () => {
      const durationDef = {
        second: 1,
        m: 2,
        hours: 3,
        day: 4,
        weeks: 5,
        month: 6,
        y: 8,
      }
      const expected = 'P8Y6M39DT3H2M1S'

      expectSameDuration((esday) => esday.duration(durationDef))
      expect(esday.duration(durationDef).isValid()).toBeTruthy()
      expect(esday.duration(durationDef).toISOString()).toBe(expected)
    })

    it('from object with duplicate key', () => {
      const durationDef = {
        second: 1,
        m: 2,
        minutes: 21,
        hours: 3,
        day: 4,
        d: 2,
        month: 6,
        y: 8,
      }
      const expected = 'P8Y6M2DT3H21M1S'

      expectSameDuration((esday) => esday.duration(durationDef))
      expect(esday.duration(durationDef).isValid()).toBeTruthy()
      expect(esday.duration(durationDef).toISOString()).toBe(expected)
    })

    it('from object with additional key', () => {
      const durationDef = {
        second: 1,
        m: 2,
        hours: 3,
        day: 4,
        weeks: 5,
        month: 6,
        y: 8,
        additional: 99,
      }
      const expected = 'P8Y6M39DT3H2M1S'

      expectSameDuration((esday) => esday.duration(durationDef))
      expect(esday.duration(durationDef).isValid()).toBeTruthy()
      expect(esday.duration(durationDef).toISOString()).toBe(expected)
    })

    it('from simple Duration instance', () => {
      const value = 65
      const unit = 'seconds'
      const expected = 'PT1M5S'
      const baseDuration = esday.duration(value, unit)

      expectSameDuration((esday) => esday.duration(esday.duration(value, unit)))
      expect(esday.duration(baseDuration).isValid()).toBeTruthy()
      expect(esday.duration(baseDuration).toISOString()).toBe(expected)
    })

    it('from lengthy Duration instance', () => {
      const value = 60 * 60 * 24 * 360 * 1e3
      const expected = 'PT8640H'
      const baseDuration = esday.duration(value)

      expectSameDuration((esday) => esday.duration(esday.duration(value)))
      expect(esday.duration(baseDuration).isValid()).toBeTruthy()
      expect(esday.duration(baseDuration).toISOString()).toBe(expected)
    })

    it('from complicated Duration instance', () => {
      const durationDef = {
        years: 2,
        months: 3,
        weeks: 4,
        days: 1,
        hours: 8,
        minutes: 9,
        seconds: 20,
        milliseconds: 12,
      }
      const expected = 'P2Y3M29DT8H9M20.012S'
      const baseDuration = esday.duration(durationDef)

      expectSameDuration((esday) => esday.duration(esday.duration(durationDef)))
      expect(esday.duration(baseDuration).isValid()).toBeTruthy()
      expect(esday.duration(baseDuration).toISOString()).toBe(expected)
    })

    it.each([
      { value: 'P7Y6M5W4DT3H2M1S', expected: 'P7Y6M39DT3H2M1S' },
      { value: '-P7Y6M5W4DT3H2M1S', expected: '-P7Y6M39DT3H2M1S' },
      { value: 'P7Y6M4DT3H2M1S', expected: 'P7Y6M4DT3H2M1S' },
      { value: 'PT2777H46M40S', expected: 'PT2777H46M40S' },
      { value: 'P2M3W4D', expected: 'P2M25D' },
      { value: 'P3W3D', expected: 'P24D' },
      { value: 'P1MT2H', expected: 'P1MT2H' },
      { value: 'PT1H', expected: 'PT1H' },
      { value: 'PT1M', expected: 'PT1M' },
      { value: 'P1M', expected: 'P1M' },
      { value: '-P60D', expected: '-P60D' },
      { value: '+P60D', expected: 'P60D' },
      { value: 'PT0.5S', expected: 'PT0.5S' },
      { value: 'PT0,5S', expected: 'PT0.5S' },
      { value: 'InvalidDuration', expected: 'P0D' },
    ])('from ISO string $value', ({ value, expected }) => {
      expectSameDuration((esday) => esday.duration(value))
      expect(esday.duration(value).isValid()).toBeTruthy()
      expect(esday.duration(value).toISOString()).toBe(expected)
    })

    it.each([
      { value: '00:00', expected: 'P0D' },
      { value: '00:00:00.000', expected: 'P0D' },
      { value: '06:45', expected: 'PT6H45M' },
      { value: '26:45', expected: 'PT26H45M' },
      { value: '-26:45', expected: '-PT26H45M' },
      { value: '26:45:25', expected: 'PT26H45M25S' },
      { value: '23:59:59.999', expected: 'PT23H59M59.999S' },
      { value: '-23:59:59.999', expected: '-PT23H59M59.999S' },
      { value: '7.23:59:59.999', expected: 'P7DT23H59M59.999S' },
      { value: '7 23:59:59.997', expected: 'P7DT23H59M59.997S' },
      { value: '7 26:45:25.123', expected: 'P7DT26H45M25.123S' },
      { value: '7 26:45:25.12', expected: 'P7DT26H45M25.12S' },
      { value: '7 26:45:25.7209999', expected: 'P7DT26H45M25.721S' },
      { value: '-7 23:59:59.997', expected: '-P7DT23H59M59.997S' },
      { value: '10675199.02:48:05.4775807', expected: 'P10675199DT2H48M5.478S' },
      { value: '-10675199.02:48:05.4775808', expected: '-P10675199DT2H48M5.478S' },
      { value: '+10675199.02:48:05.4775808', expected: 'P10675199DT2H48M5.478S' },
    ])('from ASP.NET style 24-hour $value', ({ value, expected }) => {
      expectSameDuration((esday) => esday.duration(value))
      expect(esday.duration(value).isValid()).toBeTruthy()
      expect(esday.duration(value).toISOString()).toBe(expected)
    })

    it('from null for duration of 0ms', () => {
      const value = null
      const expected = 'P0D'

      expectSameDuration((esday) => esday.duration(value))
      expect(esday.duration(value).isValid()).toBeTruthy()
      expect(esday.duration(value).toISOString()).toBe(expected)
    })

    it('from NaN for invalid duration', () => {
      const value = Number.NaN
      const expected = INVALID_DATE_STRING

      expectSameDuration((esday) => esday.duration(value))
      expectSameDuration((esday) => esday.duration(value, 'days'))
      expect(esday.duration(value).isValid()).toBeFalsy()
      expect(esday.duration(value).toISOString()).toBe(expected)
    })

    it.each([
      { value: 'P', expected: 'P0D' },
      { value: 'PT', expected: 'P0D' },
      { value: 'P1H', expected: 'P0D' },
      { value: 'P1D1Y', expected: 'P0D' },
      { value: 'PT.5S', expected: 'PT0.5S' },
      { value: 'PT1,S', expected: 'PT1S' },
      { value: 'PT1M0,,5S', expected: 'PT1M' },
    ])('from misformed ISO 8601 string $value', ({ value, expected }) => {
      expectSameDuration((esday) => esday.duration(value))
      expect(esday.duration(value).isValid()).toBeTruthy()
      expect(esday.duration(value).toISOString()).toBe(expected)
    })

    it.each([
      { def1: { milliseconds: 1000 }, def2: { seconds: 1 } },
      { def1: { seconds: 60 }, def2: { minutes: 1 } },
      { def1: { minutes: 60 }, def2: { hours: 1 } },
      { def1: { hours: 24 }, def2: { days: 1 } },
      { def1: { days: 7 }, def2: { weeks: 1 } },
      { def1: { days: 31 }, def2: { months: 1 } },
      { def1: { months: 12 }, def2: { years: 1 } },
    ])('from different definitions of same duration', () => {
      const durationDef1 = { seconds: 60 }
      const durationDef2 = { minutes: 1 }
      const esdayDuration1 = esday.duration(durationDef1)
      const esdayDuration2 = esday.duration(durationDef2)
      const esday1Values = {
        ms: esdayDuration1.milliseconds() + 0,
        s: esdayDuration1.seconds() + 0,
        m: esdayDuration1.minutes() + 0,
        h: esdayDuration1.hours() + 0,
        D: esdayDuration1.days() + 0,
        w: esdayDuration1.weeks() + 0,
        M: esdayDuration1.months() + 0,
        y: esdayDuration1.years() + 0,
      }
      const esday2Values = {
        ms: esdayDuration2.milliseconds() + 0,
        s: esdayDuration2.seconds() + 0,
        m: esdayDuration2.minutes() + 0,
        h: esdayDuration2.hours() + 0,
        D: esdayDuration2.days() + 0,
        w: esdayDuration2.weeks() + 0,
        M: esdayDuration2.months() + 0,
        y: esdayDuration2.years() + 0,
      }
      const momentDuration1 = moment.duration(durationDef1)
      const momentDuration2 = moment.duration(durationDef2)
      const moment1Values = {
        ms: momentDuration1.milliseconds() + 0,
        s: momentDuration1.seconds() + 0,
        m: momentDuration1.minutes() + 0,
        h: momentDuration1.hours() + 0,
        D: momentDuration1.days() + 0,
        w: momentDuration1.weeks() + 0,
        M: momentDuration1.months() + 0,
        y: momentDuration1.years() + 0,
      }
      const moment2Values = {
        ms: momentDuration2.milliseconds() + 0,
        s: momentDuration2.seconds() + 0,
        m: momentDuration2.minutes() + 0,
        h: momentDuration2.hours() + 0,
        D: momentDuration2.days() + 0,
        w: momentDuration2.weeks() + 0,
        M: momentDuration2.months() + 0,
        y: momentDuration2.years() + 0,
      }

      expect(esday1Values).toEqual(esday2Values)
      expect(moment1Values).toEqual(moment2Values)
    })

    it('effective equivalency for seconds / milliseconds', () => {
      const d1 = esday.duration({ seconds: 1 })
      const d2 = esday.duration({ milliseconds: 1000 })

      expect(esday.isDuration(d1)).toBe(esday.isDuration(d2))
      expect(d1.isValid()).toBe(d2.isValid())
      expect(d1.toISOString()).toBe(d2.toISOString())
    })

    it('effective equivalency for minutes / seconds', () => {
      const d1 = esday.duration({ seconds: 60 })
      const d2 = esday.duration({ minutes: 1 })

      expect(esday.isDuration(d1)).toBe(esday.isDuration(d2))
      expect(d1.isValid()).toBe(d2.isValid())
      expect(d1.toISOString()).toBe(d2.toISOString())
    })

    it('effective equivalency for hours / minutes', () => {
      const d1 = esday.duration({ minutes: 60 })
      const d2 = esday.duration({ hours: 1 })

      expect(esday.isDuration(d1)).toBe(esday.isDuration(d2))
      expect(d1.isValid()).toBe(d2.isValid())
      expect(d1.toISOString()).toBe(d2.toISOString())
    })

    it('effective equivalency for days / hours', () => {
      const d1 = esday.duration({ hours: 24 })
      const d2 = esday.duration({ days: 1 })

      expect(esday.isDuration(d1)).toBe(esday.isDuration(d2))
      expect(d1.isValid()).toBe(d2.isValid())
      expect(d1.asMilliseconds()).toBe(d2.asMilliseconds())
    })

    it('effective equivalency for weeks / days', () => {
      const d1 = esday.duration({ days: 7 })
      const d2 = esday.duration({ weeks: 1 })

      expect(esday.isDuration(d1)).toBe(esday.isDuration(d2))
      expect(d1.isValid()).toBe(d2.isValid())
      expect(d1.toISOString()).toBe(d2.toISOString())
    })

    it('effective equivalency for months / days', () => {
      const d1 = esday.duration({ days: 30 })
      const d2 = esday.duration({ months: 1 })

      expect(esday.isDuration(d1)).toBe(esday.isDuration(d2))
      expect(d1.isValid()).toBe(d2.isValid())
      expect(d1.asMilliseconds()).toBe(d2.asMilliseconds())
    })

    it('effective equivalency for years / months', () => {
      const d1 = esday.duration({ months: 12 })
      const d2 = esday.duration({ years: 1 })

      expect(esday.isDuration(d1)).toBe(esday.isDuration(d2))
      expect(d1.isValid()).toBe(d2.isValid())
      expect(d1.toISOString()).toBe(d2.toISOString())
    })
  })

  describe('Clone', () => {
    it('should clone simple duration', () => {
      const value = 65
      const unit = 'seconds'
      const originalDuration = esday.duration(value, unit)
      const clonedDuration = originalDuration.clone()

      expect(originalDuration.isValid()).toBeTruthy()
      expect(clonedDuration.isValid()).toBeTruthy()
      expect(originalDuration.toISOString()).toBe(clonedDuration.toISOString())
      expect(originalDuration.milliseconds()).toBe(clonedDuration.milliseconds())
    })

    it('should clone lengthy duration', () => {
      const value = 60 * 60 * 24 * 360 * 1e3
      const originalDuration = esday.duration(value)
      const clonedDuration = originalDuration.clone()

      expect(originalDuration.isValid()).toBeTruthy()
      expect(clonedDuration.isValid()).toBeTruthy()
      expect(originalDuration.toISOString()).toBe(clonedDuration.toISOString())
      expect(originalDuration.milliseconds()).toBe(clonedDuration.milliseconds())
    })

    it('should clone complicated duration', () => {
      const durationDef = {
        years: 2,
        months: 3,
        weeks: 4,
        days: 1,
        hours: 8,
        minutes: 9,
        seconds: 20,
        milliseconds: 12,
      }
      const originalDuration = esday.duration(durationDef)
      const clonedDuration = originalDuration.clone()

      expect(originalDuration.isValid()).toBeTruthy()
      expect(clonedDuration.isValid()).toBeTruthy()
      expect(originalDuration.toISOString()).toBe(clonedDuration.toISOString())
      expect(originalDuration.milliseconds()).toBe(clonedDuration.milliseconds())
    })
  })

  describe('Get', () => {
    it.each([
      { unit: 'ms' },
      { unit: 'millisecond' },
      { unit: 'milliseconds' },
      { unit: 's' },
      { unit: 'second' },
      { unit: 'seconds' },
      { unit: 'm' },
      { unit: 'minute' },
      { unit: 'minutes' },
      { unit: 'h' },
      { unit: 'hour' },
      { unit: 'hours' },
      { unit: 'd' },
      { unit: 'day' },
      { unit: 'days' },
      { unit: 'w' },
      { unit: 'week' },
      { unit: 'weeks' },
      { unit: 'M' },
      { unit: 'month' },
      { unit: 'months' },
      { unit: 'y' },
      { unit: 'year' },
      { unit: 'years' },
    ])('value using unit $unit', ({ unit }) => {
      const durationDefinition = {
        milliseconds: 123,
        seconds: 1,
        minutes: 2,
        hours: 3,
        days: 4,
        weeks: 5,
        months: 6,
        years: 8,
      }

      expectSameValue((esday) => esday.duration(durationDefinition).get(unit as UnitTypeDuration))
      expect(esday.duration(durationDefinition).isValid()).toBeTruthy()
    })

    // moment.js does not know 'quarters'
    it.each([
      { unit: 'Q' },
      { unit: 'quarter' },
      { unit: 'quarters' },
    ])('value using unit $unit available in  esday only', ({ unit }) => {
      const durationDefinition = {
        months: 8,
        quarters: 7,
      }
      const expected = 1 // 7Q+8M=29M=2Y+1Q and 5M

      expect(esday.duration(durationDefinition).isValid()).toBeTruthy()
      expect(esday.duration(durationDefinition).get(unit as UnitTypeDuration)).toBe(expected)
    })

    it('asYears', () => {
      const value = 1
      const unit = 'year'
      const expected = 1
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asYears())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asYears()).toBe(expected)
    })

    it('years', () => {
      const value = { y: 5, M: 3, w: 2, d: 1 }
      const expected = 5
      const esdayDuration = esday.duration(value)

      expectSameValue((esday) => esday.duration(value).years())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.years()).toBe(expected)
    })

    it('asQuarters', () => {
      const value = 1
      const unit = 'year'
      const expected = 4
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asYears())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asQuarters()).toBe(expected)
    })

    it.each([
      { value: { Q: 3, M: 2 }, expectedM: 11, expectedQ: 3, expectedY: 0, description: 'P3Q2M' },
      { value: { Q: 4, M: 2 }, expectedM: 2, expectedQ: 0, expectedY: 1, description: 'P4Q2M' },
      { value: { Q: 5, M: 2 }, expectedM: 5, expectedQ: 1, expectedY: 1, description: 'P5Q2M' },
      { value: { Q: 1, M: 4 }, expectedM: 7, expectedQ: 2, expectedY: 0, description: 'P1Q4M' },
    ])('quarters of $description', ({ value, expectedM, expectedQ, expectedY }) => {
      const esdayDuration = esday.duration(value)

      // .quarters() is not available in moment.js)
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.months()).toBe(expectedM)
      expect(esdayDuration.quarters()).toBe(expectedQ)
      expect(esdayDuration.years()).toBe(expectedY)
    })

    it.each([
      { value: 1, unit: 'year', expected: 12 },
      { value: 400, unit: 'year', expected: 4_800 },
    ])('$value $unit asMonths', ({ value, unit, expected }) => {
      const typedUnit = unit as UnitTypeDuration
      const esdayDuration = esday.duration(value, typedUnit)

      expectSameValue((esday) => esday.duration(value, typedUnit).asMonths())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMonths()).toBe(expected)
    })

    it.each([
      {
        value: { M: 2 },
        expectedM: 2,
        expectedQ: 0,
        expectedY: 0,
        description: 'P2M',
      },
      {
        value: { M: 3 },
        expectedM: 3,
        expectedQ: 1,
        expectedY: 0,
        description: 'P3M',
      },
      {
        value: { M: 4 },
        expectedM: 4,
        expectedQ: 1,
        expectedY: 0,
        description: 'P4M',
      },
      {
        value: { M: 13 },
        expectedM: 1,
        expectedQ: 0,
        expectedY: 1,
        description: 'P13M',
      },
      {
        value: { Q: 1, M: 4, d: 1 },
        expectedM: 7,
        expectedQ: 2,
        expectedY: 0,
        description: 'P1Q4M1D',
      },
      {
        value: { y: 5, M: 3, w: 2, d: 1 },
        expectedM: 3,
        expectedQ: 1,
        expectedY: 5,
        description: 'P5Y32W1D',
      },
    ])('months of $description', ({ value, expectedM, expectedQ, expectedY }) => {
      const esdayDuration = esday.duration(value)

      expectSameValue((esday) => esday.duration(value).months())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.quarters()).toBe(expectedQ)
      expect(esdayDuration.months()).toBe(expectedM)
      expect(esdayDuration.years()).toBe(expectedY)
    })

    it('1 year asWeeks', () => {
      const value = 1
      const unit = 'year'
      const expected = 52.143
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asWeeks())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asWeeks().toFixed(3)).toBeCloseTo(expected, 3)
    })

    it.each([
      { value: { w: 0, d: 6 }, expectedD: 6, expectedW: 0, expectedM: 0, description: 'P6D' },
      { value: { w: 0, d: 7 }, expectedD: 7, expectedW: 1, expectedM: 0, description: 'P7D' },
      { value: { w: 3 }, expectedD: 21, expectedW: 3, expectedM: 0, description: 'P3W' },
      { value: { w: 4 }, expectedD: 28, expectedW: 4, expectedM: 0, description: 'P4W' },
      { value: { w: 5 }, expectedD: 4, expectedW: 0, expectedM: 1, description: 'P5W' },
      {
        value: { y: 5, M: 3, w: 2, d: 5 },
        expectedD: 19,
        expectedW: 2,
        expectedM: 3,
        description: 'P5Y3M2W5D',
      },
    ])('weeks of $description', ({ value, expectedD, expectedW, expectedM }) => {
      const esdayDuration = esday.duration(value)

      expectSameValue((esday) => esday.duration(value).weeks())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.days()).toBe(expectedD)
      expect(esdayDuration.weeks()).toBe(expectedW)
      expect(esdayDuration.months()).toBe(expectedM)
    })

    it.each([
      { value: 1, unit: 'year', expected: 365 },
      { value: 2, unit: 'years', expected: 730 },
      { value: 3, unit: 'year', expected: 1_096 },
      { value: 4, unit: 'y', expected: 1_461 },
      { value: 400, unit: 'years', expected: 146_097 },
    ])('$value $unit asDays', ({ value, unit, expected }) => {
      const typedUnit = unit as UnitTypeDuration
      const esdayDuration = esday.duration(value, typedUnit)

      expectSameValue((esday) => esday.duration(value, typedUnit).asDays())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asDays()).toBe(expected)
    })

    it.each([
      { value: { y: 5, M: 3, d: 8 }, expected: 8, description: 'P1Y3M8D' },
      { value: { y: 5, M: 3, d: 30 }, expected: 30, description: 'P1Y3M2W30D' },
      { value: { y: 5, M: 3, d: 31 }, expected: 0, description: 'P1Y3M2W31D' },
      { value: { y: 5, M: 3, d: 35 }, expected: 4, description: 'P1Y3M2W35D' },
      { value: { y: 5, M: 3, w: 2, d: 8 }, expected: 22, description: 'P1Y3M2W8D' },
    ])('days of $description', ({ value, expected }) => {
      const esdayDuration = esday.duration(value)

      expectSameValue((esday) => esday.duration(value).days())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.days()).toBe(expected)
    })

    it('1 year asHours', () => {
      const value = 1
      const unit = 'year'
      const expected = 8_760
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asHours())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asHours()).toBe(expected)
    })

    it('hours', () => {
      const value = { h: 8, m: 7, s: 6, ms: 5 }
      const expected = 8
      const esdayDuration = esday.duration(value)

      expectSameValue((esday) => esday.duration(value).hours())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.hours()).toBe(expected)
    })

    it('1 year asMinutes', () => {
      const value = 1
      const unit = 'year'
      const expected = 525_600
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMinutes())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMinutes()).toBe(expected)
    })

    it('minutes', () => {
      const value = { h: 8, m: 7, s: 6, ms: 5 }
      const expected = 7
      const esdayDuration = esday.duration(value)

      expectSameValue((esday) => esday.duration(value).minutes())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.minutes()).toBe(expected)
    })

    it('1 year asSeconds', () => {
      const value = 1
      const unit = 'year'
      const expected = 31_536_000
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asSeconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asSeconds()).toBe(expected)
    })

    it('seconds', () => {
      const value = { h: 8, m: 7, s: 6, ms: 5 }
      const expected = 6
      const esdayDuration = esday.duration(value)

      expectSameValue((esday) => esday.duration(value).seconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.seconds()).toBe(expected)
    })

    it('1 year asMilliseconds', () => {
      const value = 1
      const unit = 'year'
      const expected = 31_536_000_000
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMilliseconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMilliseconds()).toBe(expected)
    })

    it('milliseconds', () => {
      const value = { h: 8, m: 7, s: 6, ms: 5 }
      const expected = 5
      const esdayDuration = esday.duration(value)

      expectSameValue((esday) => esday.duration(value).milliseconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.milliseconds()).toBe(expected)
    })

    it('1 quarter asYears', () => {
      const value = 1
      const unit = 'quarter'
      const expected = 0.25
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asYears())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asYears()).toBe(expected)
    })

    it('1 quarter asQuarters', () => {
      const value = 1
      const unit = 'quarter'
      const expected = 1
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asQuarters())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asQuarters()).toBe(expected)
    })

    it('1 quarter asMonths', () => {
      const value = 1
      const unit = 'quarter'
      const expected = 3
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMonths())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMonths()).toBe(expected)
    })

    it('2 quarters asWeeks', () => {
      const value = 2
      const unit = 'quarter'
      const expected = 26.143
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asWeeks())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asWeeks().toFixed(3)).toBeCloseTo(expected, 3)
    })

    it.each([
      { value: 1, unit: 'quarter', expected: 91 },
      { value: 2, unit: 'quarters', expected: 183 },
      { value: 3, unit: 'quarters', expected: 274 },
      { value: 4, unit: 'quarters', expected: 365 },
    ])('$value $unit asDays', ({ value, unit, expected }) => {
      const typedUnit = unit as UnitTypeDuration
      const esdayDuration = esday.duration(value, typedUnit)

      expectSameValue((esday) => esday.duration(value, typedUnit).asDays())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asDays()).toBe(expected)
    })

    it.each([
      { value: 1, unit: 'quarter', expected: 2_184 },
      { value: 3, unit: 'quarters', expected: 6_576 },
    ])('$value $unit asHours', ({ value, unit, expected }) => {
      const typedUnit = unit as UnitTypeDuration
      const esdayDuration = esday.duration(value, typedUnit)

      expectSameValue((esday) => esday.duration(value, typedUnit).asHours())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asHours()).toBe(expected)
    })

    it('2 quarters asMinutes', () => {
      const value = 2
      const unit = 'quarter'
      const expected = 263_520
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMinutes())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMinutes()).toBe(expected)
    })

    it('3 quarters asSeconds', () => {
      const value = 3
      const unit = 'quarter'
      const expected = 23_673_600
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asSeconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asSeconds()).toBe(expected)
    })

    it('1 quarter asMilliseconds', () => {
      const value = 3
      const unit = 'quarter'
      const expected = 23_673_600_000
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMilliseconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMilliseconds()).toBe(expected)
    })

    it('1 month asYears', () => {
      const value = 1
      const unit = 'month'
      const expected = 0.0833
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asYears())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asYears().toFixed(4)).toBeCloseTo(expected, 4)
    })

    it('6 months asQuarters', () => {
      const value = 6
      const unit = 'months'
      const expected = 2
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asQuarters())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asQuarters()).toBe(expected)
    })

    it('1 month asMonths', () => {
      const value = 1
      const unit = 'month'
      const expected = 1
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMonths())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMonths()).toBe(expected)
    })

    it('1 month asWeeks', () => {
      const value = 1
      const unit = 'month'
      const expected = 4.286
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asWeeks())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asWeeks().toFixed(3)).toBeCloseTo(expected, 3)
    })

    it.each([
      { value: 1, unit: 'month', expected: 30 },
      { value: 2, unit: 'months', expected: 61 },
      { value: 3, unit: 'months', expected: 91 },
      { value: 4, unit: 'months', expected: 122 },
      { value: 5, unit: 'months', expected: 152 },
      { value: 6, unit: 'months', expected: 183 },
      { value: 7, unit: 'months', expected: 213 },
      { value: 8, unit: 'months', expected: 243 },
      { value: 9, unit: 'months', expected: 274 },
      { value: 10, unit: 'months', expected: 304 },
      { value: 11, unit: 'months', expected: 335 },
      { value: 12, unit: 'months', expected: 365 },
      { value: 24, unit: 'months', expected: 730 },
      { value: 36, unit: 'months', expected: 1_096 },
      { value: 48, unit: 'months', expected: 1_461 },
      { value: 4800, unit: 'months', expected: 146_097 },
    ])('$value $unit asDays', ({ value, unit, expected }) => {
      const typedUnit = unit as UnitTypeDuration
      const esdayDuration = esday.duration(value, typedUnit)

      expectSameValue((esday) => esday.duration(value, typedUnit).asDays())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asDays()).toBe(expected)
    })

    it('1 month asHours', () => {
      const value = 1
      const unit = 'month'
      const expected = 720
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asHours())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asHours()).toBe(expected)
    })

    it('1 month asMinutes', () => {
      const value = 1
      const unit = 'month'
      const expected = 43_200
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMinutes())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMinutes()).toBe(expected)
    })

    it('1 month asSeconds', () => {
      const value = 1
      const unit = 'month'
      const expected = 2_592_000
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asSeconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asSeconds()).toBe(expected)
    })

    it('1 month asMilliseconds', () => {
      const value = 1
      const unit = 'month'
      const expected = 2_592_000_000
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMilliseconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMilliseconds()).toBe(expected)
    })

    it('1 week asYears', () => {
      const value = 1
      const unit = 'week'
      const expected = 0.0192
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asYears())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asYears().toFixed(4)).toBeCloseTo(expected, 4)
    })

    it('1 week asQuarters', () => {
      const value = 1
      const unit = 'week'
      const expected = 0.0767
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asQuarters())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asQuarters().toFixed(4)).toBeCloseTo(expected, 4)
    })

    it('1 week asMonths', () => {
      const value = 1
      const unit = 'week'
      const expected = 0.23
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMonths())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMonths().toFixed(2)).toBeCloseTo(expected, 2)
    })

    it('1 week asWeeks', () => {
      const value = 1
      const unit = 'week'
      const expected = 1
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asWeeks())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asWeeks()).toBe(expected)
    })

    it('1 week asDays', () => {
      const value = 1
      const unit = 'week'
      const expected = 7
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asDays())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asDays()).toBe(expected)
    })

    it('1 week asHours', () => {
      const value = 1
      const unit = 'week'
      const expected = 168
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asHours())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asHours()).toBe(expected)
    })

    it('1 week asMinutes', () => {
      const value = 1
      const unit = 'week'
      const expected = 10_080
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMinutes())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMinutes()).toBe(expected)
    })

    it('1 week asSeconds', () => {
      const value = 1
      const unit = 'week'
      const expected = 604_800
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asSeconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asSeconds()).toBe(expected)
    })

    it('1 week asMilliseconds', () => {
      const value = 1
      const unit = 'week'
      const expected = 604_800_000
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMilliseconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMilliseconds()).toBe(expected)
    })

    it('1 day asYears', () => {
      const value = 1
      const unit = 'day'
      const expected = 0.0027
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asYears())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asYears().toFixed(4)).toBeCloseTo(expected, 4)
    })

    it('1 day asQuarters', () => {
      const value = 1
      const unit = 'day'
      const expected = 0.011
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asQuarters())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asQuarters().toFixed(3)).toBeCloseTo(expected, 3)
    })

    it('1 day asMonths', () => {
      const value = 1
      const unit = 'day'
      const expected = 0.033
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMonths())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMonths().toFixed(3)).toBeCloseTo(expected, 3)
    })

    it('1 day asWeeks', () => {
      const value = 1
      const unit = 'day'
      const expected = 0.143
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asWeeks())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asWeeks().toFixed(3)).toBeCloseTo(expected, 3)
    })

    it('1 day asDays', () => {
      const value = 1
      const unit = 'day'
      const expected = 1
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asDays())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asDays()).toBe(expected)
    })

    it('1 day asHours', () => {
      const value = 1
      const unit = 'day'
      const expected = 24
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asHours())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asHours()).toBe(expected)
    })

    it('1 day asMinutes', () => {
      const value = 1
      const unit = 'day'
      const expected = 1_440
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMinutes())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMinutes()).toBe(expected)
    })

    it('1 day asSeconds', () => {
      const value = 1
      const unit = 'day'
      const expected = 86_400
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asSeconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asSeconds()).toBe(expected)
    })

    it('1 day asMilliseconds', () => {
      const value = 1
      const unit = 'day'
      const expected = 86_400_000
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMilliseconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMilliseconds()).toBe(expected)
    })

    it('1 hour asYears', () => {
      const value = 1
      const unit = 'hour'
      const expected = 0.000114
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asYears())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asYears().toFixed(6)).toBeCloseTo(expected, 6)
    })

    it('1 hour asQuarters', () => {
      const value = 1
      const unit = 'hour'
      const expected = 0.000456
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asQuarters())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asQuarters().toFixed(6)).toBeCloseTo(expected, 6)
    })

    it('1 hour asMonths', () => {
      const value = 1
      const unit = 'hour'
      const expected = 0.00137
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMonths())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMonths().toFixed(5)).toBeCloseTo(expected, 5)
    })

    it('1 hour asWeeks', () => {
      const value = 1
      const unit = 'hour'
      const expected = 0.00595
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asWeeks())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asWeeks().toFixed(5)).toBeCloseTo(expected, 5)
    })

    it('1 hour asDays', () => {
      const value = 1
      const unit = 'hour'
      const expected = 0.0417
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asDays())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asDays().toFixed(4)).toBeCloseTo(expected, 4)
    })

    it('1 hour asHours', () => {
      const value = 1
      const unit = 'hour'
      const expected = 1
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asHours())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asHours()).toBe(expected)
    })

    it('1 hour asMinutes', () => {
      const value = 1
      const unit = 'hour'
      const expected = 60
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMinutes())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMinutes()).toBe(expected)
    })

    it('1 hour asSeconds', () => {
      const value = 1
      const unit = 'hour'
      const expected = 3_600
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asSeconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asSeconds()).toBe(expected)
    })

    it('1 hour asMilliseconds', () => {
      const value = 1
      const unit = 'hour'
      const expected = 3_600_000
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMilliseconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMilliseconds()).toBe(expected)
    })

    it('1 minute asYears', () => {
      const value = 1
      const unit = 'minute'
      const expected = 0.0000019
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asYears())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asYears().toFixed(8)).toBeCloseTo(expected, 8)
    })

    it('1 minute asQuarters', () => {
      const value = 1
      const unit = 'minute'
      const expected = 0.00000761
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asQuarters())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asQuarters().toFixed(8)).toBeCloseTo(expected, 8)
    })

    it('1 minute asMonths', () => {
      const value = 1
      const unit = 'minute'
      const expected = 0.0000228
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMonths())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMonths().toFixed(7)).toBeCloseTo(expected, 7)
    })

    it('1 minute asWeeks', () => {
      const value = 1
      const unit = 'minute'
      const expected = 0.0000992
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asWeeks())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asWeeks().toFixed(7)).toBeCloseTo(expected, 7)
    })

    it('1 minute asDays', () => {
      const value = 1
      const unit = 'minute'
      const expected = 0.000694
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asDays())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asDays().toFixed(6)).toBeCloseTo(expected, 6)
    })

    it('1 minute asHours', () => {
      const value = 1
      const unit = 'minute'
      const expected = 0.0167
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asHours())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asHours().toFixed(4)).toBeCloseTo(expected, 4)
    })

    it('1 minute asMinutes', () => {
      const value = 1
      const unit = 'minute'
      const expected = 1
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMinutes())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMinutes()).toBe(expected)
    })

    it('1 minute asSeconds', () => {
      const value = 1
      const unit = 'minute'
      const expected = 60
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asSeconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asSeconds()).toBe(expected)
    })

    it('1 minute asMilliseconds', () => {
      const value = 1
      const unit = 'minute'
      const expected = 60_000
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMilliseconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMilliseconds()).toBe(expected)
    })

    it('1 second asYears', () => {
      const value = 1
      const unit = 'second'
      const expected = 0.0000000317
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asYears())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asYears().toFixed(10)).toBeCloseTo(expected, 10)
    })

    it('1 second asQuarters', () => {
      const value = 1
      const unit = 'second'
      const expected = 0.0000001268
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asQuarters())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asQuarters().toFixed(10)).toBeCloseTo(expected, 10)
    })

    it('1 second asMonths', () => {
      const value = 1
      const unit = 'second'
      const expected = 0.00000038
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMonths())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMonths().toFixed(9)).toBeCloseTo(expected, 9)
    })

    it('1 second asWeeks', () => {
      const value = 1
      const unit = 'second'
      const expected = 0.00000165
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asWeeks())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asWeeks().toFixed(8)).toBeCloseTo(expected, 8)
    })

    it('1 second asDays', () => {
      const value = 1
      const unit = 'second'
      const expected = 0.0000116
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asDays())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asDays().toFixed(7)).toBeCloseTo(expected, 7)
    })

    it('1 second asHours', () => {
      const value = 1
      const unit = 'second'
      const expected = 0.000278
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asHours())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asHours().toFixed(6)).toBeCloseTo(expected, 6)
    })

    it('1 second asMinutes', () => {
      const value = 1
      const unit = 'second'
      const expected = 0.0167
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMinutes())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMinutes().toFixed(4)).toBeCloseTo(expected, 4)
    })

    it('1 second asSeconds', () => {
      const value = 1
      const unit = 'second'
      const expected = 1
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asSeconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asSeconds()).toBe(expected)
    })

    it('1 second asMilliseconds', () => {
      const value = 1
      const unit = 'second'
      const expected = 1_000
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMilliseconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMilliseconds()).toBe(expected)
    })

    it('1 millisecond asYears', () => {
      const value = 1
      const unit = 'millisecond'
      const expected = 0.0000000000317
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asYears())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asYears().toFixed(13)).toBeCloseTo(expected, 13)
    })

    it('1 millisecond asQuarters', () => {
      const value = 1
      const unit = 'millisecond'
      const expected = 0.0000000001268
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asQuarters())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asQuarters().toFixed(13)).toBeCloseTo(expected, 13)
    })

    it('1 millisecond asMonths', () => {
      const value = 1
      const unit = 'millisecond'
      const expected = 0.00000000038
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMonths())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMonths().toFixed(12)).toBeCloseTo(expected, 12)
    })

    it('1 millisecond asWeeks', () => {
      const value = 1
      const unit = 'millisecond'
      const expected = 0.00000000165
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asWeeks())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asWeeks().toFixed(11)).toBeCloseTo(expected, 11)
    })

    it('1 millisecond asDays', () => {
      const value = 1
      const unit = 'millisecond'
      const expected = 0.0000000116
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asDays())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asDays().toFixed(10)).toBeCloseTo(expected, 10)
    })

    it('1 millisecond asHours', () => {
      const value = 1
      const unit = 'millisecond'
      const expected = 0.000000278
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asHours())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asHours().toFixed(7)).toBeCloseTo(expected, 7)
    })

    it('1 millisecond asMinutes', () => {
      const value = 1
      const unit = 'millisecond'
      const expected = 0.0000167
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMinutes())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMinutes().toFixed(7)).toBeCloseTo(expected, 7)
    })

    it('1 millisecond asSeconds', () => {
      const value = 1
      const unit = 'millisecond'
      const expected = 0.001
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asSeconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asSeconds().toFixed(3)).toBeCloseTo(expected, 3)
    })

    it('1 millisecond asMilliseconds', () => {
      const value = 1
      const unit = 'millisecond'
      const expected = 1
      const esdayDuration = esday.duration(value, unit)

      expectSameValue((esday) => esday.duration(value, unit).asMilliseconds())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.asMilliseconds()).toBe(expected)
    })

    it.each([
      { value: 2.3, expected: 18 },
      { value: 4.1, expected: 6 },
    ])('minutes from floating point hour $value', ({ value, expected }) => {
      const esdayDuration = esday.duration(value, 'h')

      expectSameValue((esday) => esday.duration(value, 'h').minutes())
      expect(esdayDuration.isValid()).toBeTruthy()
      expect(esdayDuration.minutes()).toBe(expected)
    })

    it.each([
      { value: 500, expected: 0 },
      { value: 1500, expected: 1 },
      { value: 15000, expected: 15 },
      { value: 61000, expected: 1 }, // 1 minute 1 second
    ])('Seconds from $value ms', ({ value, expected }) => {
      expectSameValue((esday) => esday.duration(value).seconds())
      expect(esday.duration(value).seconds()).toBe(expected)
    })

    it.each([
      { value: 61000, expected: 1 }, // 1 minute 1 second
      { value: 100000, expected: 1 },
    ])('Minutes from $value ms', ({ value, expected }) => {
      expectSameValue((esday) => esday.duration(value).minutes())
      expect(esday.duration(value).minutes()).toBe(expected)
    })

    it.each([{ value: 10000000, expected: 2 }])('Hours from $value ms', ({ value, expected }) => {
      expectSameValue((esday) => esday.duration(value).hours())
      expect(esday.duration(value).hours()).toBe(expected)
    })

    it.each([
      { value: 100000000, expected: 1 },
      { value: -1, expected: 0 },
      { value: -1000000000, expected: -11 },
    ])('Days from $value ms', ({ value, expected }) => {
      expectSameValue((esday) => esday.duration(value).days())
      expect(esday.duration(value).days()).toBe(expected)
    })

    it.each([{ value: 1000000000, expected: 1 }])('Weeks from $value ms', ({ value, expected }) => {
      expectSameValue((esday) => esday.duration(value).weeks())
      expect(esday.duration(value).weeks()).toBe(expected)
    })

    it.each([{ value: 10000000000, expected: 3 }])('Month from $value ms', ({
      value,
      expected,
    }) => {
      expectSameValue((esday) => esday.duration(value).months())
      expect(esday.duration(value).months()).toBe(expected)
    })

    it.each([{ value: 100000000000, expected: 3 }])('Years from $value ms', ({
      value,
      expected,
    }) => {
      expectSameValue((esday) => esday.duration(value).years())
      expect(esday.duration(value).years()).toBe(expected)
    })

    it.each([
      { value: { days: 1 }, asUnit: 'ms', expected: 86400000.0 },
      { value: { days: 1 }, asUnit: 's', expected: 86400.0 },
      { value: { days: 1 }, asUnit: 'm', expected: 1440.0 },
      { value: { days: 1 }, asUnit: 'h', expected: 24.0 },
      { value: { days: 1 }, asUnit: 'd', expected: 1.0 },
      { value: { days: 1 }, asUnit: 'M', expected: 0.033 },
      { value: { days: 1 }, asUnit: 'y', expected: 0.003 },
    ])('$value as $unit', ({ value, asUnit, expected }) => {
      expectSameValue((esday) => esday.duration(value).as(asUnit as UnitTypeDuration))
      expect(
        esday
          .duration(value)
          .as(asUnit as UnitTypeDuration)
          .toFixed(3),
      ).toBe(expected.toFixed(3))
    })

    it.each([
      { value: { days: 1 }, asUnit: '' },
      { value: { days: 1 }, asUnit: 'x' },
    ])('$value as illegal unit $unit', ({ value, asUnit }) => {
      expect(() => esday.duration(value).as(asUnit as UnitTypeDuration)).toThrowError(
        'Unknown unit',
      )
      expect(() => moment.duration(value).as(asUnit as unitOfTime.Base)).toThrowError(
        'Unknown unit',
      )
    })
  })

  describe('Format', () => {
    it.each([
      { source: { ms: 123456789 }, expected: 'PT34H17M36.789S' },
      { source: { ms: 31952 }, expected: 'PT31.952S' },
      { source: { s: 6, m: 5, h: 4, d: 3, M: 2, y: 1 }, expected: 'P1Y2M3DT4H5M6S' },
      {
        source: { ms: 99, s: 6, m: 5, h: 4, d: 3, w: 2, M: 2, y: 1 },
        expected: 'P1Y2M17DT4H5M6.099S',
      },
      { source: { s: -0.5 }, expected: '-PT0.5S' },
      { source: { s: +0.5 }, expected: 'PT0.5S' },
      { source: { m: -1 }, expected: '-PT1M' },
      { source: { m: +1 }, expected: 'PT1M' },
      { source: { M: -1 }, expected: '-P1M' },
      { source: { M: +1 }, expected: 'P1M' },
      { source: { M: 16, d: 40, s: 86465 }, expected: 'P1Y4M40DT24H1M5S' },
      { source: { y: -1, M: 1 }, expected: '-P11M' },
      { source: { y: +1, M: 1 }, expected: 'P1Y1M' },
      { source: { y: -1, h: 1 }, expected: '-P1YT-1H' },
      { source: { y: -1, h: 1, m: -1 }, expected: '-P1YT-59M' },
      { source: { y: -1, h: 1, s: -1 }, expected: '-P1YT-59M-59S' },
      { source: { y: -1, h: -1, s: 1 }, expected: '-P1YT59M59S' },
      { source: { y: -1, d: 2 }, expected: '-P1Y-2D' },
    ])('using toISOString for $expected', ({ source, expected }) => {
      expectSameValue((esday) => esday.duration(source).toISOString())
      expect(esday.duration(source).toISOString()).toBe(expected)
    })

    it.each([
      { source: { ms: 123456789 }, expected: 'PT34H17M36.789S' },
      { source: { ms: 31952 }, expected: 'PT31.952S' },
      { source: { s: 6, m: 5, h: 4, d: 3, M: 2, y: 1 }, expected: 'P1Y2M3DT4H5M6S' },
      { source: { s: -0.5 }, expected: '-PT0.5S' },
      { source: { s: +0.5 }, expected: 'PT0.5S' },
      { source: { m: -1 }, expected: '-PT1M' },
      { source: { m: +1 }, expected: 'PT1M' },
      { source: { M: -1 }, expected: '-P1M' },
      { source: { M: +1 }, expected: 'P1M' },
      { source: { M: 16, d: 40, s: 86465 }, expected: 'P1Y4M40DT24H1M5S' },
      { source: { y: -1, M: 1 }, expected: '-P11M' },
      { source: { y: +1, M: 1 }, expected: 'P1Y1M' },
      { source: { y: -1, h: 1 }, expected: '-P1YT-1H' },
      { source: { y: -1, h: 1, m: -1 }, expected: '-P1YT-59M' },
      { source: { y: -1, h: 1, s: -1 }, expected: '-P1YT-59M-59S' },
      { source: { y: -1, h: -1, s: 1 }, expected: '-P1YT59M59S' },
      { source: { y: -1, d: 2 }, expected: '-P1Y-2D' },
    ])('using toString for $expected', ({ source, expected }) => {
      expectSameValue((esday) => esday.duration(source).toString())
      expect(esday.duration(source).toString()).toBe(expected)
    })

    it('using toJSON', () => {
      const source = { d: 2 }
      const expected = 'P2D'

      expectSameValue((esday) => esday.duration(source).toJSON())
      expect(esday.duration(source).toJSON()).toBe(expected)
    })

    it.each([
      {
        source: { s: 6, m: 5, h: 4, d: 3, M: 2, y: 1 },
        sourceAsString: 'P1Y2M3DT4H5M6S',
        expected:
          '{"years":1,"months":2,"days":3,"hours":4,"minutes":5,"seconds":6,"milliseconds":0}',
      },
      {
        source: { ms: 99, s: 6, m: 5, h: 4, d: 3, w: 2, M: 2, y: 1 },
        sourceAsString: 'P1Y2M17DT4H5M6.099S',
        expected:
          '{"years":1,"months":2,"days":17,"hours":4,"minutes":5,"seconds":6,"milliseconds":99}',
      },
      {
        source: { ms: 123456789 },
        sourceAsString: 'PT34H17M36.789S',
        expected:
          '{"years":0,"months":0,"days":1,"hours":10,"minutes":17,"seconds":36,"milliseconds":789}',
      },
      {
        source: { ms: 31952 },
        sourceAsString: 'PT31.952S',
        expected:
          '{"years":0,"months":0,"days":0,"hours":0,"minutes":0,"seconds":31,"milliseconds":952}',
      },
      {
        source: { s: 5 },
        sourceAsString: 'PT5S',
        expected:
          '{"years":0,"months":0,"days":0,"hours":0,"minutes":0,"seconds":5,"milliseconds":0}',
      },
      {
        source: { m: 1 },
        sourceAsString: 'PT1M',
        expected:
          '{"years":0,"months":0,"days":0,"hours":0,"minutes":1,"seconds":0,"milliseconds":0}',
      },
      {
        source: { h: 1 },
        sourceAsString: 'PT1H',
        expected:
          '{"years":0,"months":0,"days":0,"hours":1,"minutes":0,"seconds":0,"milliseconds":0}',
      },
      {
        source: { M: 1 },
        sourceAsString: 'P1M',
        expected:
          '{"years":0,"months":1,"days":0,"hours":0,"minutes":0,"seconds":0,"milliseconds":0}',
      },
      {
        source: { M: 16, d: 40, s: 86465 },
        sourceAsString: 'P1Y4M40DT24H1M5S',
        expected:
          '{"years":1,"months":5,"days":10,"hours":0,"minutes":1,"seconds":5,"milliseconds":0}',
      },
      {
        source: { y: 1, M: 2 },
        sourceAsString: 'P1Y2M',
        expected:
          '{"years":1,"months":2,"days":0,"hours":0,"minutes":0,"seconds":0,"milliseconds":0}',
      },
      {
        source: { y: 1, h: 1, m: 1 },
        sourceAsString: 'P1YT59M',
        expected:
          '{"years":1,"months":0,"days":0,"hours":1,"minutes":1,"seconds":0,"milliseconds":0}',
      },
    ])('using asStringifiedJSON for $sourceAsString', ({ source, expected }) => {
      expect(esday.duration(source).asStringifiedJSON()).toBe(expected)
    })

    it.each([
      {
        source: { ms: 123456789 },
        format: undefined,
        expected: '0000-00-01T10:17:36.789',
        sourceAsIso: 'PT34H17M36.789S',
      },
      {
        source: { ms: 7, s: 6, m: 5, h: 4, d: 3, M: 2, y: 1 },
        format: undefined,
        expected: '0001-02-03T04:05:06.007',
        sourceAsIso: 'P1Y2M3DT4H5M6S',
      },
      {
        source: { y: 1, M: 1, w: 1, d: 1 },
        format: undefined,
        expected: '0001-01-08T00:00:00.000',
        sourceAsIso: 'P1Y1M8D',
      },
      {
        source: { ms: 44, s: 6, m: 5, h: 4 },
        format: undefined,
        expected: '0000-00-00T04:05:06.044',
        sourceAsIso: 'PT4H5M6.044S',
      },
      {
        source: { ms: 7, s: 6, m: 5, h: 4, d: 3, w: 4, M: 2, y: 1 },
        format: 'YYYY',
        expected: '0001',
        sourceAsIso: 'P1Y2M31DT4H5M6S',
      },
      {
        source: { ms: 7, s: 6, m: 5, h: 4, d: 3, w: 4, M: 2, y: 1 },
        format: 'YY',
        expected: '01',
        sourceAsIso: 'P1Y2M31DT4H5M6S',
      },
      {
        source: { ms: 7, s: 6, m: 5, h: 4, d: 3, M: 2, y: 1 },
        format: 'YY-M-D',
        expected: '01-2-3',
        sourceAsIso: 'P1Y2M3DT4H5M6S',
      },
      {
        source: { ms: 7, s: 6, m: 5, h: 4, d: 3, M: 2, y: 1 },
        format: 'K', // test with unknown format token
        expected: 'K',
        sourceAsIso: 'P1Y2M3DT4H5M6S',
      },
    ])('$sourceAsIso using format $format for $expected', ({ source, format, expected }) => {
      expect(esday.duration(source).format(format)).toBe(expected)
    })
  })

  describe('Manipulate', () => {
    it.each([
      { value: 12345, unit: C.MS, expected: 'P1DT12.345S' },
      { value: 1, unit: C.SECOND, expected: 'P1DT1S' },
      { value: 2, unit: C.MIN, expected: 'P1DT2M' },
      { value: 3, unit: C.HOUR, expected: 'P1DT3H' },
      { value: 4, unit: C.DAY, expected: 'P5D' },
      { value: 5, unit: C.WEEK, expected: 'P36D' },
      { value: 6, unit: C.MONTH, expected: 'P6M1D' },
      { value: 7, unit: C.YEAR, expected: 'P7Y1D' },
    ])('add $value $unit to duration', ({ value, unit, expected }) => {
      expectSameDuration((esday) => esday.duration(1, C.DAY).add(value, unit))
      expect(esday.duration(1, C.DAY).add(value, unit).toISOString()).toBe(expected)
    })

    it.each([
      { value: { months: 4, weeks: 3, days: 2 }, expected: 'P4M24D' },
      { value: { h: 23, m: 59, s: 44 }, expected: 'P1DT23H59M44S' },
      {
        value: {
          years: 1,
          months: 4,
          weeks: 3,
          days: 2,
          hours: 5,
          minutes: 6,
          seconds: 7,
          milliseconds: 8,
        },
        expected: 'P1Y4M24DT5H6M7.008S',
      },
    ])('add object $value to duration', ({ value, expected }) => {
      expectSameDuration((esday) => esday.duration(1, C.DAY).add(value))
      expect(esday.duration(1, C.DAY).add(value).toISOString()).toBe(expected)
    })

    it('add value without unit', () => {
      const value = 1234
      const expected = 'P1DT1.234S'

      expectSameDuration((esday) => esday.duration(1, C.DAY).add(value))
      expect(esday.duration(1, C.DAY).add(value).toISOString()).toBe(expected)
    })

    it.each([
      { value: { months: 4, weeks: 3, days: 2 }, expected: 'P4M24D' },
      { value: { h: 23, m: 59, s: 44 }, expected: 'P1DT23H59M44S' },
      {
        value: {
          years: 1,
          months: 4,
          weeks: 3,
          days: 2,
          hours: 5,
          minutes: 6,
          seconds: 7,
          milliseconds: 8,
        },
        expected: 'P1Y4M24DT5H6M7.008S',
      },
    ])('add duration $value to duration', ({ value, expected }) => {
      expectSameDuration((esday) => esday.duration(1, C.DAY).add(esday.duration(value)))
      expect(esday.duration(1, C.DAY).add(esday.duration(value)).toISOString()).toBe(expected)
    })

    it.each([
      { value: 12345, unit: C.MS, expected: 'P1DT-12.345S' },
      { value: 1, unit: C.SECOND, expected: 'P1DT-1S' },
      { value: 2, unit: C.MIN, expected: 'P1DT-2M' },
      { value: 3, unit: C.HOUR, expected: 'P1DT-3H' },
      { value: 4, unit: C.DAY, expected: '-P3D' },
      { value: 5, unit: C.WEEK, expected: '-P34D' },
      { value: 6, unit: C.MONTH, expected: '-P6M-1D' },
      { value: 7, unit: C.YEAR, expected: '-P7Y-1D' },
    ])('subtract $value $unit to duration', ({ value, unit, expected }) => {
      expectSameDuration((esday) => esday.duration(1, C.DAY).subtract(value, unit))
      expect(esday.duration(1, C.DAY).subtract(value, unit).toISOString()).toBe(expected)
    })

    it.each([
      { value: { months: 4, weeks: 3, days: 2 }, expected: '-P4M22D' },
      { value: { h: 23, m: 59, s: 44 }, expected: 'P1DT-23H-59M-44S' },
      {
        value: {
          years: 1,
          months: 4,
          weeks: 3,
          days: 2,
          hours: 5,
          minutes: 6,
          seconds: 7,
          milliseconds: 8,
        },
        expected: '-P1Y4M22DT5H6M7.008S',
      },
    ])('subtract object $value to duration', ({ value, expected }) => {
      expectSameDuration((esday) => esday.duration(1, C.DAY).subtract(value))
      expect(esday.duration(1, C.DAY).subtract(value).toISOString()).toBe(expected)
    })

    it('subtract value without unit', () => {
      const value = 1234
      const expected = 'P1DT-1.234S'

      expectSameDuration((esday) => esday.duration(1, C.DAY).subtract(value))
      expect(esday.duration(1, C.DAY).subtract(value).toISOString()).toBe(expected)
    })

    it.each([
      { value: { months: 4, weeks: 3, days: 2 }, expected: '-P4M22D' },
      { value: { h: 23, m: 59, s: 44 }, expected: 'P1DT-23H-59M-44S' },
      {
        value: {
          years: 1,
          months: 4,
          weeks: 3,
          days: 2,
          hours: 5,
          minutes: 6,
          seconds: 7,
          milliseconds: 8,
        },
        expected: '-P1Y4M22DT5H6M7.008S',
      },
    ])('subtract duration $value to duration', ({ value, expected }) => {
      expectSameDuration((esday) => esday.duration(1, C.DAY).subtract(esday.duration(value)))
      expect(esday.duration(1, C.DAY).subtract(esday.duration(value)).toISOString()).toBe(expected)
    })
  })

  describe('Query', () => {
    it('isValid for valid duration', () => {
      expectSameValue((esday) => esday.duration().isValid())
      expect(esday.duration().isValid()).toBeTruthy()
    })

    it('isValid for invalid duration', () => {
      expectSameValue((esday) => esday.duration(Number.NaN).isValid())
      expect(esday.duration(Number.NaN).isValid()).toBeFalsy()
    })

    it('isDuration for basic duration instance', () => {
      expectSameValue((esday) => esday.isDuration(esday.duration()))
      expect(esday.duration()).toBeTruthy()
    })

    it('isDuration for simple duration instance', () => {
      const source = 12345678
      const esdayDuration = esday.duration(source)

      expectSameValue((esday) => esday.isDuration(esday.duration(source)))
      expect(esdayDuration).toBeTruthy()
    })

    it('isDuration for esday instance', () => {
      expectSameValue((esday) => esday.isDuration(esday()))
      expect(esday.isDuration(esday())).toBeFalsy()
    })

    it('isDuration for plain object', () => {
      const source = { milliseconds: 1 }

      expectSameValue((esday) => esday.isDuration(source))
      expect(esday.isDuration(source)).toBeFalsy()
    })

    it('isDuration for invalid object', () => {
      const source = true

      expectSameValue((esday) => esday.isDuration(source))
      expect(esday.isDuration(source)).toBeFalsy()
      // 'as Object' hack to make test run
      expectSameDuration((esday) => esday.duration(source as Object))
    })
  })
})
