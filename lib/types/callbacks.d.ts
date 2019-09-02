export declare type Callbacks = {
    readonly onAccess?: () => void;
    readonly onAccessDenied?: () => void;
    readonly onBrightness?: () => void;
    readonly onBrightnessNotSupported?: () => void;
    readonly onColorScheme?: () => void;
    readonly onColorSchemeNotSupported?: () => void;
    readonly onDark?: () => void;
    readonly onDenied?: () => void;
    readonly onDestroy?: () => void;
    readonly onInit?: () => void;
    readonly onLight?: () => void;
    readonly onReset?: () => void;
    readonly onSmartSwitch?: () => void;
    readonly onSoundPlay?: () => void;
    readonly onSoundPause?: () => void;
    readonly onStorageClear?: () => void;
    readonly onToggle?: () => void;
};