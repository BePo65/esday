# <NewPluginName>

// TODO adapt this description to 'newPlugin'
<NewPluginName> extends the `esday` constructor to <what-is-the-purpose-of-this-plugin>.

The `method1` method gets or sets the xx value of a given date.

The `method2` method gets a new date in the middle of the next week for a date.

## Usage

### Dependencies
// TODO describe dependencies from other plugins and sequence of plugins, if applicable

<NewPluginName> has no dependencies on other plugins.

<NewPluginName> can be used together with the plugin Utc that must be loaded using esday.extend(...) before the plugin <NewPluginName>.

### Method signatures
// TODO add all new and/or modified signatures here
```signature
esday().myPlugin(): string
esday().myPlugin(format: string): EsDay
```

// TODO describe parameters used in signatures here
| parameter | description                              |
| --------- | ---------------------------------------- |
| format    | format string(s) used for parsing `date` |

// TODO describe all new formatting tokens here, if any are defined
### Formatting tokens
| Token | Example | Description                     |
| ----- | ------- | --------------------------------|
| a     | 1-99    | Calculated a of date.           |
| b     | 01-99   | Calculated a of date (2-digit). |

// TODO describe all new parsing tokens here, if any are defined
### Parsing tokens
| Token | Example | Description             |
| ----- | ------- | ----------------------- |
| bb    | 1-99    | Calculated abb of date. |

## Examples
```typescript
import { esday } from 'esday'
import myNewPlugin from 'esday/plugins/myNew'

esday.extend(myNewPlugin)

esday('08-2023-14 21:43:12.123').myPlugin()
// Returns '24'

esday('08/2023/14 21 43.12 123').myPlugin('24')
// Returns esday for '2024-06-10'
```

### Adding new parsing tokens

### Formatting date using <NewPluginName> tokens
```typescript
import { esday } from 'esday'
import myNewPlugin from 'esday/plugins/myNew'

esday.extend(myNewPlugin)

esday('22024-12-24T14:25:36').format('a')
// Returns '4'

esday('22024-12-24T14:25:36').format('b')
// Returns '04'
```

### Parsing date using <NewPluginName> tokens
```typescript
import { esday } from 'esday'
import myNewPlugin from 'esday/plugins/myNew'

esday.extend(myNewPlugin)

esday('2025 02', 'YYYY bb')
// Returns esday for '2025-01-06'
```
