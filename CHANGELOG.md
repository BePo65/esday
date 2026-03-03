# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.6.1](https://github.com/BePo65/esday/compare/v0.6.0...v0.6.1) (2026-03-03)

## [0.6.0](https://github.com/BePo65/esday/compare/v0.5.0...v0.6.0) (2026-03-03)


### Features

* add copy button to esday documentation web site pages ([d697518](https://github.com/BePo65/esday/commit/d69751857351e505c8ce870cdac4f171859b62a5))
* add methods to relativeTime plugin to get or set the thresholds and the rounding function used ([#143](https://github.com/BePo65/esday/issues/143)) ([0dfe619](https://github.com/BePo65/esday/commit/0dfe619a90d64f259085a126b7ba7b671768ddd5))
* add plugin duration ([#142](https://github.com/BePo65/esday/issues/142)) ([730a88f](https://github.com/BePo65/esday/commit/730a88f3dccb22e329291d033d74c1615834e41f))
* clamp day when setting year+month or month without day-of-month ([576a06a](https://github.com/BePo65/esday/commit/576a06ade7ac21928f7ea9e10b9347e13ff7cd1a))
* plugin timezone ([1479a3f](https://github.com/BePo65/esday/commit/1479a3f7abf28a0bc55df139cfde70b1d8f9dd86))
* utc - clamp day setting year+month or month without day-of-month ([8e96a02](https://github.com/BePo65/esday/commit/8e96a02bca48b9bf1ce97ad2db593ea5464d4766))


### Bug Fixes

* add more tests for parsing and fix error when parsing leading spaces ([e92e088](https://github.com/BePo65/esday/commit/e92e08855091b2c09b75d6e3e02eb21fdfb298f6))
* fix error in plugin utc when handling object input parameters ([52a211f](https://github.com/BePo65/esday/commit/52a211ffdfb8a68071479e3ea80d1ed4adbd2105))
* fix format utcOffset containing seconds (see 'iamkun/dayjs[#2016](https://github.com/BePo65/esday/issues/2016)') ([b501025](https://github.com/BePo65/esday/commit/b501025738c36114255720b356e554695c4f01f5))
* make dayOfMonthOrdinalParse a RegExp only (the only used type) ([7efeeb8](https://github.com/BePo65/esday/commit/7efeeb80201201af71670ab0c4b15e23a77e847f))
* make overflow /  work in dateFromDateComponents like moment.js ([8c6e732](https://github.com/BePo65/esday/commit/8c6e7325158a27340dc7cdc8b2504e93d7a2ab20))
* make plugin ObjectSupport call complete chain of dependencies ([fc469f2](https://github.com/BePo65/esday/commit/fc469f2514371796c5674c3cf49e073604fa5cc4))
* minor problems in .add and with seconds in utcOffset ([8b53242](https://github.com/BePo65/esday/commit/8b532420942ec2ee206fe8ddd7e0273c3f22e2d9)), closes [#160](https://github.com/BePo65/esday/issues/160)
* more small errors ([575424b](https://github.com/BePo65/esday/commit/575424bbbdafce717c5c6cc5e27d1a9bc04a0fa6)), closes [#162](https://github.com/BePo65/esday/issues/162)
* parse day-of-month as localized ordinal number ([#147](https://github.com/BePo65/esday/issues/147)) ([2504808](https://github.com/BePo65/esday/commit/2504808e7b9b04a5db10c10b0ca1d42a622863ee))
* parsing date-time string with spaces or with unlimited milliseconds (differs in webkit only) ([d23dd97](https://github.com/BePo65/esday/commit/d23dd975c4a36355a137902bfb848334501fb2cb)), closes [#155](https://github.com/BePo65/esday/issues/155)
* parsing locale date string with ordinal number ([c265cc6](https://github.com/BePo65/esday/commit/c265cc672287f2a22aaba6894a9d492d90450c04))
* parsing with unlimited milliseconds in webkit ([78db735](https://github.com/BePo65/esday/commit/78db73521a0217d7ada1e15a8b3cec5c8eaf234b))
* results of plugin relative time differ from moment.js ([#141](https://github.com/BePo65/esday/issues/141)) ([8618b68](https://github.com/BePo65/esday/commit/8618b687066d22cf56df806a6f401cbcf231a2fc))
* the new version of vitest threw new warnings ([cb025c4](https://github.com/BePo65/esday/commit/cb025c41c2ff29a1c13520292583ae307033cd75))
* update packages to latest versions and fix findings ([b20d97c](https://github.com/BePo65/esday/commit/b20d97c6e5797f9e653fbafededdd8a0a807689d)), closes [#163](https://github.com/BePo65/esday/issues/163)

## [0.5.0] (2025-08-09)

### Added
- Initial release of the project.
