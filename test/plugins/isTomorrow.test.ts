import { esday } from 'esday'
import { expect, it } from 'vitest'
import isTomorrowPlugin from '~/plugins/isTomorrow'

esday.extend(isTomorrowPlugin)

it('isTomorrow', () => {
  const tomorrow = esday().add(1, 'day')
  const today = esday()
  expect(tomorrow.isTomorrow()).toBe(true)
  expect(today.isTomorrow()).toBe(false)
  expect(esday('2021-01-01').isTomorrow()).toBe(false)
})
