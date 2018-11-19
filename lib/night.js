(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("suncalc"));
	else if(typeof define === 'function' && define.amd)
		define("Night", ["suncalc"], factory);
	else if(typeof exports === 'object')
		exports["Night"] = factory(require("suncalc"));
	else
		root["Night"] = factory(root["suncalc"]);
})(global, function(__WEBPACK_EXTERNAL_MODULE_suncalc__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/night.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/night.js":
/*!**********************!*\
  !*** ./src/night.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Night; });
/* harmony import */ var suncalc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! suncalc */ "suncalc");
/* harmony import */ var suncalc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(suncalc__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Night =
/*#__PURE__*/
function () {
  function Night() {
    var _this = this;

    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Night);

    _defineProperty(this, "theme", function () {
      return localStorage.dark === 'true' ? _this.dark() : _this.light();
    });

    _defineProperty(this, "success", function (pos) {
      var location = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      };

      _this.checkSunPosition(location.latitude, location.longitude);

      if (_this.settings.cache) {
        localStorage.setItem('location', JSON.stringify(location));
      }
    });

    _defineProperty(this, "error", function (err) {
      if (typeof _this.settings.onDenied === 'function') {
        _this.settings.onDenied();
      }

      document.dispatchEvent(new CustomEvent('smartDarkError', {
        detail: err
      }));
    });

    this.settings = this.extendSettings(settings);
    this.time();
    if (this.settings.auto) this.auto(true);
    this.theme();
  }

  _createClass(Night, [{
    key: "time",
    value: function time() {
      this.today = new Date();
      var midnight = new Date().setHours(24, 0, 0, 0);

      if (!localStorage.time) {
        localStorage.setItem('time', JSON.stringify(midnight));
      } else if (localStorage.location && this.today.getTime() > JSON.parse(localStorage.time)) {
        localStorage.removeItem('time');

        if (this.settings.cacheClear) {
          localStorage.removeItem('location');

          if (typeof this.settings.onCacheClear === 'function') {
            this.settings.onCacheClear();
          }
        }
      }
    }
  }, {
    key: "auto",
    value: function auto(init) {
      if (init && !localStorage.auto || !init) {
        localStorage.setItem('auto', true);
        if (typeof this.settings.onAuto === 'function') this.settings.onAuto();
      }

      if ('geolocation' in navigator) this.myLocation();
    }
  }, {
    key: "myLocation",
    value: function myLocation() {
      if (!localStorage.location) {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
      } else {
        var location = JSON.parse(localStorage.location);
        this.checkSunPosition(location.latitude, location.longitude);
      }
    }
  }, {
    key: "checkSunPosition",
    value: function checkSunPosition(latitude, longitude) {
      var times = new suncalc__WEBPACK_IMPORTED_MODULE_0___default.a.getTimes(this.today, latitude, longitude);
      var values = {
        sunrise: times.sunrise,
        sunset: times.sunsetStart,
        latitude: latitude,
        longitude: longitude
      };
      document.dispatchEvent(new CustomEvent('smartDark', {
        detail: values
      }));

      if (JSON.parse(localStorage.auto)) {
        this.today.getTime() > times.sunrise.getTime() && this.today.getTime() < times.sunsetStart.getTime() ? this.light() : this.dark();
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      localStorage.clear();
      if (typeof this.settings.onReset === 'function') this.settings.onReset();
    }
  }, {
    key: "light",
    value: function light() {
      if (typeof this.settings.onLight === 'function') this.settings.onLight();
      this.isDark = false;

      if (this.settings.lightClass) {
        document.body.classList.add(this.settings.lightClass);
      }

      document.body.classList.remove(this.settings.darkClass);
      localStorage.setItem('dark', false);
    }
  }, {
    key: "dark",
    value: function dark() {
      if (typeof this.settings.onDark === 'function') this.settings.onDark();
      this.isDark = true;

      if (this.settings.lightClass) {
        document.body.classList.remove(this.settings.lightClass);
      }

      document.body.classList.add(this.settings.darkClass);
      localStorage.setItem('dark', true);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (typeof this.settings.onToggle === 'function') this.settings.onToggle();
      this.isDark ? this.light() : this.dark();
      localStorage.setItem('auto', false);
    }
  }, {
    key: "extendSettings",
    value: function extendSettings(settings) {
      var defaultSettings = {
        lightClass: '',
        // class added to body when dark mode is disabled
        darkClass: 'dark',
        // class added to body when dark mode is enabled
        cache: true,
        // cache location coordinates in local storage
        cacheClear: true,
        // clear location coordinates in local storage everyday at midnight
        auto: true,
        // enable smart switch on script init
        onAuto: null,
        // callback on smart switch
        onLight: null,
        // callback when dark mode is disabled
        onDark: null,
        // callback when dark mode is enabled
        onToggle: null,
        // callback on dark/light mode toggle
        onDenied: null,
        // callback on geolocation permission deined
        onCacheClear: null,
        // callback when location coordinates and midnight time in local storage cleared
        onReset: null // callback on localStorage reset

      };
      var newSettings = {};

      for (var property in defaultSettings) {
        if (property in settings) newSettings[property] = settings[property];else newSettings[property] = defaultSettings[property];
      }

      return newSettings;
    }
  }]);

  return Night;
}();



/***/ }),

/***/ "suncalc":
/*!**************************!*\
  !*** external "suncalc" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_suncalc__;

/***/ })

/******/ });
});
//# sourceMappingURL=night.js.map