import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { C } from '~/common'

import advancedParsePlugin from '~/plugins/advancedParse'
import type { ParsedElements, TokenDefinitions } from '~/plugins/advancedParse/types'
import { expectSame, expectSameResult } from '../util'

esday.extend(advancedParsePlugin)

describe('advancedParse plugin - local mode', () => {
  describe('parse with format as single string', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it.each([
      { formatString: 'Y', sourceString: '0' },
      { formatString: 'Y', sourceString: '3' },
      { formatString: 'Y', sourceString: '-4' },
      { formatString: 'Y', sourceString: '-53' },
      { formatString: 'Y', sourceString: '68' },
      { formatString: 'Y', sourceString: '69' },
      { formatString: 'Y', sourceString: '87' },
      { formatString: 'Y', sourceString: '0000' },
      { formatString: 'Y', sourceString: '1870' },
      { formatString: 'Y', sourceString: '1923' },
      { formatString: 'Y', sourceString: '2000' },
      { formatString: 'Y', sourceString: '2023' },
      { formatString: 'YY', sourceString: '0' },
      { formatString: 'YY', sourceString: '3' },
      { formatString: 'YY', sourceString: '-4' },
      { formatString: 'YY', sourceString: '00' },
      { formatString: 'YY', sourceString: '68' },
      { formatString: 'YY', sourceString: '69' },
      { formatString: 'YY', sourceString: '87' },
      { formatString: 'YY', sourceString: '-53' },
      { formatString: 'YY', sourceString: '1827' },
      { formatString: 'YY', sourceString: '2000' },
      { formatString: 'YY', sourceString: '1987' },
      { formatString: 'YY', sourceString: '2068' },
      { formatString: 'YYYY', sourceString: '0' },
      { formatString: 'YYYY', sourceString: '3' },
      { formatString: 'YYYY', sourceString: '-4' },
      { formatString: 'YYYY', sourceString: '68' },
      { formatString: 'YYYY', sourceString: '69' },
      { formatString: 'YYYY', sourceString: '87' },
      { formatString: 'YYYY', sourceString: '-53' },
      { formatString: 'YYYY', sourceString: '0000' },
      { formatString: 'YYYY', sourceString: '1870' },
      { formatString: 'YYYY', sourceString: '1923' },
      { formatString: 'YYYY', sourceString: '2000' },
      { formatString: 'YYYY', sourceString: '2023' },
    ])('parse year "$sourceString" with "$formatString"', ({ sourceString, formatString }) => {
      expectSameResult((esday) => esday(sourceString, formatString))
      expect(esday(sourceString, formatString).isValid()).toBeTruthy()
    })

    it.each([
      { formatString: 'M', sourceString: '8' },
      { formatString: 'M', sourceString: '08' },
      { formatString: 'M', sourceString: '11' },
    ])('parse month "$sourceString" with "$formatString"', ({ sourceString, formatString }) => {
      expectSameResult((esday) => esday(sourceString, formatString))
      expect(esday(sourceString, formatString).isValid()).toBeTruthy()
    })

    it.each([
      { formatString: 'D', sourceString: '8' },
      { formatString: 'D', sourceString: '08' },
      { formatString: 'D', sourceString: '11' },
    ])(
      'parse day of month "$sourceString" with "$formatString"',
      ({ sourceString, formatString }) => {
        expectSameResult((esday) => esday(sourceString, formatString))
        expect(esday(sourceString, formatString).isValid()).toBeTruthy()
      },
    )

    it.each([
      { formatString: 'S', sourceString: '0', expectedMS: 0 },
      { formatString: 'S', sourceString: '3', expectedMS: 300 },
      { formatString: 'S', sourceString: '14', expectedMS: 140 },
      { formatString: 'S', sourceString: '168', expectedMS: 168 },
      { formatString: 'S', sourceString: '2369', expectedMS: 236 },
      { formatString: 'S', sourceString: '23678901987', expectedMS: 236 },
      { formatString: 'SS', sourceString: '0', expectedMS: 0 },
      { formatString: 'SS', sourceString: '3', expectedMS: 300 },
      { formatString: 'SS', sourceString: '14', expectedMS: 140 },
      { formatString: 'SS', sourceString: '168', expectedMS: 168 },
      { formatString: 'SS', sourceString: '2369', expectedMS: 236 },
      { formatString: 'SS', sourceString: '23678901987', expectedMS: 236 },
      { formatString: 'SSS', sourceString: '0', expectedMS: 0 },
      { formatString: 'SSS', sourceString: '3', expectedMS: 300 },
      { formatString: 'SSS', sourceString: '14', expectedMS: 140 },
      { formatString: 'SSS', sourceString: '168', expectedMS: 168 },
      { formatString: 'SSS', sourceString: '2369', expectedMS: 236 },
      { formatString: 'SSS', sourceString: '23678901987', expectedMS: 236 },
    ])(
      'parse milliseconds "$sourceString" with "$formatString" - difference to moment.js',
      ({ sourceString, formatString, expectedMS }) => {
        expect(esday(sourceString, formatString).millisecond()).toBe(expectedMS)
        expectSame((esday) => esday(sourceString, formatString).millisecond())
      },
    )

    it.each([
      {
        formatString: 'MM-YYYY-DD HH:mm:ss.SSS',
        sourceString: '08-2023-14 21:43:12.123',
      },
      {
        formatString: 'MM-YYYY-DD HH:mm:ss.SSS',
        sourceString: '8-2023-4 1:3:2.3',
      },
      {
        formatString: 'M-YY-D H:m:s.SS',
        sourceString: '08-2023-14 21:43:12.123',
      },
      { formatString: 'M-YY-D H:m:s.SS', sourceString: '8-23-4 1:3:2.3' },
      { formatString: 'YYYY', sourceString: '2025' },
      { formatString: 'YYYY DD', sourceString: '2025 14' },
      { formatString: 'Q YYYY', sourceString: '1 2023' },
      { formatString: 'Q YYYY', sourceString: '2 2023' },
      { formatString: 'Q YYYY', sourceString: '3 2023' },
      { formatString: 'Q YYYY', sourceString: '4 2023' },
      { formatString: 'Q YYYY', sourceString: '2 22' },
      { formatString: 'x', sourceString: '1442086062579' },
      { formatString: 'X', sourceString: '1442086062.579' },
      { formatString: 'X', sourceString: '1442086062' },
    ])('parse date&time "$sourceString" with "$formatString"', ({ sourceString, formatString }) => {
      expectSameResult((esday) => esday(sourceString, formatString))
      expect(esday(sourceString, formatString).isValid()).toBeTruthy()
    })

    it.each([
      { formatString: 'DD.MM.YYYY', sourceString: '31.12.2019' },
      { formatString: 'DD.MM.YYYY', sourceString: '01.01.2019' },
    ])(
      'parse date&time edge case "$sourceString" with format "$formatString"',
      ({ sourceString, formatString }) => {
        expectSameResult((esday) => esday(sourceString, formatString))
        expect(esday(sourceString, formatString).isValid()).toBeTruthy()
      },
    )

    it.each(['-', '_', ',', '(', ')', '/'])('using "%s" as separator', (sep) => {
      const sourceString = '17?12?2023?03?24?46?234'
      const formatString = `DD${sep}MM${sep}YYYY${sep}HH${sep}mm${sep}ss${sep}SSS`

      expectSameResult((esday) => esday(sourceString, formatString))
    })

    it('parse with "." as separator', () => {
      const sourceString = '17.12.2023T03.12.46.234'
      const formatString = 'DD.MM.YYYYTHH.mm.ss.SSS'

      expectSameResult((esday) => esday(sourceString, formatString))
    })

    it('parse with ":" as separator', () => {
      const sourceString = '17:12:2023T03:12:46.234'
      const formatString = 'DD:MM:YYYYTHH:mm:ss:SSS'

      expectSameResult((esday) => esday(sourceString, formatString))
    })

    it('parse with different separator in source and format', () => {
      const sourceString = '2024/07/09T21:27:34.000'
      const formatString = 'YYYY-MM-DD HH-mm-ss-SSS'

      expectSameResult((esday) => esday(sourceString, formatString))
    })

    it('parse with remaining text in sourceString', () => {
      const sourceString = '2024/07/09 14:27:34.987 and many more characters'
      const formatString = 'YYYY-MM-DD HH-mm-ss-SSS'

      expectSameResult((esday) => esday(sourceString, formatString))
    })

    it('parse with not enough text in sourceString', () => {
      const sourceString = '2024/07/09T21:27'
      const formatString = 'YYYY-MM-DD HH-mm-ss-SSS'

      expectSameResult((esday) => esday(sourceString, formatString))
    })

    it('parse with text as separator', () => {
      const sourceString = '2024ppp07qqq09 21:27:34'
      const formatString = 'YYYY-MM-DD HH:mm:ss'

      expectSameResult((esday) => esday(sourceString, formatString))
    })

    it('parse with escaped text as separator', () => {
      const sourceString = '2024/07/09 21H27m34'
      const formatString = 'YYYY-MM-DD HH[H]mm[m]ss'

      expectSameResult((esday) => esday(sourceString, formatString))
    })

    it.each([
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 01:02:03.004 +01:00',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 11:21:32.432 +01:30',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 01:02:03.004 +0100',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 10:02:03.004 -04:00',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS ZZ',
        sourceString: '2018-05-02 11:21:32.432 +03:00',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS ZZ',
        sourceString: '2018-05-02 01:02:03.004 +0100',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS ZZ',
        sourceString: '2018-05-02 01:02:03.004 -01:00',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS ZZ',
        sourceString: '2018-05-02 01:02:03.004 -0100',
      },
      {
        formatString: 'D.M.YY H:m:s.S ZZ',
        sourceString: '2.5.18 1:2:3.4 -0100',
      },
      { formatString: 'YYYY-MM-DD ZZ', sourceString: '2018-05-02 +03:00' },
      { formatString: 'YYYY-MM-DD ZZ', sourceString: '2018-05-02 -0100' },
      { formatString: 'YYYY-MM ZZ', sourceString: '2018-05 +03:00' },
      { formatString: 'YYYY-MM ZZ', sourceString: '2018-05 -0100' },
      { formatString: 'YYYY ZZ', sourceString: '2018 +01:00' },
      { formatString: 'YYYY ZZ', sourceString: '2018 -0800' },
      {
        formatString: 'YYYY-MM-DD[T]HH:mm:ssZZ',
        sourceString: '2020-12-01T20:00:00+09',
      },
      {
        formatString: 'YYYY-MM-DD[T]HH:mm:ssZZ',
        sourceString: '2020-12-01T20:00:00-03',
      },
      {
        formatString: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
        sourceString: '2021-01-26T15:38:43.000Z',
      },
    ])('parse offset in "$sourceString" with "$formatString"', ({ sourceString, formatString }) => {
      expectSameResult((esday) => esday(sourceString, formatString))
      expect(esday(sourceString, formatString).isValid()).toBeTruthy()
    })

    it.each([
      { formatString: 'Q YYYY', sourceString: '02 2023' },
      { formatString: 'Q YYYY', sourceString: '54 2023' },
      { formatString: 'YYYY-MM-DD', sourceString: '1970-00-00' },
      {
        formatString: 'DD-MM-YYYY HH:mm:ss',
        sourceString: '35/22/2010 99:88:77',
      },
    ])(
      'parse invalid date "$sourceString" with format "$formatString"',
      ({ sourceString, formatString }) => {
        const parsedEsday = esday(sourceString, formatString)

        expectSameResult((esday) => esday(sourceString, formatString))
        expect(parsedEsday.isValid()).toBeFalsy()
      },
    )

    it('parse date not matching format', () => {
      const sourceString = '10/12/2014'
      const formatString = 'YYYY-MM-DD'

      expectSameResult((esday) => esday(sourceString, formatString))
      expect(esday(sourceString, formatString).isValid()).toBeTruthy()
    })

    it('parse invalid format ""', () => {
      const sourceString = ''
      const formatString = 'YYYY-MM-DD'

      expect(esday(sourceString, formatString).isValid()).toBeFalsy()
      expectSameResult((esday) => esday(sourceString, formatString))
    })

    it('invalid date returns "Invalid Date" as toISOString unlike momentjs', () => {
      const sourceString = ''
      const formatString = 'YYYY-MM-DD'
      const parsedEsDay = esday(sourceString, formatString)

      expect(parsedEsDay.isValid()).toBeFalsy()
      expect(parsedEsDay.toISOString()).toBe(C.INVALID_DATE_STRING)
      expect(moment(sourceString, formatString).toISOString()).toBeNull()
    })
  })

  describe('parse with format as array of strings', () => {
    it.each([
      {
        name: 'last match',
        formatString: ['YYYY', 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss'],
        sourceString: '2012-05-28 10:21:15',
      },
      {
        name: 'first match',
        formatString: ['YYYY-MM-DD HH:mm:ss', 'YYYY', 'YYYY-MM-DD'],
        sourceString: '2012-11-28 20:21:15',
      },
      {
        name: 'single entry',
        formatString: ['YYYY-MM-DD'],
        sourceString: '2012-11-28 20:21:15',
      },
    ])('parse "$sourceString" with array - "$name"', ({ formatString, sourceString }) => {
      expectSameResult((esday) => esday(sourceString, formatString))
      expect(esday(sourceString, formatString).isValid()).toBeTruthy()
    })

    it.each([
      {
        name: 'empty format',
        formatString: [''],
        sourceString: '2012-11-28 20:21:15',
      },
      {
        name: 'no entry',
        formatString: [],
        sourceString: '2012-11-28 20:21:15',
      },
    ])('parse "$sourceString" with invalid array - "$name"', ({ formatString, sourceString }) => {
      expectSameResult((esday) => esday(sourceString, formatString))
      expect(esday(sourceString, formatString).isValid()).toBeFalsy()
    })
  })

  describe('parse in strict mode with format as single string', () => {
    const fakeTimeAsString = '2023-12-17T03:24:46.234'

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(fakeTimeAsString))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it.each([
      {
        formatString: 'MM-YYYY-DD HH:mm:ss.SSS',
        sourceString: '08-2023-14 21:43:12.123',
      },
      { formatString: 'M-YY-D H:m:s.SS', sourceString: '8-23-14 21:43:12.13' },
      { formatString: 'M', sourceString: '8' },
      { formatString: 'Q YYYY', sourceString: '1 2023' },
      { formatString: 'Q YYYY', sourceString: '2 2023' },
      { formatString: 'Q YYYY', sourceString: '3 2023' },
      { formatString: 'Q YYYY', sourceString: '4 2023' },
      { formatString: 'x', sourceString: '1442086062579' },
      { formatString: 'X', sourceString: '1442086062.579' },
      { formatString: 'X', sourceString: '1442086062' },
    ])(
      'parse strict date&time "$sourceString" with "$formatString"',
      ({ sourceString, formatString }) => {
        expectSameResult((esday) => esday(sourceString, formatString, true))
        expect(esday(sourceString, formatString, true).isValid()).toBeTruthy()
      },
    )

    it.each([
      { formatString: 'DD.MM.YYYY', sourceString: '31.12.2019' },
      { formatString: 'DD.MM.YYYY', sourceString: '01.01.2019' },
    ])(
      'parse strict date&time edge case "$sourceString" with format "$formatString"',
      ({ sourceString, formatString }) => {
        expectSameResult((esday) => esday(sourceString, formatString, true))
        expect(esday(sourceString, formatString, true).isValid()).toBeTruthy()
      },
    )

    it.each([
      {
        formatString: 'MM/YYYY/DD HH mm.ss SSS',
        sourceString: '08/2023/14 21 43.12 123',
      },
      {
        formatString: 'MM-YYYY_DD HH,mm(ss)SSS',
        sourceString: '08-2023_14 21,43(12)123',
      },
    ])(
      'parse strict "$sourceString" with format "$formatString" (various separator characters)',
      ({ sourceString, formatString }) => {
        expectSameResult((esday) => esday(sourceString, formatString))
        expect(esday(sourceString, formatString).isValid()).toBeTruthy()
      },
    )

    it('does not parse strict date&time with non-matching separator characters', () => {
      const formatString = 'MM-YYYY-DD HH mm.ss SSS'
      const sourceString = '08/2023/14 21:43:12.123'
      const parsedDateEsDay = esday(sourceString, formatString, true)

      expect(parsedDateEsDay.isValid()).toBeFalsy()
      expectSame((esday) => esday(sourceString, formatString, true).isValid())
    })

    it.each([
      {
        formatString: 'MM-YYYY-DD HH:mm:ss.SSS',
        sourceString: '8-2023-4 1:3:2.3',
      },
      {
        formatString: 'M-YY-D H:m:s.SS',
        sourceString: '08-2023-14 21:43:12.123',
      },
      {
        formatString: 'M-YY-D H:m:s.SS',
        sourceString: '08-2023-14 21:43:12.13',
      },
      { formatString: 'M-YY-D H:m:s.SS', sourceString: '8-23-4 1:3:2.3' },
      { formatString: 'Q YYYY', sourceString: '1 23' },
      { formatString: 'Q YYYY', sourceString: '02 23' },
      { formatString: 'x', sourceString: '1442086062.579' },
    ])(
      'does not parse strict date&time "$sourceString" with "$formatString"',
      ({ sourceString, formatString }) => {
        const parsedDateEsDay = esday(sourceString, formatString, true)

        expect(parsedDateEsDay.isValid()).toBeFalsy()
        expectSame((esday) => esday(sourceString, formatString, true).isValid())
      },
    )

    it.each([
      {
        formatString: 'M-YY-D H:m:s.SS',
        sourceString: '08-2023-14 21:43:12.123',
        comment: '4-digit year',
      },
      { formatString: 'YY', sourceString: '2023', comment: '4-digit year' },
    ])(
      'parse as invalid for "$sourceString" with "$formatString"',
      ({ sourceString, formatString }) => {
        const parsedDateEsDay = esday(sourceString, formatString, true)
        const parsedDateMoment = moment(sourceString, formatString, true)

        expect(parsedDateMoment.isValid()).toBeFalsy()
        expect(parsedDateEsDay.isValid()).toBeFalsy()
      },
    )

    it.each([
      { formatString: 'DD.MM.YYYY', sourceString: '31.12.2019' },
      { formatString: 'DD.MM.YYYY', sourceString: '01.01.2019' },
    ])(
      'parse date&time edge case "$sourceString" with format "$formatString"',
      ({ sourceString, formatString }) => {
        expectSameResult((esday) => esday(sourceString, formatString, true))
        expect(esday(sourceString, formatString, true).isValid()).toBeTruthy()
      },
    )

    it.each([
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 01:02:03.004 +01:00',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 11:21:32.432 +01:30',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 01:02:03.004 +0100',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 10:02:03.004 -04:00',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS ZZ',
        sourceString: '2018-05-02 11:21:32.432 +03:00',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS ZZ',
        sourceString: '2018-05-02 01:02:03.004 +0100',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS ZZ',
        sourceString: '2018-05-02 01:02:03.004 -01:00',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS ZZ',
        sourceString: '2018-05-02 01:02:03.004 -0100',
      },
      {
        formatString: 'D.M.YY H:m:s.S ZZ',
        sourceString: '2.5.18 1:2:3.4 -0100',
      },
      { formatString: 'YYYY-MM-DD ZZ', sourceString: '2018-05-02 +03:00' },
      { formatString: 'YYYY-MM-DD ZZ', sourceString: '2018-05-02 -0100' },
      { formatString: 'YYYY-MM ZZ', sourceString: '2018-05 +03:00' },
      { formatString: 'YYYY-MM ZZ', sourceString: '2018-05 -0100' },
      { formatString: 'YYYY ZZ', sourceString: '2018 +01:00' },
      { formatString: 'YYYY ZZ', sourceString: '2018 -0800' },
      {
        formatString: 'YYYY-MM-DD[T]HH:mm:ssZZ',
        sourceString: '2020-12-01T20:00:00+09',
      },
      {
        formatString: 'YYYY-MM-DD[T]HH:mm:ssZZ',
        sourceString: '2020-12-01T20:00:00-03',
      },
      {
        formatString: 'YYYY-MM-DD[T]HH:mm:ss.SSSZ',
        sourceString: '2021-01-26T15:38:43.000Z',
      },
    ])('parse offset in "$sourceString" with "$formatString"', ({ sourceString, formatString }) => {
      expectSameResult((esday) => esday(sourceString, formatString, true))
      expect(esday(sourceString, formatString, true).isValid()).toBeTruthy()
    })
  })

  describe('parse in strict mode with format as array of strings', () => {
    it.each([
      {
        name: 'last match',
        formatString: ['YYYY', 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss'],
        sourceString: '2012-05-28 10:21:15',
      },
      {
        name: 'first match',
        formatString: ['YYYY-MM-DD HH:mm:ss', 'YYYY', 'YYYY-MM-DD'],
        sourceString: '2012-11-28 20:21:15',
      },
    ])('parse "$sourceString" with array - "$name"', ({ formatString, sourceString }) => {
      expectSameResult((esday) => esday(sourceString, formatString, true))
      expect(esday(sourceString, formatString, true).isValid()).toBeTruthy()
    })

    it.each([
      {
        name: 'missing token',
        formatString: ['YYYY-MM-DD'],
        sourceString: '2012-11-28 20:21:15',
      },
      {
        name: 'empty format',
        formatString: [''],
        sourceString: '2012-11-28 20:21:15',
      },
      {
        name: 'no entry',
        formatString: [],
        sourceString: '2012-11-28 20:21:15',
      },
    ])('parse "$sourceString" with invalid array - "$name"', ({ formatString, sourceString }) => {
      const parsedEsDay = esday(sourceString, formatString, true)
      const parsedMoment = moment(sourceString, formatString, true)

      expect(parsedMoment.isValid()).toBeFalsy()
      expect(parsedEsDay.isValid()).toBeFalsy()
    })
  })

  describe('extend token definitions', () => {
    it.each([
      { formatString: 'YYYY PP', sourceString: '2024 3' },
      { formatString: 'YYYY PP', sourceString: '2024 23' },
    ])(
      'add new token to list of tokens - test with "$sourceString" with format "$formatString"',
      ({ sourceString, formatString }) => {
        const additionalTokens: TokenDefinitions = {
          PP: [
            /\d\d?/,
            /\d{2}/,
            (parsedElements: ParsedElements, input: string) => {
              // we don't use parsed value ('input')
              if (input.length > 0) {
                parsedElements.milliseconds = 987
              }
            },
          ],
        }
        esday.addParseTokenDefinitions(additionalTokens)
        const parsedDate = esday(sourceString, formatString)

        expect(parsedDate.year()).toBe(2024)
        expect(parsedDate.millisecond()).toBe(987)
      },
    )

    it.each([{ formatString: 'YYYY PP', sourceString: '2024 234' }])(
      'add new token to list of tokens - failing test with "$sourceString" with format "$formatString"',
      ({ sourceString, formatString }) => {
        const additionalTokens: TokenDefinitions = {
          PP: [
            /\d\d?/,
            /\d{2}/,
            (parsedElements: ParsedElements, input: string) => {
              // we don't use parsed value ('input')
              if (input.length > 0) {
                parsedElements.milliseconds = 987
              }
            },
          ],
        }
        esday.addParseTokenDefinitions(additionalTokens)
        const parsedDate = esday(sourceString, formatString)

        expect(parsedDate.year()).toBe(2024)
        expect(parsedDate.millisecond()).toBe(987)
      },
    )

    it.each([{ formatString: 'YYYY PP', sourceString: '2024 23' }])(
      'add new token to list of tokens - test in strict mode with "$sourceString" with format "$formatString"',
      ({ sourceString, formatString }) => {
        const additionalTokens: TokenDefinitions = {
          PP: [
            /\d\d?/,
            /\d{2}/,
            (parsedElements: ParsedElements, input: string) => {
              // we don't use parsed value ('input')
              if (input.length > 0) {
                parsedElements.milliseconds = 987
              }
            },
          ],
        }
        esday.addParseTokenDefinitions(additionalTokens)
        const parsedDate = esday(sourceString, formatString, true)

        expect(parsedDate.year()).toBe(2024)
        expect(parsedDate.millisecond()).toBe(987)
      },
    )

    it.each([{ formatString: 'YYYY PP', sourceString: '2024 3' }])(
      'add new token to list of tokens - failing test in strict mode with "$sourceString" with format "$formatString"',
      ({ sourceString, formatString }) => {
        const additionalTokens: TokenDefinitions = {
          PP: [
            /\d\d?/,
            /\d{2}/,
            (parsedElements: ParsedElements, input: string) => {
              // we don't use parsed value ('input')
              if (input.length > 0) {
                parsedElements.milliseconds = 987
              }
            },
          ],
        }
        esday.addParseTokenDefinitions(additionalTokens)
        const parsedDate = esday(sourceString, formatString, true)

        expect(parsedDate.isValid()).toBeFalsy()
      },
    )

    it('adding existing token should not change existing definition', () => {
      const additionalTokens: TokenDefinitions = {
        YYYY: [
          /\d\d?/,
          /\d{2}/,
          (parsedElements: ParsedElements, input: string) => {
            // we don't use parsed value ('input')
            if (input.length > 0) {
              parsedElements.milliseconds = 987
            }
          },
        ],
      }
      esday.addParseTokenDefinitions(additionalTokens)
      const sourceString = '2024'
      const formatString = 'YYYY'
      const parsedDate = esday(sourceString, formatString, true)

      expect(parsedDate.year()).toBe(2024)
      expect(parsedDate.millisecond()).toBe(0)
    })
  })
})
