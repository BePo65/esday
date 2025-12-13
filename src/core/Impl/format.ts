import type { EsDay, FormattingTokenDefinitions } from 'esday'
import { C, padStart, padZoneStr } from '~/common'

const formattingSeparatorsRegex = '\\[([^\\]]+)\\]'
let formattingTokensRegex: RegExp

export const formatTokensDefinitions: FormattingTokenDefinitions = {
  YY: (sourceDate: EsDay) => padStart(sourceDate.year(), 2, '0').slice(-2),
  YYYY: (sourceDate: EsDay) => padStart(sourceDate.year(), 4, '0'),
  M: (sourceDate: EsDay) => String(sourceDate.month() + 1),
  MM: (sourceDate: EsDay) => padStart(sourceDate.month() + 1, 2, '0'),
  D: (sourceDate: EsDay) => String(sourceDate.date()),
  DD: (sourceDate: EsDay) => padStart(sourceDate.date(), 2, '0'),
  H: (sourceDate: EsDay) => String(sourceDate.hour()),
  HH: (sourceDate: EsDay) => padStart(sourceDate.hour(), 2, '0'),
  m: (sourceDate: EsDay) => String(sourceDate.minute()),
  mm: (sourceDate: EsDay) => padStart(sourceDate.minute(), 2, '0'),
  s: (sourceDate: EsDay) => String(sourceDate.second()),
  ss: (sourceDate: EsDay) => padStart(sourceDate.second(), 2, '0'),
  SSS: (sourceDate: EsDay) => padStart(sourceDate.millisecond(), 3, '0'),
  Z: (sourceDate: EsDay) => padZoneStr(sourceDate.utcOffset()),
}

/**
 * Compare 2 tokens for sorting.
 * Longer token and upper case token are sorted to the top.
 * As we sort here object keys, a and b can never be equal.
 * @param a - token 1
 * @param b - token 2
 * @returns -1 (a<b), 0 (a==b), 1 (a>b)
 */
function compareTokens(a: string, b: string) {
  if (a.length < b.length) {
    return 1
  }
  if (a.length > b.length) {
    return -1
  }

  // length are equal, so compare values
  if (a < b) {
    return 1
  }

  // as a can never be equal to b, '-1' is the only possible value
  return -1
}
// Get regex from list of supported tokens
export function formattingTokensRegexFromDefinitions() {
  // we have to sort the keys to always catch the longest matches
  const tokenKeys = Object.keys(formatTokensDefinitions).sort(compareTokens)
  formattingTokensRegex = new RegExp(`${formattingSeparatorsRegex}|${tokenKeys.join('|')}`, 'g')
}

// initialize regexp to separate format into formatting tokens and separators
formattingTokensRegexFromDefinitions()

/**
 * Add formatting tokens to list of global formatting tokens.
 * @param newTokens - list of new parsing token definitions
 */
export function addFormatTokenDefinitions(newTokens: FormattingTokenDefinitions) {
  // add all entries from newTokens into formatTokensDefinitions (without duplicates!)
  for (const key in newTokens) {
    if (!Object.prototype.hasOwnProperty.call(formatTokensDefinitions, key)) {
      formatTokensDefinitions[key] = newTokens[key]
    }
  }

  formattingTokensRegexFromDefinitions()
}

export function formatImpl(that: EsDay, formatStr?: string) {
  if (!that.isValid()) return C.INVALID_DATE_STRING

  const activeFormatString = formatStr || C.FORMAT_DEFAULT

  const matches = (match: string) => {
    const formatter = formatTokensDefinitions[match]
    return formatter(that, formatStr)
  }

  // replace format tokens with corresponding values
  return activeFormatString.replace(formattingTokensRegex, (match, $1) => $1 || matches(match))
}
