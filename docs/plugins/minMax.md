# MinMax

MinMax adds the `min` and the `max` methods to esday, calculating the minimum or maximum of the given EsDay instances or from the array of date strings.

## Usage

### Dependencies
MinMax has no dependencies on other plugins.

### Method signatures
```signature
esday.min(EsDay[,EsDay...]): EsDay
esday.min(string[]): EsDay
esday.max(EsDay[,EsDay...]): EsDay
esday.max(string[]): EsDay
```

## Examples
```typescript
import { esday } from 'esday'
import minMaxPlugin from 'esday/plugins/minMax'

esday.extend(minMaxPlugin)

esday.max(esday('2025-01-01'), esday('2024-12-31'), esday('2023-06-15'))
// Returns esday instance for '2025-01-01'

esday.min(['2025-01-01', '2024-12-31', '2023-06-15'])
// Returns esday instance for '2023-06-15'
```
