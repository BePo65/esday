import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import localeDe from '~/locales/de'
import localeEn from '~/locales/en'
import localeFr from '~/locales/fr'
import localeHr from '~/locales/hr'
import localeKa from '~/locales/ka'
import localeKu from '~/locales/ku'
import advancedParsePlugin from '~/plugins/advancedParse'
import type { Locale } from '~/plugins/locale'
import localePlugin from '~/plugins/locale'
import localizedParsePlugin from '~/plugins/localizedParse'
import weekPlugin from '~/plugins/week'
import { expectSame, expectSameResult } from '../util'

esday
  .extend(advancedParsePlugin)
  .extend(weekPlugin)
  .extend(localizedParsePlugin)
  .extend(localePlugin)
esday.registerLocale(localeDe)
esday.registerLocale(localeEn)
esday.registerLocale(localeFr)
esday.registerLocale(localeHr)
esday.registerLocale(localeKa)
esday.registerLocale(localeKu)

describe('localizedParse plugin - local mode for "en"', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    // set global locale
    esday.locale('en')
    moment.locale('en')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    {
      sourceString: '2024 Dec 23 14:25:36',
      formatString: 'YYYY MMM DD HH:mm:ss',
    },
    {
      sourceString: '2024 December 23 14:25:36',
      formatString: 'YYYY MMMM DD HH:mm:ss',
    },
    {
      sourceString: '2024 12 23rd 14:25:36',
      formatString: 'YYYY MM Do HH:mm:ss',
    },
    {
      sourceString: '2024-02-29 8:10:21 am',
      formatString: 'YYYY-MM-DD h:mm:ss a',
    },
    {
      sourceString: '2024-02-29 08:10:21 am',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 8:10:21 AM',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    {
      sourceString: '2024-02-29 08:10:21 AM',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29 8:10:21 pm',
      formatString: 'YYYY-MM-DD h:mm:ss a',
    },
    {
      sourceString: '2024-02-29 08:10:21 pm',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 8:10:21 PM',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    {
      sourceString: '2024-02-29 08:10:21 PM',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29 12:00:00 pm',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 12:00:01 pm',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 12:00:00 am',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 12:00:00 AM',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29 15:26:37 pm',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 15:26:37 am',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 8:10:21 xy',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    { sourceString: '3/11/2022, 11:29:26 AM', formatString: 'M/D/YYYY, h:mm:ss A' },
    { sourceString: '2024 12 24 4:25 PM', formatString: 'YYYY MM DD LT' },
    { sourceString: '2024 12 24 4:25:36 PM', formatString: 'YYYY MM DD LTS' },
    { sourceString: '12/24/2024', formatString: 'L' },
    { sourceString: '4 [de] December [de] 2024', formatString: 'LL' },
    { sourceString: '4 [de] December [de] 2024 4:25 PM', formatString: 'LLL' },
    {
      sourceString: 'Wednesday, 4 [de] December [de] 2024 4:25 PM',
      formatString: 'LLLL',
    },
    { sourceString: '12/24/2024', formatString: 'l' },
    { sourceString: '4 [de] December [de] 2024', formatString: 'll' },
    { sourceString: '4 [de] December [de] 2024 4:25 PM', formatString: 'lll' },
    {
      sourceString: 'Wednesday, 4 [de] December [de] 2024 4:25 PM',
      formatString: 'llll',
    },
    {
      sourceString: '2024 12 24 [L lll ka] 4:25:36 PM',
      formatString: 'YYYY MM DD [L lll ka] LTS',
    },
  ])(
    'parse date string "$sourceString" with format "$formatString"',
    ({ sourceString, formatString }) => {
      expectSameResult((esday) => esday(sourceString, formatString))
    },
  )

  it('parse date string with array of formats', () => {
    const sourceString = '2024 Dec 23 14:25:36'
    const formatString = ['YYYY MM DD HH:mm:ss', 'YYYY MMM DD HH:mm:ss']
    expectSameResult((esday) => esday(sourceString, formatString))
  })

  it.each([
    {
      sourceString: '2024-02-29 08:10:21 pM',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
  ])(
    'parse date string "$sourceString" with format "$formatString" as invalid date',
    ({ sourceString, formatString }) => {
      expectSame((esday) => esday(sourceString, formatString).isValid())
    },
  )
})

describe('localizedParse plugin - local mode for "de"', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    // set global locale
    esday.locale('de')
    moment.locale('de')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    { sourceString: '2024', formatString: 'YYYY' },
    { sourceString: '2024 16', formatString: 'YYYY DD' },
    { sourceString: '2024 12 16', formatString: 'YYYY MM DD' },
    {
      sourceString: '2024 Dez. 23 14:25:36',
      formatString: 'YYYY MMM DD HH:mm:ss',
    },
    {
      sourceString: '2024 Dezember 23 14:25:36',
      formatString: 'YYYY MMMM DD HH:mm:ss',
    },
    {
      sourceString: '2024 12 23. 14:25:36',
      formatString: 'YYYY MM Do HH:mm:ss',
    },
    {
      sourceString: '2024-02-29 8:10:21 am',
      formatString: 'YYYY-MM-DD h:mm:ss a',
    },
    {
      sourceString: '2024-02-29 08:10:21 am',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 8:10:21 AM',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    {
      sourceString: '2024-02-29 08:10:21 AM',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29 8:10:21 pm',
      formatString: 'YYYY-MM-DD h:mm:ss a',
    },
    {
      sourceString: '2024-02-29 08:10:21 pm',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 8:10:21 PM',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    {
      sourceString: '2024-02-29 08:10:21 PM',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29 12:00:00 pm',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 12:00:01 pm',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 12:00:00 am',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 12:00:00 AM',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29 15:26:37 pm',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 15:26:37 am',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 8:10:21 xy',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    { sourceString: '2024 12 24 14:25', formatString: 'YYYY MM DD LT' },
    { sourceString: '2024 12 24 14:25:36', formatString: 'YYYY MM DD LTS' },
    { sourceString: '24.12.2024', formatString: 'L' },
    { sourceString: '24. Dezember 2024', formatString: 'LL' },
    { sourceString: '24. Dezember 2024 14:25', formatString: 'LLL' },
    { sourceString: 'Mittwoch, 24. Dezember 2024 14:25', formatString: 'LLLL' },
    { sourceString: '24.12.2024', formatString: 'l' },
    { sourceString: '24. Dez. 2024', formatString: 'll' },
    { sourceString: '24. Dez. 2024 14:25', formatString: 'lll' },
    { sourceString: 'Mittwoch, 24. Dez. 2024 14:25', formatString: 'llll' },
    {
      sourceString: '2024 12 24 [L lll ka] 14:25:36',
      formatString: 'YYYY MM DD [L lll ka] LTS',
    },
  ])(
    'parse date string "$sourceString" with format "$formatString"',
    ({ sourceString, formatString }) => {
      expectSameResult((esday) => esday(sourceString, formatString))
    },
  )

  it.each([
    {
      sourceString: '2024-02-29 08:10:21 pM',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
  ])(
    'parse date string "$sourceString" with format "$formatString" as invalid date',
    ({ sourceString, formatString }) => {
      expectSame((esday) => esday(sourceString, formatString).isValid())
    },
  )

  it('parse in strict mode - good format', () => {
    const sourceString = '2024 Dez. 24. 8:10:21 PM'
    const formatString = 'YYYY MMM Do h:mm:ss A'

    expect(esday(sourceString, formatString, true).isValid()).toBeTruthy()
    expectSameResult((esday) => esday(sourceString, formatString, true))
  })

  it('does not parse in strict mode - bad format', () => {
    const sourceString = '2024 Dez. 24. Dienstag 8:10:21'
    const formatString = 'YYYY MMM Do dddd h:mm:ss A'

    expect(esday(sourceString, formatString, true).isValid()).toBeFalsy()
    expectSame((esday) => esday(sourceString, formatString, true).isValid())
  })
})

describe('localizedParse plugin - local mode for "hr"', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    // set global locale
    esday.locale('hr')
    moment.locale('hr')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    {
      sourceString: '2024 pro. 23 14:25:36',
      formatString: 'YYYY MMM DD HH:mm:ss',
    },
    {
      sourceString: '2024 prosinac 23 14:25:36',
      formatString: 'YYYY MMMM DD HH:mm:ss',
    },
    {
      sourceString: '2024 12 23. 14:25:36',
      formatString: 'YYYY MM Do HH:mm:ss',
    },
    {
      sourceString: '2024-02-29 8:10:21 am',
      formatString: 'YYYY-MM-DD h:mm:ss a',
    },
    {
      sourceString: '2024-02-29 08:10:21 am',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 8:10:21 AM',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    {
      sourceString: '2024-02-29 08:10:21 AM',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29 8:10:21 pm',
      formatString: 'YYYY-MM-DD h:mm:ss a',
    },
    {
      sourceString: '2024-02-29 08:10:21 pm',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 8:10:21 PM',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    {
      sourceString: '2024-02-29 08:10:21 PM',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29 12:00:00 pm',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 12:00:01 pm',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 12:00:00 am',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 12:00:00 AM',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29 15:26:37 pm',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 15:26:37 am',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29 8:10:21 xy',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    { sourceString: '2024 12 24 14:25', formatString: 'YYYY MM DD LT' },
    { sourceString: '2024 12 24 24:25:36', formatString: 'YYYY MM DD LTS' },
    { sourceString: '24.12.2024', formatString: 'L' },
    { sourceString: '24. prosinac 2024', formatString: 'LL' },
    { sourceString: '24. prosinac 2024 8:25', formatString: 'LLL' },
    { sourceString: 'utorak, 24. prosinac 2024 14:25', formatString: 'LLLL' },
    { sourceString: '24.12.2024', formatString: 'l' },
    { sourceString: '24. pro. 2024', formatString: 'll' },
    { sourceString: '24. pro. 2024 4:25', formatString: 'lll' },
    { sourceString: 'uto., 24. pro. 2024 9:25', formatString: 'llll' },
    {
      sourceString: '2024 12 24 [L lll ka] 4:25:36 PM',
      formatString: 'YYYY MM DD [L lll ka] LTS',
    },
  ])(
    'parse date string "$sourceString" with format "$formatString"',
    ({ sourceString, formatString }) => {
      expectSameResult((esday) => esday(sourceString, formatString))
      expectSame((esday) => esday(sourceString, formatString).locale())
    },
  )

  it.each([
    {
      sourceString: '2024-02-29 08:10:21 pM',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
  ])(
    'parse date string "$sourceString" with format "$formatString" as invalid date',
    ({ sourceString, formatString }) => {
      expectSame((esday) => esday(sourceString, formatString).isValid())
    },
  )

  it('parse in strict mode - good format', () => {
    const sourceString = '2024 pro. 24. 8:10:21 PM'
    const formatString = 'YYYY MMM Do h:mm:ss A'

    expect(esday(sourceString, formatString, true).isValid()).toBeTruthy()
    expectSameResult((esday) => esday(sourceString, formatString, true))
    expectSame((esday) => esday(sourceString, formatString, true).locale())
  })

  it('does not parse in strict mode - bad format', () => {
    const sourceString = '2024 pro. 24. utorak 8:10:21'
    const formatString = 'YYYY MMM Do dddd h:mm:ss A'

    expect(esday(sourceString, formatString, true).isValid()).toBeFalsy()
    expectSame((esday) => esday(sourceString, formatString, true).isValid())
  })
})

describe('localizedParse plugin - local mode for "ku"', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    // set global locale
    esday.locale('ku')
    moment.locale('ku')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // test preParse methods
  it.each([
    { sourceString: '٢٠٢٤ ١٢', formatString: 'YYYY MM' },
    { sourceString: '٢٠٢٤ ٢٣', formatString: 'YYYY DD' },
  ])(
    'parse date string "$sourceString" with arabic numbers with format "$formatString"',
    ({ sourceString, formatString }) => {
      expectSameResult((esday) => esday(sourceString, formatString))
      expectSame((esday) => esday(sourceString, formatString).locale())
    },
  )
})

describe('localizedParse plugin - local mode for "ka"', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

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

  // test standalone weekday names
  it.each([
    { sourceString: '2024', formatString: 'YYYY' },
    { sourceString: '2024 16', formatString: 'YYYY DD' },
    { sourceString: '2024 12 16', formatString: 'YYYY MM DD' },
  ])(
    'parse date string "$sourceString" with format "$formatString"',
    ({ sourceString, formatString }) => {
      expectSameResult((esday) => esday(sourceString, formatString))
      expectSame((esday) => esday(sourceString, formatString).locale())
    },
  )
})

describe('localizedParse plugin - local mode using locale given as parameter', () => {
  beforeEach(() => {
    // set global locale
    esday.locale('en')
    moment.locale('en')
  })

  it.each([
    {
      sourceString: '2024 pro. 24. 8:10:21 PM utorak',
      formatString: 'YYYY MMM Do h:mm:ss A',
      locale: 'hr',
    },
    {
      sourceString: '2024 Dez. 24. 8:10:21 PM Dienstag',
      formatString: 'YYYY MMM Do h:mm:ss A',
      locale: 'de',
    },
    {
      sourceString: '2024 déc. 1er 8:10:21 AM mardi',
      formatString: 'YYYY MMM Do h:mm:ss A',
      locale: 'fr',
    },
  ])(
    'parse in "en" with "$locale" as locale parameter',
    ({ sourceString, formatString, locale }) => {
      expect(esday(sourceString, formatString, locale).isValid()).toBeTruthy()
      expectSameResult((esday) => esday(sourceString, formatString, locale))
      expectSame((esday) => esday(sourceString, formatString, locale).locale())
    },
  )

  it.each([
    {
      sourceString: '2024 pro. 24. 8:10:21 PM',
      formatString: 'YYYY MMM Do h:mm:ss A',
      locale: 'hr',
    },
    {
      sourceString: '2024 Dez. 24. 8:10:21 PM',
      formatString: 'YYYY MMM Do h:mm:ss A',
      locale: 'de',
    },
    {
      sourceString: '2024 déc. 1er 8:10:21 AM',
      formatString: 'YYYY MMM Do h:mm:ss A',
      locale: 'fr',
    },
  ])(
    'parse in strict mode in "en" with "$locale" as locale parameter',
    ({ sourceString, formatString, locale }) => {
      expect(esday(sourceString, formatString, locale, true).isValid()).toBeTruthy()
      expectSameResult((esday) => esday(sourceString, formatString, locale, true))
      expectSame((esday) => esday(sourceString, formatString, locale, true).locale())
    },
  )

  it('parse in strict mode with non-matching format with locale as parameter', () => {
    // Day should not have a trailing decimal point
    const sourceString = '2024 déc. 24. 8:10:21 AM'
    const formatString = 'YYYY MMM Do h:mm:ss A'
    const locale = 'fr'
    const d = esday(sourceString, formatString, locale, true)
    const m = moment(sourceString, formatString, locale, true)

    expect(d.isValid()).toBeFalsy()
    expect(m.isValid()).toBeFalsy()
    expectSame((esday) => esday(sourceString, formatString, locale, true).locale())
  })
})

describe('localizedParse plugin - locale without meridiem', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    esday.registerLocale({
      name: 'test',
      formats: {
        LT: 'hh:mm',
        LTS: 'hh:mm:ss',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY hh:mm',
        LLLL: 'dddd, MMMM D, YYYY hh:mm',
        l: 'MM/DD/YYYY',
        ll: 'MMM D, YYYY',
        lll: 'MMM D, YYYY hh:mm',
        llll: 'ddd, MMM D, YYYY hh:mm',
      },
    } as Locale)

    // Set test as test locale
    esday.locale('test')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    {
      sourceString: '2024-02-29 8:10:21 am',
      formatString: 'YYYY-MM-DD h:mm:ss a',
      expected: '2024-02-29T08:10:21',
    },
    {
      sourceString: '2024-02-29 08:10:21 AM',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
      expected: '2024-02-29T08:10:21',
    },
    {
      sourceString: '2024-02-29 08:10:21 pm',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
      expected: '2024-02-29T20:10:21',
    },
    {
      sourceString: '2024-02-29 8:10:21 PM',
      formatString: 'YYYY-MM-DD h:mm:ss A',
      expected: '2024-02-29T20:10:21',
    },
  ])(
    'should use default meridiem for "$sourceString" with format "$formatString"',
    ({ sourceString, formatString, expected }) => {
      const parsedDate = esday(sourceString, formatString)

      expect(parsedDate.isValid()).toBeTruthy()
      expect(parsedDate.format().slice(0, -6)).toBe(expected)
    },
  )
})
