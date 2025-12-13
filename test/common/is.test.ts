import { describe, expect, it } from 'vitest'
import { undefinedOr } from '~/common/is'

// add test for function undefinedOr from src/common/is.ts
describe('undefinedOr', () => {
  it('should return 2nd parameter if value is undefined', () => {
    expect(undefinedOr(undefined, 'default')).toBe('default')
  })

  it('should return null parameter if value is null', () => {
    expect(undefinedOr(null, 567)).toBe(null)
  })

  it('should return 1st parameter if value is not undefined for string', () => {
    expect(undefinedOr('hello', 'default')).toBe('hello')
  })

  it('should return 1st parameter if value is not undefined for number', () => {
    expect(undefinedOr(123, 'default')).toBe(123)
  })
})
