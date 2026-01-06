import { esday } from 'esday'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import advancedFormatPlugin from '~/plugins/advancedFormat'
import { expectSameValue } from '../util'

esday.extend(advancedFormatPlugin)

describe('advancedFormat plugin', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('does not break core module without template', () => {
    const sourceString = '2023-08-14T21:43:12.123'

    expectSameValue((esday) => esday(sourceString).format())
  })

  it.each([
    {
      sourceString: '2023-08-14T21:43:12.123',
      formatString: 'MM-YYYY-DD HH:mm:ss.SSS',
      expected: '08-2023-14 21:43:12.123',
    },
    {
      sourceString: '2023-08-14T21:43:12.123',
      formatString: 'YYYY-MM-DD [MM] HH [any other text] mm [m]b',
      expected: '2023-08-14 MM 21 any other text 43 mb',
    },
  ])(
    'does not break core module with template "$formatString"',
    ({ sourceString, formatString, expected }) => {
      expectSameValue((esday) => esday(sourceString).format(formatString))
      expect(esday(sourceString).format(formatString)).toBe(expected)
    },
  )

  it.each([
    {
      sourceString: '2024-08-14T21:43:12.123',
      formatString: 'd',
      expected: '3',
    },
    {
      sourceString: '2024-08-14T21:43:12.123',
      formatString: 'S',
      expected: '1',
    },
    {
      sourceString: '2024-08-14T21:43:12.123',
      formatString: 'SS',
      expected: '12',
    },
    {
      sourceString: '2024-08-14T21:43:12.123Z',
      formatString: 'x',
      expected: '1723671792123',
    },
    {
      sourceString: '2024-08-14T21:43:12.123Z',
      formatString: 'X',
      expected: '1723671792',
    },
    {
      sourceString: '2024-08-14T01:43:12.123',
      formatString: 'k',
      expected: '1',
    },
    {
      sourceString: '2024-08-14T00:43:12.123',
      formatString: 'k',
      expected: '24',
    },
    {
      sourceString: '2024-08-14T14:43:12.123',
      formatString: 'kk',
      expected: '14',
    },
    {
      sourceString: '2024-08-14T00:43:12.123',
      formatString: 'kk',
      expected: '24',
    },
  ])(
    'formats date using added token "$formatString"',
    ({ sourceString, formatString, expected }) => {
      expect(esday(sourceString).format(formatString)).toBe(expected)
      expectSameValue((esday) => esday(sourceString).format(formatString))
    },
  )

  it('current date and time using "ZZ" to "nnmm"', () => {
    const esdayDate = esday()
    const format = 'ZZ'

    expect(esdayDate.format(format)).toMatch(/[+-]\d{4}/)
  })
})
