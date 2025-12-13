import { esday } from 'esday'
import moment from 'moment/min/moment-with-locales'
import { describe, expect, it } from 'vitest'
import dayOfYearPlugin from '~/plugins/dayOfYear'

esday.extend(dayOfYearPlugin)

describe('dayOfYear plugin', () => {
  it.each([
    '1900-01-01',
    '1000-01-01',
    '2020-03-01',
    '2020-12-31',
    '2021-01-01',
    '2021-02-28',
    '2021-03-01',
    '2021-12-31',
  ])('should correctly calculate day of year for "%s"', (date) => {
    const esdayDate = esday(date)
    const momentDate = moment(date)
    expect(esdayDate.dayOfYear()).toEqual(momentDate.dayOfYear())
  })

  it('should set the day of year correctly', () => {
    const esdayDate = esday('2020-01-01')
    const momentDate = moment('2020-01-01')
    const newDayOfYear = 100
    const newEsdayDate = esdayDate.dayOfYear(newDayOfYear)
    const newMomentDate = momentDate.dayOfYear(newDayOfYear)
    expect(newEsdayDate.format('YYYY-MM-DD')).toBe(newMomentDate.format('YYYY-MM-DD'))
  })
})
