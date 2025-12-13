# AdvancedFormat

AdvancedFormat extends `esday.format()` to support custom tokens in a formatting template.

## Usage

### Dependencies
AdvancedFormat has no dependencies on other plugins.

### Formatting tokens
| **Token** | **Example**   | **Description**                    |
| --------- | --------------| ---------------------------------- |
| d         | 0-6           | Day of the week, with Sunday as 0  |
| S         | 0-9           | Hundreds of milliseconds, 1-digit  |
| SS        | 00-99         | Tens of milliseconds, 2-digits     |
| ZZ        | \-0500        | Compact offset from UTC, 2-digits  |
| X         | 1410715640579 | Unix timestamp                     |
| x         | 1410715640579 | Unix ms timestamp                  |
| k         | 1-24          | Hour with 0 -> 24                  |
| kk        | 01-24         | Hour, 2-digits, with 0 -> 24       |

## Examples
### Formatting
```typescript
import { esday } from 'esday'
import advancedFormatPlugin from 'esday/plugins/advancedFormat'

esday.extend(advancedFormatPlugin)

esday('08-2023-14 21:43:12.123').format('MM-YYYY-DD HH:mm:ss.SS')
// Returns '2023-08-14T21:43:12.12'
```
