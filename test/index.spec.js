import localStorage from 'mock-local-storage';
import { assert } from 'chai';
import Night from '../lib/night';

global.window = {};
window.localStorage = global.localStorage;

describe('Initialize library', () => {
  let night;

  before(() => (night = new Night()));

  const location = {
    coords: {
      latitude: 20.0,
      longitude: 40.0
    }
  };

  it('should set midnight time', () => {
    window.localStorage.time = null;

    const midnight = new Date().setHours(24, 0, 0, 0);

    night.time();
    assert.equal(window.localStorage.time, JSON.stringify(midnight));
  });

  it('should set auto switch', () => {
    window.localStorage.auto = null;

    night.auto();
    assert.equal(window.localStorage.auto, 'true');
  });

  it('should set auto switch without location', () => {
    window.localStorage.location = null;

    night.auto(true);
    assert.equal(window.localStorage.auto, 'true');
  });

  it('should init auto switch', () => {
    window.localStorage.auto = null;

    night.auto(true);
    assert.equal(window.localStorage.auto, 'true');
  });

  it('should set geolocation values', () => {
    window.localStorage.location = null;

    night.success(location);
    assert.equal(window.localStorage.location, JSON.stringify(location.coords));
  });

  it('should reset localStorage', () => {
    window.localStorage.location = JSON.stringify(location.coords);
    window.localStorage.dark = 'false';
    window.localStorage.auto = 'true';

    night.reset();

    assert.equal(window.localStorage.location, null);
    assert.equal(window.localStorage.dark, null);
    assert.equal(window.localStorage.auto, null);
  });
});
