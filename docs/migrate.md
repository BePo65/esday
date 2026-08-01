# Migration guide

## Migrate from Moment.js to EsDay

### Change imports

**Important:** EsDay replaces "Moment.js" as well as "Moment Timezone", as timezone functionality is implemented by a plugin.

To migrate to EsDay you have to replace the import statement.

So replace this:

```javascript
import moment from 'moment';
```
with this:
```javascript
import { esday } from 'esday'
```

### Review code

There are really only two things to know when migrating from Moment.js to EsDay:
- EsDay core includes only very basic methods, while other methods are added with plugins.
- EsDay objects are immutable.

### Here an example for using plugins:
when you want to get the weekday of an EsDay object, you’ll need to import and register the AdvancedFormat plugin.

```javascript
import { esday } from 'esday'
import localePlugin from 'esday/plugins/locale'
import weekPlugin from 'esday/plugins/week'

esday.extend(localePlugin).extend(weekPlugin)

const dayOfWeek = esday('2026-07-27).weekday()
```

After migration there will be a few of these plugins.

**Important hint**

When after migration EsDay does not behave like Moment.js in your program, the  most common reason is one or more missing plugins or a sequence of `.extend(...)` that does not follow the recommendations in the EsDay documentation of the plugins used.

### Here an example concerning immutability:
As EsDay objects are immutable, so using an EsDay method that changes the object, you get a new object. So anything like this:

```javascript
var foo = moment()
foo.add(1, 'day')
```

must be changed to this:

```javascript
let foo = esday()
foo = foo.add(1, 'day')
```

### Differences to Moment.js

Reference: Esday uses Moment.js V2.30.1 as api reference.

- **toString**: conforms to Day.js and uses Date.toUTCString() (returning the date in RFC 7231 format 'ddd, DD MMM YYYY HH:mm:ss [GMT]') while moment uses the format 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'.
- **toISOString**: conforms to Day.js and returns 'Invalid date' when called on an invalid date. In that case moment returns null (see [moment pr#3710](https://github.com/moment/moment/pull/3710)).

## Migrate from Day.js to EsDay

Day.js uses the same base concepts of immutability and a plugin system like EsDay, so migration is quite easy. The main difference is what method is part of what plugin.

### Change imports

To migrate to EsDay you have to replace the import statement.

So replace this:

```javascript
import dayjs from 'dayjs/esm';
```
with this:
```javascript
import { esday } from 'esday'
```

### Differences to Day.js

- **Locale**: Locale  is a Plugin; no default locale! Dayjs uses 'en-US' as default.
- **'Start of Week'**: Default 'Start of Week' is 1 ('Monday') as defined by ISO 8601. Dayjs uses 0 ('Sunday') as (as defined by the dafault locale 'en-US').
- **'Start of Year'**: Default 'Start of Year' is 4 (Jan 4th must be in the 1st week of the year) as defined by ISO 8601. Dayjs uses 1 (Jan 1st) as (as defined by the dafault locale 'en-US').
- **Invalid Date**: conforms to Moment.js and uses `Invalid date` instead of `Invalid Date`.
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
