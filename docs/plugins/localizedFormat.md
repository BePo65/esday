# LocalizedFormat

LocalizedFormat extends `esday.format()` to support localized tokens in a formatting template.

## Usage

### Dependencies
# LocalizedFormat
LocalizedFormat requires the plugin Locale and at least 1 registered and activated locale.

### Formatting tokens
| **Token** | **Example**   | **Description**                    |
| --------- | --------------| ---------------------------------- |
| MMM       | Jan           | Short form of the name of a month  |
| MMMM      | January       | Long form of the name of a month   |
| Do        | 2nd           | Day of week as ordinal             |
| dd        | Su            | Minimal form of day of week        |
| ddd       | Sun           | Short form of day of week          |
| dddd      | Sunday        | Long form of day of week           |
| h         | 1-12          | Hour with 1 -> 12                  |
| hh        | 01-12         | Hour, 2-digits, with 1 -> 12       |
| a         | am            | Meridiem of hour (lower case)      |
| A         | PM            | Meridiem of hour (upper case)      |

## Examples
### Formatting
```typescript
import { esday } from 'esday'
import { localePlugin, localizedFormatPlugin } from 'esday/plugins'
import localeDe from 'esday/locales/de'

esday.extend(localePlugin)
esday.extend(localizedFormatPlugin)

esday.registerLocale(localeDe)

// set global locale
esday.locale('de')

esday('2024-12-24T14:25:36').format('LLLL')
// Returns "Dienstag, 24. Dezember 2024 14:25"
```
