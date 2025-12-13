import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { esday } from '~/core'

describe('conversion', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234Z'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('to unix timestamp (milliseconds)', () => {
    expect(esday().valueOf()).toBe(1_702_783_486_234)
  })

  it('to unix timestamp (seconds)', () => {
    expect(esday().unix()).toBe(1_702_783_486)
  })

  it('toDate', () => {
    const base = esday()
    const jsDate = base.toDate()

    expect(jsDate).toEqual(new Date())
    expect(jsDate.toUTCString()).toBe(base.toString())

    jsDate.setFullYear(1970)
    expect(jsDate.toUTCString()).not.toBe(base.toString())
  })

  it('toJSON with valid date creates ISO8601 format', () => {
    expect(esday().toJSON()).toBe(fakeTimeAsString)
  })

  it('toJSON with invalid date', () => {
    expect(esday('otherString').toJSON()).toBe(null)
  })

  it('toISOString', () => {
    expect(esday().toISOString()).toBe(fakeTimeAsString)
  })
})
