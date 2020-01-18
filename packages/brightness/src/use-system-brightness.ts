import { useCallback, useEffect, useState } from 'react';
import { getSystemBrightnessAsync, setSystemBrightnessAsync } from 'expo-brightness';

/**
 * Track, set, or get the (global) system brightness of the device.
 * It returns a number between `0..1`, which represents the brightness of the screen.
 *
 * Changing this will modify the (global) system brightness.
 * When the user exits the app, the brightness doesn't change.
 *
 * @see https://docs.expo.io/versions/latest/sdk/brightness/#brightnessgetsystembrightnessasync
 * @remarks The set callback requires the `SYSTEM_BRIGHTNESS` permission.
 * @remarks This changes the system brightness, and will remain when exiting the app.
 * @example const [brightness, setBrightness, getBrightness] = useSystemBrightness(...);
 */
export function useSystemBrightness(
	options: SystemBrightnessOptions = {}
): [
	number | undefined,
	(brightness: number) => Promise<void>,
	() => Promise<void>,
] {
	const [data, setData] = useState<number>();
	const { get = true } = options;

	const setSystemBrightness = useCallback((brightness: number) => (
		setSystemBrightnessAsync(brightness).then(() => setData(brightness))
	), [setData]);

	const getSystemBrightness = useCallback(() => (
		getSystemBrightnessAsync().then(setData)
	), [setData]);

	useEffect(() => {
		if (get) {
			getSystemBrightness();
		}
	}, [get, getSystemBrightness]);

	return [data, setSystemBrightness, getSystemBrightness];
}

export interface SystemBrightnessOptions {
	/** If it should fetch the system brightness when mounted, defaults to `true` */
	get?: boolean;
}
