// @flow

type Coords = {
  latitude: Number,
  longitude: Number
};

type Times = {
  sunrise: Number,
  sunset: Number
};

export default class Night {
  #elements;

  #callbacks;
  #settings;

  #isInit: Boolean;
  #isDark: Boolean;

  #isPlaying: Boolean = false;
  #isListening: Boolean = true;

  #coords: Coords | Object = {};
  #autoCoords: Boolean = true;

  #times: Times | Object = {};
  #autoTimes: Boolean = true;

  #matchLight: Boolean;
  #matchDark: Boolean;

  #today: Date = new Date();

  constructor(data = {}) {
    this.#elements = data.elements || document.body;

    this.#callbacks = data.callbacks || {};
    this.#settings = this.#extendSettings(data.settings || {});

    this.#isInit = this.#settings.auto;

    this.#init();
  }

  #init() {
    if (this.#isListening) {
      setInterval(() => {
        if (this.#settings.mode === 'color-scheme') {
          this.#matchDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
          ).matches;

          this.#matchLight = window.matchMedia(
            '(prefers-color-scheme: light)'
          ).matches;

          if (this.#matchDark || this.#matchLight) {
            this.#prefersColorScheme();

            if (
              this.#isInit &&
              typeof this.#callbacks.onColorScheme === 'function'
            ) {
              this.#callbacks.onColorScheme();
            }
          } else {
            if (
              this.#isInit &&
              typeof this.#callbacks.onColorSchemeNotSupported === 'function'
            ) {
              this.#callbacks.onColorSchemeNotSupported();
            }
          }

          this.#isInit = false;
        } else if (this.#settings.mode === 'smart') {
          this.#time(new Date());

          this.smartSwitch(this.#isInit);
        }

        this.#switchOnChange();
      });
    }

    if (typeof this.#callbacks.onInit == 'function') {
      this.#callbacks.onInit();
    }

    if (this.#settings.brightness) {
      this.#ambientLight();
    }
  }

  #changeClasses = (method: String, change: String) => {
    if (this.#elements.length > 1) {
      Object.values(this.#elements).map(element => {
        element.classList[method](change);
      });
    } else if (this.#elements.length === 1) {
      this.#elements.classList[method](change);
    }
  };

  #ambientLight() {
    if ('ondevicelight' in window) {
      window.addEventListener('devicelight', e => {
        if (e.value < 50) {
          this.#changeClasses('add', this.#settings.brightnessLowClass);
          this.#changeClasses('remove', this.#settings.brightnessHighClass);
        } else {
          this.#changeClasses('add', this.#settings.brightnessHighClass);
          this.#changeClasses('remove', this.#settings.brightnessLowClass);
        }
      });

      if (typeof this.#callbacks.onBrightness === 'function') {
        this.#callbacks.onBrightness();
      }
    } else {
      if (typeof this.#callbacks.onBrightnessNotSupported === 'function') {
        this.#callbacks.onBrightnessNotSupported();
      }
    }
  }

  #sound() {
    if (!this.#isPlaying) {
      const audio = new Audio(this.#settings.soundUrl);

      this.#isPlaying = true;

      audio.play();

      if (typeof this.#callbacks.onSoundPlay === 'function') {
        this.#callbacks.onSoundPlay();
      }

      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;

        this.#isPlaying = false;

        if (typeof this.#callbacks.onSoundPause === 'function') {
          this.#callbacks.onSoundPause();
        }
      }, this.#settings.soundTimeout);
    }
  }

  light() {
    if (typeof this.#callbacks.onLight === 'function') {
      this.#callbacks.onLight();
    }

    this.#isDark = false;

    if (this.#settings.lightClass) {
      this.#changeClasses('add', this.#settings.lightClass);
    }

    this.#changeClasses('remove', this.#settings.darkClass);

    localStorage.setItem('dark', 'false');
  }

  dark() {
    if (typeof this.#callbacks.onDark === 'function') {
      this.#callbacks.onDark();
    }

    this.#isDark = true;

    if (this.#settings.lightClass) {
      this.#changeClasses('remove', this.#settings.lightClass);
    }

    this.#changeClasses('add', this.#settings.darkClass);

    localStorage.setItem('dark', 'true');
  }

  #prefersColorScheme() {
    if (this.#matchDark) this.dark();
    else if (this.#matchLight) this.light();
  }

  smartSwitch(isInit: Boolean) {
    if ((isInit && !localStorage.auto) || !isInit) {
      localStorage.setItem('auto', 'true');

      if (typeof this.#callbacks.onSmartSwitch === 'function') {
        this.#callbacks.onSmartSwitch();
      }
    }

    if ('geolocation' in navigator && this.#isInit) {
      this.#myLocation();
    }

    if (isInit) this.#isInit = false;

    this.#theme(this.#isDark);
  }

  #time(now: Date) {
    const midnight = new Date().setHours(24, 0, 0, 0);

    if (!localStorage.time) {
      localStorage.setItem('time', JSON.stringify(midnight));
    } else if (
      localStorage.location &&
      now.getTime() > JSON.parse(localStorage.time)
    ) {
      localStorage.removeItem('time');

      if (this.#settings.storageClear) {
        localStorage.removeItem('location');

        if (typeof this.#callbacks.onStorageClear === 'function') {
          this.#callbacks.onStorageClear();
        }
      }
    }
  }

  #theme(isDark) {
    if (isDark !== this.#isDark) {
      isDark ? this.dark() : this.light();
    }
  }

  #switchOnChange() {
    const { sunrise, sunset } = this.#times;
    const { latitude, longitude } = this.#coords;

    if (localStorage.auto && JSON.parse(localStorage.auto)) {
      const now = new Date();

      if (now.getTime() > sunrise && now.getTime() < sunset) {
        this.light();
      } else {
        this.dark();
      }
    }

    document.dispatchEvent(
      new CustomEvent('smartDark', {
        detail: {
          sunrise: new Date(sunrise),
          sunset: new Date(sunset),
          latitude,
          longitude
        }
      })
    );
  }

  #myLocation() {
    if (localStorage.location || !this.#autoCoords) {
      if (this.#autoCoords) {
        this.#coords = JSON.parse(localStorage.location);
      }

      if (this.#autoTimes) this.#sunPosition();
    } else {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(
          this.#accessSuccess,
          this.#accessError
        );
      }, this.#settings.permissionDelay);
    }
  }

  #accessSuccess = ({ coords }: { coords: Coords }) => {
    this.#coords = {
      latitude: coords.latitude,
      longitude: coords.longitude
    };

    if (typeof this.#callbacks.onAccess === 'function') {
      this.#callbacks.onAccess();
    }

    if (this.#settings.storage) {
      localStorage.setItem('location', JSON.stringify(this.#coords));
    }
  };

  #accessError = (error: Error) => {
    if (typeof this.#callbacks.onAccessDenied === 'function') {
      this.#callbacks.onAccessDenied();
    }

    document.dispatchEvent(
      new CustomEvent('smartDarkError', {
        detail: error
      })
    );
  };

  #sunPosition() {
    const { latitude, longitude } = this.#coords;

    import('suncalc2').then(SunCalc => {
      const times = SunCalc.getTimes(this.#today, latitude, longitude);

      this.#times = {
        sunrise: times.sunriseEnd - (times.sunriseEnd - times.sunrise) / 2,
        sunset: times.sunset - (times.sunset - times.sunsetStart) / 2
      };
    });
  }

  setCoords(latitude: Number, longitude: Number) {
    this.#coords = { latitude, longitude };

    this.#autoCoords = false;
  }

  setTimes(sunrise: Number, sunset: Number) {
    this.#times = { sunrise, sunset };

    this.#autoTimes = false;
  }

  toggle() {
    if (typeof this.#callbacks.onToggle === 'function') {
      this.#callbacks.onToggle();
    }

    if (this.#settings.soundUrl) this.#sound();

    this.#theme(!this.#isDark);

    localStorage.setItem('auto', 'false');
  }

  reset() {
    localStorage.clear();

    if (typeof this.#callbacks.onReset === 'function') {
      this.#callbacks.onReset();
    }
  }

  destroy() {
    this.#isListening = false;

    if (typeof this.#callbacks.onDestroy === 'function') {
      this.#callbacks.onDestroy();
    }
  }

  #extendSettings(settings) {
    const defaultSettings = {
      mode: 'smart',
      auto: true,
      darkClass: 'dark',
      lightClass: '',
      brightness: false,
      brightnessHighClass: 'high-brightness',
      brightnessLowClass: 'low-brightness',
      permissionDelay: 0,
      storage: true,
      storageClear: true,
      soundUrl: '',
      soundTimeout: 1000
    };

    const newSettings = {};

    for (const property in defaultSettings) {
      if (property in settings) newSettings[property] = settings[property];
      else newSettings[property] = defaultSettings[property];
    }

    return newSettings;
  }
}
