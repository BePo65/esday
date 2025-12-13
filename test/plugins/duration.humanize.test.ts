import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import localeEn from '~/locales/en'
import localeFr from '~/locales/fr'
import durationPlugin from '~/plugins/duration'
import localePlugin from '~/plugins/locale'
import relativeTimePlugin, { type ThresholdRelativeTime } from '~/plugins/relativeTime'
import { expectSame } from '../util'

esday.extend(localePlugin).extend(relativeTimePlugin).extend(durationPlugin)
esday.registerLocale(localeEn).registerLocale(localeFr)

describe('duration plugin - using global locale "en"', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
    // set global locale
    esday.locale('en')
    moment.locale('en')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Humanize with default thresholds', () => {
    it.each([
      {
        source: { seconds: 44 },
        expected: 'a few seconds',
        description: '44 seconds = a few seconds',
      },
      { source: { seconds: 45 }, expected: 'a minute', description: '45 seconds = a minute' },
      { source: { seconds: 89 }, expected: 'a minute', description: '89 seconds = a minute' },
      { source: { seconds: 90 }, expected: '2 minutes', description: '90 seconds = 2 minutes' },
      { source: { minutes: 44 }, expected: '44 minutes', description: '44 minutes = 44 minutes' },
      { source: { minutes: 45 }, expected: 'an hour', description: '45 minutes = an hour' },
      { source: { minutes: 89 }, expected: 'an hour', description: '89 minutes = an hour' },
      { source: { minutes: 90 }, expected: '2 hours', description: '90 minutes = 2 hours' },
      { source: { hours: 5 }, expected: '5 hours', description: '5 hours = 5 hours' },
      { source: { hours: 21 }, expected: '21 hours', description: '21 hours = 21 hours' },
      { source: { hours: 22 }, expected: 'a day', description: '22 hours = a day' },
      { source: { hours: 35 }, expected: 'a day', description: '35 hours = a day' },
      { source: { hours: 36 }, expected: '2 days', description: '36 hours = 2 days' },
      { source: { days: 1 }, expected: 'a day', description: '1 day = a day' },
      { source: { days: 5 }, expected: '5 days', description: '5 days = 5 days' },
      { source: { days: 25 }, expected: '25 days', description: '25 days = 25 days' },
      { source: { days: 26 }, expected: 'a month', description: '26 days = a month' },
      { source: { days: 30 }, expected: 'a month', description: '30 days = a month' },
      { source: { days: 45 }, expected: 'a month', description: '45 days = a month' },
      { source: { days: 46 }, expected: '2 months', description: '46 days = 2 months' },
      { source: { days: 74 }, expected: '2 months', description: '74 days = 2 months' },
      { source: { days: 77 }, expected: '3 months', description: '77 days = 3 months' },
      { source: { days: 344 }, expected: 'a year', description: '344 days = a year' },
      { source: { days: 345 }, expected: 'a year', description: '345 days = a year' },
      { source: { days: 547 }, expected: 'a year', description: '547 days = a year' },
      { source: { days: 548 }, expected: '2 years', description: '548 days = 2 years' },
      { source: { week: 1 }, expected: '7 days', description: '1 week = 7 days' },
      { source: { months: 1 }, expected: 'a month', description: '1 month = a month' },
      { source: { months: 5 }, expected: '5 months', description: '5 months = 5 months' },
      { source: { months: 10 }, expected: '10 months', description: '10 months = 5 months' },
      { source: { months: 11 }, expected: 'a year', description: '11 months = a year' },
      { source: { years: 1 }, expected: 'a year', description: '1 year = a year' },
      { source: { years: 5 }, expected: '5 years', description: '5 years = 5 years' },
      { source: 7200000, expected: '2 hours', description: '7200000 = 2 hours' },
    ])('for  "$description" with default parameters', ({ source, expected }) => {
      expectSame((esday) => esday.duration(source).humanize())
      expect(esday.duration(source).humanize()).toBe(expected)
    })

    it.each([
      { source: { minutes: 89 }, expected: 'in an hour', description: '89 minutes - in an hour' },
      { source: { minutes: 90 }, expected: 'in 2 hours', description: '90 minutes - in 2 hours' },
      { source: { hours: 35 }, expected: 'in a day', description: '35 hours - in a day' },
      { source: { hours: 36 }, expected: 'in 2 days', description: '36 hours - in 2 days' },
      { source: { days: 25 }, expected: 'in 25 days', description: '25 days - in 25 days' },
      { source: { days: 26 }, expected: 'in a month', description: '26 days - in a month' },
    ])('for  "$description" with suffix', ({ source, expected }) => {
      const withSuffix = true

      expectSame((esday) => esday.duration(source).humanize(withSuffix))
      expect(esday.duration(source).humanize(withSuffix)).toBe(expected)
    })

    it('Humanize with invalid duration', () => {
      const invalidDurationDef = {
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

      expectSame((esday) => esday.duration(invalidDurationDef).isValid())
      expect(esday.duration(invalidDurationDef).isValid()).toBeFalsy()
      expectSame((esday) => esday.duration(invalidDurationDef).humanize())
      expect(esday.duration(invalidDurationDef).humanize()).toBe('Invalid date')
    })
  })

  describe('Humanize with custom thresholds', () => {
    const thresholdAllUnits: ThresholdRelativeTime = {
      ss: 43,
      s: 44,
      m: 44,
      h: 21,
      d: 25,
      w: null,
      M: 10,
    }

    const thresholdSomeUnits: ThresholdRelativeTime = {
      d: 7,
      w: 4,
    }

    it.each([
      {
        source: { seconds: 43 },
        expected: 'a few seconds',
        description: '43 seconds = a few seconds',
      },
      { source: { seconds: 44 }, expected: 'a minute', description: '44 seconds = a minute' },
      { source: { seconds: 89 }, expected: 'a minute', description: '89 seconds = a minute' },
      { source: { seconds: 90 }, expected: '2 minutes', description: '90 seconds = 2 minutes' },
      { source: { minutes: 43 }, expected: '43 minutes', description: '43 minutes = 44 minutes' },
      { source: { minutes: 44 }, expected: 'an hour', description: '44 minutes = an hour' },
      { source: { minutes: 89 }, expected: 'an hour', description: '89 minutes = an hour' },
      { source: { minutes: 90 }, expected: '2 hours', description: '90 minutes = 2 hours' },
      { source: { hours: 5 }, expected: '5 hours', description: '5 hours = 5 hours' },
      { source: { hours: 20 }, expected: '20 hours', description: '20 hours = 21 hours' },
      { source: { hours: 21 }, expected: 'a day', description: '21 hours = a day' },
      { source: { hours: 35 }, expected: 'a day', description: '35 hours = a day' },
      { source: { hours: 36 }, expected: '2 days', description: '36 hours = 2 days' },
      { source: { days: 1 }, expected: 'a day', description: '1 day = a day' },
      { source: { days: 5 }, expected: '5 days', description: '5 days = 5 days' },
      { source: { days: 24 }, expected: '24 days', description: '24 days = 25 days' },
      { source: { days: 25 }, expected: 'a month', description: '25 days = a month' },
      { source: { days: 30 }, expected: 'a month', description: '30 days = a month' },
      { source: { days: 45 }, expected: 'a month', description: '45 days = a month' },
      { source: { days: 46 }, expected: '2 months', description: '46 days = 2 months' },
      { source: { days: 74 }, expected: '2 months', description: '74 days = 2 months' },
      { source: { days: 77 }, expected: '3 months', description: '77 days = 3 months' },
      { source: { days: 344 }, expected: 'a year', description: '344 days = a year' },
      { source: { days: 345 }, expected: 'a year', description: '345 days = a year' },
      { source: { days: 547 }, expected: 'a year', description: '547 days = a year' },
      { source: { days: 548 }, expected: '2 years', description: '548 days = 2 years' },
      { source: { week: 1 }, expected: '7 days', description: '1 week = 7 days' },
      { source: { months: 1 }, expected: 'a month', description: '1 month = a month' },
      { source: { months: 5 }, expected: '5 months', description: '5 months = 5 months' },
      { source: { months: 9 }, expected: '9 months', description: '9 months = 5 months' },
      { source: { months: 10 }, expected: 'a year', description: '10 months = a year' },
      { source: { years: 1 }, expected: 'a year', description: '1 year = a year' },
      { source: { years: 5 }, expected: '5 years', description: '5 years = 5 years' },
      { source: 7200000, expected: '2 hours', description: '7200000 = 2 hours' },
    ])('for  "$description" with all units and default parameters', ({ source, expected }) => {
      expectSame((esday) => esday.duration(source).humanize(thresholdAllUnits))
      expect(esday.duration(source).humanize(thresholdAllUnits)).toBe(expected)
    })

    it.each([
      {
        source: { seconds: 44 },
        expected: 'a few seconds',
        description: '44 seconds = a few seconds',
      },
      { source: { seconds: 45 }, expected: 'a minute', description: '45 seconds = a minute' },
      { source: { seconds: 89 }, expected: 'a minute', description: '89 seconds = a minute' },
      { source: { seconds: 90 }, expected: '2 minutes', description: '90 seconds = 2 minutes' },
      { source: { minutes: 44 }, expected: '44 minutes', description: '44 minutes = 44 minutes' },
      { source: { minutes: 45 }, expected: 'an hour', description: '45 minutes = an hour' },
      { source: { minutes: 89 }, expected: 'an hour', description: '89 minutes = an hour' },
      { source: { minutes: 90 }, expected: '2 hours', description: '90 minutes = 2 hours' },
      { source: { hours: 5 }, expected: '5 hours', description: '5 hours = 5 hours' },
      { source: { hours: 21 }, expected: '21 hours', description: '21 hours = 21 hours' },
      { source: { hours: 22 }, expected: 'a day', description: '22 hours = a day' },
      { source: { hours: 35 }, expected: 'a day', description: '35 hours = a day' },
      { source: { hours: 36 }, expected: '2 days', description: '36 hours = 2 days' },
      { source: { days: 1 }, expected: 'a day', description: '1 day = a day' },
      { source: { days: 5 }, expected: '5 days', description: '5 days = 5 days' },
      { source: { days: 6 }, expected: '6 days', description: '6 days = 6 days' },
      { source: { days: 7 }, expected: 'a week', description: '7 days = a week' },
      { source: { days: 25 }, expected: 'a month', description: '25 days = a month' },
      { source: { days: 26 }, expected: 'a month', description: '26 days = a month' },
      { source: { days: 30 }, expected: 'a month', description: '30 days = a month' },
      { source: { days: 45 }, expected: 'a month', description: '45 days = a month' },
      { source: { days: 46 }, expected: '2 months', description: '46 days = 2 months' },
      { source: { days: 74 }, expected: '2 months', description: '74 days = 2 months' },
      { source: { days: 77 }, expected: '3 months', description: '77 days = 3 months' },
      { source: { days: 344 }, expected: 'a year', description: '344 days = a year' },
      { source: { days: 345 }, expected: 'a year', description: '345 days = a year' },
      { source: { days: 547 }, expected: 'a year', description: '547 days = a year' },
      { source: { days: 548 }, expected: '2 years', description: '548 days = 2 years' },
      { source: { week: 1 }, expected: 'a week', description: '1 week = a week' },
      { source: { week: 3 }, expected: '3 weeks', description: '3 weeks = 3 weeks' },
      { source: { week: 4 }, expected: 'a month', description: '4 weeks = a month' },
      { source: { months: 1 }, expected: 'a month', description: '1 month = a month' },
      { source: { months: 5 }, expected: '5 months', description: '5 months = 5 months' },
      { source: { months: 10 }, expected: '10 months', description: '10 months = 10 months' },
      { source: { months: 11 }, expected: 'a year', description: '11 months = a year' },
      { source: { years: 1 }, expected: 'a year', description: '1 year = a year' },
      { source: { years: 5 }, expected: '5 years', description: '5 years = 5 years' },
      { source: 7200000, expected: '2 hours', description: '7200000 = 2 hours' },
    ])('for  "$description" with some units and default parameters', ({ source, expected }) => {
      expectSame((esday) => esday.duration(source).humanize(thresholdSomeUnits))
      expect(esday.duration(source).humanize(thresholdSomeUnits)).toBe(expected)
    })
  })

  describe('Locale', () => {
    it('get locale', () => {
      expectSame((esday) => esday.duration().locale())
      expect(esday.duration().locale()).toBe('en')
    })

    it('set locale', () => {
      const duration = esday.duration({ d: 2 })
      expect(duration.humanize()).toBe('2 days')

      const durationFr = duration.locale('fr')
      expect(duration.humanize()).toBe('2 days')
      expect(durationFr.humanize()).toBe('2 jours')
      expect(durationFr.toISOString()).toBe(duration.toISOString())
    })

    it('get localeObject', () => {
      const durationFr = esday.duration({ d: 2 }).locale('fr')
      const localeObject = durationFr.localeObject()

      expect(localeObject.name).toBe('fr')
      expect(localeObject.relativeTime).toBeDefined()
      expect(localeObject.relativeTime).toBeTypeOf('object')
      expect(Object.keys(localeObject.relativeTime ?? {}).length).toBe(16)
    })
  })
})

describe('duration plugin - using global locale "fr"', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
    // set global locale
    esday.locale('fr')
    moment.locale('fr')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    { source: { minutes: 89 }, expected: 'une heure', description: '89 minutes - une heure' },
    { source: { minutes: 90 }, expected: '2 heures', description: '90 minutes - 2 heures' },
    { source: { hours: 35 }, expected: 'un jour', description: '35 hours - un jour' },
    { source: { hours: 36 }, expected: '2 jours', description: '36 hours - 2 jours' },
    { source: { days: 25 }, expected: '25 jours', description: '25 days - 25 jours' },
    { source: { days: 26 }, expected: 'un mois', description: '26 days - un mois' },
  ])('for  "$description"', ({ source, expected }) => {
    expectSame((esday) => esday.duration(source).humanize())
    expect(esday.duration(source).humanize()).toBe(expected)
  })
})
