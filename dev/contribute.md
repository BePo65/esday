# How to create a new plugins or a new locale

## Plugin

1. Create a folder in the directory `/src/plugins` using the name of the new plugin in camelCase.
2. Copy the file `template-plugin.ts` from `/dev/templates/` to this new folder and rename it to `index.ts`.
3. Adapt this new plugin file to match the requirements of the new plugin.
4. Create tests with high test coverage in a new test file in `/test/plugins/`.
5. Add the new plugin to the index file for all plugins (`/src/plugins/index.ts`).
6. For the documentation of the new plugin copy the file `template-plugin.md` from `/dev/templates/` to `/docs/plugins/` and rename according to the new plugin.
7. Adapt this documentation file to describe the new plugin.
8. Add the new documentation file to the list of plugins in `/docs/index.md`.

## Locale

1. Copy the file `template-locale.ts` from `/dev/templates/` to the folder `/src/locales` and rename it to the new locale. This name consists of the language code and case given the country code of the new locale in lowerCase. Language code and country code must be separated by a hyphen.
2. Adapt this new locale file to te requirements of the new locale.
3. Copy the file `template-locale.test.ts` from `/dev/templates/` to the folder `/test/locales` and rename it to the new locale.
4. Adapt this new test file to te requirements of the new locale.
5. Add the new locale to the list of all locales in  (`/docs/locales/locales.md`) and adapt it to the new locale.
