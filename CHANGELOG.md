# night.js Changelog

## 2.0.0 beta 1 (Soon)
#### Breaking Changes
- splitted `options` prop into `settings` and `methods`
- renamed option `onCacheClear` to `onStorageClear`
- renamed option `cache` to `storage`

#### New Feature
- rewrite `checkSunPosition` method to allow adding coords manually
- added `elements` prop

#### Repository Changes
- updated npm scripts
- cleaned up Webpack config
- removed unused dependencies
- moved from Mocha to Jest

## 1.2.0 beta 2 / 1.2.0 (2018-12-12)
#### Bug Fix
- fixed interval error

#### Repository Changes
- updated Prettier config

## 1.2.0 beta 1 (2018-12-02)
#### Internal
- changed sunset & sunrise values to middle of the time between start and end

#### Improvement
- cleaned up tests

#### Bug Fix
- fixed `test:watch` script error

#### Repository Changes
- added Travis CI config
- added Prettier config
- added ESLint config

## 1.1.8 (2018-11-26)
#### New Feature
- added interval to switch theme just after sunrise & sunset without page reload

## 1.1.7 (2018-11-17)
#### Internal
- renamed method `settings()` to `extendSettings()` to avoid conflict with variable `settings`

## 1.1.5 / 1.1.6 (2018-11-17)
#### Tests
- updated tests

## 1.1.4 (2018-11-12)
#### Bug Fix
- fixed bug with `window` global variable in Node.js

## 1.1.3 (2018-11-01)
#### Internal
- cleaned up

#### Dependencies
- removed unused devDependencies

## 1.1.1 / 1.1.2 (2018-10-01)
#### Documentation
- updated README.md

## 1.1.0 beta 1 / 1.1.0 (2018-10-01)
#### New Feature
- handle error on disallow permission to geolocation
- added `onDenied` callback
- added `smartDarkError` event on disallow permission to geolocation

#### Improvement
- `onCacheClear` callback is available if `cacheClear` option is enabled

#### Bug Fix
- fixed `smartDark` event on auto init

## 1.0.1 (2018-09-29)
#### Dependencies
- updated devDependencies

## 1.0.0 beta 2 / 1.0.0 (2018-09-03)
#### Internal
- improved `reset` method

#### Documentation
- Updated README.md

## 1.0.0 beta 1 (2018-09-02)
#### Dependencies
- updated babel-loader to `^8.0.0` stable

#### Repository Changes
- removed map for production version

## 0.8.0 (2018-08-28)
#### Internal
- improved conditionals

#### Dependencies
- updated Babel to `^7.0.0` stable
- updated babel-plugin-add-module-exports to `^0.3.3`
- updated Webpack to `^4.17.1`

## 0.7.0 (2018-08-06)
#### Internal
- cleaned up

## 0.6.7 (2018-08-01)
#### New Feature
- added `onAuto` & `onToggle` callbacks

## 0.6.6 (2018-07-31)
#### New Feature
- added `onReset` callback

## 0.6.5 (2018-07-18)
#### Breaking Changes
- replaced value `times` with `sunrise` and `sunset` values in event

#### Internal
- renamed methods: `whereIam` to `myLocation` & `checkSunPos` to `checkSunPosition`

## 0.6.0 (2018-07-17)
#### New Feature
- added `auto` option (activate smart switch on plugin init)

#### Bug Fix
- fixed undefined values in time calculator

## 0.5.3 (2018-07-16)
#### Improvement
- removed .babelrc from npm package
- updated README.md

## 0.5.2 (2018-07-12)
#### Bug Fix
- removed duplicated SunCalc scripts

## 0.5.0 / 0.5.1 (2018-07-06)
#### New Feature
- added smart dark mode (based on location, date and sun over horizon position)
- added toggle method to simple switch between light and dark mode
- settings are saved in localStorage
- added options: `lightClass`, `darkClass`, `cache`, `cacheClear`, `onLight`, `onDark`, `onCacheClear`
- added `smartDark` event with values: `times`, `latitude`, `longitude`
