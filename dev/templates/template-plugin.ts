/**
 * <pluginName> plugin
 *
 * This plugin adds 'method1', 'method2' and formatting and parsing tokens to EsDay
 *
 * This plugin adds the formatting tokens '?' and '??' to EsDay.
 *
 * This plugin requires the '<dependency1>' plugin.
 *
 * esday parameters in '$conf' defined in <pluginName> plugin:
 *   <param1>      <what-is-this-parameter-used-for>
 *   parseOptions  ParseOptions object containing parsing options
 *
 * new esday parameters in '$conf.parseOptions':
 *   <poParam1>    <what-is-this-parameter-used-for>
 */

import type { EsDay, EsDayPlugin, FormattingTokenDefinitions, UnitType } from 'esday'
import { C } from '~/common'
import type { ParsedElements, ParseOptions, TokenDefinitions } from '~/plugins/advancedParse/types'

const match1to2 = /\d\d?/ // 0 - 99

declare module 'esday' {
  interface EsDay {
    method1(): number // Example for getter
    method1(newValue: number): EsDay // Example for setter
    method2(): EsDay
  }
}

const newPlugin: EsDayPlugin<{}> = (_, dayClass, dayFactory) => {
  const proto = dayClass.prototype

  // TODO example for new getter and setter method
  // @ts-expect-error function is compatible with its overload
  proto.method1 = (newValue: number) => {
    // Setter
    if (newValue !== undefined) {
      // TODO add setter code here
    }

    // Getter
    // TODO add getter code here
  }

  // TODO example for new method
  proto.method2 = function () {
    // TODO implement method
    const oldDate = this.date()
    return dayFactory(oldDate)
  }

  //TODO example for extending core method
  const oldStartOf = proto.startOf
  proto.startOf = function (units: UnitType) {
    if (units === C.WEEK) {
      // TODO add extended functionality here
    }
    return oldStartOf.call(this, units)
  }

  // TODO example of adding new formatting tokens
  // Add new formatting tokens
  const additionalTokens: FormattingTokenDefinitions = {
    a: (sourceDate: EsDay) => `${sourceDate.toString()}a`,
    b: (sourceDate: EsDay) => `${sourceDate.toString()}b`,
  }
  dayFactory.addFormatTokenDefinitions(additionalTokens)

  // TODO example of adding new parsing tokens
  // Add new parsing tokens
  const parseTokensDefinitions: TokenDefinitions = {
    bb: [
      match1to2,
      match1to2,
      (parsedElements: ParsedElements, input: string, _parseOptions: ParseOptions) => {
        parsedElements['abc'] = +input
      },
    ],
  }
  dayFactory.addParseTokenDefinitions?.(parseTokensDefinitions)
}

export default newPlugin
