import { esday } from 'esday'
import { describe, expect, it } from 'vitest'
import utcPlugin from '~/plugins/utc'

describe('esday factory', () => {
  it('installs plugin only once', () => {
    const utcPluginRef = utcPlugin

    // @ts-expect-error "$i" is the flag that shows that this plugin has already been initialized
    expect(utcPluginRef.$i).toBeUndefined()

    esday.extend(utcPluginRef)

    // @ts-expect-error "$i" is the flag that shows that this plugin has already been initialized
    expect(utcPluginRef.$i).toBe(true)

    esday.extend(utcPluginRef)

    // @ts-expect-error "$i" is the flag that shows that this plugin has already been initialized
    expect(utcPlugin.$i).toBe(true)
  })
})
