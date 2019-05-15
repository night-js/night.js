import Night from '../src/night';

describe('core functions', () => {
  beforeEach(() => {
    window.localStorage = {};
  });

  test('smartSwitch with location', () => {
    const night = new Night();

    night.smartSwitch();

    expect(window.localStorage.auto).toEqual('true');

    night.destroy();
  });

  test('smartSwitch without location', () => {
    const night = new Night();

    night.smartSwitch(true);

    expect(window.localStorage.auto).toEqual('true');

    night.destroy();
  });

  test('set geolocation values', () => {
    const night = new Night();

    night.smartSwitch(true);

    expect(window.localStorage.location).toEqual(
      JSON.stringify(location.coords)
    );

    night.destroy();
  });

  test('light class add', () => {
    const night = new Night({
      settings: {
        lightClass: 'light'
      }
    });

    night.light();

    expect(document.body.classList.contains('light')).toEqual(true);

    night.destroy();
  });

  test('light class remove', () => {
    const night = new Night({
      settings: {
        lightClass: 'light'
      }
    });

    night.dark();

    expect(document.body.classList.contains('light')).toEqual(false);

    night.destroy();
  });

  test('reset localStorage', () => {
    window.localStorage.location = JSON.stringify(location.coords);
    window.localStorage.dark = 'false';
    window.localStorage.auto = 'true';

    const night = new Night();

    night.reset();

    expect(window.localStorage.location).toEqual(undefined);
    expect(window.localStorage.dark).toEqual(undefined);
    expect(window.localStorage.auto).toEqual(undefined);
  });
});
