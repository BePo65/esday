import { esday } from 'esday'

import { afterEach, beforeEach, describe, it, vi } from 'vitest'
import objectSupportPlugin from '~/plugins/objectSupport'
import utcPlugin from '~/plugins/utc'
import { expectSameObject } from '../util'

esday.extend(utcPlugin).extend(objectSupportPlugin)

describe('plugin utc with plugin objectSupport', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('add does not break object as value', () => {
    const timestamp = '2025-07-21 14:25:36'
    const subValues = { years: 1, months: 2, days: 3, hours: 1, minutes: 2, seconds: 3 }

    expectSameObject((esday) => esday(timestamp).add(subValues))
  })

  it('add does not break object as value', () => {
    const timestamp = '2025-07-21 14:25:36'
    const subValues = { years: 1, months: 2, days: 3, hours: 1, minutes: 2, seconds: 3 }

    expectSameObject((esday) => esday(timestamp).add(subValues))
  })
})
