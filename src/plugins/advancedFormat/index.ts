/**
 * advancedFormat plugin
 *
 * This plugin adds format definitions to date formatting
 */

import type { EsDay, EsDayPlugin, FormattingTokenDefinitions } from 'esday'
import { padStart, padZoneStr } from '~/common'

const advancedFormatPlugin: EsDayPlugin<{}> = (_, _dayClass, dayFactory) => {
  // Extend formatting tokens
  const additionalTokens: FormattingTokenDefinitions = {
    d: (sourceDate: EsDay) => sourceDate.day().toString(),
    S: (sourceDate: EsDay) => padStart(sourceDate.millisecond(), 3, '0').slice(0, 1),
    SS: (sourceDate: EsDay) => padStart(sourceDate.millisecond(), 3, '0').slice(0, 2),
    ZZ: (sourceDate: EsDay) => padZoneStr(sourceDate.utcOffset()).replace(':', ''),
    X: (sourceDate: EsDay) => sourceDate.unix().toString(),
    x: (sourceDate: EsDay) => sourceDate.valueOf().toString(),
    k: (sourceDate: EsDay) => (sourceDate.hour() !== 0 ? sourceDate.hour() : 24).toString(),
    kk: (sourceDate: EsDay) => padStart(sourceDate.hour() !== 0 ? sourceDate.hour() : 24, 2, '0'),
  }
  dayFactory.addFormatTokenDefinitions(additionalTokens)
}

export default advancedFormatPlugin
