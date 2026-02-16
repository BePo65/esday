import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { describe, expect, it } from 'vitest'
import isLeapYearPlugin from '~/plugins/isLeapYear'

esday.extend(isLeapYearPlugin)

describe('isLeapYear plugin', () => {
  it.each([2000, 2004, 2020, 2400])('should correctly identify "%i" as leap year', (year) => {
    const esdayDate = esday(`${year}-01-01`)
    const momentDate = moment(`${year}-01-01`)
    expect(esdayDate.isLeapYear()).toBe(true)
    expect(esdayDate.isLeapYear()).toBe(momentDate.isLeapYear())
  })

  it.each([1900, 2001, 2021, 2100])('should correctly identify "%i" as non-leap year', (year) => {
    const esdayDate = esday(`${year}-01-01`)
    const momentDate = moment(`${year}-01-01`)
    expect(esdayDate.isLeapYear()).toBe(false)
    expect(esdayDate.isLeapYear()).toBe(momentDate.isLeapYear())
  })

  it.each([
    '2000-02-29',
    '2020-12-31',
    '1900-06-15',
  ])('should work correctly with different "%s"', (date) => {
    const esdayDate = esday(date)
    const momentDate = moment(date)
    expect(esdayDate.isLeapYear()).toBe(momentDate.isLeapYear())
  })
})
