import { describe, expect, it } from 'vitest'
import { capitalize, padNumberWithLeadingZeros, padZoneStr } from '~/common/str-utils'

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('should return an empty string if the input is empty', () => {
    expect(capitalize('')).toBe('')
  })

  it('should handle strings with leading spaces', () => {
    expect(capitalize('  hello')).toBe('  hello')
  })

  it('should handle strings that are already capitalized', () => {
    expect(capitalize('Hello')).toBe('Hello')
  })

  it('should handle single character strings', () => {
    expect(capitalize('a')).toBe('A')
  })

  it('should not modify strings that do not start with a letter', () => {
    expect(capitalize('123test')).toBe('123test')
    expect(capitalize('@hello')).toBe('@hello')
  })
})

describe('padNumberWithLeadingZeros', () => {
  it('should pad a single digit number with leading zeros', () => {
    expect(padNumberWithLeadingZeros(5, 4)).toBe('0005')
  })

  it('should not pad a two digit number', () => {
    expect(padNumberWithLeadingZeros(12, 2)).toBe('12')
  })

  it('should not pad a three digit number', () => {
    expect(padNumberWithLeadingZeros(123, 2)).toBe('123')
  })

  it('should handle zero correctly', () => {
    expect(padNumberWithLeadingZeros(0, 2)).toBe('00')
  })

  it('should handle negative numbers by treating them as positive for padding', () => {
    expect(padNumberWithLeadingZeros(-5, 2)).toBe('-05')
    expect(padNumberWithLeadingZeros(-12, 2)).toBe('-12')
  })
})

describe('padZoneStr', () => {
  it('should format positive offsets correctly', () => {
    expect(padZoneStr(-60)).toBe('-01:00')
    expect(padZoneStr(-270)).toBe('-04:30')
    expect(padZoneStr(0)).toBe('+00:00')
  })

  it('should format negative offsets correctly', () => {
    expect(padZoneStr(60)).toBe('+01:00')
    expect(padZoneStr(270)).toBe('+04:30')
  })

  it('should handle zero offset', () => {
    expect(padZoneStr(0)).toBe('+00:00')
  })

  it('should pad hours and minutes with leading zeros', () => {
    expect(padZoneStr(-5)).toBe('-00:05')
    expect(padZoneStr(-605)).toBe('-10:05')
  })

  it('should handle large offsets', () => {
    expect(padZoneStr(-720)).toBe('-12:00')
    expect(padZoneStr(720)).toBe('+12:00')
  })
})
