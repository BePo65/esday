import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import localeKa from '~/locales/ka'
import advancedParsePlugin from '~/plugins/advancedParse'
import localePlugin from '~/plugins/locale'
import localizedFormatPlugin from '~/plugins/localizedFormat'
import localizedParsePlugin from '~/plugins/localizedParse'
import weekPlugin from '~/plugins/week'
import { expectSameResult } from '../util'

esday
  .extend(localePlugin)
  .extend(advancedParsePlugin)
  .extend(localizedParsePlugin)
  .extend(localizedFormatPlugin)
  .extend(weekPlugin)
esday.registerLocale(localeKa)

describe('week plugin - locale "ka"', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    // set global locale
    esday.locale('ka')
    moment.locale('ka')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    { sourceString: '2025 0', formatString: 'YYYY d' },
    { sourceString: '2025 1', formatString: 'YYYY d' },
    { sourceString: '2025 12 1', formatString: 'YYYY MM d' },
    {
      sourceString: '2024 12 24 სა 14:25:36',
      formatString: 'YYYY MM DD dd HH:mm:ss',
    },
    {
      sourceString: '2024 12 24 სამ 14:25:36',
      formatString: 'YYYY MM DD ddd HH:mm:ss',
    },
    {
      sourceString: '2024 12 24 სამშაბათი 14:25:36',
      formatString: 'YYYY MM DD dddd HH:mm:ss',
    },
    { sourceString: '2024 სამშაბათი', formatString: 'YYYY dddd' },
    { sourceString: '2024 სამშაბათი 15:26', formatString: 'YYYY dddd HH:mm' },
    { sourceString: '2024 12 კვირა', formatString: 'YYYY MM dddd' },
  ])(
    'parse "$sourceString" with day-of-week token in "$formatString"',
    ({ sourceString, formatString }) => {
      expectSameResult((esday) => esday(sourceString, formatString))
      expect(esday(sourceString, formatString).isValid()).toBeTruthy()
    },
  )
})
