import { esday } from 'esday'
import { expect, it } from 'vitest'
import isYesterdayPlugin from '~/plugins/isYesterday'

esday.extend(isYesterdayPlugin)

it('isYesterday', () => {
  const yesterday = esday().subtract(1, 'day')
  const today = esday()
  expect(yesterday.isYesterday()).toBe(true)
  expect(today.isYesterday()).toBe(false)
  expect(esday('2021-01-01').isYesterday()).toBe(false)
})
