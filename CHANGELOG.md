# night.js Changelog

### [CHANGELOG.md for v1 here](https://github.com/night-js/night.js/blob/v1/CHANGELOG.md)

## 2.0.0 beta 1 (Soon)
#### Breaking Changes
- splitted `options` prop into `settings` and `methods`
- renamed option `onCacheClear` to `onStorageClear`
- renamed option `cache` to `storage`
- renamed method `auto` to `smartSwitch`
- renamed callback `onAuto` to `onSmartSwitch`

#### New Feature
- added `elements` prop for single & multiple elements
- added `setCoords` & `setTimes` methods
- added device light support
- added `mode`, `sound` & `brightness` options
- added `prefers-color-scheme` support
- added destroy method
- added `sunriseTime` & `sunsetTime` options to manually set breakpoint times
- added `permissionDelay` option
- added `onInit`, `onBrightness`, `onBrightnessNotSupported`, `onSoundPlay`, `onSoundPause`, `onColorScheme`, `onColorSchemeNotSupported` & `onDestroy` callbacks
- added typeDefs

#### Internal
- rewritten with TypeScript
- rebuilt all methods

#### Repository Changes
- switched from suncalc to suncalc2
- added flow
- added husky
- updated npm scripts
- cleaned up Webpack config
- removed unused dependencies
- moved from Mocha to Jest

#### tests
- added new tests
- added coverage tests
