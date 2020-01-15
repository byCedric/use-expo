import { useEffect, useState, useCallback } from 'react';
import {
	getSystemBrightnessAsync,
	setSystemBrightnessAsync,
} from 'expo-brightness';

/**
 * Track, set or get the (global) system brightness of the device.
 * It returns a number between `0..1`, which represents the brightness of the screen.
 *
 * Changing this will modify the (global) system brightness.
 * When the user exists the app, the brightness doesn't change.
 *
 * @remarks The set callback requires the `SYSTEM_BRIGHTNESS` permission.
 * @see https://docs.expo.io/versions/latest/sdk/brightness/#brightnessgetsystembrightnessasync
 */
export function useSystemBrightness(options: SystemBrightnessOptions = {}): UseSystemBrightnessSignature {
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

type UseSystemBrightnessSignature = [
	number | undefined,
	(brightness: number) => Promise<void>,
	() => Promise<void>,
];

export interface SystemBrightnessOptions {
	/** If it should fetch the system brightness when mounted, defaults to `true` */
	get?: boolean;
}
