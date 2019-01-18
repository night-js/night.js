import SunCalc from 'suncalc';

export default class Night {
  constructor(data = {}) {
    this.elements = data.elements || document.body;
    this.methods = data.methods || {};

    this.settings = this.extendSettings(data.settings || {});

    this.today = new Date();

    setInterval(() => this.time(new Date()), 1000);

    if (this.settings.auto) this.auto(true);

    this.theme();
  }

  time(now) {
    const midnight = new Date().setHours(24, 0, 0, 0);

    if (!localStorage.time) {
      localStorage.setItem('time', JSON.stringify(midnight));
    } else if (
      localStorage.location &&
      now.getTime() > JSON.parse(localStorage.time)
    ) {
      localStorage.removeItem('time');

      if (this.settings.storageClear) {
        localStorage.removeItem('location');

        if (typeof this.methods.onStorageClear === 'function') {
          this.methods.onStorageClear();
        }
      }
    }
  }

  theme = () => (localStorage.dark === 'true' ? this.dark() : this.light());

  auto(init) {
    if ((init && !localStorage.auto) || !init) {
      localStorage.setItem('auto', 'true');

      if (typeof this.methods.onAuto === 'function') this.methods.onAuto();
    }

    if ('geolocation' in navigator) this.myLocation();
  }

  myLocation() {
    if (!localStorage.location) {
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    } else {
      const location = JSON.parse(localStorage.location);

      this.checkSunPosition(location.latitude, location.longitude);
    }
  }

  success = pos => {
    const location = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    };

    this.checkSunPosition(location.latitude, location.longitude);

    if (this.settings.storage) {
      localStorage.setItem('location', JSON.stringify(location));
    }
  };

  error = err => {
    if (typeof this.methods.onDenied === 'function') {
      this.methods.onDenied();
    }

    document.dispatchEvent(
      new CustomEvent('smartDarkError', {
        detail: err
      })
    );
  };

  checkSunPosition(latitude, longitude) {
    const times = new SunCalc.getTimes(this.today, latitude, longitude);

    const sunrise = times.sunriseEnd - (times.sunriseEnd - times.sunrise) / 2;
    const sunset = times.sunset - (times.sunset - times.sunsetStart) / 2;

    const values = {
      sunrise: new Date(sunrise),
      sunset: new Date(sunset),
      latitude,
      longitude
    };

    document.dispatchEvent(
      new CustomEvent('smartDark', {
        detail: values
      })
    );

    setInterval(() => {
      if (localStorage.auto && JSON.parse(localStorage.auto)) {
        const now = new Date();

        now.getTime() > sunrise && now.getTime() < sunset
          ? this.light()
          : this.dark();
      }
    }, 100);
  }

  reset() {
    localStorage.clear();

    if (typeof this.methods.onReset === 'function') this.methods.onReset();
  }

  light() {
    if (typeof this.methods.onLight === 'function') this.methods.onLight();

    this.isDark = false;

    const changeTheme = element => {
      if (this.settings.lightClass) {
        element.classList.add(this.settings.lightClass);
      }

      element.classList.remove(this.settings.darkClass);
    };

    if (this.elements instanceof NodeList) {
      Object.values(this.elements).map(element => changeTheme(element));
    } else {
      changeTheme(this.elements);
    }

    localStorage.setItem('dark', 'false');
  }

  dark() {
    if (typeof this.methods.onDark === 'function') this.methods.onDark();

    this.isDark = true;

    const changeTheme = element => {
      if (this.settings.lightClass) {
        element.classList.remove(this.settings.lightClass);
      }

      element.classList.add(this.settings.darkClass);
    };

    if (this.elements instanceof NodeList) {
      Object.values(this.elements).map(element => changeTheme(element));
    } else {
      changeTheme(this.elements);
    }

    localStorage.setItem('dark', 'true');
  }

  toggle() {
    if (typeof this.methods.onToggle === 'function') this.methods.onToggle();

    this.isDark ? this.light() : this.dark();

    localStorage.setItem('auto', 'false');
  }

  extendSettings(settings) {
    const defaultSettings = {
      auto: true, // enable smart switch on script init
      darkClass: 'dark', // class added when dark mode is enabled
      lightClass: '', // class added when dark mode is disabled
      storage: true, // store location coordinates in local storage
      storageClear: true // clear location coordinates in local storage everyday at midnight
    };

    const newSettings = {};

    for (const property in defaultSettings) {
      if (property in settings) newSettings[property] = settings[property];
      else newSettings[property] = defaultSettings[property];
    }

    return newSettings;
  }
}
