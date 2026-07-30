import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { C } from '~/common'
import isoWeekPlugin from '~/plugins/isoWeek'
import { expectSameObject, expectSameValue } from '../util'

esday.extend(isoWeekPlugin)

describe('isoWeek plugin - default locale', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    { sourceString: '2021-01-02', expected: 53, weekday: 'Saturday' },
    { sourceString: '2021-01-02T07:18:29', expected: 53, weekday: 'Saturday' },
    { sourceString: '2023-01-01', expected: 52, weekday: 'Sunday' },
    { sourceString: '2023-01-01T07:18:29', expected: 52, weekday: 'Sunday' },
    { sourceString: '2023-01-02', expected: 1, weekday: 'Monday' },
    { sourceString: '2023-01-02T07:18:29', expected: 1, weekday: 'Monday' },
    { sourceString: '2023-05-08', expected: 19, weekday: 'Monday' },
    { sourceString: '2023-05-08T07:18:29', expected: 19, weekday: 'Monday' },
    { sourceString: '2023-12-17', expected: 50, weekday: 'Sunday' },
    { sourceString: '2023-12-17T07:18:29', expected: 50, weekday: 'Sunday' },
    { sourceString: '2023-12-31', expected: 52, weekday: 'Sunday' },
    { sourceString: '2023-12-31T07:18:29', expected: 52, weekday: 'Sunday' },
  ])('get isoWeek for "$sourceString"', ({ sourceString, expected }) => {
    expectSameValue((esday) => esday(sourceString).isoWeek())
    expect(esday(sourceString).isoWeek()).toBe(expected)
  })

  it('get isoWeeks', () => {
    const sourceString = '2021-01-02T07:18:29'
    const expected = 53

    expectSameValue((esday) => esday(sourceString).isoWeeks())
    expect(esday(sourceString).isoWeeks()).toBe(expected)
  })

  it.each([
    { sourceString: '2025-05-01', newWeek: 1 },
    { sourceString: '2023-04-15', newWeek: 23 },
    { sourceString: '2020-01-01', newWeek: 53 },
  ])('set isoWeek for "$sourceString" to "$newWeek"', ({ sourceString, newWeek }) => {
    const esdaySourceDate = esday(sourceString)
    const esdayTargetDate = esdaySourceDate.isoWeek(newWeek)

    expectSameObject((esday) => esday(sourceString).isoWeek(newWeek))
    expect(esdaySourceDate.day()).toBe(esdayTargetDate.day())
  })

  it('set isoWeeks', () => {
    const sourceString = '2023-04-15'
    const newWeek = 23
    const esdaySourceDate = esday(sourceString)
    const esdayTargetDate = esdaySourceDate.isoWeek(newWeek)

    expectSameObject((esday) => esday(sourceString).isoWeek(newWeek))
    expect(esdaySourceDate.day()).toBe(esdayTargetDate.day())
  })

  it.each([
    { sourceString: '2025-01-06', expected: 1 },
    { sourceString: '2025-12-09', expected: 2 },
    { sourceString: '2025-06-04', expected: 3 },
    { sourceString: '2025-05-01', expected: 4 },
    { sourceString: '2025-10-17', expected: 5 },
    { sourceString: '2025-07-12', expected: 6 },
    { sourceString: '2025-04-13', expected: 7 },
  ])('get isoWeekday for "$sourceString"', ({ sourceString, expected }) => {
    expectSameValue((esday) => esday(sourceString).isoWeekday())
    expect(esday(sourceString).isoWeekday()).toBe(expected)
  })

  it.each([
    { sourceString: '2023-01-01', newIsoWeekday: 1 },
    { sourceString: '2023-01-01', newIsoWeekday: 2 },
    { sourceString: '2023-01-01', newIsoWeekday: 3 },
    { sourceString: '2023-01-01', newIsoWeekday: 4 },
    { sourceString: '2023-01-01', newIsoWeekday: 5 },
    { sourceString: '2023-01-01', newIsoWeekday: 6 },
    { sourceString: '2023-01-01', newIsoWeekday: 7 },
    { sourceString: '2025-05-15', newIsoWeekday: 1 },
    { sourceString: '2025-05-15', newIsoWeekday: 2 },
    { sourceString: '2025-05-15', newIsoWeekday: 3 },
    { sourceString: '2025-05-15', newIsoWeekday: 4 },
    { sourceString: '2025-05-15', newIsoWeekday: 5 },
    { sourceString: '2025-05-15', newIsoWeekday: 6 },
    { sourceString: '2025-05-15', newIsoWeekday: 7 },
    { sourceString: '2025-03-10', newIsoWeekday: -7 },
  ])(
    'set isoWeekday to "$newIsoWeekday" for "$sourceString"',
    ({ sourceString, newIsoWeekday }) => {
      expectSameObject((esday) => esday(sourceString).isoWeekday(newIsoWeekday))
    },
  )

  it.each([
    { sourceString: '2025-01-01', expected: 2025 },
    { sourceString: '2025-12-28', expected: 2025 },
    { sourceString: '2025-12-29', expected: 2026 },
    { sourceString: '2026-12-31', expected: 2026 },
  ])('get isoWeekYear for "$sourceString"', ({ sourceString, expected }) => {
    expectSameValue((esday) => esday(sourceString).isoWeekYear())
    expect(esday(sourceString).isoWeekYear()).toBe(expected)
  })

  it.each([
    { sourceString: '2025-08-20', newIsoYear: 2022, expected: '2022-08-24' },
    { sourceString: '2025-12-31', newIsoYear: 2025, expected: '2025-01-01' },
    { sourceString: '2025-12-31', newIsoYear: 2026, expected: '2025-12-31' },
    { sourceString: '2026-12-31', newIsoYear: 2026, expected: '2026-12-31' },
  ])('set isoWeekYear for "$sourceString" to "$newIsoYear"', ({ sourceString, newIsoYear }) => {
    expectSameObject((esday) => esday(sourceString).isoWeekYear(newIsoYear))
    expect(esday(sourceString).isoWeekYear(newIsoYear).isoWeekYear()).toBe(newIsoYear)
  })

  it.each([
    { sourceDate: '2019-04-25T00:00:00', expected: 52, weekday: 'Tuesday' },
    { sourceDate: '2020-04-25T00:00:00', expected: 53, weekday: 'Wednesday' },
    { sourceDate: '2021-04-25T00:00:00', expected: 52, weekday: 'Friday' },
    { sourceDate: '2022-04-25T00:00:00', expected: 52, weekday: 'Saturday' },
    { sourceDate: '2023-04-25T00:00:00', expected: 52, weekday: 'Sunday' },
    { sourceDate: '2024-04-25T00:00:00', expected: 52, weekday: 'Monday' },
    { sourceDate: '2025-04-25T00:00:00', expected: 52, weekday: 'Wednesday' },
    { sourceDate: '2026-04-25T00:00:00', expected: 53, weekday: 'Thursday' },
  ])('get isoWeeksInYear for "$sourceDate"', ({ sourceDate, expected }) => {
    expect(moment(sourceDate).isoWeeksInYear()).toBe(expected)
    expect(esday(sourceDate).isoWeeksInYear()).toBe(expected)
  })

  it.each([
    {
      sourceString: '2023-11-17T03:24:46.234',
      expectedAsString: '2023-11-13T00:00:00.000',
    },
    {
      sourceString: '2023-11-01T00:00:00.000',
      expectedAsString: '2023-10-30T00:00:00.000',
    },
    {
      sourceString: '2023-01-01T03:24:46.234',
      expectedAsString: '2022-12-26T00:00:00.000',
    },
    {
      sourceString: '2024-01-02T03:24:46.234',
      expectedAsString: '2024-01-01T00:00:00.000',
    },
  ])('get startOf week for "$sourceString"', ({ sourceString, expectedAsString }) => {
    const resultDate = esday(sourceString).startOf(C.ISOWEEK)

    expect(resultDate.format('YYYY-MM-DDTHH:mm:ss.SSS')).toBe(expectedAsString)
    expectSameObject((esday) => esday(sourceString).startOf(C.ISOWEEK))
  })

  it.each([
    { sourceString: '2023-01-01T00:00:00' },
    { sourceString: '2023-01-02T00:00:00' },
    { sourceString: '2023-11-12T00:00:00' },
    { sourceString: '2023-11-13T00:00:00' },
    { sourceString: '2023-11-14T00:00:00' },
    { sourceString: '2023-05-08T00:00:00' },
  ])('handle edge case for startOf week for "$sourceString"', ({ sourceString }) => {
    expectSameObject((esday) => esday(sourceString).startOf(C.ISOWEEK))
  })

  it.each([
    {
      sourceString: '2023-11-17T03:24:46.234',
      expectedAsString: '2023-11-19T23:59:59.999',
    },
    {
      sourceString: '2023-10-31T00:00:00.000',
      expectedAsString: '2023-11-05T23:59:59.999',
    },
    {
      sourceString: '2023-01-01T03:24:46.234',
      expectedAsString: '2023-01-01T23:59:59.999',
    },
    {
      sourceString: '2022-12-31T03:24:46.234',
      expectedAsString: '2023-01-01T23:59:59.999',
    },
  ])('get endOf week for "$sourceString"', ({ sourceString, expectedAsString }) => {
    const resultDate = esday(sourceString).endOf(C.ISOWEEK)

    expect(resultDate.format('YYYY-MM-DDTHH:mm:ss.SSS')).toBe(expectedAsString)
    expectSameObject((esday) => esday(sourceString).endOf(C.ISOWEEK))
  })

  it.each([
    { sourceString: '2023-01-01T00:00:00' },
    { sourceString: '2022-12-31T00:00:00' },
    { sourceString: '2023-11-13T00:00:00' },
    { sourceString: '2023-11-14T00:00:00' },
    { sourceString: '2023-11-15T00:00:00' },
    { sourceString: '2023-05-08T00:00:00' },
  ])('handle edge case for endOf week for "$sourceString"', ({ sourceString }) => {
    expectSameObject((esday) => esday(sourceString).endOf(C.ISOWEEK))
  })

  it.each([
    { sourceString: '2024-12-24T14:25:36', formatString: 'W' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'WW' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'E' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'GG' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'GGGG' },
  ])(
    'format date string "$sourceString" with format "$formatString"',
    ({ sourceString, formatString }) => {
      expectSameValue((esday) => esday(sourceString).format(formatString))
    },
  )

  it.each([
    { sourceString: '2024-12-24T14:25:36', formatString: 'Wo', expected: '52' },
    { sourceString: '2025-01-01T14:25:36', formatString: 'Wo', expected: '1' },
  ])(
    'format date string "$sourceString" with format "$formatString" without locale',
    ({ sourceString, formatString, expected }) => {
      expect(esday(sourceString).format(formatString)).toBe(expected)
    },
  )

  // without plugin AdvancedParse, the new parsing tokens ('W', 'E', 'GG') are ignored
  it.each([
    {
      sourceString: '2025-09-23',
      formatString: 'YYYY-MM-DD',
      expected: '2025-09-23T00:00:00',
    },
    {
      sourceString: '2025-09-23 2',
      formatString: 'YYYY-MM-DD W',
      expected: '2025-09-23T02:00:00',
    },
    {
      sourceString: '2025 12',
      formatString: 'YYYY WW',
      expected: '2025-01-01T12:00:00',
    },
  ])(
    'parse "$sourceString" ignoring unknown tokens in "$formatString" without plugin advancedParse',
    ({ sourceString, formatString, expected }) => {
      const esdayDate = esday(sourceString, formatString)

      expect(esdayDate.format().slice(0, -6)).toBe(expected)
    },
  )
})
