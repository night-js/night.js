import Night from '../src/night';

describe('methods', () => {
  test('setTimes', () => {
    const night = new Night();

    const sunrise = new Date();
    sunrise.setHours(6, 0, 0, 0);

    const sunset = new Date();
    sunset.setHours(20, 0, 0, 0);

    night.setTimes(sunrise.getTime(), sunset.getTime());

    night.smartSwitch(true);

    let eventSunrise;
    let eventSunset;

    document.addEventListener('smartDark', e => {
      eventSunrise = e.sunrise;
      eventSunset = e.sunset;
    });

    expect(new Date(eventSunrise)).toEqual(sunrise);
    expect(new Date(eventSunset)).toEqual(sunset);

    night.destroy();
  });

  test('setCoords', () => {
    const night = new Night();

    const latitude = 35.652832;
    const longitude = 139.839478;

    night.setCoords(latitude, longitude);

    night.smartSwitch(true);

    let eventLatitude;
    let eventLongitude;

    document.addEventListener('smartDark', e => {
      eventLatitude = e.latitude;
      eventLongitude = e.longitude;
    });

    expect(eventLatitude).toEqual(latitude);
    expect(eventLongitude).toEqual(longitude);

    night.destroy();
  });
});
