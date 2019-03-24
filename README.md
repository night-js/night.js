# [night.js](https://github.com/jb1905/night.js)

[![NPM version](http://img.shields.io/npm/v/night.js.svg?style=flat-square)](https://www.npmjs.com/package/night.js)
[![NPM downloads](http://img.shields.io/npm/dm/night.js.svg?style=flat-square)](https://www.npmjs.com/package/night.js)

## About
night.js is a JavaScript library that implements **smart dark mode switch**, the option to **quickly change the theme** for the whole page / application or any element(s) and other additional options like [functions](#functions), [settings](#settings) or [callback methods](#methods).

User location coordinates and theme settings are saved in the **browser's local storage**.

### Demo
**[See plugin in action](https://jb1905.github.io/night.js/)**

## How to Install
First, install the library in your project by npm:
```bash
$ npm install night.js
```

Or Yarn:
```bash
$ yarn add night.js
```

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
const elems = document.querySelectorAll('.adaptive-section');

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

## Functions
**&bull; Switch between light and dark mode:**
```js
night.toggle();
```

**• Switch mode automatically (based on time, location and sun position):**
```js
night.auto();
```

**• Reset localStorage data:**
```js
night.reset();
```

## Options
### Settings
Name | Type | Default | Description | Available options
-|-|-|-|-
**auto** | boolean | `true` | Activate smart switch on library init | `true` (enable), `false` (disable)
**darkClass** | string | `dark` | Class added to body or element(s) (if set) when dark mode is active | Class name
**lightClass** | string | ` ` | Class added to body or element(s) (if set) when light mode is active | Class name
**storage** | boolean | `true` | Store location coordinates in local storage for one day | `true` (enable), `false` (disable)
**storageClear** | boolean | `true` | Clear location coordinates data in local storage everyday at midnight | `true` (enable), `false` (disable)

### Callbacks
Name | Description | Available options
-|-|-
**onAuto** | Callback during smart switch | `() => { /* code */ }`
**onDark** | Callback during dark mode activation | `() => { /* code */ }`
**onDenied** | Callback when geolocation permission denied | `() => { /* code */ }`
**onLight** | Callback during light mode activation | `() => { /* code */ }`
**onReset** | Callback during local storage reset | `() => { /* code */ }`
**onStorageClear** | Callback during deleting location coordinates and midnight time from local storage | `() => { /* code */ }`
**onToggle** | Callback during color theme toggle | `() => { /* code */ }`

## Events
`smartDark` event will output sun position times and user geolocation latitude & longitude

`smartDarkError` event will output message when permission to geolocation is denied

## License
This project is licensed under the MIT License © 2018-present Jakub Biesiada
