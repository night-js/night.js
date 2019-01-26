import Night from '../src/night';

global.window = {};

describe('Initialize library', () => {
  const setStore = () => (window.localStorage = global.localStorage);

  const night = new Night();

  beforeAll(() => setStore());
  afterEach(() => setStore());

  const location = {
    coords: {
      latitude: 20.0,
      longitude: 40.0
    }
  };

  test('set midnight time', () => {
    const midnight = new Date().setHours(24, 0, 0, 0);

    night.time();

    expect(window.localStorage.time).toEqual(JSON.stringify(midnight));
  });

  test('set auto switch', () => {
    night.auto();

    expect(window.localStorage.auto).toEqual('true');
  });

  test('set auto switch without location', () => {
    night.auto(true);

    expect(window.localStorage.auto).toEqual('true');
  });

  test('set geolocation values', () => {
    night.success(location);

    expect(window.localStorage.location).toEqual(
      JSON.stringify(location.coords)
    );
  });

  test('check my location with localStorage', () => {
    window.localStorage.location = JSON.stringify(location.coords);

    night.myLocation();
  });

  test('reset localStorage', () => {
    window.localStorage.location = JSON.stringify(location.coords);
    window.localStorage.dark = 'false';
    window.localStorage.auto = 'true';

    night.reset();

    expect(window.localStorage.location).toEqual(undefined);
    expect(window.localStorage.dark).toEqual(undefined);
    expect(window.localStorage.auto).toEqual(undefined);
  });

  test('set lightClass name', () => {
    night.settings.lightClass = 'lightClass';

    night.light();

    expect(document.body.classList.contains('lightClass')).toEqual(true);
  });

  test('set darkClass name', () => {
    night.settings.darkClass = 'darkClass';

    night.dark();

    expect(document.body.classList.contains('darkClass')).toEqual(true);
  });

  test('call onAuto method', () => {
    let test = false;

    night.methods.onAuto = () => (test = true);

    night.auto();

    expect(test).toEqual(true);
  });

  test('call onLight method', () => {
    let test = false;

    night.methods.onLight = () => (test = true);

    night.light();

    expect(test).toEqual(true);
  });

  test('call onDark method', () => {
    let test = false;

    night.methods.onDark = () => (test = true);

    night.dark();

    expect(test).toEqual(true);
  });

  test('call onToggle method', () => {
    let test = false;

    night.methods.onToggle = () => (test = true);

    night.toggle();

    expect(test).toEqual(true);
  });

  test('call onDenied method', () => {
    let test = false;

    night.methods.onDenied = () => (test = true);

    night.error();

    expect(test).toEqual(true);
  });

  test('call onStorageClear method', () => {
    const setTime = new Date().getHours() - 1;

    window.localStorage.location = JSON.stringify(location.coords);
    window.localStorage.time = new Date().setHours(setTime, 0, 0, 0);

    let test = false;

    night.methods.onStorageClear = () => (test = true);

    night.time(new Date());

    expect(test).toEqual(true);

    window.localStorage.time = null;
  });

  test('call onReset method', () => {
    let test = false;

    night.methods.onReset = () => (test = true);

    night.reset();

    expect(test).toEqual(true);

    window.localStorage.auto = null;
  });
});
