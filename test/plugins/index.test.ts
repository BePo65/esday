import { expect, it } from 'vitest'
import { utc, week } from '../../src/plugins'

it('re-exports plugin entry points from the plugin barrel', () => {
  expect(utc).toBeTypeOf('function')
  expect(week).toBeTypeOf('function')
})
