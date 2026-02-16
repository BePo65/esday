import type { UnitsObjectTypeSet, UnitTypeAddSub } from 'esday'
import { EsDay, esday } from 'esday'
import moment from 'moment/min/moment-with-locales'

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { C } from '~/common'
import advancedParsePlugin from '~/plugins/advancedParse'
import utcPlugin from '~/plugins/utc'
import weekPlugin from '~/plugins/week'
import { expectSameObject, expectSameValue } from '../util'

esday.extend(utcPlugin).extend(advancedParsePlugin).extend(weekPlugin)

describe('plugin utc', () => {
  describe('get', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('year', () => {
      expectSameValue((esday) => esday().utc().year())
    })

    it('month', () => {
      expectSameValue((esday) => esday().utc().month())
    })

    it('day', () => {
      expectSameValue((esday) => esday().utc().date())
    })

    it('day of week', () => {
      expectSameValue((esday) => esday().utc().day())
    })

    it('hour', () => {
      expectSameValue((esday) => esday().utc().hour())
    })

    it('minute', () => {
      expectSameValue((esday) => esday().utc().minute())
    })

    it('second', () => {
      expectSameValue((esday) => esday().utc().second())
    })

    it('millisecond', () => {
      expectSameValue((esday) => esday().utc().millisecond())
    })
  })

  describe('set', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234Z'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('year', () => {
      expectSameObject((esday) => esday().utc().set('year', 2008))
    })

    it('month', () => {
      expectSameObject((esday) => esday().utc().set('month', 11))
    })

    it('day', () => {
      expectSameObject((esday) => esday().utc().set('date', 30))
    })

    it('day to 45', () => {
      expectSameObject((esday) => esday().utc().set('date', 45))
    })

    it('day of week to 0', () => {
      expectSameObject((esday) => esday().utc().set('day', 0))
    })

    it('hour to 6', () => {
      expectSameObject((esday) => esday().utc().set('hour', 6))
    })

    it('minute to 59', () => {
      expectSameObject((esday) => esday().utc().set('minute', 59))
    })

    it('second to 59', () => {
      expectSameObject((esday) => esday().utc().set('second', 59))
    })

    it('second to 110', () => {
      expectSameObject((esday) => esday().utc().set('second', 110))
    })

    it('millisecond to 999', () => {
      expectSameObject((esday) => esday().utc().set('millisecond', 999))
    })

    it('millisecond to 85', () => {
      expectSameObject((esday) => esday().utc().set('millisecond', 85))
    })

    it('millisecond to 7', () => {
      expectSameObject((esday) => esday().utc().set('millisecond', 7))
    })

    it('millisecond to 1234', () => {
      expectSameObject((esday) => esday().utc().set('millisecond', 1234))
    })

    it('set using an object without plugin ObjectSupport', () => {
      const value = { years: 1, months: 2, days: 3 } as UnitsObjectTypeSet
      const expected = '2023-12-17'

      expect(esday().utc().set(value).format().slice(0, 10)).toBe(expected)
    })
  })

  describe('parse (without format)', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('now with parsed date', () => {
      expectSameObject((esday) => esday.utc())
    })

    it('parse Date object', () => {
      expectSameObject((esday) => esday.utc(new Date('2025-12-17T03:24:00')))
    })

    it('parse utc Date object', () => {
      expectSameObject((esday) => esday.utc(new Date(Date.UTC(2024, 1, 2, 3, 4, 5))))
    })

    it('now with converted date', () => {
      expectSameObject((esday) => esday().utc())
    })

    it.each([
      '2018-09-06',
      '2018-09',
      '2018',
      '',
      '2017-04-22 19:50:16',
      '2012-01-02T08:20:00',
      '2011-02-02T03:04:05+06:00',
      '2011-02-02T03:04:05+00:00',
      '2012-01-02T08:20:00-09:00',
      '2019-03-25T06:41:00.999999999',
    ])('date string using "%s" with parsed date', (dateString) => {
      expectSameObject((esday) => esday.utc(dateString))
    })

    it.each([
      '2018-09-06',
      '2018-09',
      '2018',
      '',
      '2017-04-22 19:50:16',
      '2012-01-02T08:20:00',
      '2011-02-02T03:04:05+06:00',
      '2011-02-02T03:04:05+00:00',
      '2012-01-02T08:20:00-09:00',
      '2019-03-25T06:41:00.999999999',
    ])('date string using "%s" with converted date', (dateString) => {
      expectSameObject((esday) => esday(dateString).utc())
    })

    it('date time string with utc set in config', () => {
      const dateString = '2018-09-06T19:34:28Z'

      expect(esday(dateString, { utc: true }).format()).toEqual('2018-09-06T19:34:28Z')
      expect(esday(dateString, { utc: true }).format()).toEqual(moment(dateString).utc().format())
      expect(esday(dateString).utc().format()).toEqual('2018-09-06T19:34:28Z')
      expect(esday(dateString).utc().format()).toEqual(moment(dateString).utc().format())
      expect(esday.utc(dateString).format()).toEqual('2018-09-06T19:34:28Z')
      expect(esday.utc(dateString).format()).toEqual(moment.utc(dateString).format())
    })

    it.each([
      { dateArray: [2024] },
      { dateArray: [2024, 5] },
      { dateArray: [2024, 5, 1] },
      { dateArray: [2024, 5, 1, 13] },
      { dateArray: [2024, 5, 1, 13, 52] },
      { dateArray: [2024, 5, 1, 13, 52, 44] },
      { dateArray: [2024, 5, 1, 13, 14, 15, 99] },
      { dateArray: [24, 5, 1, 13, 14, 15, 99] },
    ])('parses $dateArray to date', ({ dateArray }) => {
      expectSameObject((esday) => esday.utc(dateArray))
    })
  })

  describe('parse (with format)', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it.each([
      { dateString: '2011-02-02 03:04:05', format: 'YYYY-MM-DD HH:mm:ss' },
      { dateString: '11-02-02 03:04:05', format: 'YY-MM-DD HH:mm:ss' },
      { dateString: '2011-02-02 03:04:05Z', format: 'YYYY-MM-DD HH:mm:ss' },
    ])('"$dateString" using "$format"', ({ dateString, format }) => {
      expectSameObject((esday) => esday.utc(dateString, format))
    })
  })

  describe('format (core)', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('does not break default format for local date time', () => {
      const dateString = '2018-09-06T19:34:28.65'
      const esdayDateFormat = esday(dateString).format()
      const momentDateFormat = moment(dateString).format()

      expect(esdayDateFormat).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}./)
      expect(esdayDateFormat).toBe(momentDateFormat)
    })

    it('does not break default format for local date time parsed as utc', () => {
      const dateString = '2018-09-06T19:34:28.65'
      const esdayDateFormat = esday.utc(dateString).format()
      const momentDateFormat = moment.utc(dateString).format()

      expect(esdayDateFormat).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}./)
      expect(esdayDateFormat).toBe(momentDateFormat)
    })

    it('does not break default format for local date time converted to utc', () => {
      const dateString = '2018-09-06T19:34:28.65'
      const esdayDateFormat = esday(dateString).utc().format()
      const momentDateFormat = moment(dateString).utc().format()

      expect(esdayDateFormat).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}./)
      expect(esdayDateFormat).toBe(momentDateFormat)
    })

    it('using "YYYY-MM-DD HH:mm:ss:SSS" parsing "2018-09-06T19:34:28.657Z"', () => {
      const dateString = '2018-09-06T19:34:28.657Z'
      const esdayDate = esday.utc(dateString)
      const momentDate = moment.utc(dateString)
      const format = 'YYYY-MM-DD_HH:mm:ss:SSS'

      expect(esdayDate.format(format)).toBe('2018-09-06_19:34:28:657')
      expect(esdayDate.format(format)).toBe(momentDate.format(format))
    })

    it('using "YYYY-MM-DD HH:mm:ss:SSS" converting "2018-09-06T19:34:28.657Z"', () => {
      const dateString = '2018-09-06T19:34:28.657Z'
      const esdayDate = esday(dateString).utc()
      const momentDate = moment(dateString).utc()
      const format = 'YYYY-MM-DD_HH:mm:ss:SSS'

      expect(esdayDate.format(format)).toBe('2018-09-06_19:34:28:657')
      expect(esdayDate.format(format)).toBe(momentDate.format(format))
    })

    it('using "HH-mm-ss-SSS-Z" parsing "2018-09-06T19:34:28.657Z"', () => {
      const dateString = '2018-09-06T19:34:28.657Z'
      const esdayDate = esday.utc(dateString)
      const format = 'HH-mm-ss-SSS-Z'

      expect(esdayDate.format(format)).toBe('19-34-28-657-+00:00')
      expect(esdayDate.format(format)).toBe(moment.utc(dateString).format(format))
    })

    it('using "HH-mm-ss-SSS-Z" converting "2018-09-06T19:34:28.657Z"', () => {
      const dateString = '2018-09-06T19:34:28.657Z'
      const esdayDate = esday(dateString).utc()
      const format = 'HH-mm-ss-SSS-Z'

      expect(esdayDate.format(format)).toBe('19-34-28-657-+00:00')
      expect(esdayDate.format(format)).toBe(moment.utc(dateString).format(format))
    })
  })

  describe('utc', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('convert to utc', () => {
      const dateString = '2016-05-03 22:15:01'

      expectSameObject((esday) => esday(dateString).utc())
    })

    it('convert to utc with keepLocalTime', () => {
      const dateString = '2016-05-03 22:15:01'

      expectSameObject((esday) => esday(dateString).utc(true))
    })
  })

  describe('local', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('returns a new instance', () => {
      const utcDate = esday.utc('2018-09-06T19:34:28.657Z')
      const localDate = utcDate.local()

      expect(localDate).not.toBe(utcDate)
    })

    it('returns the same formatted value as moment does', () => {
      const dateString = '2018-09-06'

      expectSameValue((esday) => esday.utc(dateString).local().format())
    })

    it('local date from utc date from local date is same', () => {
      // 'moment' is not invariable; therefore we create 3 new instances
      const esdayLocal = esday()
      const momentLocal = moment()
      expect(esdayLocal.isUTC()).toBeFalsy
      expect(momentLocal.isUTC()).toBeFalsy

      // convert to utc
      const esdayLocalUtc = esdayLocal.utc()
      const momentLocalUtc = moment().utc()
      expect(esdayLocalUtc.isUTC()).toBeTruthy
      expect(momentLocalUtc.isUTC()).toBeTruthy
      expect(esdayLocalUtc.utcOffset()).toBe(momentLocalUtc.utcOffset())

      // convert utc back zo local date
      const esdayLocalUtcLocal = esdayLocalUtc.local()
      const momentLocalUtcLocal = moment().utc().local()
      expect(esdayLocalUtcLocal.isUTC()).toBeFalsy
      expect(momentLocalUtcLocal.isUTC()).toBeFalsy
      expect(esdayLocalUtcLocal.isSame(esdayLocal)).toBeTruthy
      expect(momentLocalUtcLocal.isSame(momentLocal)).toBeTruthy
      expect(esdayLocalUtcLocal.format()).toEqual(momentLocalUtcLocal.format())
      expect(esdayLocalUtcLocal.valueOf()).toEqual(momentLocalUtcLocal.valueOf())
    })
  })

  describe('isUTC', () => {
    it('for created local time', () => {
      expect(esday().isUTC()).toBe(false)
    })

    it('for created utc time', () => {
      expect(esday.utc().isUTC()).toBe(true)
    })

    it('for converted utc time', () => {
      expect(esday().utc().isUTC()).toBe(true)
    })

    it('for twice converted time', () => {
      expect(esday().utc().local().isUTC()).toBe(false)
    })
  })

  describe('utcOffset get', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('returns a number', () => {
      const offsetValue = esday().utcOffset()

      expect(offsetValue).toBeTypeOf('number')
    })

    it('for local date', () => {
      expectSameValue((esday) => esday().format())
      expectSameValue((esday) => esday().utcOffset())
    })

    it('for utc date generated without keepLocalTime', () => {
      expectSameValue((esday) => esday().utc().format())
      expectSameValue((esday) => esday().utc().utcOffset())
    })

    it('for utc date generated with keepLocalTime', () => {
      expectSameValue((esday) => esday().utc(true).format())
      expectSameValue((esday) => esday().utc(true).utcOffset())
    })
  })

  describe('utcOffset set', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('returns an instance of EsDay', () => {
      const newDate = esday().utcOffset(5)

      expect(newDate).toHaveProperty('valueOf')
    })

    it.each([
      { offset: 540 },
      { offset: -540 },
      { offset: 8 },
      { offset: -8 },
      { offset: 4.5 },
    ])('using offset "$offset"', ({ offset }) => {
      const dateString = '2021-02-28 19:40:10'

      expectSameObject((esday) => esday(dateString).utc().utcOffset(offset))
    })

    it('with seconds', () => {
      const dateString = '2021-02-28 19:40:10'
      const offset = 90.5
      const rawOffset = esday(dateString).utc().utcOffset(offset).utcOffset()

      expectSameObject((esday) => esday(dateString).utc().utcOffset(offset))
      expect(rawOffset).toBe(offset)

      // seconds in utcOffset are ignored when formatting date
      expectSameValue((esday) => esday(dateString).utc().utcOffset(offset).format('Z'))
      expect(esday(dateString).utc().utcOffset(offset).format('Z').length).toBe(6)
    })

    it.each([
      { offset: 540 },
      { offset: -540 },
      { offset: 8 },
      { offset: -8 },
    ])('using offset "$offset" and keepLocalTime', ({ offset }) => {
      const dateString = '2021-02-28 19:40:10'

      expectSameObject((esday) => esday(dateString).utc().utcOffset(offset, true))
    })

    it('for non-utc date without keepLocalTime', () => {
      const dateString = '2021-02-28 19:40:10'

      expectSameObject((esday) => esday(dateString).utcOffset(540))
    })

    it('for non-utc date with keepLocalTime', () => {
      const dateString = '2021-02-28 19:40:10'

      expectSameObject((esday) => esday(dateString).utcOffset(540, true))
    })

    it('using string offset "-08:00"', () => {
      const dateString = '2021-02-28 19:40:10'
      const hoursOffset = -8

      expectSameObject((esday) =>
        esday(dateString)
          .utc()
          .utcOffset(`-0${Math.abs(hoursOffset)}:00`, true),
      )
    })

    it('using string offset "+08:00"', () => {
      const dateString = '2021-02-28 19:40:10'
      const hoursOffset = 8

      expectSameObject((esday) => esday(dateString).utc().utcOffset(`+0${hoursOffset}:00`, true))
    })

    it('using string offset "-0800"', () => {
      const dateString = '2021-02-28 19:40:10'
      const hoursOffset = -8

      expectSameObject((esday) =>
        esday(dateString)
          .utc()
          .utcOffset(`-0${Math.abs(hoursOffset)}00`, true),
      )
    })

    it('using string offset "+0800"', () => {
      const dateString = '2021-02-28 19:40:10'
      const hoursOffset = 8

      expectSameObject((esday) => esday(dateString).utc().utcOffset(`+0${hoursOffset}00`, true))
    })

    it('using string offset "-08"', () => {
      const dateString = '2021-02-28 19:40:10'

      expectSameObject((esday) => esday(dateString).utc().utcOffset('-08', true))
    })

    it('using an invalid string value ("random")', () => {
      const dateString = '2021-02-28 19:40:10'

      expectSameObject((esday) => esday(dateString).utc(true).utcOffset('random'))
    })

    it('changes hours when changing the utc offset in UTC mode using a number', () => {
      const esdayDate = esday.utc('2000-01-01T06:31:00Z')

      expect(esdayDate.hour()).toBe(6)
      expect(esdayDate.utcOffset(0).hour()).toBe(6)
      expect(esdayDate.utcOffset(-60).hour()).toBe(5)
      expect(esdayDate.utcOffset(60).hour()).toBe(7)
    })

    it('changes hours when changing the utc offset in UTC mode using a time string', () => {
      const esdayDate = esday.utc('2000-01-01T06:31:00Z')

      expect(esdayDate.hour()).toBe(6)
      expect(esdayDate.utcOffset(-30).format('HH:mm')).toBe('06:01')
      expect(esdayDate.utcOffset(30).format('HH:mm')).toBe('07:01')
      expect(esdayDate.utcOffset(-1380).format('HH:mm')).toBe('07:31')
    })

    it('offset not changed after clone', () => {
      const dateString = '2021-02-28T09:40:10'
      const dateWithOffset = esday(dateString).utcOffset(9)
      const esdayCloned = dateWithOffset.clone()

      expectSameObject((esday) => esday(dateString).utcOffset(9))

      expectSameObject((esday) => esday(dateString).utcOffset(9).clone())

      expect(dateWithOffset).not.toBe(esdayCloned)
      expect(dateWithOffset.valueOf()).toBe(esdayCloned.valueOf())
      expect(dateWithOffset.utcOffset()).toBe(esdayCloned.utcOffset())
      expect(dateWithOffset.format()).toEqual(esdayCloned.format())
      expect(dateWithOffset.toDate()).toEqual(esdayCloned.toDate())
    })

    it('returns a new instance', () => {
      const esdayDate = esday()
      const esdayDateUpdated = esdayDate.utcOffset(esdayDate.utcOffset() + 1)

      expect(esdayDate).not.toBe(esdayDateUpdated)
      expect(esdayDate.utcOffset()).not.toBe(esdayDateUpdated.utcOffset())
      expect(esdayDate.format()).not.toBe(esdayDateUpdated.format())
    })

    it('sets utc mode (using string offset "+0000")', () => {
      const dateString = '2021-02-28 19:40:10'
      const esdayDate = esday(dateString).utc(true).utcOffset('+0000')

      expect(esdayDate.utcOffset()).toEqual(0)
      expectSameObject((esday) => esday(dateString).utc(true).utcOffset('+0000'))
    })

    it('sets utc mode (using offset "0")', () => {
      const esdayDate = esday().utcOffset(0)

      expect(esdayDate.isUTC()).toBeTruthy()
      expectSameObject((esday) => esday().utcOffset(0))
    })

    it('resets utc mode (using offset "1")', () => {
      const esdayDate = esday('2000-01-01T06:00:00Z')

      expect(esdayDate.isUTC()).toBeFalsy()
      expect(esdayDate.utcOffset(0).isUTC()).toBeTruthy()
      expect(esdayDate.utcOffset(1).isUTC()).toBeFalsy()
    })
  })

  describe('clone', () => {
    it('on parsed utc date retains the utc mode', () => {
      const esdayDate = esday.utc('2018-09-06')
      const clonedDate = esdayDate.clone()

      expect(clonedDate.isUTC()).toBeTruthy()
    })

    it('on converted local date retains the utc mode', () => {
      const esdayDate = esday('2018-09-06').utc()
      const clonedDate = esdayDate.clone()

      expect(clonedDate.isUTC()).toBeTruthy()
    })
  })

  describe('startOf and endOf', () => {
    // weekday of fake date is a Sunday
    const fakeTimeAsString = '2023-12-17T03:24:46.234'
    let momentDefaultLocale: string

    beforeAll(() => {
      momentDefaultLocale = moment.locale()

      // Change firstDayOfWeek to SIO 8601 used by esday
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
      moment.locale(momentDefaultLocale)
    })

    it.each([
      C.YEAR,
      C.MONTH,
      C.DAY,
      C.DAY_OF_MONTH,
      C.HOUR,
      C.MIN,
      C.SECOND,
    ])('startOf in UTC mode for "%s"', (unit) => {
      expectSameObject((esday) => esday().utc().startOf(unit))
    })

    it.each([
      C.YEAR,
      C.MONTH,
      C.DAY,
      C.DAY_OF_MONTH,
      C.HOUR,
      C.MIN,
      C.SECOND,
    ])('endOf in UTC mode for "%s"', (unit) => {
      expectSameObject((esday) => esday().utc().endOf(unit))
    })
  })

  describe('add', () => {
    it.each([
      { value: 2, unit: 'year' },
      { value: 3, unit: 'month' },
      { value: 2, unit: 'week' },
      { value: 1, unit: 'day' },
      { value: 120, unit: 'day' },
      { value: 4, unit: 'hour' },
      { value: 5, unit: 'minute' },
      { value: 6, unit: 'second' },
    ])('"$value $unit" to date parsed as utc', ({ value, unit }) => {
      const dateString = '2018-02-06T19:34:28.652'

      expectSameObject((esday) => esday.utc(dateString).add(value, unit as UnitTypeAddSub))
    })

    it('unsupported unit to date parsed as utc', () => {
      const dateString = '2018-02-06T19:34:28.652'
      const base = esday.utc(dateString)
      const cloned = base.add(1, 'quarter')

      expect(base).toBeInstanceOf(EsDay)
      expect(cloned).toBeInstanceOf(EsDay)
      expect(base).toBe(base)
      expect(base).not.toBe(cloned)
      expect(base.valueOf()).toBe(cloned.valueOf())
    })

    it.each([
      { value: 2, unit: 'year' },
      { value: 3, unit: 'month' },
      { value: 2, unit: 'week' },
      { value: 1, unit: 'day' },
      { value: 120, unit: 'day' },
      { value: 4, unit: 'hour' },
      { value: 5, unit: 'minute' },
      { value: 6, unit: 'second' },
    ])('"$value $unit" to date converted to utc', ({ value, unit }) => {
      const dateString = '2018-02-06T19:34:28.652'

      expectSameObject((esday) =>
        esday(dateString)
          .utc()
          .add(value, unit as UnitTypeAddSub),
      )
    })

    it('unsupported unit to date converted to utc', () => {
      const dateString = '2018-02-06T19:34:28.652'
      const base = esday(dateString).utc()
      const cloned = base.add(1, 'quarter')

      expect(base).toBeInstanceOf(EsDay)
      expect(cloned).toBeInstanceOf(EsDay)
      expect(base).toBe(base)
      expect(base).not.toBe(cloned)
      expect(base.valueOf()).toBe(cloned.valueOf())
    })
  })

  describe('subtract', () => {
    it.each([
      { value: 2, unit: 'year' },
      { value: 3, unit: 'month' },
      { value: 2, unit: 'week' },
      { value: 1, unit: 'day' },
      { value: 120, unit: 'day' },
      { value: 4, unit: 'hour' },
      { value: 5, unit: 'minute' },
      { value: 6, unit: 'second' },
    ])('"$value $unit" to date parsed as utc', ({ value, unit }) => {
      const dateString = '2018-11-06T19:34:28.652'

      expectSameObject((esday) => esday.utc(dateString).subtract(value, unit as UnitTypeAddSub))
    })

    it('unsupported unit to date parsed as utc', () => {
      const dateString = '2018-02-06T19:34:28.652'
      const base = esday.utc(dateString)
      const cloned = base.subtract(1, 'quarter')

      expect(base).toBeInstanceOf(EsDay)
      expect(cloned).toBeInstanceOf(EsDay)
      expect(base).toBe(base)
      expect(base).not.toBe(cloned)
      expect(base.valueOf()).toBe(cloned.valueOf())
    })

    it.each([
      { value: 2, unit: 'year' },
      { value: 3, unit: 'month' },
      { value: 2, unit: 'week' },
      { value: 1, unit: 'day' },
      { value: 120, unit: 'day' },
      { value: 4, unit: 'hour' },
      { value: 5, unit: 'minute' },
      { value: 6, unit: 'second' },
    ])('"$value $unit" to date converted to utc', ({ value, unit }) => {
      const dateString = '2018-11-06T19:34:28.652'

      expectSameObject((esday) =>
        esday(dateString)
          .utc()
          .subtract(value, unit as UnitTypeAddSub),
      )
    })

    it('unsupported unit to date converted to utc', () => {
      const dateString = '2018-02-06T19:34:28.652'
      const base = esday(dateString).utc()
      const cloned = base.subtract(1, 'quarter')

      expect(base).toBeInstanceOf(EsDay)
      expect(cloned).toBeInstanceOf(EsDay)
      expect(base).toBe(base)
      expect(base).not.toBe(cloned)
      expect(base.valueOf()).toBe(cloned.valueOf())
    })
  })

  describe('core methods', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234Z'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('valid date toISOString', () => {
      expect(esday.utc().toISOString()).toBe('2023-12-17T03:24:46.234Z')
    })

    it('invalid date toISOString', () => {
      expect(esday.utc(C.INVALID_DATE).toISOString()).toBe(C.INVALID_DATE_STRING)
    })

    it('valueOf without localOffset', () => {
      const dateEsday = esday.utc().utcOffset(540)
      // remove localOffset for testing default value for utcOffset
      dateEsday['$conf'].localOffset = undefined

      expect(dateEsday.valueOf()).toBe(1_702_783_486_234)
    })
  })
})
