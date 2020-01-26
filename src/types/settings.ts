export type Settings = {
  readonly auto?: boolean;
  readonly brightness?: boolean;
  readonly brightnessHighClass?: string;
  readonly brightnessLowClass?: string;
  readonly checkBreakpoint?: boolean;
  readonly darkClass?: string;
  readonly lightClass?: string;
  readonly mode?: string;
  readonly permissionDelay?: number;
  readonly storage?: boolean;
  readonly storageClear?: boolean;
  readonly soundUrl?: string;
  readonly soundTimeout?: number;
  readonly sunriseTime?: Date | null;
  readonly sunsetTime?: Date | null;
};
