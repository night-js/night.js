import Night from '../src/night';

describe('callbacks', () => {
  beforeEach(() => {
    window.localStorage = {};
  });

  test('onInit', () => {
    let test = false;

    const night = new Night({
      callbacks: {
        onInit: () => (test = true)
      }
    });

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onLight', () => {
    let test = false;

    const night = new Night({
      callbacks: {
        onLight: () => (test = true)
      }
    });

    night.light();

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onDark', () => {
    let test = false;

    const night = new Night({
      callbacks: {
        onDark: () => (test = true)
      }
    });

    night.dark();

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onToggle', () => {
    let test = false;

    const night = new Night({
      callbacks: {
        onToggle: () => (test = true)
      }
    });

    night.toggle();
    night.toggle();

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onBrightnessNotSupported', () => {
    let test = false;

    const night = new Night({
      settings: {
        brightness: true
      },
      callbacks: {
        onBrightnessNotSupported: () => (test = true)
      }
    });

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onBrightness', () => {
    window.ondevicelight = true;

    let test = false;

    const night = new Night({
      settings: {
        brightness: true
      },
      callbacks: {
        onBrightness: () => (test = true)
      }
    });

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onColorSchemeNotSupported', () => {
    let test = false;

    const night = new Night({
      settings: {
        mode: 'color-scheme'
      },
      callbacks: {
        onColorSchemeNotSupported: () => (test = true)
      }
    });

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onColorScheme', () => {
    let test = false;

    const night = new Night({
      settings: {
        mode: 'color-scheme'
      },
      callbacks: {
        onColorScheme: () => (test = true)
      }
    });

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onStorageClear', () => {
    window.localStorage.time = new Date().setHours(0, 0, 0, 0);

    let test = false;

    const night = new Night({
      settings: {
        mode: 'smart'
      },
      callbacks: {
        onStorageClear: () => (test = true)
      }
    });

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onSoundPlay', () => {
    Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
      configurable: true,
      get() {
        setTimeout(() => this.onloadeddata && this.onloadeddata());
        return () => {};
      }
    });

    let test = false;

    const night = new Night({
      settings: {
        sound: true,
        soundUrl: 'aaa.mp4'
      },
      callbacks: {
        onSoundPlay: () => (test = true)
      }
    });

    night.toggle();
    night.toggle();

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onSoundPause', () => {
    let test = false;

    const night = new Night({
      settings: {
        sound: true,
        soundUrl: 'aaa.mp4'
      },
      callbacks: {
        onSoundPause: () => (test = true)
      }
    });

    night.toggle();
    night.toggle();

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onAccess', () => {
    let test = false;

    const night = new Night({
      callbacks: {
        onAccess: () => (test = true)
      }
    });

    night.smartSwitch();

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onSmartSwitch', () => {
    let test = false;

    const night = new Night({
      callbacks: {
        onSmartSwitch: () => (test = true)
      }
    });

    night.smartSwitch();

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onAccessDenied', () => {
    let test = false;

    const night = new Night({
      callbacks: {
        onAccessDenied: () => (test = true)
      }
    });

    night.smartSwitch();

    let error;

    document.addEventListener('smartDarkError', e => {
      error = e.message;
    });

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onReset', () => {
    let test = false;

    const night = new Night({
      callbacks: {
        onReset: () => (test = true)
      }
    });

    night.reset();

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onDestroy callback', () => {
    let test = false;

    const night = new Night({
      callbacks: {
        onDestroy: () => (test = true)
      }
    });

    night.destroy();

    expect(test).toEqual(true);
  });
});
