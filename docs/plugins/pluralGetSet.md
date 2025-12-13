# PluralGetSet

PluralGetSet adds plural getter & setter APIs to `esday` instances. The getters and setters are:

`.milliseconds`, `.seconds`, `.minutes`, `.hours`, `.days`, `.dates`, `.months` and `.years`.

## Usage

### Dependencies
PluralGetSet has no dependencies on other plugins.

### Method signatures
```typescript
esday().years(): number
esday().years((year: number, month?: number, date?: number): EsDay
esday().months(): number
esday().months((month: number, date?: number): EsDay
esday().dates(): number
esday().dates((date: number): EsDay
esday().days(): number
esday().days((day: number): EsDay
esday().hours(): number
esday().hours((hours: number): EsDay
esday().minutes(): number
esday().minutes((min: number): EsDay
esday().seconds(): number
esday().seconds((sec: number): EsDay
esday().milliseconds(): number
esday().milliseconds((ms: number): EsDay
```

`date` is 'day of month' and `day` is 'day of week'.

## Examples
```typescript
import { esday } from 'esday'
import pluralGetSetPlugin from 'esday/plugins/pluralGetSet'

esday.extend(pluralGetSetPlugin)

esday('2023-08-14T21:43:12.123').years()
// Returns '2023'

esday('2023-08-14T21:43:12.123').dates('24')
// Returns esday instance for '2023-08-24'
```
