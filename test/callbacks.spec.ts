import Night from '../src';

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  };
});

describe('callbacks', () => {
  test('onInit callback', () => {
    let test = false;

    const night = new Night({
      callbacks: {
        onInit: () => {
          test = true;
        }
      }
    });

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onLight callback', () => {
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

  test('onDark callback', () => {
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

  test('onToggle callback', () => {
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

  test('onBrightnessNotSupported callback', () => {
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

  test('onBrightness callback', () => {
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

  test('onColorSchemeNotSupported callback', () => {
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

  test('onColorScheme callback', () => {
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

  test('onStorageClear callback', () => {
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

    // night.reset()

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onSoundPlay callback', () => {
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

  test('onSoundPause callback', () => {
    let test = false;

    const night = new Night({
      settings: {
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

  test('onAccess callback', () => {
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

  test('onSmartSwitch callback', () => {
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

  test('onAccessDenied callback', () => {
    let test = false;

    const night = new Night({
      callbacks: {
        onAccessDenied: () => {
          test = true;
        }
      }
    });

    night.smartSwitch();

    let error;

    document.addEventListener('smartDarkError', (e: CustomEvent) => {
      error = e.detail.message;
    });

    expect(test).toEqual(true);

    night.destroy();
  });

  test('onReset callback', () => {
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
