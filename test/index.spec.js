import localStorage from 'mock-local-storage';
import { assert } from 'chai';

import Night from '../lib/night';

global.window = {};

describe('Initialize library', () => {
  const setStore = () => (window.localStorage = global.localStorage);

  const night = new Night();

  before(() => setStore());
  afterEach(() => setStore());

  const location = {
    coords: {
      latitude: 20.0,
      longitude: 40.0
    }
  };

  it('set midnight time', () => {
    const midnight = new Date().setHours(24, 0, 0, 0);

    night.time();

    assert.equal(window.localStorage.time, JSON.stringify(midnight));
  });

  it('set auto switch', () => {
    night.auto();

    assert.equal(window.localStorage.auto, 'true');
  });

  it('set auto switch without location', () => {
    night.auto(true);
    assert.equal(window.localStorage.auto, 'true');
  });

  it('init auto switch', () => {
    night.auto(true);
    assert.equal(window.localStorage.auto, 'true');
  });

  it('set geolocation values', () => {
    night.success(location);

    assert.equal(window.localStorage.location, JSON.stringify(location.coords));
  });

  it('reset localStorage', () => {
    window.localStorage.location = JSON.stringify(location.coords);
    window.localStorage.dark = 'false';
    window.localStorage.auto = 'true';

    night.reset();

    assert.equal(window.localStorage.location, null);
    assert.equal(window.localStorage.dark, null);
    assert.equal(window.localStorage.auto, null);
  });

  it('call onAuto method', () => {
    let test = false;

    night.settings.onAuto = () => (test = true);

    night.auto();

    assert.equal(test, true);
  });

  it('call onLight method', () => {
    let test = false;

    night.settings.onLight = () => (test = true);

    night.light();

    assert.equal(test, true);
  });

  it('call onDark method', () => {
    let test = false;

    night.settings.onDark = () => (test = true);

    night.dark();

    assert.equal(test, true);
  });

  it('call onToggle method', () => {
    let test = false;

    night.settings.onToggle = () => (test = true);

    night.toggle();

    assert.equal(test, true);
  });

  it('call onDenied method', () => {
    let test = false;

    night.settings.onDenied = () => (test = true);

    night.error();

    assert.equal(test, true);
  });

  it('call onReset method', () => {
    let test = false;

    night.settings.onReset = () => (test = true);

    night.reset();

    assert.equal(test, true);

    window.localStorage.auto = null;
  });
});
