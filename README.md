# [night.js](https://github.com/jb1905/night.js)

[![NPM version](http://img.shields.io/npm/v/night.js.svg?style=flat-square)](https://www.npmjs.com/package/night.js)
[![NPM downloads](http://img.shields.io/npm/dm/night.js.svg?style=flat-square)](https://www.npmjs.com/package/night.js)

## About
night.js is a JavaScript library that implements **smart dark mode switch**, the option to **quickly change the theme** for the whole page / application or any element(s) and other additional options like [methods](#methods), [settings](#settings) or [callbacks](#callbacks).

User location coordinates and theme settings are saved in the **browser's local storage**.

### Demo
**[See plugin in action](https://jb1905.github.io/night.js/)**

## How to Install
First, install the library in your project by npm:
```sh
$ npm install night.js
```

Or Yarn:
```sh
$ yarn add night.js
```

**You can also connect script via one of CDNs:**<br>
bundle.run: `https://bundle.run/night.js`<br>
jsDelivr: `https://cdn.jsdelivr.net/npm/night.js/`<br>
unpkg: `https://unpkg.com/night.js/`

## Getting Started
**Connect libary with project using script tag in HTML:**
```html
<script src="/path/to/night.js"></script>
```

**ES6 import:**
```js
import Night from 'night.js';
```

**Or CommonJS:**
```js
const Night = require('night.js');
```

Next use library with:

**&bull; Vanilla JavaScript e.g:**
```js
const elems = document.querySelectorAll('.night');

const night = new Night({
  elements: elems,
  settings: {
    // options...
  },
  callbacks: {
    // callbacks...
  }
});
```

## Methods
**• Switch between light and dark mode:**
```js
night.toggle();
```

**• Switch to light mode:**
```js
night.light();
```

**• Switch to dark mode:**
```js
night.dark();
```

**• Switch mode automatically (based on time, location and sun position):**
```js
night.smartSwitch();
```

**• Set coords manually:**
```js
night.setCoords(latitude, longitude);
```

**• Set times manually:**
```js
night.setTimes(sunrise, sunset);
```

**• Reset localStorage data:**
```js
night.reset();
```

**• Destroy changes listening:**
```js
night.destroy();
```

## Options
### Settings
Name | Type | Default | Description | Available options
-|-|-|-|-
**auto** | boolean | `true` | Activate smart switch on library init | `true` (enable), `false` (disable)
**brightness** | boolean | `false` | Enable additional theme modes based on devicelight value (if supported) | `true` (enable), `false` (disable)
**brightnessHighClass** | string | `high-brightness` | Class added to body on detect high value of devicelight event | Class name
**brightnessLowClass** | string | `low-brightness` | Class added to body on detect low value of devicelight event | Class name
**checkBreakpoint** | boolean | `true` | Compare current time with sunset & sunrise times | `true` (enable), `false` (disable)
**darkClass** | string | `dark` | Class added to body when dark mode is active | Class name
**lightClass** | string | ` ` | Class added to body when light mode is active | Class name
**mode** | string | `smart` | Mode of theme change detection | `smart` - based on geolocation and time, `color-scheme` - based on prefers-color-scheme value
**permissionDelay** | number | `0` | Dealy before display query for location permission (in miliseconds) | e.g.: `3000`
**storage** | boolean | `true` | Store location coordinates in local storage for one day | `true` (enable), `false` (disable)
**storageClear** | boolean | `true` | Clear location coordinates data in local storage everyday at midnight | `true` (enable), `false` (disable)
**soundUrl** | string | ` ` | Source of the audio file | e.g.: `https://example.com/song.mp3`
**soundTimeout** | number | `1000` | Time before stop sound playing (in miliseconds) | e.g.: `2500`

### Callbacks
Name | Description | Available options
-|-|-
**onAccess** | Callback during access to geolocation values | `() => { /* code */ }`
**onAccessDenied** | Callback when access to geolocation values is deined | `() => { /* code */ }`
**onBrightness** | Callback when devicelight event is supported | `() => { /* code */ }`
**onBrightnessNotSupported** | Callback when devicelight event isn't supported | `() => { /* code */ }`
**onColorScheme** | Callback when `prefers-color-scheme` is supported | `() => { /* code */ }`
**onColorSchemeNotSupported** | Callback when `prefers-color-scheme` isn't supported | `() => { /* code */ }`
**onDark** | Callback during dark mode activation | `() => { /* code */ }`
**onDenied** | Callback when geolocation permission denied | `() => { /* code */ }`
**onDestroy** | Callback during library destroy | `() => { /* code */ }`
**onInit** | Callback during library init | `() => { /* code */ }`
**onLight** | Callback during light mode activation | `() => { /* code */ }`
**onReset** | Callback during local storage reset | `() => { /* code */ }`
**onSmartSwitch** | Callback during smart switch | `() => { /* code */ }`
**onSoundPlay** | Callback during stop playing sound | `() => { /* code */ }`
**onSoundPause** | Callback during start playing sound | `() => { /* code */ }`
**onStorageClear** | Callback during deleting location coordinates and midnight time from local storage | `() => { /* code */ }`
**onToggle** | Callback during color theme toggle | `() => { /* code */ }`

## Events
`smartDark` event will output sun position times and user geolocation latitude & longitude

`smartDarkError` event will output message when permission to geolocation is denied

## License
This project is licensed under the MIT License © 2018-present Jakub Biesiada
