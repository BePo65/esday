import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import localeDe from '~/locales/de'
import localeEn from '~/locales/en'
import localeHr from '~/locales/hr'
import advancedParsePlugin from '~/plugins/advancedParse'
import localePlugin from '~/plugins/locale'
import localizedParsePlugin from '~/plugins/localizedParse'
import utcPlugin from '~/plugins/utc'
import weekPlugin from '~/plugins/week'
import { expectSameObject, expectSameValue } from '../util'

esday
  .extend(utcPlugin)
  .extend(advancedParsePlugin)
  .extend(localizedParsePlugin)
  .extend(weekPlugin)
  .extend(localePlugin)
esday.registerLocale(localeEn)
esday.registerLocale(localeDe)
esday.registerLocale(localeHr)

describe('localizedParse plugin - parsed as utc for "en"', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234Z' // 'Sunday 2023-12-17 03:24'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    // set global locale
    esday.locale('en')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    { sourceString: '2024', formatString: 'YYYY' },
    { sourceString: '2024 16', formatString: 'YYYY DD' },
    { sourceString: '2024 12 16', formatString: 'YYYY MM DD' },
    {
      sourceString: '2024 Dec 23 14:25:36',
      formatString: 'YYYY MMM DD HH:mm:ss',
    },
    {
      sourceString: '2024 December 23 14:25:36',
      formatString: 'YYYY MMMM DD HH:mm:ss',
    },
    {
      sourceString: '2024 12 24 Tu 14:25:36',
      formatString: 'YYYY MM DD dd HH:mm:ss',
    },
    {
      sourceString: '2024 12 24 Tue 14:25:36',
      formatString: 'YYYY MM DD ddd HH:mm:ss',
    },
    {
      sourceString: '2024 12 24 Tuesday 14:25:36',
      formatString: 'YYYY MM DD dddd HH:mm:ss',
    },
    { sourceString: '2024 Tuesday', formatString: 'YYYY dddd' },
    { sourceString: '2024 Tuesday 15:26', formatString: 'YYYY dddd HH:mm' },
    { sourceString: '2024 12 Tuesday', formatString: 'YYYY MM dddd' },
    { sourceString: '2024 Dec Tuesday', formatString: 'YYYY MMM dddd' },
    {
      sourceString: '2024 Dec Tuesday 15:26',
      formatString: 'YYYY MMM dddd HH:mm',
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
  ])('parse date string "$sourceString" with format "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameObject((esday) => esday.utc(sourceString, formatString))
  })

  it.each([
    {
      sourceString: '2024 12 24 Wed 14:25:36',
      formatString: 'YYYY MM DD ddd HH:mm:ss',
    },
    {
      sourceString: '2024-02-29 08:10:21 pM',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
  ])('parse date string "$sourceString" with format "$formatString" as invalid date', ({
    sourceString,
    formatString,
  }) => {
    expectSameValue((esday) => esday.utc(sourceString, formatString).isValid())
  })

  it('parse in strict mode - good format', () => {
    const sourceString = '2024 Dec 24th Tuesday 8:10:21 PM'
    const formatString = 'YYYY MMM Do dddd h:mm:ss A'

    expect(esday.utc(sourceString, formatString, true).isValid()).toBeTruthy()
    expectSameObject((esday) => esday.utc(sourceString, formatString, true))
  })

  it('does not parse in strict mode - bad format', () => {
    const sourceString = '2024 Dec 24th Tuesday 8:10:21'
    const formatString = 'YYYY MMM Do dddd h:mm:ss A'

    expect(esday.utc(sourceString, formatString, true).isValid()).toBeFalsy()
    expectSameValue((esday) => esday.utc(sourceString, formatString, true).isValid())
  })
})

describe('localizedParse plugin - parsed as utc for "de"', () => {
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
    {
      sourceString: '2024 Dez. 23 14:25:36',
      formatString: 'YYYY MMM DD HH:mm:ss',
    },
    {
      sourceString: '2024 Dezember 23 14:25:36',
      formatString: 'YYYY MMMM DD HH:mm:ss',
    },
    {
      sourceString: '2024 12 24 Di 14:25:36',
      formatString: 'YYYY MM DD dd HH:mm:ss',
    },
    {
      sourceString: '2024 12 24 Di. 14:25:36',
      formatString: 'YYYY MM DD ddd HH:mm:ss',
    },
    {
      sourceString: '2024 12 24 Dienstag 14:25:36',
      formatString: 'YYYY MM DD dddd HH:mm:ss',
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
  ])('parse date string "$sourceString" with format "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameObject((esday) => esday.utc(sourceString, formatString))
  })

  it.each([
    {
      sourceString: '2024 12 24 Mi. 14:25:36',
      formatString: 'YYYY MM DD ddd HH:mm:ss',
    },
    {
      sourceString: '2024-02-29 08:10:21 pM',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
  ])('parse date string "$sourceString" with format "$formatString" as invalid date', ({
    sourceString,
    formatString,
  }) => {
    expectSameValue((esday) => esday.utc(sourceString, formatString).isValid())
  })

  it('parse in strict mode - good format', () => {
    const sourceString = '2024 Dez. 24. Dienstag 8:10:21 PM'
    const formatString = 'YYYY MMM Do dddd h:mm:ss A'

    expect(esday.utc(sourceString, formatString, true).isValid()).toBeTruthy()
    expectSameObject((esday) => esday.utc(sourceString, formatString, true))
  })

  it('does not parse in strict mode - bad format', () => {
    const sourceString = '2024 Dez. 24. Dienstag 8:10:21'
    const formatString = 'YYYY MMM Do dddd h:mm:ss A'

    expect(esday.utc(sourceString, formatString, true).isValid()).toBeFalsy()
    expectSameValue((esday) => esday.utc(sourceString, formatString, true).isValid())
  })
})

describe('localizedParse plugin - parsed as utc for "hr"', () => {
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
      sourceString: '2024 12 24 ut 14:25:36',
      formatString: 'YYYY MM DD dd HH:mm:ss',
    },
    {
      sourceString: '2024 12 24 uto. 14:25:36',
      formatString: 'YYYY MM DD ddd HH:mm:ss',
    },
    {
      sourceString: '2024 12 24 utorak 14:25:36',
      formatString: 'YYYY MM DD dddd HH:mm:ss',
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
  ])('parse date string "$sourceString" with format "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameObject((esday) => esday.utc(sourceString, formatString))
  })

  it.each([
    {
      sourceString: '2024 12 24 sri 14:25:36',
      formatString: 'YYYY MM DD ddd HH:mm:ss',
    },
    {
      sourceString: '2024-02-29 08:10:21 pM',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
  ])('parse date string "$sourceString" with format "$formatString" as invalid date', ({
    sourceString,
    formatString,
  }) => {
    expectSameValue((esday) => esday.utc(sourceString, formatString).isValid())
  })

  it('parse in strict mode - good format', () => {
    const sourceString = '2024 pro. 24. utorak 8:10:21 PM'
    const formatString = 'YYYY MMM Do dddd h:mm:ss A'

    expect(esday.utc(sourceString, formatString, true).isValid()).toBeTruthy()
    expectSameObject((esday) => esday.utc(sourceString, formatString, true))
  })

  it('does not parse in strict mode - bad format', () => {
    const sourceString = '2024 pro. 24. utorak 8:10:21'
    const formatString = 'YYYY MMM Do dddd h:mm:ss A'

    expect(esday.utc(sourceString, formatString, true).isValid()).toBeFalsy()
    expectSameValue((esday) => esday.utc(sourceString, formatString, true).isValid())
  })
})

describe('localizedParse plugin - local mode using locale given as parameter', () => {
  beforeEach(() => {
    // set global locale
    esday.locale('en')
    moment.locale('en')
  })

  it.each([
    {
      sourceString: '2024 pro. 24. utorak 8:10:21 PM',
      formatString: 'YYYY MMM Do dddd h:mm:ss A',
      locale: 'hr',
    },
    {
      sourceString: '2024 Dez. 24. Dienstag 8:10:21 PM',
      formatString: 'YYYY MMM Do dddd h:mm:ss A',
      locale: 'de',
    },
  ])('parse in "en" with "$locale" as locale parameter', ({
    sourceString,
    formatString,
    locale,
  }) => {
    expect(esday.utc(sourceString, formatString, locale).isValid()).toBeTruthy()
    expectSameObject((esday) => esday.utc(sourceString, formatString, locale))
  })
})
