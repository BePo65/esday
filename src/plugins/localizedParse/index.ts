/**
 * localizedParse plugin
 *
 * This plugin adds localized parsing formats to the advancedParse plugin.
 *
 * used esday parameters in '$conf':
 *   args_1           format parameter in call signature
 *   args_2           2nd parameter in call signature
 *
 * esday parameters in '$conf' defined in advancedParse plugin:
 *   parseOptions     ParseOptions object containing parsing options
 *
 * esday parameters in '$conf' defined in Locale plugin:
 *   localeName  the name of the current locale of an EsDay instance
 *
 * new esday parameters in '$conf.parseOptions':
 *   locale           name of the locale to use when parsing
 *
 * This plugin requires the 'advancedParse' plugin, the 'locale' plugin
 * and at least 1 registered locale.
 * When using the locale as a parsing parameter, this locale must be registered too.
 *
 * The plugin localizedParse must be activated after the plugin advancedParse; e.g.
 * esday.extend(advancedParsePlugin).extend(localizedParsePlugin).extend(localePlugin)
 */

import type { DateType, EsDay, EsDayFactory, EsDayPlugin } from 'esday';
import { isArray, isString, isUndefined } from '~/common';
import type { ParsedElements, ParseOptions, TokenDefinitions } from '../advancedParse/types';
import type { Locale, MonthNames, MonthNamesStandaloneFormat } from '../locale';

// Regular expressions for parsing
const match2 = /\d{2}/;
const match1to2 = /\d\d?/;
const matchWord = /\d*[^-_:/,()\s\d]+/;
const matchDayOfMonthOrdinalDefault = /\d{1,2}/;

/**
 * Update parsing patterns that depend on the locale (e.g. 'Do')
 * @param patterns - parseTokensDefinitions
 * @param locale - locale to use
 */
const updateParsingPatternsFromLocale = (patterns: TokenDefinitions, locale: Locale) => {
  const dayOfMonthOrdinalPattern = locale.dayOfMonthOrdinalParse;
  patterns.Do[0] = dayOfMonthOrdinalPattern;
  patterns.Do[1] = dayOfMonthOrdinalPattern;
};

/**
 * Add 'input' to parsedElements as 'hours'.
 * @param parsedElements - object containing the components of a parsed date
 * @param input - parsed component of a date, to be transformed and inserted in parsedElements
 * @param options - parsing options e.g. containing the locale to use
 */
const addHour = (parsedElements: ParsedElements, input: string, _parseOptions: ParseOptions) => {
  parsedElements['hours'] = +input;
};

/**
 * Convert parsed string to boolean 'afternoon'
 * @param locale - Locale to use
 * @param input - parsed date component
 * @param isLowerCase - should this be a lowercase meridiem string?
 * @returns is input an 'afternoon' string for given locale
 */
const meridiemMatch = (
  locale: Locale,
  input: string,
  isLowerCase: boolean,
): boolean => {
  let isAfternoon = false;
  const { meridiem } = locale;
  if (meridiem) {
    for (let i = 1; i <= 24; i += 1) {
      if (input === meridiem(i, 0, isLowerCase)) {
        isAfternoon = i >= 12;
        break;
      }
    }
  } else {
    isAfternoon = input === (isLowerCase ? 'pm' : 'PM');
  }
  return isAfternoon;
};

/**
 * Create a function that will parse the input string as meridiem string and
 * add it to the given 'parsedElements' containing the date&time components.
 * @param isLowerCase - parse the meridiem string as lowercase
 * @param esday - global esday object (to get locale by its name)
 * @returns function that will add the given value to date&time component as 'afternoon'
 */
const addAfternoon = (isLowerCase: boolean, esday: EsDayFactory) => {
  return function meridiemUpdater(
    parsedElements: ParsedElements,
    input: string,
    parseOptions: ParseOptions,
  ) {
    const localeName = parseOptions['locale'] as string;
    const locale = esday.getLocale(localeName);
    const meridiem = meridiemMatch(locale, input, isLowerCase);
    parsedElements.afternoon = meridiem;
  };
};

/**
 * Parse day of month as ordinal number.
 * Create a function that will parse the input string as day of month as ordinal
 * number and add it to the given 'parsedElements' containing the date&time components.
 * @param esday - global esday object (to get locale by its name)
 * @returns function that will add the given value to date&time component as 'afternoon'
 */
const addDayOfMonthOrdinal = (esday: EsDayFactory) => {
  return function monthOrdinalUpdater(
    parsedElements: ParsedElements,
    input: string,
    parseOptions: ParseOptions,
  ) {
    const localeName = parseOptions['locale'] as string;
    const { ordinal } = esday.getLocale(localeName);
    let dateValue: number | undefined;
    const splittedInput = input.match(/^[^\d]*(\d+)[^\d]*$/);
    if (splittedInput !== null) {
      dateValue = +splittedInput[1];
      const dateAsOrdinal = ordinal?.(dateValue, 'd');

      if (dateAsOrdinal === undefined || dateAsOrdinal === input) {
        parsedElements.date = dateValue;
      }
    }
  };
};

/**
 * Create a function that will convert the value from the input string
 * to a month number and add it to the given 'parsedElements' containing
 * the date&time components.
 * @param property - name of the list of month names to use
 * @param esday - global esday object (to get locale by its name)
 * @returns function that will add the given value to date&time component
 */
const addMonth = (property: 'months' | 'monthsShort', esday: EsDayFactory) => {
  return function monthUpdater(
    parsedElements: ParsedElements,
    input: string,
    parseOptions: ParseOptions,
  ) {
    const localeName = parseOptions['locale'] as string;
    const months = esday.getLocale(localeName)[property];
    let monthNames: MonthNames;

    if (isArray(months)) {
      monthNames = months as MonthNames;
    } else {
      monthNames = (months as MonthNamesStandaloneFormat).standalone;
    }

    const matchIndex = monthNames.indexOf(input) + 1;
    parsedElements.month = matchIndex % 12 || matchIndex;
  };
};

/**
 * Replace locale dependent token in given format with values from locale definition
 * e.g. 'LTS' with 'h:mm:ss A'
 * @param format - original format (with locale dependent tokens)
 * @param currentLocale - Locale to use
 * @returns format with locale dependent tokens replaced
 */
const replaceLocaleTokens = (format: string, currentLocale: Locale) => {
  const localFormattingTokens = /(\[[^[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
  function replaceLongDateFormatTokens(input: string) {
    return currentLocale.formats[input as keyof typeof currentLocale.formats] ?? input;
  }

  return format.replace(localFormattingTokens, replaceLongDateFormatTokens);
};

const localizedParsePlugin: EsDayPlugin<{}> = (_, dayClass, dayFactory) => {
  const proto = dayClass.prototype;

  /**
   * Convert the hours to 24h format.
   * Must be called in the context of an EsDay instance.
   * @param this - context for this function (required for getting the $conf settings)
   * @param parsedDate - Date object returned by parsing function
   * @param parsedElements - object containing the components of a parsed date
   * @returns parsedDate with hours converted to 24h format
   */
  function _postParseMeridiem(this: EsDay, parsedDate: Date, parsedElements: ParsedElements) {
    let modifiedDate = parsedDate;

    // is this a valid date and do we have parsed a meridiem?
    if (!(Number.isNaN(parsedDate.valueOf()) || isUndefined(parsedElements.afternoon))) {
      let parsedHours: number;
      let newEsday = dayFactory(parsedDate, {
        utc: this['$conf'].utc as boolean,
      });
      newEsday['$conf'] = structuredClone(this['$conf']);

      parsedHours = newEsday.hour();
      if (parsedHours < 12 && parsedElements.afternoon) {
        newEsday = newEsday.hour(parsedHours + 12);
      } else if (parsedHours === 12 && !parsedElements.afternoon) {
        newEsday = newEsday.hour(0);
      }
      modifiedDate = newEsday.toDate();
    }
    return modifiedDate;
  }

  /**
   * List of parsing tokens; the key of an entry in this list is
   * the token to be parsed and the value is a 3-entries-array with
   * the 1st entry being the regex for parsing in 'standard' mode,
   * the 2nd entry being the regex for parsing in 'strict' mode and
   * the 3rd entry being a function that will add the corresponding
   * value to an object containing all the date&time elements (year,
   * month, day, ...).
   */
  const parseTokensDefinitions: TokenDefinitions = {
    h: [match1to2, match1to2, addHour],
    hh: [match1to2, match2, addHour],
    a: [matchWord, matchWord, addAfternoon(true, dayFactory), _postParseMeridiem],
    A: [matchWord, matchWord, addAfternoon(false, dayFactory), _postParseMeridiem],
    Do: [
      matchDayOfMonthOrdinalDefault,
      matchDayOfMonthOrdinalDefault,
      addDayOfMonthOrdinal(dayFactory),
    ],
    MMM: [matchWord, matchWord, addMonth('monthsShort', dayFactory)],
    MMMM: [matchWord, matchWord, addMonth('months', dayFactory)],
  };

  // add new parsing tokens to existing list of parsing tokens
  dayFactory.addParseTokenDefinitions(parseTokensDefinitions);

  const oldParse = proto['$parse'];
  proto['$parse'] = function (d?: Exclude<DateType, EsDay>) {
    if (!isString(d)) {
      oldParse.call(this, d);
      return;
    }

    // only string dates can be parsed
    const format = this['$conf'].args_1;

    // handle locale name(s) as argument; use the locale of 'this'
    // as the default value, if no locale is given as 3rd calling
    // parameter (1st parameter is the date string, 2nd is the format
    // to use, 3rd may also be the strict flag).
    let currentLocale = this.localeObject?.();
    const arg2 = this['$conf'].args_2;
    if (!isUndefined(arg2) && typeof arg2 === 'string') {
      currentLocale = dayFactory.getLocale(arg2);
      this['$conf'].localeName = arg2;
    }

    // get parsing patterns from locale
    updateParsingPatternsFromLocale(parseTokensDefinitions, currentLocale);

    // create required parseOptions
    const parseOptions: ParseOptions = (this['$conf'].parseOptions as ParseOptions) ?? {};
    parseOptions.locale = currentLocale.name;
    this['$conf'].parseOptions = parseOptions;

    let newFormat = format;
    if (isString(newFormat)) {
      newFormat = replaceLocaleTokens(newFormat, currentLocale);
    } else if (isArray(newFormat)) {
      // replace locale dependent tokens in all formats (if array)
      for (let i = 0; i < newFormat.length; i++) {
        newFormat[i] = replaceLocaleTokens(newFormat[i], currentLocale);
      }
    }

    // use modified format for parsing
    this['$conf'].args_1 = newFormat;

    // run preParse if exists
    let newDate = d;
    if (currentLocale.preParse !== undefined) {
      newDate = currentLocale.preParse(d);
    }

    oldParse.call(this, newDate);

    // remove properties required only during parsing from $conf
    if (this['$conf'].parseOptions !== undefined) {
      // nothing to do, if we do not have "temporary" properties
      /* istanbul ignore else -- @preserve */
      if (this['$conf'].parseOptions?.locale !== undefined) {
        delete this['$conf'].parseOptions.locale;
      }

      /* istanbul ignore else -- @preserve */
      if (Object.keys(this['$conf'].parseOptions).length === 0) {
        delete this['$conf'].parseOptions;
      }
    }
  };
};

export default localizedParsePlugin;
