import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { C } from '~/common'
import type { UnitTypeGetSet } from '~/common/units'
import localeEn from '~/locales/en'
import advancedParsePlugin from '~/plugins/advancedParse'
import localePlugin from '~/plugins/locale'
import localizedFormatPlugin from '~/plugins/localizedFormat'
import localizedParsePlugin from '~/plugins/localizedParse'
import weekPlugin from '~/plugins/week'
import { expectSameObject, expectSameValue } from '../util'

esday
  .extend(advancedParsePlugin)
  .extend(localizedParsePlugin)
  .extend(localizedFormatPlugin)
  .extend(weekPlugin)
  .extend(localePlugin)
esday.registerLocale(localeEn)

// Tests with Sunday as start of week
describe('week plugin - locale "en"', () => {
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

  it.each([
    { sourceString: '2024-03-29', expected: 13, weekday: 'Friday' },
    { sourceString: '2024-03-30', expected: 13, weekday: 'Saturday' },
    { sourceString: '2024-03-31', expected: 14, weekday: 'Sunday' },
    { sourceString: '2024-04-01', expected: 14, weekday: 'Monday' },
    { sourceString: '2025-04-02', expected: 14, weekday: 'Tuesday' },
    { sourceString: '2024-04-05', expected: 14, weekday: 'Friday' },
    { sourceString: '2024-04-06', expected: 14, weekday: 'Saturday' },
    { sourceString: '2024-04-07', expected: 15, weekday: 'Sunday' },
    { sourceString: '2024-04-08', expected: 15, weekday: 'Monday' },
    { sourceString: '2025-04-09', expected: 15, weekday: 'Tuesday' },
    { sourceString: '2024-06-10', expected: 24, weekday: 'Monday' },
    { sourceString: '2024-06-11', expected: 24, weekday: 'Tuesday' },
    { sourceString: '2024-06-12', expected: 24, weekday: 'Wednesday' },
    { sourceString: '2024-06-13', expected: 24, weekday: 'Thursday' },
    { sourceString: '2024-06-14', expected: 24, weekday: 'Friday' },
    { sourceString: '2024-06-15', expected: 24, weekday: 'Saturday' },
    { sourceString: '2024-06-16', expected: 25, weekday: 'Sunday' },
    { sourceString: '2024-06-17', expected: 25, weekday: 'Monday' },
    { sourceString: '2025-06-18', expected: 25, weekday: 'Tuesday' },
    { sourceString: '2025-06-19', expected: 25, weekday: 'Wednesday' },
    { sourceString: '2025-06-20', expected: 25, weekday: 'Thursday' },
  ])('should get week number for "$sourceString" using week()', ({ sourceString, expected }) => {
    expectSameValue((esday) => esday(sourceString).week())
    expect(esday(sourceString).week()).toBe(expected)
  })

  it('get weeks', () => {
    const sourceString = '2024-04-06'
    const expected = 14

    expectSameValue((esday) => esday(sourceString).weeks())
    expect(esday(sourceString).weeks()).toBe(expected)
  })

  it.each([
    { sourceString: '2024-03-29T07:18:29', expected: 13, weekday: 'Friday' },
    { sourceString: '2024-03-30T07:18:29', expected: 13, weekday: 'Saturday' },
    { sourceString: '2024-03-31T07:18:29', expected: 14, weekday: 'Sunday' },
    { sourceString: '2024-04-01T07:18:29', expected: 14, weekday: 'Monday' },
    { sourceString: '2025-04-02T07:18:29', expected: 14, weekday: 'Tuesday' },
    { sourceString: '2024-04-05T07:18:29', expected: 14, weekday: 'Friday' },
    { sourceString: '2024-04-06T07:18:29', expected: 14, weekday: 'Saturday' },
    { sourceString: '2024-04-07T07:18:29', expected: 15, weekday: 'Sunday' },
    { sourceString: '2024-04-08T07:18:29', expected: 15, weekday: 'Monday' },
    { sourceString: '2025-04-09T07:18:29', expected: 15, weekday: 'Tuesday' },
    { sourceString: '2024-06-10T07:18:29', expected: 24, weekday: 'Monday' },
    { sourceString: '2024-06-11T07:18:29', expected: 24, weekday: 'Tuesday' },
    { sourceString: '2024-06-12T07:18:29', expected: 24, weekday: 'Wednesday' },
    { sourceString: '2024-06-13T07:18:29', expected: 24, weekday: 'Thursday' },
    { sourceString: '2024-06-14T07:18:29', expected: 24, weekday: 'Friday' },
    { sourceString: '2024-06-15T07:18:29', expected: 24, weekday: 'Saturday' },
    { sourceString: '2024-06-16T07:18:29', expected: 25, weekday: 'Sunday' },
    { sourceString: '2024-06-17T07:18:29', expected: 25, weekday: 'Monday' },
    { sourceString: '2025-06-18T07:18:29', expected: 25, weekday: 'Tuesday' },
    { sourceString: '2025-06-19T07:18:29', expected: 25, weekday: 'Wednesday' },
    { sourceString: '2025-06-20T07:18:29', expected: 25, weekday: 'Thursday' },
  ])('should get week number for "$sourceString" with time part', ({ sourceString, expected }) => {
    expectSameValue((esday) => esday(sourceString).week())
    expect(esday(sourceString).week()).toBe(expected)
  })

  it.each([
    { sourceString: '2024-06-10', unit: 'w', expected: 24, weekday: 'Monday' },
    {
      sourceString: '2024-06-11',
      unit: 'week',
      expected: 24,
      weekday: 'Tuesday',
    },
    {
      sourceString: '2024-06-12',
      unit: 'weeks',
      expected: 24,
      weekday: 'Wednesday',
    },
  ])(
    'should get week number for "$sourceString" using get("$unit")',
    ({ sourceString, unit, expected }) => {
      const unitAsUnitType = unit as UnitTypeGetSet
      expectSameValue((esday) => esday(sourceString).get(unitAsUnitType))
      expect(esday(sourceString).get(unitAsUnitType)).toBe(expected)
    },
  )

  it.each([
    { sourceString: '2022-12-31', expected: 53, weekday: 'Saturday' },
    { sourceString: '2023-01-01', expected: 1, weekday: 'Sunday' },
    { sourceString: '2023-12-31', expected: 1, weekday: 'Sunday' },
    { sourceString: '2024-01-01', expected: 1, weekday: 'Monday' },
    { sourceString: '2024-12-29', expected: 1, weekday: 'Friday' },
    { sourceString: '2024-12-30', expected: 1, weekday: 'Saturday' },
    { sourceString: '2024-12-31', expected: 1, weekday: 'Tuesday' },
    { sourceString: '2025-01-01', expected: 1, weekday: 'Wednesday' },
  ])(
    'should get week number for year transition for "$sourceString"',
    ({ sourceString, expected }) => {
      expectSameValue((esday) => esday(sourceString).week())
      expect(esday(sourceString).week()).toBe(expected)
    },
  )

  it.each([
    { sourceString: '2025-05-01', newWeek: 1 },
    { sourceString: '2024-06-15', newWeek: 10 },
    { sourceString: '2022-05-16', newWeek: 53 },
  ])(
    'should set the week number  for "$sourceString" to "$newWeek" using week()',
    ({ sourceString, newWeek }) => {
      const esdaySourceDate = esday(sourceString)
      const esdayTargetDate = esdaySourceDate.week(newWeek)

      expectSameObject((esday) => esday(sourceString).week(newWeek))
      expect(esdaySourceDate.day()).toBe(esdayTargetDate.day())
    },
  )

  it('set weeks', () => {
    const sourceString = '2024-06-15'
    const newWeek = 10
    const esdaySourceDate = esday(sourceString)
    const esdayTargetDate = esdaySourceDate.week(newWeek)

    expectSameObject((esday) => esday(sourceString).week(newWeek))
    expect(esdaySourceDate.day()).toBe(esdayTargetDate.day())
  })

  it.each([
    { sourceString: '2025-05-01', unit: 'w', newWeek: 1 },
    { sourceString: '2024-06-15', unit: 'week', newWeek: 10 },
    { sourceString: '2022-05-16', unit: 'weeks', newWeek: 53 },
  ])(
    'should set the week number  for "$sourceString" to "$newWeek" using set("$unit")',
    ({ sourceString, unit, newWeek }) => {
      const unitAsUnitType = unit as UnitTypeGetSet
      const esdaySourceDate = esday(sourceString)
      const esdayTargetDate = esdaySourceDate.set(unitAsUnitType, newWeek)

      expectSameObject((esday) => esday(sourceString).set(unitAsUnitType, newWeek))
      expect(esdaySourceDate.day()).toBe(esdayTargetDate.day())
    },
  )

  it.each([
    { sourceString: '2025-01-05', expected: 0 },
    { sourceString: '2025-12-08', expected: 1 },
    { sourceString: '2025-06-03', expected: 2 },
    { sourceString: '2025-10-01', expected: 3 },
    { sourceString: '2025-10-16', expected: 4 },
    { sourceString: '2025-07-11', expected: 5 },
    { sourceString: '2025-04-12', expected: 6 },
  ])('should get weekday for "$sourceString"', ({ sourceString, expected }) => {
    expectSameValue((esday) => esday(sourceString).weekday())
    expect(esday(sourceString).weekday()).toBe(expected)
  })

  it.each([
    { sourceString: '2023-01-01', newWeekday: 0 },
    { sourceString: '2023-01-01', newWeekday: 1 },
    { sourceString: '2023-01-01', newWeekday: 2 },
    { sourceString: '2023-01-01', newWeekday: 3 },
    { sourceString: '2023-01-01', newWeekday: 4 },
    { sourceString: '2023-01-01', newWeekday: 5 },
    { sourceString: '2023-01-01', newWeekday: 6 },
    { sourceString: '2025-05-15', newWeekday: 0 },
    { sourceString: '2025-05-15', newWeekday: 1 },
    { sourceString: '2025-05-15', newWeekday: 2 },
    { sourceString: '2025-05-15', newWeekday: 3 },
    { sourceString: '2025-05-15', newWeekday: 4 },
    { sourceString: '2025-05-15', newWeekday: 5 },
    { sourceString: '2025-05-15', newWeekday: 6 },
    { sourceString: '2025-03-10', newWeekday: -7 },
  ])('should set weekday to "$newWeekday" for "$sourceString"', ({ sourceString, newWeekday }) => {
    expectSameObject((esday) => esday(sourceString).weekday(newWeekday))
  })

  it.each([
    { sourceString: '2025-01-01', expected: 2025 },
    { sourceString: '2025-12-27', expected: 2025 },
    { sourceString: '2025-12-28', expected: 2026 },
    { sourceString: '2026-12-31', expected: 2027 },
  ])('should get weekYear for "$sourceString"', ({ sourceString, expected }) => {
    expectSameValue((esday) => esday(sourceString).weekYear())
    expect(esday(sourceString).weekYear()).toBe(expected)
  })

  it.each([
    { sourceString: '2025-08-20', newIsoYear: 2022, expected: '2022-08-24' },
    { sourceString: '2025-12-31', newIsoYear: 2025, expected: '2025-01-01' },
    { sourceString: '2025-12-31', newIsoYear: 2026, expected: '2025-12-31' },
    { sourceString: '2026-12-31', newIsoYear: 2026, expected: '2026-12-31' },
  ])(
    'should set the weekYear for "$sourceString" to "$newIsoYear"',
    ({ sourceString, newIsoYear }) => {
      expectSameObject((esday) => esday(sourceString).weekYear(newIsoYear))
      expect(esday(sourceString).weekYear(newIsoYear).weekYear()).toBe(newIsoYear)
    },
  )

  // 1st day of week: Sunday; 1st week of year contains January 1st
  it.each([
    { sourceDate: '2016-04-25T00:00:00', expected: 53, weekday: 'Friday' },
    { sourceDate: '2019-04-25T00:00:00', expected: 52, weekday: 'Tuesday' },
    { sourceDate: '2020-04-25T00:00:00', expected: 52, weekday: 'Wednesday' },
    { sourceDate: '2021-04-25T00:00:00', expected: 52, weekday: 'Friday' },
    { sourceDate: '2022-04-25T00:00:00', expected: 53, weekday: 'Saturday' }, // Saturday ********
    { sourceDate: '2023-04-25T00:00:00', expected: 52, weekday: 'Sunday' },
    { sourceDate: '2024-04-25T00:00:00', expected: 52, weekday: 'Monday' },
    { sourceDate: '2025-04-25T00:00:00', expected: 52, weekday: 'Wednesday' },
    { sourceDate: '2026-04-25T00:00:00', expected: 52, weekday: 'Thursday' },
    { sourceDate: '2027-04-25T00:00:00', expected: 52, weekday: 'Friday' },
    { sourceDate: '2028-04-25T00:00:00', expected: 53, weekday: 'Saturday' }, // Saturday ********
    { sourceDate: '2044-04-25T00:00:00', expected: 53, weekday: 'Friday' }, // Friday in leap year ********
  ])('should get weeksInYear for "$sourceDate"', ({ sourceDate, expected }) => {
    expect(moment(sourceDate).weeksInYear()).toBe(expected)
    expect(esday(sourceDate).weeksInYear()).toBe(expected)
  })

  it.each([
    {
      sourceString: '2023-11-17T03:24:46.234',
      expectedAsString: '2023-11-12T00:00:00.000',
    },
    {
      sourceString: '2023-11-01T00:00:00.000',
      expectedAsString: '2023-10-29T00:00:00.000',
    },
    {
      sourceString: '2023-01-01T03:24:46.234',
      expectedAsString: '2023-01-01T00:00:00.000',
    },
    {
      sourceString: '2024-01-02T03:24:46.234',
      expectedAsString: '2023-12-31T00:00:00.000',
    },
  ])('should get startOf week for "$sourceString"', ({ sourceString, expectedAsString }) => {
    const resultDate = esday(sourceString).startOf(C.WEEK)

    expect(resultDate.format('YYYY-MM-DDTHH:mm:ss.SSS')).toBe(expectedAsString)
    expectSameObject((esday) => esday(sourceString).startOf(C.WEEK))
  })

  it.each([
    { sourceString: '2024-01-01T00:00:00' },
    { sourceString: '2023-12-31T00:00:00' },
    { sourceString: '2023-11-12T00:00:00' },
    { sourceString: '2023-11-13T00:00:00' },
    { sourceString: '2023-11-14T00:00:00' },
    { sourceString: '2023-05-07T00:00:00' },
  ])('should handle edge case for startOf week for "$sourceString"', ({ sourceString }) => {
    expectSameObject((esday) => esday(sourceString).startOf(C.WEEK))
  })

  it.each([
    {
      sourceString: '2023-11-17T03:24:46.234',
      expectedAsString: '2023-11-18T23:59:59.999',
    },
    {
      sourceString: '2023-10-30T00:00:00.000',
      expectedAsString: '2023-11-04T23:59:59.999',
    },
    {
      sourceString: '2023-01-01T03:24:46.234',
      expectedAsString: '2023-01-07T23:59:59.999',
    },
    {
      sourceString: '2023-12-31T03:24:46.234',
      expectedAsString: '2024-01-06T23:59:59.999',
    },
  ])('should get endOf week for "$sourceString"', ({ sourceString, expectedAsString }) => {
    const resultDate = esday(sourceString).endOf(C.WEEK)

    expect(resultDate.format('YYYY-MM-DDTHH:mm:ss.SSS')).toBe(expectedAsString)
    expectSameObject((esday) => esday(sourceString).endOf(C.WEEK))
  })

  it.each([
    { sourceString: '2024-01-01T00:00:00' },
    { sourceString: '2023-12-31T00:00:00' },
    { sourceString: '2023-11-12T00:00:00' },
    { sourceString: '2023-11-13T00:00:00' },
    { sourceString: '2023-11-14T00:00:00' },
    { sourceString: '2023-05-07T00:00:00' },
  ])('should handle edge case for endOf week for "$sourceString"', ({ sourceString }) => {
    expectSameObject((esday) => esday(sourceString).endOf(C.WEEK))
  })

  it.each([
    { sourceString: '2024-12-24T14:25:36', formatString: 'w' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'ww' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'wo' },
    { sourceString: '2025-01-01T14:25:36', formatString: 'wo' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'e' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'gg' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'gggg' },
  ])(
    'should format date string "$sourceString" with format "$formatString"',
    ({ sourceString, formatString }) => {
      expectSameValue((esday) => esday(sourceString).format(formatString))
    },
  )

  it.each([
    { sourceString: '2025-10-24 2', formatString: 'YYYY-MM-DD w' },
    { sourceString: '2025 2', formatString: 'YYYY w' },
    { sourceString: '2025 02', formatString: 'YYYY w' },
    { sourceString: '2025 02', formatString: 'YYYY ww' },
    { sourceString: '2025 12', formatString: 'YYYY ww' },
  ])(
    'should parse "$sourceString" with week token in "$formatString"',
    ({ sourceString, formatString }) => {
      expectSameObject((esday) => esday(sourceString, formatString))
    },
  )

  it.each([
    { sourceString: '2025-10-24 2', formatString: 'YYYY-MM-DD e' },
    { sourceString: '2025 0', formatString: 'YYYY e' },
    { sourceString: '2025 1', formatString: 'YYYY e' },
    { sourceString: '2025 2', formatString: 'YYYY e' },
    { sourceString: '2025 3', formatString: 'YYYY e' },
    { sourceString: '2025 4', formatString: 'YYYY e' },
    { sourceString: '2025 5', formatString: 'YYYY e' },
    { sourceString: '2025 6', formatString: 'YYYY e' },
  ])(
    'parse "$sourceString" with weekday token in "$formatString"',
    ({ sourceString, formatString }) => {
      expectSameObject((esday) => esday(sourceString, formatString))
    },
  )

  it('parse illegal weekday value', () => {
    const sourceString = '2025 7'
    const formatString = 'YYYY e'

    expectSameValue((esday) => esday(sourceString, formatString).isValid())
    expect(esday(sourceString, formatString).isValid()).toBeFalsy()
  })

  it.each([
    { sourceString: '2025 0', formatString: 'YYYY d' },
    { sourceString: '2025 1', formatString: 'YYYY d' },
    { sourceString: '2025 12 1', formatString: 'YYYY MM d' },
    {
      sourceString: '2024 12 24 Tu 14:25:36',
      formatString: 'YYYY MM DD dd HH:mm:ss',
    },
    {
      sourceString: '2024 12 24 Tue 14:25:36',
      formatString: 'YYYY MM DD ddd HH:mm:ss',
    },
    {
      sourceString: '2024 12 24 Tuesday 14:25:36',
      formatString: 'YYYY MM DD dddd HH:mm:ss',
    },
    { sourceString: '2024 Tuesday', formatString: 'YYYY dddd' },
    { sourceString: '2024 Tuesday 15:26', formatString: 'YYYY dddd HH:mm' },
    { sourceString: '2024 12 Sunday', formatString: 'YYYY MM dddd' },
  ])(
    'parse "$sourceString" with day-of-week token in "$formatString"',
    ({ sourceString, formatString }) => {
      expectSameObject((esday) => esday(sourceString, formatString))
      expect(esday(sourceString, formatString).isValid()).toBeTruthy()
    },
  )

  it.each([
    { sourceString: '2025 12 2', formatString: 'YYYY MM d' },
    {
      sourceString: '2024 12 24 Wed 14:25:36',
      formatString: 'YYYY MM DD ddd HH:mm:ss',
    },
  ])('parse illegal day-of-week value', ({ sourceString, formatString }) => {
    expectSameValue((esday) => esday(sourceString, formatString).isValid())
    expect(esday(sourceString, formatString).isValid()).toBeFalsy()
  })

  it('parse in strict mode - good format', () => {
    const sourceString = '2024 Dec 24th Tuesday 8:10:21 PM'
    const formatString = 'YYYY MMM Do dddd h:mm:ss A'

    expect(esday(sourceString, formatString, true).isValid()).toBeTruthy()
    expectSameObject((esday) => esday(sourceString, formatString, true))
  })

  it('does not parse in strict mode - bad format', () => {
    const sourceString = '2024 Dec 24th Tuesday 8:10:21'
    const formatString = 'YYYY MMM Do dddd h:mm:ss A'

    expect(esday(sourceString, formatString, true).isValid()).toBeFalsy()
    expectSameValue((esday) => esday(sourceString, formatString, true).isValid())
  })

  it.each([
    { sourceString: '24', formatString: 'gg' },
    { sourceString: '74', formatString: 'gg' },
    { sourceString: '2024', formatString: 'gg' },
    { sourceString: '2025 2', formatString: 'gg M' },
    { sourceString: '25-10-24', formatString: 'gg-MM-DD' },
    { sourceString: '2025-10-24', formatString: 'gg-MM-DD' },
    { sourceString: '25 22', formatString: 'gg DD' },
    { sourceString: '2025 22', formatString: 'gg DD' },
    { sourceString: '22 2025', formatString: 'ww gg' },
    { sourceString: '22 25', formatString: 'ww gg' },
    { sourceString: '2025 22 4', formatString: 'gg ww e' },
    { sourceString: '2020', formatString: 'gggg' },
    { sourceString: '2024', formatString: 'gggg' },
    { sourceString: '2025 2', formatString: 'gggg M' },
    { sourceString: '2025 06-24', formatString: 'gggg MM-DD' },
    { sourceString: '2025-10-24', formatString: 'gggg-MM-DD' },
    { sourceString: '2025 22', formatString: 'gggg DD' },
    { sourceString: '22 2025', formatString: 'ww gggg' },
    { sourceString: '2025 22 4', formatString: 'gggg ww e' },
  ])(
    'should parse "$sourceString" with weekYear token in "$formatString"',
    ({ sourceString, formatString }) => {
      expectSameObject((esday) => esday(sourceString, formatString))
    },
  )
})
