/**
 * LocaleData plugin
 *
 * This plugin adds 'method1', 'method2' and formatting and parsing tokens to EsDay
 *
 * This plugin requires the 'Locale' plugin. For using the 'weekdays' function to
 * format a date, the plugin 'Week' is required too.
 */

import { type EsDay, type EsDayPlugin, esday } from 'esday';
import type {
  Calendar,
  CalendarSpecValFunction,
  DayNames,
  DayNamesStandaloneFormat,
  Locale,
  LocaleFormatKeys,
  MonthNames,
  MonthNamesFunction,
  MonthNamesStandaloneFormat,
  RelativeTimeElementFunction,
  RelativeTimeKeys,
} from '../locale/types';
import type { LocaleData } from './types';

/**
 * Get list of month names or format a date as month (short or long month name).
 * @param locale - locale to use
 * @param propName - name of the property to extract
 * @param date - date to format as month name (optional)
 * @param format - format to use for selection of nameArray, if nameArray depends on format context (optional)
 * @returns array with weekday names or formatted date
 */
const getWeekdays = (
  locale: Locale,
  propName: 'weekdays' | 'weekdaysShort' | 'weekdaysMin',
  date?: EsDay,
  format?: string,
) => {
  let nameArray: DayNames;
  const property = locale[propName];

  // get list of weekday names depending on type of localeData().weekdays (or one of the other keys)
  if (Array.isArray(property)) {
    nameArray = property as DayNames;
  } else {
    nameArray = (property as DayNamesStandaloneFormat).standalone;
  }

  // format date, if there is one
  if (date !== undefined) {
    let defaultFormat = '';
    switch (propName) {
      case 'weekdays':
        defaultFormat = 'dddd';
        break;
      case 'weekdaysShort':
        defaultFormat = 'ddd';
        break;
      case 'weekdaysMin':
        defaultFormat = 'dd';
        break;
    }

    // find the names list to use when months / monthsShort is a MonthNamesFunction
    if (!Array.isArray(property)) {
      const propAsObject = property as DayNamesStandaloneFormat;
      nameArray = propAsObject.isFormat.test(format ?? defaultFormat)
        ? propAsObject.format
        : propAsObject.standalone;
    }

    return nameArray[date.day()];
  }

  return nameArray;
};

/**
 * Get list of month names or format a date as month (short or long month name).
 * @param locale - locale to use
 * @param propName - name of the property to extract
 * @param date - date to format as month name (optional)
 * @param format - format to use for selection of nameArray, if nameArray depends on format context (optional)
 * @returns array with month names or formatted date
 */
const getMonths = (
  locale: Locale,
  propName: 'months' | 'monthsShort',
  date?: EsDay,
  format?: string,
) => {
  let nameArray: MonthNames;
  const property = locale[propName];

  // get list of month names depending on type of localeData().months (or localeData().monthsShort)
  if (Array.isArray(property)) {
    nameArray = property as MonthNames;
  } else if (typeof property === 'function') {
    nameArray = property.standalone as MonthNames;
  } else {
    nameArray = (property as MonthNamesStandaloneFormat).standalone;
  }

  // format date, if there is one
  if (date !== undefined) {
    const defaultFormat = propName === 'months' ? 'MMMM' : 'MMM';

    // find the names list to use when months / monthsShort is a MonthNamesFunction
    if (typeof property === 'function') {
      const propAsFunction = property as MonthNamesFunction;
      const formattedDate = propAsFunction(date, format ?? defaultFormat);

      if (propAsFunction.standalone.includes(formattedDate)) {
        nameArray = propAsFunction.standalone;
      } else {
        nameArray = propAsFunction.format;
      }
    } else {
      // property can only be of type function or object; otherwise we have an error
      /* istanbul ignore else -- @preserve */
      if (typeof property === 'object') {
        const propAsObject = property as MonthNamesStandaloneFormat;
        if (propAsObject.isFormat !== undefined) {
          nameArray = propAsObject.isFormat.test(format ?? defaultFormat)
            ? propAsObject.format
            : propAsObject.standalone;
        }
      }
    }

    return nameArray[date.month()];
  }

  return nameArray;
};

/**
 * Get the full format of the abbreviated date-time format (e.g. 'LT')
 * @param locale  - locale to use
 * @param format - abbreviated date-time format
 * @returns full format of abbreviated date-time format
 */
const getLongDateFormat = (locale: Locale, format: LocaleFormatKeys) => {
  const formatsArray = locale.formats;
  return formatsArray[format as LocaleFormatKeys] ?? '';
};

/**
 * Get a locale dependant format for relative dates.
 * @param locale - locale to use
 * @param key - key to select the format (e.g. 'nextDay')
 * @param date - reference date to calculate the relative date for
 * @param now - date to format as base for the relative date
 * @returns - format to use for relative date
 */
const getCalendar = (locale: Locale, key?: keyof Calendar, date?: EsDay, now?: EsDay) => {
  let result = '';
  const defaultKey = 'sameElse';
  const calendarArray = locale.calendar;
  const calendarEntry = calendarArray[key ?? defaultKey] ?? calendarArray[defaultKey];
  const nowDate = now ?? esday();

  if (typeof calendarEntry === 'function') {
    // if we  have no date, then we take the default return value
    /* istanbul ignore else -- @preserve */
    if (date !== undefined) {
      result = (calendarEntry as CalendarSpecValFunction).call(date, nowDate);
    }
  } else {
    result = calendarEntry as string;
  }

  return result;
};

/**
 *
 * @param locale  - locale to use
 * @param timeValue - time value to convert
 * @param withoutSuffix - return value without the suffix (e.g. '4 years' instead of 'in 4 years')
 * @param token - token to use for selecting an entry in the list of relativeTime
 * @param isFuture - suffix to use (e.g. 'in' or 'ago')
 * @returns formatted timeValue
 */
const getRelativeTime = (
  locale: Locale,
  timeValue: string | number,
  withoutSuffix: boolean,
  token: RelativeTimeKeys,
  isFuture: boolean,
) => {
  let result = '';
  const relativeTimeArray = locale.relativeTime;
  const relativeTimeEntry = relativeTimeArray[token];

  if (typeof relativeTimeEntry === 'function') {
    result = (relativeTimeEntry as RelativeTimeElementFunction)(
      timeValue,
      withoutSuffix,
      token,
      isFuture,
    );
  } else {
    result = (relativeTimeEntry as string).replace(/%d/i, timeValue.toString());
  }

  return result;
};

const createLocaleDataObject = (locale: Locale) => {
  const localeData: LocaleData = {
    // @ts-expect-error function is compatible with its overload
    weekdays: (date?: EsDay, format?: string) => getWeekdays(locale, 'weekdays', date, format),
    // @ts-expect-error function is compatible with its overload
    weekdaysShort: (date?: EsDay, format?: string) =>
      getWeekdays(locale, 'weekdaysShort', date, format),
    // @ts-expect-error function is compatible with its overload
    weekdaysMin: (date?: EsDay, format?: string) =>
      getWeekdays(locale, 'weekdaysMin', date, format),
    // @ts-expect-error function is compatible with its overload
    months: (date?: EsDay, format?: string) => getMonths(locale, 'months', date, format),
    // @ts-expect-error function is compatible with its overload
    monthsShort: (date?: EsDay, format?: string) => getMonths(locale, 'monthsShort', date, format),
    ordinal: locale.ordinal,
    firstDayOfWeek: () => locale.weekStart,
    firstDayOfYear: () => locale.yearStart,
    longDateFormat: (format: LocaleFormatKeys) => getLongDateFormat(locale, format),
    calendar: (key?: keyof Calendar, date?: EsDay, now?: EsDay) =>
      getCalendar(locale, key, date, now),
    relativeTime: (
      timeValue: string | number,
      withoutSuffix: boolean,
      token: RelativeTimeKeys,
      isFuture: boolean,
    ) => getRelativeTime(locale, timeValue, withoutSuffix, token, isFuture),
    meridiem: locale.meridiem,
  };

  if (locale.preParse !== undefined) {
    localeData.preParse = locale.preParse;
  }

  if (locale.postFormat !== undefined) {
    localeData.postFormat = locale.postFormat;
  }

  return localeData;
};

const localeDataPlugin: EsDayPlugin<{}> = (_, dayClass, dayFactory) => {
  const proto = dayClass.prototype;

  proto.localeData = function (): LocaleData {
    const locale = this.localeObject();
    return createLocaleDataObject(locale);
  };

  dayFactory.localeData = (localeName?: string): LocaleData => {
    const locale =
      localeName !== undefined
        ? dayFactory.getLocale(localeName)
        : dayFactory.getLocale(dayFactory.locale());
    return createLocaleDataObject(locale);
  };

  dayFactory.months = () =>
    getMonths(dayFactory.getLocale(dayFactory.locale()), 'months') as MonthNames;
  dayFactory.monthsShort = () =>
    getMonths(dayFactory.getLocale(dayFactory.locale()), 'monthsShort') as MonthNames;
  dayFactory.weekdays = () =>
    getWeekdays(dayFactory.getLocale(dayFactory.locale()), 'weekdays') as DayNames;
  dayFactory.weekdaysShort = () =>
    getWeekdays(dayFactory.getLocale(dayFactory.locale()), 'weekdaysShort') as DayNames;
  dayFactory.weekdaysMin = () =>
    getWeekdays(dayFactory.getLocale(dayFactory.locale()), 'weekdaysMin') as DayNames;
};

export default localeDataPlugin;
