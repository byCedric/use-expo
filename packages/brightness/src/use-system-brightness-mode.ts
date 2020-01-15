import { useEffect, useState, useCallback } from 'react';
import {
	BrightnessMode,
	getSystemBrightnessModeAsync,
	setSystemBrightnessModeAsync,
} from 'expo-brightness';

/**
 * Track, set or get the (global) system brightness mode of the device.
 * It returns the `BrightnessMode` enum with one of the following values:
 *   - 0 `UNKNOWN` current brightness mode cannot be determined
 *   - 1 `AUTOMATIC` device OS will automatically adjust the screen brightness depending on the ambient light
 *   - 2 `MANUAL` screen brightness will remain constant and will not be adjusted by the OS
 *
 * @remarks The set callback requires the `SYSTEM_BRIGHTNESS` permission.
 * @see https://docs.expo.io/versions/latest/sdk/brightness/#brightnessgetsystembrightnessmodeasync
 */
export function useSystemBrightnessMode(
	options: SystemBrightnessModeOptions = {}
): UseSystemBrightnessModeSignature {
	const [data, setData] = useState<BrightnessMode>();
	const { get = true } = options;

	const setSystemBrightnessMode = useCallback((mode: BrightnessMode) => (
		setSystemBrightnessModeAsync(mode).then(() => setData(mode))
	), []);

	const getSystemBrightnessMode = useCallback(() => (
		getSystemBrightnessModeAsync().then(setData)
	), [setData]);

	useEffect(() => {
		if (get) {
			getSystemBrightnessMode();
		}
	}, [get, getSystemBrightnessMode]);

	return [data, setSystemBrightnessMode, getSystemBrightnessMode];
}

type UseSystemBrightnessModeSignature = [
	BrightnessMode | undefined,
	(brightness: BrightnessMode) => Promise<void>,
	() => Promise<void>,
];

export interface SystemBrightnessModeOptions {
	/** If it should fetch the brightness mode when mounted, defaults to `true` */
	get?: boolean;
}
