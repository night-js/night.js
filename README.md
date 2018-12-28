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
**cache** | boolean | `true` | Cache location coordinates in local storage for one day | `true` (enable), `false` (disable)
**cacheClear** | boolean | `true` | Clear location coordinates in local storage everyday at midnight | `true` (enable), `false` (disable)
**darkClass** | string | `dark` | Class added to body when dark mode is active | Name of the class
**lightClass** | string | ` ` | Class added to body when light mode is active | Name of the class

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
