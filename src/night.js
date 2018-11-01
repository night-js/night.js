import SunCalc from 'suncalc';

export default class Night {
  constructor(settings = {}) {
    this.settings = this.settings(settings);

    this.time();

    if (this.settings.auto) this.auto(true);

    this.theme();
  }

  time() {
    this.today = new Date();
    const midnight = new Date().setHours(24, 0, 0, 0);

    if (!localStorage.time) {
      localStorage.setItem('time', JSON.stringify(midnight));
    } else if (
      localStorage.location &&
      this.today.getTime() > JSON.parse(localStorage.time)
    ) {
      localStorage.removeItem('time');

      if (this.settings.cacheClear) {
        localStorage.removeItem('location');

        if (typeof this.settings.onCacheClear === 'function') {
          this.settings.onCacheClear();
        }
      }
    }
  }

  theme() {
    localStorage.dark === 'true' ? this.dark() : this.light();
  }

  auto(init) {
    if ((init && !localStorage.auto) || !init) {
      localStorage.setItem('auto', true);

      if (typeof this.settings.onAuto === 'function') this.settings.onAuto();
    }

    if ('geolocation' in navigator) this.myLocation();
  }

  myLocation() {
    if (!localStorage.location) {
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    } else {
      let location = JSON.parse(localStorage.location);

      this.checkSunPosition(location.latitude, location.longitude);
    }
  }

  success = pos => {
    let location = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    };

    this.checkSunPosition(location.latitude, location.longitude);

    if (this.settings.cache) {
      localStorage.setItem('location', JSON.stringify(location));
    }
  };

  error = err => {
    if (typeof this.settings.onDenied === 'function') {
      this.settings.onDenied();
    }

    document.dispatchEvent(
      new CustomEvent('smartDarkError', {
        detail: err
      })
    );
  };

  checkSunPosition(latitude, longitude) {
    const times = new SunCalc.getTimes(this.today, latitude, longitude);

    const values = {
      sunrise: times.sunrise,
      sunset: times.sunsetStart,
      latitude,
      longitude
    };

    document.dispatchEvent(
      new CustomEvent('smartDark', {
        detail: values
      })
    );

    if (JSON.parse(localStorage.auto)) {
      this.today.getTime() > times.sunrise.getTime() &&
      this.today.getTime() < times.sunsetStart.getTime()
        ? this.light()
        : this.dark();
    }
  }

  reset() {
    localStorage.clear();

    if (typeof this.settings.onReset === 'function') this.settings.onReset();
  }

  light() {
    if (typeof this.settings.onLight === 'function') this.settings.onLight();

    this.isDark = false;

    if (this.settings.lightClass) {
      document.body.classList.add(this.settings.lightClass);
    }

    document.body.classList.remove(this.settings.darkClass);

    localStorage.setItem('dark', false);
  }

  dark() {
    if (typeof this.settings.onDark === 'function') this.settings.onDark();

    this.isDark = true;

    if (this.settings.lightClass) {
      document.body.classList.remove(this.settings.lightClass);
    }

    document.body.classList.add(this.settings.darkClass);

    localStorage.setItem('dark', true);
  }

  toggle() {
    if (typeof this.settings.onToggle === 'function') this.settings.onToggle();

    this.isDark ? this.light() : this.dark();

    localStorage.setItem('auto', false);
  }

  settings(settings) {
    const defaults = {
      lightClass: '', // class added to body when dark mode is disabled
      darkClass: 'dark', // class added to body when dark mode is enabled
      cache: true, // cache location coordinates in local storage
      cacheClear: true, // clear location coordinates in local storage everyday at midnight
      auto: true, // enable smart switch on script init

      onAuto: null, // callback on smart switch
      onLight: null, // callback when dark mode is disabled
      onDark: null, // callback when dark mode is enabled
      onToggle: null, // callback on dark/light mode toggle
      onDenied: null, // callback on geolocation permission deined
      onCacheClear: null, // callback when location coordinates and midnight time in local storage cleared
      onReset: null // callback on localStorage reset
    };

    const custom = {};

    for (const setting in defaults) {
      if (setting in settings) custom[setting] = settings[setting];
      else custom[setting] = defaults[setting];
    }

    return custom;
  }
}
