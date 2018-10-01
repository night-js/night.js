# night.js Changelog

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
