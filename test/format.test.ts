import type { EsDay, FormattingTokenDefinitions } from 'esday'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { C } from '~/common'
import { esday } from '~/core'

describe('format', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('without parameters', () => {
    const formattedOffset = esday().format('Z')
    expect(esday().format()).toBe(`2023-12-17T03:24:46${formattedOffset}`)
  })

  it.each(['', 'otherString'])('invalid date created from "%s"', (value) => {
    expect(esday(value).format()).toBe(C.INVALID_DATE_STRING)
  })

  it.each([
    { formatString: 'YY', expected: '23' },
    { formatString: 'YYYY', expected: '2023' },
  ])('year as "$formatString"', ({ formatString, expected }) => {
    expect(esday().format(formatString)).toBe(expected)
  })

  it.each([
    { formatString: 'M', expected: '8' },
    { formatString: 'MM', expected: '08' },
  ])('single digit month as "$formatString"', ({ formatString, expected }) => {
    vi.setSystemTime(new Date('2023-08-17T03:24:46.234'))

    expect(esday().format(formatString)).toBe(expected)
  })

  it.each([
    { formatString: 'M', expected: '12' },
    { formatString: 'MM', expected: '12' },
  ])('double digit month as "$formatString"', ({ formatString, expected }) => {
    expect(esday().format(formatString)).toBe(expected)
  })

  it.each([
    { formatString: 'D', expected: '7' },
    { formatString: 'DD', expected: '07' },
  ])('single digit day of month as "$formatString"', ({ formatString, expected }) => {
    vi.setSystemTime(new Date('2023-12-07T03:24:46.234'))

    expect(esday().format(formatString)).toBe(expected)
  })

  it.each([
    { formatString: 'D', expected: '17' },
    { formatString: 'DD', expected: '17' },
  ])('double digit day of month as "$formatString"', ({ formatString, expected }) => {
    expect(esday().format(formatString)).toBe(expected)
  })

  it.each([
    { formatString: 'H', expected: '3' },
    { formatString: 'HH', expected: '03' },
  ])('single digit hour as "$formatString"', ({ formatString, expected }) => {
    expect(esday().format(formatString)).toBe(expected)
  })

  it.each([
    { formatString: 'H', expected: '23' },
    { formatString: 'HH', expected: '23' },
  ])('double digit hour as "$formatString"', ({ formatString, expected }) => {
    vi.setSystemTime(new Date('2023-12-17T23:24:46.234'))

    expect(esday().format(formatString)).toBe(expected)
  })

  it.each([
    { formatString: 'm', expected: '5' },
    { formatString: 'mm', expected: '05' },
  ])('single digit minute as "$formatString"', ({ formatString, expected }) => {
    vi.setSystemTime(new Date('2023-12-17T03:05:46.234'))

    expect(esday().format(formatString)).toBe(expected)
  })

  it.each([
    { formatString: 'm', expected: '24' },
    { formatString: 'mm', expected: '24' },
  ])('double digit minute as "$formatString"', ({ formatString, expected }) => {
    expect(esday().format(formatString)).toBe(expected)
  })

  it.each([
    { formatString: 's', expected: '1' },
    { formatString: 'ss', expected: '01' },
  ])('single digit second as "$formatString"', ({ formatString, expected }) => {
    const date = '2011-11-05T14:48:01.002'

    expect(esday(date).format(formatString)).toBe(expected)
  })

  it.each([
    { formatString: 's', expected: '46' },
    { formatString: 'ss', expected: '46' },
  ])('double digit second as "$formatString"', ({ formatString, expected }) => {
    expect(esday().format(formatString)).toBe(expected)
  })

  it('millisecond as "SSS"', () => {
    expect(esday().format('SSS')).toBe('234')
  })

  it.each([
    { formatString: 'YYYY-MM', expected: '2023-12' },
    { formatString: 'YYYY-MM-DD', expected: '2023-12-17' },
    { formatString: 'YYYY-MM-DD HH', expected: '2023-12-17 03' },
    { formatString: 'YYYY-MM-DD HH:mm', expected: '2023-12-17 03:24' },
    { formatString: 'YYYY-MM-DD HH:mm:ss', expected: '2023-12-17 03:24:46' },
    {
      formatString: 'YYYY-MM-DD HH:mm:ss.SSS',
      expected: '2023-12-17 03:24:46.234',
    },
    { formatString: 'YY-M-D / HH:mm:ss', expected: '23-12-17 / 03:24:46' },
  ])('date and time as "$formatString"', ({ formatString, expected }) => {
    expect(esday().format(formatString)).toBe(expected)
  })

  it('current date and time using "Z" to "nn:mm"', () => {
    const esdayDate = esday()
    const format = 'Z'

    expect(esdayDate.format(format)).toMatch(/[+-]\d{2}:\d{2}/)
  })
})

describe('extend formatting token definitions', () => {
  it.each([
    {
      formatString: 'YYYY PP',
      sourceString: '2024 3',
      expected: '2024 [special token PP] 2024',
    },
  ])('add new token to list of tokens - test with "$sourceString" with format "$formatString"', ({
    sourceString,
    formatString,
    expected,
  }) => {
    const additionalTokens: FormattingTokenDefinitions = {
      PP: (sourceDate: EsDay) => `[special token PP] ${sourceDate.year().toString()}`,
    }
    esday.addFormatTokenDefinitions(additionalTokens)
    const formattedDate = esday(sourceString).format(formatString)

    expect(formattedDate).toBe(expected)
  })

  it('adding existing token should not change existing definition', () => {
    const additionalTokens: FormattingTokenDefinitions = {
      YYYY: (sourceDate: EsDay) => `[modified token YYYY] ${sourceDate.year.toString()}`,
    }
    esday.addFormatTokenDefinitions(additionalTokens)
    const sourceString = '2024'
    const formatString = 'YYYY'
    const expected = '2024'
    const formattedDate = esday(sourceString).format(formatString)

    expect(formattedDate).toBe(expected)
  })
})
