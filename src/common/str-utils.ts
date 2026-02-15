/**
 * Capitalize the first letter of a string
 * @param str the string to capitalize
 * @returns the capitalized string
 * @example
 *
 * capitalize('hello') // 'Hello'
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Pad the start of a string with a specified character
 * @param origin the string or number to pad
 * @param length the length of the final string
 * @param pad the character to pad with
 * @returns the padded string
 *
 * @example
 *
 * padStart('hello', 10, 'a') // 'aaaaahello'
 */
export function padStart(origin: string | number, length: number, pad: string) {
  const originStr = String(origin)
  if (!originStr || originStr.length >= length) return originStr
  return `${Array.from({ length: length + 1 - originStr.length }).join(pad)}${originStr}`
}

/**
 * Add leading zeros to a number to get the defined length: if
 * the number is negative, the dash is appended after padding, the
 * resulting string has 'length+1' characters
 * @param origin the number to pad
 * @param length the length of the final string (without dash)
 * @returns the padded string
 *
 * @example
 *
 * padStart(1, 4) // '0001'
 */
export function padNumberWithLeadingZeros(origin: number, length: number) {
  const isNegative = origin < 0
  let result = String(origin)
  let dash = ''

  if (isNegative) {
    result = result.slice(1)
    dash = '-'
  }

  return `${dash}${result.padStart(length, '0')}`
}

/**
 * Format utcOffset as a string with format 'hh:mm':
 * hh: hours of the utcOffset
 * mm: minutes of the utcOffset
 * @param utcOffset - utcOffset to convert to a string
 * @returns utcOffset formatted as a string
 */
export function padZoneStr(utcOffset: number) {
  const negMinutes = -utcOffset
  const minutes = Math.abs(negMinutes)
  const hourOffset = Math.floor(minutes / 60)
  const minuteOffset = Math.trunc(minutes % 60) // ignore seconds in offset (like moment.js does)
  return `${negMinutes <= 0 ? '+' : '-'}${padStart(hourOffset, 2, '0')}:${padStart(minuteOffset, 2, '0')}`
}
