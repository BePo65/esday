import { esday } from 'esday'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import localeEn from '~/locales/en'
import advancedParsePlugin from '~/plugins/advancedParse'
import localePlugin from '~/plugins/locale'
import localizedParsePlugin from '~/plugins/localizedParse'

esday.extend(advancedParsePlugin).extend(localizedParsePlugin).extend(localePlugin)
esday.registerLocale(localeEn)

describe('localizedParse plugin - without locale', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    {
      sourceString: '2024 Dec 24th 8:10:21 PM',
      formatString: 'YYYY MMM Do h:mm:ss A',
      expected: '2024-12-24T20:10:21',
    },
    {
      sourceString: '2024 Dec 24th 8:10:21 am',
      formatString: 'YYYY MMM Do h:mm:ss a',
      expected: '2024-12-24T08:10:21',
    },
  ])(
    'should use default locale for "$sourceString" with format "$formatString"',
    ({ sourceString, formatString, expected }) => {
      const parsedDate = esday(sourceString, formatString)

      expect(parsedDate.isValid()).toBeTruthy()
      expect(parsedDate.format().slice(0, -6)).toBe(expected)
    },
  )
})
