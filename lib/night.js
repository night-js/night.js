(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Night", [], factory);
	else if(typeof exports === 'object')
		exports["Night"] = factory();
	else
		root["Night"] = factory();
})(typeof window !== "object" ? global.window = global : window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/suncalc2/suncalc2.js":
/*!*******************************************!*\
  !*** ./node_modules/suncalc2/suncalc2.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 (c) 2011-2015, Vladimir Agafonkin
 SunCalc is a JavaScript library for calculating sun/moon position and light phases.
 https://github.com/mourner/suncalc
*/

(function () { 'use strict';

// shortcuts for easier to read formulas

var PI   = Math.PI,
    sin  = Math.sin,
    cos  = Math.cos,
    tan  = Math.tan,
    asin = Math.asin,
    atan = Math.atan2,
    acos = Math.acos,
    rad  = PI / 180;

// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas


// date/time constants and conversions

var dayMs = 1000 * 60 * 60 * 24,
    J1970 = 2440588,
    J2000 = 2451545;

function toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; }
function fromJulian(j)  { return new Date((j + 0.5 - J1970) * dayMs); }
function toDays(date)   { return toJulian(date) - J2000; }


// general calculations for position

var e = rad * 23.4397; // obliquity of the Earth

function rightAscension(l, b) { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }
function declination(l, b)    { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }

function azimuth(H, phi, dec)  { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); }
function altitude(H, phi, dec) { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); }

function siderealTime(d, lw) { return rad * (280.16 + 360.9856235 * d) - lw; }

function astroRefraction(h) {
    if (h < 0) // the following formula works for positive altitudes only.
        h = 0; // if h = -0.08901179 a div/0 would occur.

    // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
}

// general sun calculations

function solarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }

function eclipticLongitude(M) {

    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
        P = rad * 102.9372; // perihelion of the Earth

    return M + C + P + PI;
}

function sunCoords(d) {

    var M = solarMeanAnomaly(d),
        L = eclipticLongitude(M);

    return {
        dec: declination(L, 0),
        ra: rightAscension(L, 0)
    };
}


var SunCalc = {};


// calculates sun position for a given date and latitude/longitude

SunCalc.getPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c  = sunCoords(d),
        H  = siderealTime(d, lw) - c.ra;

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: altitude(H, phi, c.dec)
    };
};


// sun times configuration (angle, morning name, evening name)

var times = SunCalc.times = [
    [-0.833, 'sunrise',       'sunset'      ],
    [  -0.3, 'sunriseEnd',    'sunsetStart' ],
    [    -6, 'dawn',          'dusk'        ],
    [   -12, 'nauticalDawn',  'nauticalDusk'],
    [   -18, 'nightEnd',      'night'       ],
    [     6, 'goldenHourEnd', 'goldenHour'  ]
];

// adds a custom time to the times config

SunCalc.addTime = function (angle, riseName, setName) {
    times.push([angle, riseName, setName]);
};


// calculations for sun times

var J0 = 0.0009;

function julianCycle(d, lw) { return Math.round(d - J0 - lw / (2 * PI)); }

function approxTransit(Ht, lw, n) { return J0 + (Ht + lw) / (2 * PI) + n; }
function solarTransitJ(ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }

function hourAngle(h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }

// returns set time for the given sun altitude
function getSetJ(h, lw, phi, dec, n, M, L) {

    var w = hourAngle(h, phi, dec),
        a = approxTransit(w, lw, n);
    return solarTransitJ(a, M, L);
}


// calculates sun times for a given date and latitude/longitude

SunCalc.getTimes = function (date, lat, lng) {

    var lw = rad * -lng,
        phi = rad * lat,

        d = toDays(date),
        n = julianCycle(d, lw),
        ds = approxTransit(0, lw, n),

        M = solarMeanAnomaly(ds),
        L = eclipticLongitude(M),
        dec = declination(L, 0),

        Jnoon = solarTransitJ(ds, M, L),

        i, len, time, Jset, Jrise;


    var result = {
        solarNoon: fromJulian(Jnoon),
        nadir: fromJulian(Jnoon + 0.5)
    };

    for (i = 0, len = times.length; i < len; i += 1) {
        time = times[i];

        Jset = getSetJ(time[0] * rad, lw, phi, dec, n, M, L);
        Jrise = Jnoon - (Jset - Jnoon);

        result[time[1]] = fromJulian(Jrise);
        result[time[2]] = fromJulian(Jset);
    }

    return result;
};


// moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas

function moonCoords(d) { // geocentric ecliptic coordinates of the moon

    var L = rad * (218.316 + 13.176396 * d), // ecliptic longitude
        M = rad * (134.963 + 13.064993 * d), // mean anomaly
        F = rad * (93.272 + 13.229350 * d),  // mean distance

        l  = L + rad * 6.289 * sin(M), // longitude
        b  = rad * 5.128 * sin(F),     // latitude
        dt = 385001 - 20905 * cos(M);  // distance to the moon in km

    return {
        ra: rightAscension(l, b),
        dec: declination(l, b),
        dist: dt
    };
}

SunCalc.getMoonPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c = moonCoords(d),
        H = siderealTime(d, lw) - c.ra,
        h = altitude(H, phi, c.dec),
        // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
        pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));

    h = h + astroRefraction(h); // altitude correction for refraction

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: h,
        distance: c.dist,
        parallacticAngle: pa
    };
};


// calculations for illumination parameters of the moon,
// based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
// Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.

SunCalc.getMoonIllumination = function (date) {

    var d = toDays(date || new Date()),
        s = sunCoords(d),
        m = moonCoords(d),

        sdist = 149598000, // distance from Earth to Sun in km

        phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
        inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
        angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -
                cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));

    return {
        fraction: (1 + cos(inc)) / 2,
        phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
        angle: angle
    };
};


function hoursLater(date, h) {
    return new Date(date.valueOf() + h * dayMs / 24);
}

// calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article

SunCalc.getMoonTimes = function (date, lat, lng, inUTC) {
    var t = new Date(date);
    if (inUTC) t.setUTCHours(0, 0, 0, 0);
    else t.setHours(0, 0, 0, 0);

    var hc = 0.133 * rad,
        h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,
        h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;

    // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
    for (var i = 1; i <= 24; i += 2) {
        h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
        h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;

        a = (h0 + h2) / 2 - h1;
        b = (h2 - h0) / 2;
        xe = -b / (2 * a);
        ye = (a * xe + b) * xe + h1;
        d = b * b - 4 * a * h1;
        roots = 0;

        if (d >= 0) {
            dx = Math.sqrt(d) / (Math.abs(a) * 2);
            x1 = xe - dx;
            x2 = xe + dx;
            if (Math.abs(x1) <= 1) roots++;
            if (Math.abs(x2) <= 1) roots++;
            if (x1 < -1) x1 = x2;
        }

        if (roots === 1) {
            if (h0 < 0) rise = i + x1;
            else set = i + x1;

        } else if (roots === 2) {
            rise = i + (ye < 0 ? x2 : x1);
            set = i + (ye < 0 ? x1 : x2);
        }

        if (rise && set) break;

        h0 = h2;
    }

    var result = {};

    if (rise) result.rise = hoursLater(t, rise);
    if (set) result.set = hoursLater(t, set);

    if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;

    return result;
};


// export as Node module / AMD module / browser variable
if (true) module.exports = SunCalc;
else {}

}());


/***/ }),

/***/ "./src/defaults.ts":
/*!*************************!*\
  !*** ./src/defaults.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSettings = {
    auto: true,
    brightness: false,
    brightnessHighClass: 'high-brightness',
    brightnessLowClass: 'low-brightness',
    checkBreakpoint: true,
    darkClass: 'dark',
    lightClass: '',
    mode: 'smart',
    permissionDelay: 0,
    soundTimeout: 1000,
    soundUrl: '',
    storage: true,
    storageClear: true,
    sunriseTime: null,
    sunsetTime: null
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var night_1 = __importDefault(__webpack_require__(/*! ./night */ "./src/night.ts"));
exports.default = night_1.default;
exports['default'] = night_1.default;
module.exports = exports['default'];


/***/ }),

/***/ "./src/night.ts":
/*!**********************!*\
  !*** ./src/night.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaults_1 = __webpack_require__(/*! ./defaults */ "./src/defaults.ts");
var Night = /** @class */ (function () {
    function Night(data) {
        var _this = this;
        this.isPlaying = false;
        this.autoCoords = true;
        this.autoTimes = true;
        this.today = new Date();
        this.isNight = function () {
            var now = new Date();
            return (now.getTime() > _this.times.sunrise && now.getTime() < _this.times.sunset);
        };
        this.changeClasses = function (method, change) {
            if (_this.elements instanceof HTMLCollection) {
                Object.values(_this.elements).map(function (element) {
                    element.classList[method](change);
                });
            }
            else if (_this.elements instanceof HTMLElement) {
                _this.elements.classList[method](change);
            }
        };
        this.accessSuccess = function (_a) {
            var coords = _a.coords;
            _this.coords = {
                latitude: coords.latitude,
                longitude: coords.longitude
            };
            if (typeof _this.callbacks.onAccess === 'function') {
                _this.callbacks.onAccess();
            }
            if (_this.settings.storage) {
                localStorage.setItem('location', JSON.stringify(_this.coords));
            }
        };
        this.accessError = function (error) {
            if (typeof _this.callbacks.onAccessDenied === 'function') {
                _this.callbacks.onAccessDenied();
            }
            document.dispatchEvent(new CustomEvent('smartDarkError', {
                detail: error
            }));
        };
        this.elements = data.elements || document.body;
        this.settings = this.extendSettings(data.settings || {});
        this.callbacks = data.callbacks || {};
        this.isInit = this.settings.auto;
        this.init();
    }
    Night.prototype.init = function () {
        if (this.settings.mode === 'color-scheme') {
            this.prefersColorScheme();
            this.isInit = false;
        }
        else if (this.settings.mode === 'smart') {
            this.time(new Date());
            this.smartSwitch(this.isInit);
        }
        this.switchOnChange();
        if (typeof this.callbacks.onInit == 'function') {
            this.callbacks.onInit();
        }
        if (this.settings.brightness) {
            this.ambientLight();
        }
    };
    Night.prototype.ambientLight = function () {
        var _this = this;
        if ('ondevicelight' in window) {
            window.addEventListener('devicelight', function (e) {
                if (e.value < 50) {
                    _this.changeClasses('add', _this.settings.brightnessLowClass);
                    _this.changeClasses('remove', _this.settings.brightnessHighClass);
                }
                else {
                    _this.changeClasses('add', _this.settings.brightnessHighClass);
                    _this.changeClasses('remove', _this.settings.brightnessLowClass);
                }
            });
            if (typeof this.callbacks.onBrightness === 'function') {
                this.callbacks.onBrightness();
            }
        }
        else {
            if (typeof this.callbacks.onBrightnessNotSupported === 'function') {
                this.callbacks.onBrightnessNotSupported();
                if (this.isNight()) {
                    this.changeClasses('add', this.settings.brightnessLowClass);
                    this.changeClasses('remove', this.settings.brightnessHighClass);
                }
                else {
                    this.changeClasses('add', this.settings.brightnessHighClass);
                    this.changeClasses('remove', this.settings.brightnessLowClass);
                }
            }
        }
    };
    Night.prototype.sound = function () {
        var _this = this;
        if (!this.isPlaying) {
            var audio_1 = new Audio(this.settings.soundUrl);
            this.isPlaying = true;
            audio_1.play();
            if (typeof this.callbacks.onSoundPlay === 'function') {
                this.callbacks.onSoundPlay();
            }
            setTimeout(function () {
                audio_1.pause();
                audio_1.currentTime = 0;
                _this.isPlaying = false;
                if (typeof _this.callbacks.onSoundPause === 'function') {
                    _this.callbacks.onSoundPause();
                }
            }, this.settings.soundTimeout);
        }
    };
    Night.prototype.light = function () {
        if (typeof this.callbacks.onLight === 'function') {
            this.callbacks.onLight();
        }
        this.isDark = false;
        if (this.settings.lightClass) {
            this.changeClasses('add', this.settings.lightClass);
        }
        this.changeClasses('remove', this.settings.darkClass);
        localStorage.setItem('dark', 'false');
    };
    Night.prototype.dark = function () {
        if (typeof this.callbacks.onDark === 'function') {
            this.callbacks.onDark();
        }
        this.isDark = true;
        if (this.settings.lightClass) {
            this.changeClasses('remove', this.settings.lightClass);
        }
        this.changeClasses('add', this.settings.darkClass);
        localStorage.setItem('dark', 'true');
    };
    Night.prototype.prefersColorScheme = function () {
        this.matchDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.matchLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        if (this.matchDark || this.matchLight) {
            if (this.matchDark) {
                this.dark();
            }
            else if (this.matchLight) {
                this.light();
            }
            if (this.isInit && typeof this.callbacks.onColorScheme === 'function') {
                this.callbacks.onColorScheme();
            }
        }
        else {
            if (this.isInit &&
                typeof this.callbacks.onColorSchemeNotSupported === 'function') {
                this.callbacks.onColorSchemeNotSupported();
            }
        }
    };
    Night.prototype.smartSwitch = function (isInit) {
        if ((isInit && !localStorage.auto) || !isInit) {
            localStorage.setItem('auto', 'true');
            if (typeof this.callbacks.onSmartSwitch === 'function') {
                this.callbacks.onSmartSwitch();
            }
        }
        if (this.settings.sunriseTime && this.settings.sunsetTime) {
            this.timeBreakpoints();
        }
        else {
            if ('geolocation' in navigator && this.isInit) {
                this.myLocation();
            }
        }
        if (isInit) {
            this.isInit = false;
        }
        this.theme(this.isDark);
    };
    Night.prototype.time = function (now) {
        var midnight = new Date().setHours(24, 0, 0, 0);
        if (!localStorage.time) {
            localStorage.setItem('time', JSON.stringify(midnight));
        }
        else if (localStorage.location &&
            now.getTime() > JSON.parse(localStorage.time)) {
            localStorage.removeItem('time');
            if (this.settings.storageClear) {
                localStorage.removeItem('location');
                if (typeof this.callbacks.onStorageClear === 'function') {
                    this.callbacks.onStorageClear();
                }
            }
        }
    };
    Night.prototype.theme = function (isDark) {
        if (isDark !== this.isDark) {
            isDark ? this.dark() : this.light();
        }
    };
    Night.prototype.switchOnChange = function () {
        var _a = this.times, sunrise = _a.sunrise, sunset = _a.sunset;
        var _b = this.coords, latitude = _b.latitude, longitude = _b.longitude;
        var times = {};
        if (localStorage.auto && JSON.parse(localStorage.auto)) {
            if (JSON.stringify(times) !== JSON.stringify(this.times)) {
                if (this.isNight()) {
                    this.light();
                }
                else {
                    this.dark();
                }
                times = this.times;
            }
        }
        document.dispatchEvent(new CustomEvent('smartDark', {
            detail: {
                sunrise: new Date(sunrise),
                sunset: new Date(sunset),
                latitude: latitude,
                longitude: longitude
            }
        }));
    };
    Night.prototype.myLocation = function () {
        var _this = this;
        if (localStorage.location || !this.autoCoords) {
            if (this.autoCoords) {
                this.coords = JSON.parse(localStorage.location);
            }
            if (this.autoTimes) {
                this.sunPosition();
            }
        }
        else {
            setTimeout(function () {
                navigator.geolocation.getCurrentPosition(_this.accessSuccess, _this.accessError);
            }, this.settings.permissionDelay);
        }
    };
    Night.prototype.sunPosition = function () {
        var _this = this;
        var _a = this.coords, latitude = _a.latitude, longitude = _a.longitude;
        Promise.resolve().then(function () { return __importStar(__webpack_require__(/*! suncalc2 */ "./node_modules/suncalc2/suncalc2.js")); }).then(function (SunCalc) {
            var times = SunCalc.getTimes(_this.today, latitude, longitude);
            var sunrise;
            var sunset;
            if (_this.settings.sunriseTime) {
                sunrise = _this.settings.sunriseTime.getTime();
            }
            else {
                sunrise = times.sunriseEnd - (times.sunriseEnd - times.sunrise) / 2;
            }
            if (_this.settings.sunsetTime) {
                sunset = _this.settings.sunsetTime.getTime();
            }
            else {
                sunset = times.sunset - (times.sunset - times.sunsetStart) / 2;
            }
            _this.times = { sunrise: sunrise, sunset: sunset };
        });
    };
    Night.prototype.timeBreakpoints = function () {
        this.times = {
            sunrise: this.settings.sunriseTime.getTime(),
            sunset: this.settings.sunsetTime.getTime()
        };
    };
    Night.prototype.setCoords = function (latitude, longitude) {
        this.coords = { latitude: latitude, longitude: longitude };
        this.autoCoords = false;
    };
    Night.prototype.setTimes = function (sunrise, sunset) {
        this.times = { sunrise: sunrise, sunset: sunset };
        this.autoTimes = false;
    };
    Night.prototype.toggle = function () {
        if (typeof this.callbacks.onToggle === 'function') {
            this.callbacks.onToggle();
        }
        if (this.settings.soundUrl)
            this.sound();
        this.theme(!this.isDark);
        localStorage.setItem('auto', 'false');
    };
    Night.prototype.reset = function () {
        localStorage.clear();
        if (typeof this.callbacks.onReset === 'function') {
            this.callbacks.onReset();
        }
    };
    Night.prototype.destroy = function () {
        if (typeof this.callbacks.onDestroy === 'function') {
            this.callbacks.onDestroy();
        }
    };
    Night.prototype.extendSettings = function (settings) {
        var newSettings = {};
        var property;
        for (property in defaults_1.defaultSettings) {
            if (property in settings) {
                newSettings[property] = settings[property];
            }
            else {
                newSettings[property] = defaults_1.defaultSettings[property];
            }
        }
        return newSettings;
    };
    return Night;
}());
exports.default = Night;


/***/ })

/******/ });
});
//# sourceMappingURL=night.js.map