import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { beforeEach, describe, it } from 'vitest'
import localeBe from '~/locales/be'
import localeCa from '~/locales/ca'
import localeDe from '~/locales/de'
import localeEn from '~/locales/en'
import localeHr from '~/locales/hr'
import localeKa from '~/locales/ka'
import localePlugin from '~/plugins/locale'
import localizedFormatPlugin from '~/plugins/localizedFormat'
import { expectSameValue } from '../util'

esday.extend(localizedFormatPlugin).extend(localePlugin)
esday
  .registerLocale(localeBe)
  .registerLocale(localeCa)
  .registerLocale(localeEn)
  .registerLocale(localeDe)
  .registerLocale(localeHr)
  .registerLocale(localeKa)

describe('localizedFormat plugin - using locale "en"', () => {
  beforeEach(() => {
    // set global locale
    esday.locale('en')
    moment.locale('en')
  })

  it.each([
    {
      sourceString: '2024-12-23T14:25:36',
      formatString: 'YYYY MMM DD HH:mm:ss',
    },
    {
      sourceString: '2024-12-23T14:25:36',
      formatString: 'YYYY MMMM DD HH:mm:ss',
    },
    { sourceString: '2024-12-23T14:25:36', formatString: 'D MMMM' },
    { sourceString: '2024-12-23T14:25:36', formatString: 'DD MMMM' },
    { sourceString: '2024-12-23T14:25:36', formatString: 'Do MMMM' },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD dd HH:mm:ss',
    },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD ddd HH:mm:ss',
    },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD dddd HH:mm:ss',
    },
    {
      sourceString: '2024-12-23T14:25:36',
      formatString: 'YYYY MM Do HH:mm:ss',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss a',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss a',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29T12:00:00',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T12:00:01',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T00:00:00',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T00:00:00',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    { sourceString: '2024-12-24T16:25:36', formatString: 'YYYY MM DD LT' },
    { sourceString: '2024-12-24T16:25:36', formatString: 'YYYY MM DD LTS' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'L' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'LL' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'LLL' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'LLLL' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'l' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'll' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'lll' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'llll' },
    {
      sourceString: '2024-12-24T16:25:36',
      formatString: 'YYYY MM DD [lll] LTS',
    },
  ])('format date string "$sourceString" with format "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameValue((esday) => esday(sourceString).format(formatString))
  })

  it.each([
    'MMM',
    'MMMM',
    'Do',
    'dd',
    'ddd',
    'dddd',
    'h',
    'hh',
    'a',
    'A',
  ])('format invalid date with format "%s"', (formatString) => {
    const sourceString = 'I am not a date'
    expectSameValue((esday) => esday(sourceString).format(formatString).toLowerCase())
  })
})

describe('localizedFormat plugin - using locale "de"', () => {
  beforeEach(() => {
    // set global locale
    esday.locale('de')
    moment.locale('de')
  })

  it.each([
    {
      sourceString: '2024-12-23T14:25:36',
      formatString: 'YYYY MMM DD HH:mm:ss',
    },
    {
      sourceString: '2024-12-23T14:25:36',
      formatString: 'YYYY MMMM DD HH:mm:ss',
    },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD dd HH:mm:ss',
    },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD ddd HH:mm:ss',
    },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD dddd HH:mm:ss',
    },
    {
      sourceString: '2024-12-23T14:25:36',
      formatString: 'YYYY MM Do HH:mm:ss',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss a',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss a',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29T12:00:00',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T12:00:01',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T00:00:00',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T00:00:00',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    { sourceString: '2024-12-24T16:25:36', formatString: 'YYYY MM DD LT' },
    { sourceString: '2024-12-24T16:25:36', formatString: 'YYYY MM DD LTS' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'L' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'LL' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'LLL' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'LLLL' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'l' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'll' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'lll' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'llll' },
    {
      sourceString: '2024-12-24T16:25:36',
      formatString: 'YYYY MM DD [lll] LTS',
    },
  ])('format date string "$sourceString" with format "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameValue((esday) => esday(sourceString).format(formatString))
  })

  it.each([
    'MMM',
    'MMMM',
    'Do',
    'dd',
    'ddd',
    'dddd',
    'h',
    'hh',
    'a',
    'A',
  ])('format invalid date with format "%s"', (formatString) => {
    const sourceString = 'I am not a date'
    expectSameValue((esday) => esday(sourceString).format(formatString).toLowerCase())
  })
})

describe('localizedFormat plugin - using locale "hr"', () => {
  beforeEach(() => {
    // set global locale
    esday.locale('hr')
    moment.locale('hr')
  })

  it.each([
    {
      sourceString: '2024-12-23T14:25:36',
      formatString: 'YYYY MMM DD HH:mm:ss',
    },
    {
      sourceString: '2024-11-23T14:25:36',
      formatString: 'YYYY MMMM DD HH:mm:ss',
    },
    {
      sourceString: '2024-12-23T14:25:36',
      formatString: 'YYYY MMMM DD HH:mm:ss',
    },
    { sourceString: '2024-12-23T14:25:36', formatString: 'DD MMMM' },
    { sourceString: '2024-12-23T14:25:36', formatString: 'Do MMMM' },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD dd HH:mm:ss',
    },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD ddd HH:mm:ss',
    },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD dddd HH:mm:ss',
    },
    {
      sourceString: '2024-12-23T14:25:36',
      formatString: 'YYYY MM Do HH:mm:ss',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss a',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss a',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29T12:00:00',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T12:00:01',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T00:00:00',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T00:00:00',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    { sourceString: '2024-12-24T16:25:36', formatString: 'YYYY MM DD LT' },
    { sourceString: '2024-12-24T16:25:36', formatString: 'YYYY MM DD LTS' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'L' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'LL' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'LLL' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'LLLL' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'l' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'll' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'lll' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'llll' },
    {
      sourceString: '2024-12-24T16:25:36',
      formatString: 'YYYY MM DD [lll] LTS',
    },
  ])('format date string "$sourceString" with format "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameValue((esday) => esday(sourceString).format(formatString))
  })

  it.each([
    'MMM',
    'MMMM',
    'Do',
    'dd',
    'ddd',
    'dddd',
    'h',
    'hh',
    'a',
    'A',
  ])('format invalid date with format "%s"', (formatString) => {
    const sourceString = 'I am not a date'
    expectSameValue((esday) => esday(sourceString).format(formatString).toLowerCase())
  })
})

describe('localizedFormat plugin - using locale "ca"', () => {
  beforeEach(() => {
    // set global locale
    esday.locale('ca')
    moment.locale('ca')
  })

  it.each([
    {
      sourceString: '2024-12-23T14:25:36',
      formatString: 'YYYY MMM DD HH:mm:ss',
    },
    {
      sourceString: '2024-11-23T14:25:36',
      formatString: 'YYYY MMMM DD HH:mm:ss',
    },
    {
      sourceString: '2024-12-23T14:25:36',
      formatString: 'YYYY MMMM DD HH:mm:ss',
    },
    { sourceString: '2024-12-23T14:25:36', formatString: 'D MMMM' },
    { sourceString: '2024-12-23T14:25:36', formatString: 'DD MMMM' },
    { sourceString: '2024-12-23T14:25:36', formatString: 'Do MMMM' },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD dd HH:mm:ss',
    },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD ddd HH:mm:ss',
    },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD dddd HH:mm:ss',
    },
    {
      sourceString: '2024-12-23T14:25:36',
      formatString: 'YYYY MM Do HH:mm:ss',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss a',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    {
      sourceString: '2024-02-29T08:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss a',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD h:mm:ss A',
    },
    {
      sourceString: '2024-02-29T20:10:21',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    {
      sourceString: '2024-02-29T12:00:00',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T12:00:01',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T00:00:00',
      formatString: 'YYYY-MM-DD hh:mm:ss a',
    },
    {
      sourceString: '2024-02-29T00:00:00',
      formatString: 'YYYY-MM-DD hh:mm:ss A',
    },
    { sourceString: '2024-12-24T16:25:36', formatString: 'YYYY MM DD LT' },
    { sourceString: '2024-12-24T16:25:36', formatString: 'YYYY MM DD LTS' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'L' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'LL' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'LLL' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'LLLL' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'l' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'll' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'lll' },
    { sourceString: '2024-12-24T14:25:36', formatString: 'llll' },
    {
      sourceString: '2024-12-24T16:25:36',
      formatString: 'YYYY MM DD [lll] LTS',
    },
  ])('format date string "$sourceString" with format "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameValue((esday) => esday(sourceString).format(formatString))
  })

  it.each([
    'MMM',
    'MMMM',
    'Do',
    'dd',
    'ddd',
    'dddd',
    'h',
    'hh',
    'a',
    'A',
  ])('format invalid date with format "%s"', (formatString) => {
    const sourceString = 'I am not a date'
    expectSameValue((esday) => esday(sourceString).format(formatString).toLowerCase())
  })
})

describe('localizedFormat plugin - using locale "ka"', () => {
  beforeEach(() => {
    // set global locale
    esday.locale('ka')
    moment.locale('ka')
  })

  it.each([
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD dd HH:mm:ss',
    },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD ddd HH:mm:ss',
    },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: 'YYYY MM DD dddd HH:mm:ss',
    },
    {
      sourceString: '2024-12-24T14:25:36',
      formatString: '[შემდეგ] dddd LT[-ზე]',
    }, // test 'useFormatProperty' of addWeekday
    { sourceString: '2024-12-24T14:25:36', formatString: '[წინა] dddd LT-ზე' }, // test 'useFormatProperty' of addWeekday
    { sourceString: '2024-12-23T14:25:36', formatString: 'D MMMM' },
    { sourceString: '2024-12-23T14:25:36', formatString: 'DD MMMM' },
    { sourceString: '2024-12-23T14:25:36', formatString: 'Do MMMM' },
  ])('format date string "$sourceString" with format "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameValue((esday) => esday(sourceString).format(formatString))
  })
})

describe('localizedFormat plugin - using locale "be"', () => {
  beforeEach(() => {
    // set global locale
    esday.locale('be')
    moment.locale('be')
  })

  it.each([
    { sourceString: '2024-12-23T14:25:36', formatString: 'D MMMM' },
  ])('format date string "$sourceString" with format "$formatString"', ({
    sourceString,
    formatString,
  }) => {
    expectSameValue((esday) => esday(sourceString).format(formatString))
  })
})
