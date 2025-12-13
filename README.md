## esday

[![npm](https://img.shields.io/npm/v/esday)](https://www.npmjs.com/package/esday)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/g-mero/esday?tab=readme-ov-file#contribute)

> 🚧 working in progress

> esday is a JavaScript library inspired by [Day.js](https://github.com/iamkun/dayjs), esday has a largely similar API to Day.js (v1.11.13), but it is written in TypeScript and fully supports es modules.

```javascript
import { esday } from 'esday'
import { isTodayPlugin } from 'esday/plugins/isToday'

esday.extend(isTodayPlugin)

esday('2024-12-10').set('year', 2025).add(1, 'month').isToday()
```

For detailed information see the [full documentation](https://g-mero.github.io/esday/).

## Concepts

- **Modern API**: Provides the same API as Day.js, with some features moved to plugins for a simpler core.
- **Immutable**: esday is immutable, which means that all operations will return a new instance of esday.

## Differences to Day.js

- **Locale is a Plugin**: no default locale!
- **default value for 'Start of Week' is 1 (as in ISO 8601)**: 'Start of Week' is 1 ('Monday').
- **default value for 'Start of Year' is 4 (as in ISO 8601)**: 'Start of Year' is 4.
- **clamping month on set**: when changing the month and the new month does not have enough days to keep the current day of month, esday behaves like moment.js and clamps to the end of the target month
- **Invalid Date**: conforms to Moment.js and uses `Invalid date` instead of `Invalid Date`.
- **plugin AdvancedParse** got replaced by CustomParseFormat.
- **plugin ArraySupport**: functionality is part of esday core.
- **plugin IsoWeeksInYear**: functionality is part of plugin IsoWeek.
- **plugin PreParsePostFormat**: functionality is part of esday core.
- **plugin UpdateLocale**: functionality is part of plugin Locale.
- **plugin weekOfYear**: functionality is part of plugin Week.
- **plugin WeekYear**: functionality is part of plugin Week.
- **plugin Weekday**: functionality is part of plugin Week.

## Differences to Moment.js

Esday uses moment@2.30.1 as api reference.

- **toString**: conforms to Day.js and uses Date.toUTCString() (returning the date in RFC 7231 format 'ddd, DD MMM YYYY HH:mm:ss [GMT]') while moment uses the format 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'.
- **toISOString**: conforms to Day.js and returns 'Invalid date' when called on an invalid date. In that case moment returns null (see [moment pr#3710](https://github.com/moment/moment/pull/3710)).

## Contribute

In the folder `dev` there is a template for creating new plugins and a template for new locale definitions.

## License

This project is licensed under the [MIT License](LICENSE).

This project also partially contains code derived or copied from the following projects:

- [Day.js](https://github.com/iamkun/dayjs)
- [Moment.js](https://github.com/moment/moment)
