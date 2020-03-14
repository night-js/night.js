import Night from '../src';

describe('core functions', () => {
  beforeEach(() => {
    window.localStorage.auto = null;
    window.localStorage.dark = null;
    window.localStorage.location = null;
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

  test('set geolocation values', async () => {
    const night = new Night();

    let latitude;
    let longitude;

    await navigator.geolocation.getCurrentPosition(position => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });

    night.smartSwitch(true);

    expect(window.localStorage.location).toEqual(
      JSON.stringify([latitude, longitude])
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

  test('reset localStorage', async () => {
    let latitude;
    let longitude;

    await navigator.geolocation.getCurrentPosition(position => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });

    window.localStorage.location = JSON.stringify([latitude, longitude]);
    window.localStorage.dark = 'false';
    window.localStorage.auto = 'true';

    const night = new Night();

    night.reset();

    expect(window.localStorage.location).toEqual(undefined);
    expect(window.localStorage.dark).toEqual(undefined);
    expect(window.localStorage.auto).toEqual(undefined);
  });
});
