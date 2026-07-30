import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { UnitTypeGetSet } from '~/common/units'
import localeDe from '~/locales/de'
import localeEn from '~/locales/en'
import advancedParsePlugin from '~/plugins/advancedParse'
import localePlugin from '~/plugins/locale'
import utcPlugin from '~/plugins/utc'
import weekPlugin from '~/plugins/week'
import { expectSameObject, expectSameValue } from '../util'

esday.extend(utcPlugin).extend(advancedParsePlugin).extend(weekPlugin).extend(localePlugin)

esday.registerLocale(localeEn)
esday.registerLocale(localeDe)

describe('week plugin - locale en', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234Z'

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
      expectSameValue((esday) => esday.utc(sourceString).get(unitAsUnitType))
      expect(esday.utc(sourceString).get(unitAsUnitType)).toBe(expected)
    },
  )

  it.each([
    { sourceString: '2025-05-01', unit: 'w', newWeek: 1 },
    { sourceString: '2024-06-15', unit: 'week', newWeek: 10 },
    { sourceString: '2022-05-16', unit: 'weeks', newWeek: 53 },
  ])(
    'should set the week number  for "$sourceString" to "$newWeek" using set("$unit")',
    ({ sourceString, unit, newWeek }) => {
      const unitAsUnitType = unit as UnitTypeGetSet
      const esdaySourceDate = esday.utc(sourceString)
      const esdayTargetDate = esdaySourceDate.set(unitAsUnitType, newWeek)

      expectSameObject((esday) => esday.utc(sourceString).set(unitAsUnitType, newWeek))
      expect(esdaySourceDate.day()).toBe(esdayTargetDate.day())
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
      expectSameObject((esday) => esday.utc(sourceString, formatString))
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
      expectSameObject((esday) => esday.utc(sourceString, formatString))
    },
  )

  it.each([
    { sourceString: '24', formatString: 'gg' },
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
      expectSameObject((esday) => esday.utc(sourceString, formatString))
    },
  )
})

describe('week plugin - locale de', () => {
  const fakeTimeAsString = '2023-12-18T03:24:46.234Z'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    // set global locale
    esday.locale('de')
    moment.locale('de')
  })

  afterEach(() => {
    vi.useRealTimers()
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
      expectSameValue((esday) => esday.utc(sourceString).get(unitAsUnitType))
      expect(esday.utc(sourceString).get(unitAsUnitType)).toBe(expected)
    },
  )

  it.each([
    { sourceString: '2025-05-01', unit: 'w', newWeek: 1 },
    { sourceString: '2024-06-15', unit: 'week', newWeek: 10 },
    { sourceString: '2022-05-16', unit: 'weeks', newWeek: 53 },
    { sourceString: '2020-07-16', unit: 'weeks', newWeek: 53 },
  ])(
    'should set the week number  for "$sourceString" to "$newWeek" using set("$unit")',
    ({ sourceString, unit, newWeek }) => {
      const unitAsUnitType = unit as UnitTypeGetSet
      const esdaySourceDate = esday.utc(sourceString)
      const esdayTargetDate = esdaySourceDate.set(unitAsUnitType, newWeek)

      expectSameObject((esday) => esday.utc(sourceString).set(unitAsUnitType, newWeek))
      expect(esdaySourceDate.day()).toBe(esdayTargetDate.day())
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
      expectSameObject((esday) => esday.utc(sourceString, formatString))
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
      expectSameObject((esday) => esday.utc(sourceString, formatString))
    },
  )

  it.each([
    { sourceString: '2025 0', formatString: 'YYYY d' },
    { sourceString: '2025 1', formatString: 'YYYY d' },
    { sourceString: '2025 12 1', formatString: 'YYYY MM d' },
  ])(
    'parse "$sourceString" with day-of-week token in "$formatString"',
    ({ sourceString, formatString }) => {
      expectSameObject((esday) => esday(sourceString, formatString))
      expect(esday(sourceString, formatString).isValid()).toBeTruthy()
    },
  )

  it('parse illegal day-of-week value', () => {
    const sourceString = '2025 12 2'
    const formatString = 'YYYY MM d'

    expectSameValue((esday) => esday(sourceString, formatString).isValid())
    expect(esday(sourceString, formatString).isValid()).toBeFalsy()
  })

  it.each([
    { sourceString: '24', formatString: 'gg' },
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
      expectSameObject((esday) => esday.utc(sourceString, formatString))
    },
  )
})
