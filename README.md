# [night.js](https://github.com/jb1905/night.js)

[![NPM version](http://img.shields.io/npm/v/night.js.svg?style=flat-square)](https://www.npmjs.com/package/night.js)
[![NPM downloads](http://img.shields.io/npm/dm/night.js.svg?style=flat-square)](https://www.npmjs.com/package/night.js)

## About
night.js is a JavaScript library that implements **smart dark mode switch**, the option to **quickly change the theme** for the whole page / application or any element(s) and other additional options like [functions](#functions), [settings](#settings) or [callback methods](#methods).

User location coordinates and theme settings are saved in the **browser's local storage**.

## How to Install
At the beginning install the library in your project via npm:
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
<script src="/directory/to/library/folder/night.js"></script>
```

**ES6 import:**
```js
import Night from 'night.js';
```

**or CommonJS:**
```js
const Night = require('night.js');
```

Next use library with:

**&bull; Vanilla JavaScript e.g:**
```js
const els = document.querySelectorAll('.adaptive-section');

const night = new Night({
  elements: els,
  settings: {
    // options...
  },
  methods: {
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
**auto** | boolean | `true` | Enable smart switch on script init | `true` (enable), `false` (disable)
**cacheClear** | boolean | `true` | Clear location coordinates in local storage everyday at midnight | `true` (enable), `false` (disable)
**cache** | boolean | `true` | Store location coordinates in local storage for one day | `true` (enable), `false` (disable)
**darkClass** | string | `dark` | Class added to body or element(s) (if set) when dark mode is active | Class name
**lightClass** | string | ` ` | Class added to body or element(s) (if set) when light mode is active | Class name

### Methods
Name | Description | Available options
-|-|-
**onAuto** | Callback on smart switch | `() => { // code }`
**onCacheClear** | Callback when location coordinates and midnight time in local storage cleared | `() => { // code }`
**onDark** | Callback when dark mode is enabled | `() => { // code }`
**onDenied** | Callback on geolocation permission denied | `() => { // code }`
**onLight** | Callback when dark mode is disabled | `() => { // code }`
**onReset** | Callback on localStorage reset | `() => { // code }`
**onToggle** | Callback on dark/light mode toggle | `() => { // code }`

## Events
`smartDark` event will output sun position times and user geolocation latitude & longitude

`smartDarkError` event will output message when permission to geolocation is denied

## License
This project is licensed under the MIT License © 2018-present Jakub Biesiada
