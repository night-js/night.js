import { defaultSettings } from './defaults';

import { Settings, Callbacks, Options, Times, Coords } from './types';

export default class Night {
  private elements: HTMLElement | HTMLElement[];
  private settings: Settings;
  private callbacks: Callbacks;

  private isInit: boolean;
  private isDark!: boolean;
  private isPlaying = false;

  private coords!: Coords;
  private autoCoords = true;

  private times!: Times;
  private autoTimes = true;

  private matchLight!: boolean;
  private matchDark!: boolean;

  private today: Date = new Date();

  constructor(data = {} as Options) {
    this.elements = data.elements || document.body;
    this.settings = this.extendSettings(data.settings || {});
    this.callbacks = data.callbacks || {};

    this.isInit = this.settings.auto;

    this.init();
  }

  private init() {
    if (this.settings.mode === 'color-scheme') {
      this.prefersColorScheme();

      this.isInit = false;
    } else if (this.settings.mode === 'smart') {
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
  }

  private isNight = () => {
    const now = new Date();

    return (
      now.getTime() > this.times.sunrise && now.getTime() < this.times.sunset
    );
  };

  private changeClasses = (method: 'add' | 'remove', change: string) => {
    if (this.elements instanceof HTMLCollection) {
      Object.values(this.elements).map(element => {
        element.classList[method](change);
      });
    } else if (this.elements instanceof HTMLElement) {
      this.elements.classList[method](change);
    }
  };

  private ambientLight() {
    if ('ondevicelight' in window) {
      window.addEventListener('devicelight', e => {
        if (e.value < 50) {
          this.changeClasses('add', this.settings.brightnessLowClass);
          this.changeClasses('remove', this.settings.brightnessHighClass);
        } else {
          this.changeClasses('add', this.settings.brightnessHighClass);
          this.changeClasses('remove', this.settings.brightnessLowClass);
        }
      });

      if (typeof this.callbacks.onBrightness === 'function') {
        this.callbacks.onBrightness();
      }
    } else {
      if (typeof this.callbacks.onBrightnessNotSupported === 'function') {
        this.callbacks.onBrightnessNotSupported();

        if (this.isNight()) {
          this.changeClasses('add', this.settings.brightnessLowClass);
          this.changeClasses('remove', this.settings.brightnessHighClass);
        } else {
          this.changeClasses('add', this.settings.brightnessHighClass);
          this.changeClasses('remove', this.settings.brightnessLowClass);
        }
      }
    }
  }

  private sound() {
    if (!this.isPlaying) {
      const audio = new Audio(this.settings.soundUrl);

      this.isPlaying = true;

      audio.play();

      if (typeof this.callbacks.onSoundPlay === 'function') {
        this.callbacks.onSoundPlay();
      }

      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;

        this.isPlaying = false;

        if (typeof this.callbacks.onSoundPause === 'function') {
          this.callbacks.onSoundPause();
        }
      }, this.settings.soundTimeout);
    }
  }

  public light() {
    if (typeof this.callbacks.onLight === 'function') {
      this.callbacks.onLight();
    }

    this.isDark = false;

    if (this.settings.lightClass) {
      this.changeClasses('add', this.settings.lightClass);
    }

    this.changeClasses('remove', this.settings.darkClass);

    localStorage.setItem('dark', 'false');
  }

  public dark() {
    if (typeof this.callbacks.onDark === 'function') {
      this.callbacks.onDark();
    }

    this.isDark = true;

    if (this.settings.lightClass) {
      this.changeClasses('remove', this.settings.lightClass);
    }

    this.changeClasses('add', this.settings.darkClass);

    localStorage.setItem('dark', 'true');
  }

  private prefersColorScheme() {
    this.matchDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.matchLight = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches;

    if (this.matchDark || this.matchLight) {
      if (this.matchDark) {
        this.dark();
      } else if (this.matchLight) {
        this.light();
      }

      if (this.isInit && typeof this.callbacks.onColorScheme === 'function') {
        this.callbacks.onColorScheme();
      }
    } else {
      if (
        this.isInit &&
        typeof this.callbacks.onColorSchemeNotSupported === 'function'
      ) {
        this.callbacks.onColorSchemeNotSupported();
      }
    }
  }

  public smartSwitch(isInit?: boolean) {
    if ((isInit && !localStorage.auto) || !isInit) {
      localStorage.setItem('auto', 'true');

      if (typeof this.callbacks.onSmartSwitch === 'function') {
        this.callbacks.onSmartSwitch();
      }
    }

    if (this.settings.sunriseTime && this.settings.sunsetTime) {
      this.timeBreakpoints();
    } else {
      if ('geolocation' in navigator && this.isInit) {
        this.myLocation();
      }
    }

    if (isInit) {
      this.isInit = false;
    }

    this.theme(this.isDark);
  }

  private time(now: Date) {
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

        if (typeof this.callbacks.onStorageClear === 'function') {
          this.callbacks.onStorageClear();
        }
      }
    }
  }

  private theme(isDark: boolean) {
    if (isDark !== this.isDark) {
      isDark ? this.dark() : this.light();
    }
  }

  private switchOnChange() {
    const { sunrise, sunset } = this.times;
    const { latitude, longitude } = this.coords;

    let times = {};

    if (localStorage.auto && JSON.parse(localStorage.auto)) {
      if (JSON.stringify(times) !== JSON.stringify(this.times)) {
        if (this.isNight()) {
          this.light();
        } else {
          this.dark();
        }

        times = this.times;
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

  private myLocation() {
    if (localStorage.location || !this.autoCoords) {
      if (this.autoCoords) {
        this.coords = JSON.parse(localStorage.location);
      }

      if (this.autoTimes) {
        this.sunPosition();
      }
    } else {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(
          this.accessSuccess,
          this.accessError
        );
      }, this.settings.permissionDelay);
    }
  }

  private accessSuccess = ({ coords }: { coords: Coords }) => {
    this.coords = {
      latitude: coords.latitude,
      longitude: coords.longitude
    };

    if (typeof this.callbacks.onAccess === 'function') {
      this.callbacks.onAccess();
    }

    if (this.settings.storage) {
      localStorage.setItem('location', JSON.stringify(this.coords));
    }
  };

  private accessError = (error: PositionError) => {
    if (typeof this.callbacks.onAccessDenied === 'function') {
      this.callbacks.onAccessDenied();
    }

    document.dispatchEvent(
      new CustomEvent('smartDarkError', {
        detail: error
      })
    );
  };

  private sunPosition() {
    const { latitude, longitude } = this.coords;

    import('suncalc2').then(SunCalc => {
      const times = SunCalc.getTimes(this.today, latitude, longitude);

      let sunrise;
      let sunset;

      if (this.settings.sunriseTime) {
        sunrise = this.settings.sunriseTime.getTime();
      } else {
        sunrise = times.sunriseEnd - (times.sunriseEnd - times.sunrise) / 2;
      }

      if (this.settings.sunsetTime) {
        sunset = this.settings.sunsetTime.getTime();
      } else {
        sunset = times.sunset - (times.sunset - times.sunsetStart) / 2;
      }

      this.times = { sunrise, sunset };
    });
  }

  private timeBreakpoints() {
    this.times = {
      sunrise: this.settings.sunriseTime!.getTime(),
      sunset: this.settings.sunsetTime!.getTime()
    };
  }

  public setCoords(latitude: number, longitude: number) {
    this.coords = { latitude, longitude };

    this.autoCoords = false;
  }

  public setTimes(sunrise: number, sunset: number) {
    this.times = { sunrise, sunset };

    this.autoTimes = false;
  }

  public toggle() {
    if (typeof this.callbacks.onToggle === 'function') {
      this.callbacks.onToggle();
    }

    if (this.settings.soundUrl) this.sound();

    this.theme(!this.isDark);

    localStorage.setItem('auto', 'false');
  }

  public reset() {
    localStorage.clear();

    if (typeof this.callbacks.onReset === 'function') {
      this.callbacks.onReset();
    }
  }

  public destroy() {
    if (typeof this.callbacks.onDestroy === 'function') {
      this.callbacks.onDestroy();
    }
  }

  private extendSettings(settings: Settings): Settings {
    const newSettings = {} as any;

    let property: keyof Settings;

    for (property in defaultSettings) {
      if (property in settings) {
        newSettings[property] = settings[property];
      } else {
        newSettings[property] = defaultSettings[property];
      }
    }

    return newSettings;
  }
}
