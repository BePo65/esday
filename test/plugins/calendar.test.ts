import { type EsDay, esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import localeEn from '~/locales/en'
import localeJa from '~/locales/ja'
import calendarPlugin from '~/plugins/calendar'
import localePlugin, { type CalendarPartial, type Locale } from '~/plugins/locale'
import localizedFormatPlugin from '~/plugins/localizedFormat'
import weekPlugin from '~/plugins/week'
import { expectSameValue } from '../util'

esday.extend(localePlugin)
esday.extend(localizedFormatPlugin)
esday.extend(calendarPlugin)
esday.extend(weekPlugin)
esday.registerLocale(localeEn)
esday.registerLocale(localeJa)

describe('calendar plugin - locale "en"', () => {
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

  it('should format "sameDay" without arguments', () => {
    const formattedEsday = esday().calendar()

    expect(formattedEsday).toBe('Today at 3:24 AM')
    expectSameValue((esday) => esday().calendar())
  })

  it('should accept undefined as first argument', () => {
    const formattedEsday = esday().calendar(undefined)

    expect(formattedEsday).toBe('Today at 3:24 AM')
    expectSameValue((esday) => esday().calendar(undefined))
  })

  it('should accept null as first argument', () => {
    const formattedEsday = esday().calendar(null)

    expect(formattedEsday).toBe('Today at 3:24 AM')
    expectSameValue((esday) => esday().calendar(null))
  })

  it('should format "sameDay" without arguments', () => {})

  it('should format "sameDay" with reference date', () => {
    const otherFakeTimeAsString = '2025-06-21T03:24:46.234' // 'Wednesday 2025-06-21 13:24'
    const referenceDateEsday = esday(otherFakeTimeAsString)
    const referenceDateMoment = moment(otherFakeTimeAsString)
    const testDateEsday = esday(otherFakeTimeAsString).add(14, 'hour')
    const testDateMoment = moment(otherFakeTimeAsString).add(14, 'hour')
    const formattedDateEsday = testDateEsday.calendar(referenceDateEsday)
    const formattedDateMoment = testDateMoment.calendar(referenceDateMoment)

    expect(formattedDateEsday).toBe('Today at 5:24 PM')
    expect(formattedDateMoment).toBe(formattedDateEsday)
  })

  it('should format "nextDay" date', () => {
    // 'Monday 2023-12-18 10:24'
    const formattedEsday = esday().add(1, 'day').hour(10).calendar()

    expect(formattedEsday).toBe('Tomorrow at 10:24 AM')
    expectSameValue((esday) => esday().add(1, 'day').hour(10).calendar())
  })

  it('should format "nextWeek" date', () => {
    // 'Wednesday 2023-12-20 11:24'
    const formattedEsday = esday().add(3, 'day').hour(11).calendar()

    expect(formattedEsday).toBe('Wednesday at 11:24 AM')
    expectSameValue((esday) => esday().add(3, 'day').hour(11).calendar())
  })

  it('should format "lastDay" date', () => {
    // 'Saturday 2023-12-16 14:24'
    const formattedEsday = esday().subtract(1, 'day').hour(14).calendar()

    expect(formattedEsday).toBe('Yesterday at 2:24 PM')
    expectSameValue((esday) => esday().subtract(1, 'day').hour(14).calendar())
  })

  it('should format "lastWeek" date', () => {
    // 'Wednesday 2023-12-13 15:24'
    const formattedEsday = esday().subtract(4, 'day').hour(15).calendar()

    expect(formattedEsday).toBe('Last Wednesday at 3:24 PM')
    expectSameValue((esday) => esday().subtract(4, 'day').hour(15).calendar())
  })

  it('should format "sameElse (future)" date', () => {
    // 'Monday 2023-12-25 16:24'
    const formattedEsday = esday().add(8, 'day').hour(16).calendar()

    expect(formattedEsday).toBe('12/25/2023')
    expectSameValue((esday) => esday().add(8, 'day').hour(16).calendar())
  })

  it('should format "sameElse (past)" date', () => {
    // 'Saturday 2023-12-09 17:24'
    const formattedEsday = esday().subtract(8, 'day').hour(17).calendar()

    expect(formattedEsday).toBe('12/09/2023')
    expectSameValue((esday) => esday().subtract(8, 'day').hour(17).calendar())
  })

  it('should handle overriding a format key with a string', () => {
    const customFormats = { sameDay: '[My Custom Today at] HH:mm' }
    const formattedEsday = esday().calendar(undefined, customFormats)

    expect(formattedEsday).toBe('My Custom Today at 03:24')
    expectSameValue((esday) => esday().calendar(undefined, customFormats))
  })

  it('should handle overriding a format key with a function', () => {
    const customFormats: CalendarPartial = {
      nextDay(this: EsDay, refDate?: EsDay) {
        return `[Func: Next Day from ${refDate?.format('YYYY-MM-DD')} at] HHmm`
      },
    }

    // 'Monday 2023-12-18 10:24'
    const formattedEsday = esday().add(1, 'day').hour(10).calendar(undefined, customFormats)

    expect(formattedEsday).toBe('Func: Next Day from 2023-12-17 at 1024')
    expectSameValue((esday) => esday().add(1, 'day').hour(10).calendar(undefined, customFormats))
  })

  it('should fall back to defaultCalendar, if key is missing in custom formats', () => {
    // Custom format does not contain 'nextDay'
    const customFormats: CalendarPartial = {
      lastWeek: '[Custom Last Week]',
    }

    // Next day: 'Monday 2023-12-18 10:24'
    const nextDayEsday = esday().add(1, 'day').hour(10).calendar(undefined, customFormats)

    // Last week: 'Wednesday 2023-12-13 15:24'
    const lastWeekEsday = esday().subtract(4, 'day').hour(15).calendar(undefined, customFormats)

    expect(nextDayEsday).toBe('Tomorrow at 10:24 AM')
    expect(lastWeekEsday).toBe('Custom Last Week')
    expectSameValue((esday) => esday().add(1, 'day').hour(10).calendar(undefined, customFormats))
    expectSameValue((esday) =>
      esday().subtract(4, 'day').hour(15).calendar(undefined, customFormats),
    )
  })
})

describe('week plugin - locale "ja"', () => {
  const fakeTimeAsString = '2023-12-21T03:24:46.234'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))

    // set global locale
    esday.locale('ja')
    moment.locale('ja')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should format "nextWeek" date', () => {
    // 'Sunday 2023-12-24 11:24'
    const formattedEsday = esday().add(3, 'day').hour(11).calendar()

    expect(formattedEsday).toBe('来週日曜日 11:24')
    expectSameValue((esday) => esday().add(3, 'day').hour(11).calendar())
  })

  it('should format "lastWeek" date', () => {
    // 'Wednesday 2023-12-13 15:24'
    const formattedEsday = esday().subtract(6, 'day').hour(15).calendar()

    expect(formattedEsday).toBe('先週金曜日 15:24')
    expectSameValue((esday) => esday().subtract(6, 'day').hour(15).calendar())
  })
})

describe('calendar plugin - locale without calendar', () => {
  const fakeTimeAsString = '2023-12-17T03:24:46.234' // 'Sunday 2023-12-17 03:24'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(fakeTimeAsString))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should use default calendar', () => {
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
    const testDate = esday().locale('test')

    expect(testDate.calendar()).toBe('Today at 03:24')
  })
})
