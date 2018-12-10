# [night.js](https://github.com/jb1905/night.js)

[![NPM version](http://img.shields.io/npm/v/night.js.svg?style=flat-square)](https://www.npmjs.com/package/night.js)
[![NPM downloads](http://img.shields.io/npm/dm/night.js.svg?style=flat-square)](https://www.npmjs.com/package/night.js)

## How to Install
At the beginning install the library in your project via npm or Yarn:
```sh
$ npm install night.js
$ yarn add night.js
```

## Getting Started
**Connect using script tag in HTML:**
```html
<script src="/directory/to/library/folder/night.js"></script>
```

**Or CommonJS/ES6 import:**
```js
const Night = require('night.js'); // CommonJS
import Night from 'night.js'; // ES6
```

Next use library with:

**&bull; Vanilla JavaScript e.g:**
```js
const night = new Night({
  // options...
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
Name | Type | Default | Description | Available options
-|-|-|-|-
**lightClass** | string | ` ` | Class added to body when light mode is active | Name of the class
**darkClass** | string | `dark` | Class added to body when dark mode is active | Name of the class
**cache** | boolean | `true` | Cache location coordinates in local storage for one day | `true` (enable), `false` (disable)
**cacheClear** | boolean | `true` | Clear location coordinates in local storage everyday at midnight | `true` (enable), `false` (disable)
**auto** | boolean | `true` | Enable smart switch on script init | `true` (enable), `false` (disable)
**onAuto** | function | `null` | Callback on smart switch | `() => { // code }`
**onLight** | function | `null` | Callback when dark mode is disabled | `() => { // code }`
**onDark** | function | `null` | Callback when dark mode is enabled | `() => { // code }`
**onToggle** | function | `null` | Callback on dark/light mode toggle | `() => { // code }`
**onDenied** | function | `null` | Callback on geolocation permission denied | `() => { // code }`
**onCacheClear** | function | `null` | Callback when location coordinates and midnight time in local storage cleared | `() => { // code }`
**onReset** | function | `null` | Callback on localStorage reset | `() => { // code }`

## Events
`smartDark` event will output sun position times and user geolocation latitude & longitude

`smartDarkError` event will output message when permission to geolocation is denied

## License
This project is licensed under the MIT License © 2018-present Jakub Biesiada
