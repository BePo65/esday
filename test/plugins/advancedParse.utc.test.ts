import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { describe, expect, it } from 'vitest'
import advancedParsePlugin from '~/plugins/advancedParse'
import type { ParsedElements, TokenDefinitions } from '~/plugins/advancedParse/types'
import utcPlugin from '~/plugins/utc'
import { expectSameObject, expectSameValue } from '../util'

esday.extend(utcPlugin)
esday.extend(advancedParsePlugin)

describe('advancedParse plugin - utc mode', () => {
  describe('converted parsed date', () => {
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
      { formatString: 'Q YYYY', sourceString: '2 2023' },
      { formatString: 'x', sourceString: '1442086062579' },
      { formatString: 'X', sourceString: '1442086062.579' },
    ])('parse date&time "$sourceString" with format "$formatString"', ({
      sourceString,
      formatString,
    }) => {
      expectSameObject((esday) => esday(sourceString, formatString).utc())
      expect(esday(sourceString, formatString).utc().isValid()).toBeTruthy()
    })

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
    ])('parse date&time "$sourceString" with format as array - "$name"', ({
      formatString,
      sourceString,
    }) => {
      expectSameObject((esday) => esday(sourceString, formatString).utc())
      expect(esday(sourceString, formatString).utc().isValid()).toBeTruthy()
    })

    it.each([
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 04:02:03.004 +01:00',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 11:51:32.432 +01:30',
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
      expectSameObject((esday) => esday(sourceString, formatString).utc())
      expect(esday(sourceString, formatString).utc().isValid()).toBeTruthy()
    })

    it.each([
      { formatString: 'Q YYYY', sourceString: '02 2023' },
      { formatString: 'Q YYYY', sourceString: '54 2023' },
      { formatString: 'YYYY-MM-DD', sourceString: '1970-00-00' },
      {
        formatString: 'DD-MM-YYYY HH:mm:ss',
        sourceString: '35/22/2010 99:88:77',
      },
    ])('parse invalid date "$sourceString" with format "$formatString"', ({
      sourceString,
      formatString,
    }) => {
      const parsedEsday = esday(sourceString, formatString).utc()

      expectSameObject((esday) => esday(sourceString, formatString).utc())
      expect(parsedEsday.isValid()).toBeFalsy()
    })
  })

  describe('converted strict parsed date', () => {
    it.each([
      {
        formatString: 'MM-YYYY-DD HH:mm:ss.SSS',
        sourceString: '08-2023-14 21:43:12.123',
      },
      { formatString: 'M-YY-D H:m:s.SS', sourceString: '8-23-14 21:43:12.13' },
      { formatString: 'DD.MM.YYYY', sourceString: '31.12.2019' },
      { formatString: 'DD.MM.YYYY', sourceString: '01.01.2019' },
      { formatString: 'M', sourceString: '8' },
      { formatString: 'Q YYYY', sourceString: '3 2023' },
      { formatString: 'x', sourceString: '1442086062579' },
      { formatString: 'X', sourceString: '1442086062.579' },
      { formatString: 'X', sourceString: '1442086062' },
    ])('parse strict date&time "$sourceString" with format "$formatString"', ({
      sourceString,
      formatString,
    }) => {
      expectSameObject((esday) => esday(sourceString, formatString, true).utc())
      expect(esday(sourceString, formatString, true).utc().isValid()).toBeTruthy()
    })

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
    ])('parse strict date&time "$sourceString" with format as array - "$name"', ({
      formatString,
      sourceString,
    }) => {
      expectSameObject((esday) => esday(sourceString, formatString, true).utc())
      expect(esday(sourceString, formatString, true).utc().isValid()).toBeTruthy()
    })

    it.each([
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 04:02:03.004 +01:00',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 11:51:32.432 +01:30',
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
      expectSameObject((esday) => esday(sourceString, formatString, true).utc())
      expect(esday(sourceString, formatString, true).utc().isValid()).toBeTruthy()
    })

    it('does not parse strict date&time with non-matching separator characters', () => {
      const formatString = 'MM-YYYY-DD HH mm.ss SSS'
      const sourceString = '08/2023/14 21:43:12.123'
      const parsedDateEsDay = esday(sourceString, formatString, true).utc()

      expect(parsedDateEsDay.isValid()).toBeFalsy()
      expectSameValue((esday) => esday(sourceString, formatString, true).utc().isValid())
    })

    it.each([
      {
        formatString: 'M-YY-D H:m:s.SS',
        sourceString: '08-2023-14 21:43:12.123',
        comment: '4-digit year',
      },
      { formatString: 'YY', sourceString: '2023', comment: '4-digit year' },
    ])('parsing should not be valid for "$sourceString" with "$formatString"', ({
      sourceString,
      formatString,
    }) => {
      const parsedDateEsDay = esday(sourceString, formatString, true).utc()
      const parsedDateMoment = moment(sourceString, formatString, true).utc()

      expect(parsedDateMoment.isValid()).toBeFalsy()
      expect(parsedDateEsDay.isValid()).toBeFalsy()
    })
  })

  describe('utc parsed date', () => {
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
      { formatString: 'Q YYYY', sourceString: '2 2023' },
      { formatString: 'x', sourceString: '1442086062579' },
      { formatString: 'X', sourceString: '1442086062.579' },
    ])('parse date&time "$sourceString" with format "$formatString"', ({
      sourceString,
      formatString,
    }) => {
      expectSameObject((esday) => esday.utc(sourceString, formatString))
      expect(esday.utc(sourceString, formatString).isValid()).toBeTruthy()
    })

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
    ])('parse date&time "$sourceString" with format as array - "$name"', ({
      formatString,
      sourceString,
    }) => {
      expectSameObject((esday) => esday.utc(sourceString, formatString))
      expect(esday.utc(sourceString, formatString).isValid()).toBeTruthy()
    })

    it.each([
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 04:02:03.004 +01:00',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 11:51:32.432 +01:30',
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
      expectSameObject((esday) => esday.utc(sourceString, formatString))
      expect(esday.utc(sourceString, formatString).isValid()).toBeTruthy()
    })

    it.each([
      { formatString: 'Q YYYY', sourceString: '02 2023' },
      { formatString: 'Q YYYY', sourceString: '54 2023' },
      { formatString: 'YYYY-MM-DD', sourceString: '1970-00-00' },
      {
        formatString: 'DD-MM-YYYY HH:mm:ss',
        sourceString: '35/22/2010 99:88:77',
      },
    ])('parse invalid date "$sourceString" with format "$formatString"', ({
      sourceString,
      formatString,
    }) => {
      const parsedEsday = esday.utc(sourceString, formatString)

      expectSameObject((esday) => esday.utc(sourceString, formatString))
      expect(parsedEsday.isValid()).toBeFalsy()
    })
  })

  describe('utc strict parsed date', () => {
    it.each([
      {
        formatString: 'MM-YYYY-DD HH:mm:ss.SSS',
        sourceString: '08-2023-14 21:43:12.123',
      },
      { formatString: 'M-YY-D H:m:s.SS', sourceString: '8-23-14 21:43:12.13' },
      { formatString: 'DD.MM.YYYY', sourceString: '31.12.2019' },
      { formatString: 'DD.MM.YYYY', sourceString: '01.01.2019' },
      { formatString: 'M', sourceString: '8' },
      { formatString: 'Q YYYY', sourceString: '3 2023' },
      { formatString: 'x', sourceString: '1442086062579' },
      { formatString: 'X', sourceString: '1442086062.579' },
      { formatString: 'X', sourceString: '1442086062' },
    ])('parse strict date&time "$sourceString" with format "$formatString"', ({
      sourceString,
      formatString,
    }) => {
      expectSameObject((esday) => esday.utc(sourceString, formatString, true))
      expect(esday.utc(sourceString, formatString, true).isValid()).toBeTruthy()
    })

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
    ])('parse strict date&time "$sourceString" with format as array - "$name"', ({
      formatString,
      sourceString,
    }) => {
      expectSameObject((esday) => esday.utc(sourceString, formatString, true))
      expect(esday.utc(sourceString, formatString, true).isValid()).toBeTruthy()
    })

    it.each([
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 04:02:03.004 +01:00',
      },
      {
        formatString: 'YYYY-MM-DD HH:mm:ss.SSS Z',
        sourceString: '2018-05-02 11:51:32.432 +01:30',
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
      expectSameObject((esday) => esday.utc(sourceString, formatString, true))
      expect(esday.utc(sourceString, formatString, true).isValid()).toBeTruthy()
    })

    it('does not parse strict date&time with non-matching separator characters', () => {
      const formatString = 'MM-YYYY-DD HH mm.ss SSS'
      const sourceString = '08/2023/14 21:43:12.123'
      const parsedDateEsDay = esday.utc(sourceString, formatString, true)

      expect(parsedDateEsDay.isValid()).toBeFalsy()
      expectSameValue((esday) => esday.utc(sourceString, formatString, true).isValid())
    })

    it.each([
      {
        formatString: 'M-YY-D H:m:s.SS',
        sourceString: '08-2023-14 21:43:12.123',
        comment: '4-digit year',
      },
      { formatString: 'YY', sourceString: '2023', comment: '4-digit year' },
    ])('parsing should not be valid for "$sourceString" with "$formatString"', ({
      sourceString,
      formatString,
    }) => {
      const parsedDateEsDay = esday.utc(sourceString, formatString, true)
      const parsedDateMoment = moment.utc(sourceString, formatString, true)

      expect(parsedDateMoment.isValid()).toBeFalsy()
      expect(parsedDateEsDay.isValid()).toBeFalsy()
    })
  })

  describe('extend token definitions', () => {
    it.each([
      { formatString: 'YYYY PP', sourceString: '2024 3' },
      { formatString: 'YYYY PP', sourceString: '2024 23' },
    ])('add new token to list of tokens - test with "$sourceString" with format "$formatString"', ({
      sourceString,
      formatString,
    }) => {
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
      const parsedDate = esday.utc(sourceString, formatString)

      expect(parsedDate.year()).toBe(2024)
      expect(parsedDate.millisecond()).toBe(987)
    })

    it.each([
      { formatString: 'YYYY PP', sourceString: '2024 234' },
    ])('add new token to list of tokens - failing test with "$sourceString" with format "$formatString"', ({
      sourceString,
      formatString,
    }) => {
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
      const parsedDate = esday.utc(sourceString, formatString)

      expect(parsedDate.year()).toBe(2024)
      expect(parsedDate.millisecond()).toBe(987)
    })

    it.each([
      { formatString: 'YYYY PP', sourceString: '2024 23' },
    ])('add new token to list of tokens - test in strict mode with "$sourceString" with format "$formatString"', ({
      sourceString,
      formatString,
    }) => {
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
      const parsedDate = esday.utc(sourceString, formatString, true)

      expect(parsedDate.year()).toBe(2024)
      expect(parsedDate.millisecond()).toBe(987)
    })

    it.each([
      { formatString: 'YYYY PP', sourceString: '2024 3' },
    ])('add new token to list of tokens - failing test in strict mode with "$sourceString" with format "$formatString"', ({
      sourceString,
      formatString,
    }) => {
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
      const parsedDate = esday.utc(sourceString, formatString, true)

      expect(parsedDate.isValid()).toBeFalsy()
    })

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
      const parsedDate = esday.utc(sourceString, formatString, true)

      expect(parsedDate.year()).toBe(2024)
      expect(parsedDate.millisecond()).toBe(0)
    })
  })
})
