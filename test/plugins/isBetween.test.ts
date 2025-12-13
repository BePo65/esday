import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { describe, expect, it } from 'vitest'
import { C } from '~/common'
import isBetweenPlugin from '~/plugins/isBetween'

esday.extend(isBetweenPlugin)

describe('isBetween', () => {
  const testCases = [
    {
      date: '2024-12-25',
      from: '2024-12-24',
      to: '2024-12-26',
      unit: undefined,
      inclusivity: '()' as const,
      expected: true,
    },
    {
      date: '2024-12-25',
      from: '2024-12-25',
      to: '2024-12-26',
      unit: undefined,
      inclusivity: '()' as const,
      expected: false,
    },
    {
      date: '2024-12-25',
      from: '2024-12-25',
      to: '2024-12-26',
      unit: undefined,
      inclusivity: '[)' as const,
      expected: true,
    },
    {
      date: '2024-12-25',
      from: '2024-12-24',
      to: '2024-12-25',
      unit: undefined,
      inclusivity: '(]' as const,
      expected: true,
    },
    {
      date: '2024-12-25',
      from: '2024-12-24',
      to: '2024-12-26',
      unit: undefined,
      inclusivity: '[]' as const,
      expected: true,
    },
    {
      date: '2024-12-25',
      from: '2024-12-26',
      to: '2024-12-24',
      unit: undefined,
      inclusivity: '[]' as const,
      expected: false,
    },
    {
      date: '2024-12-25T12:00:00',
      from: '2024-12-25T11:59:59',
      to: '2024-12-25T12:00:01',
      unit: C.SECOND,
      inclusivity: '[]' as const,
      expected: true,
    },
    {
      date: '2024-12-25T12:00:00',
      from: '2024-12-25T11:59:00',
      to: '2024-12-25T12:01:00',
      unit: C.MIN,
      inclusivity: '()' as const,
      expected: true,
    },
    {
      date: '2024-12-25',
      from: '2024-12-25',
      to: '2024-12-25',
      unit: undefined,
      inclusivity: '[]' as const,
      expected: true,
    },
    {
      date: '2024-12-25',
      from: '2024-12-25',
      to: '2024-12-25',
      unit: undefined,
      inclusivity: '()' as const,
      expected: false,
    },
  ]

  for (const { date, from, to, unit, inclusivity, expected } of testCases) {
    it(`isBetween('${date}', '${from}', '${to}', ${unit}, '${inclusivity}') -> ${expected}`, () => {
      expect(esday(date).isBetween(from, to, unit, inclusivity)).toBe(expected)
      expect(esday(date).isBetween(from, to, unit, inclusivity)).toBe(
        moment(date).isBetween(from, to, unit, inclusivity),
      )
    })
  }
})
