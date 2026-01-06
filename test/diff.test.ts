import { esday } from 'esday'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { C } from '~/common'
import type { UnitTypeAddSub } from '~/common/units'
import { expectSameValue } from './util'

describe('Difference', () => {
  const fakeTimeAsString = '2025-03-17T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([{ sourceString: '20240101' }, { sourceString: '2023-02-08' }])(
    'diff for "$sourceString"with default parameters (returns milliseconds)',
    ({ sourceString }) => {
      expectSameValue((esday) => esday().diff(esday(sourceString)))
    },
  )

  it.each([
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.MS,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.SECOND,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.MIN,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.HOUR,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.DAY,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.WEEK,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.MONTH,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: 'months',
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.QUARTER,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: 'quarters',
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.YEAR,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: 'years',
    },
  ])(
    'diff for B > A in unit "$resultUnit"',
    ({ sourceString, sourceDiffValue, sourceDiffUnit, resultUnit }) => {
      expectSameValue((esday) =>
        esday(sourceString).diff(
          esday(sourceString).add(sourceDiffValue, sourceDiffUnit),
          resultUnit as UnitTypeAddSub,
        ),
      )
    },
  )

  it.each([
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.MS,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.SECOND,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.MIN,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.HOUR,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.DAY,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.WEEK,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.MONTH,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.QUARTER,
    },
    {
      sourceString: '2013-02-08T13:24:35.789',
      sourceDiffValue: 1000,
      sourceDiffUnit: C.DAY,
      resultUnit: C.YEAR,
    },
  ])(
    'diff for B < A in unit "$resultUnit"',
    ({ sourceString, sourceDiffValue, sourceDiffUnit, resultUnit }) => {
      expectSameValue((esday) =>
        esday(sourceString).diff(
          esday(sourceString).subtract(sourceDiffValue, sourceDiffUnit),
          resultUnit,
        ),
      )
    },
  )

  it.each([
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2013-02-08T13:24:35.789',
      resultUnit: C.MS,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2013-02-08T13:24:35.789',
      resultUnit: C.SECOND,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2013-02-08T13:24:35.789',
      resultUnit: C.MIN,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2013-02-08T13:24:35.789',
      resultUnit: C.HOUR,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2013-02-08T13:24:35.789',
      resultUnit: C.DAY,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2013-02-08T13:24:35.789',
      resultUnit: C.WEEK,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2013-02-08T13:24:35.789',
      resultUnit: C.MONTH,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2013-02-08T13:24:35.789',
      resultUnit: C.QUARTER,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2013-02-08T13:24:35.789',
      resultUnit: C.YEAR,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2014-01-08T13:24:35.789',
      resultUnit: C.MS,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2014-01-08T13:24:35.789',
      resultUnit: C.SECOND,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2014-01-08T13:24:35.789',
      resultUnit: C.MIN,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2014-01-08T13:24:35.789',
      resultUnit: C.HOUR,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2014-01-08T13:24:35.789',
      resultUnit: C.DAY,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2014-01-08T13:24:35.789',
      resultUnit: C.WEEK,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2014-01-08T13:24:35.789',
      resultUnit: C.MONTH,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2014-01-08T13:24:35.789',
      resultUnit: C.QUARTER,
    },
    {
      sourceString1: '2013-02-08T13:24:35.789',
      sourceString2: '2014-01-08T13:24:35.789',
      resultUnit: C.YEAR,
    },
  ])('diff in unit "$resultUnit" as float', ({ sourceString1, sourceString2, resultUnit }) => {
    expectSameValue((esday) => esday(sourceString1).diff(esday(sourceString2), resultUnit, true))
  })

  it.each([
    { resultUnit: 'milliseconds' },
    { resultUnit: 'ms' },
    { resultUnit: 'minutes' },
    { resultUnit: 'm' },
    { resultUnit: 'hours' },
    { resultUnit: 'h' },
    { resultUnit: 'days' },
    { resultUnit: 'd' },
    { resultUnit: 'dates' },
    { resultUnit: 'D' },
    { resultUnit: 'months' },
    { resultUnit: 'M' },
    { resultUnit: 'quarters' },
    { resultUnit: 'Q' },
    { resultUnit: 'years' },
    { resultUnit: 'y' },
  ])('should handle plural units "$resultUnit"', ({ resultUnit }) => {
    const sourceDiffValue = 1000

    expectSameValue((esday) =>
      esday().diff(esday().add(sourceDiffValue, C.DAY), resultUnit as UnitTypeAddSub),
    )
  })

  it.each([
    { sourceString1: '2024-08-08', sourceString2: '2024-08-08', expected: 0 },
    { sourceString1: '2024-09-08', sourceString2: '2024-08-08', expected: 1 },
    { sourceString1: '2024-08-08', sourceString2: '2024-09-08', expected: -1 },
    { sourceString1: '2024-01-01', sourceString2: '2024-01-01', expected: 0 },
  ])(
    'diff in "months" between "$sourceString1" and "$sourceString2" - testing internal  monthDiff function',
    ({ sourceString1, sourceString2, expected }) => {
      expectSameValue((esday) => esday(sourceString1).diff(esday(sourceString2), C.MONTH))
      expect(esday(sourceString1).diff(esday(sourceString2), 'month')).toBe(expected)
    },
  )
})
