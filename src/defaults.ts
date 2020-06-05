import type { Settings } from './types';

export const defaultSettings: Settings = {
  auto: true,
  brightness: false,
  brightnessHighClass: 'high-brightness',
  brightnessLowClass: 'low-brightness',
  checkBreakpoint: true,
  darkClass: 'dark',
  lightClass: '',
  mode: 'smart',
  permissionDelay: 0,
  soundTimeout: 1000,
  soundUrl: '',
  storage: true,
  storageClear: true,
  sunriseTime: null,
  sunsetTime: null,
};
