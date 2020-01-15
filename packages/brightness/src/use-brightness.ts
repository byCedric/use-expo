import { useEffect, useState, useCallback } from 'react';
import {
	getBrightnessAsync,
	setBrightnessAsync,
} from 'expo-brightness';

/**
 * Track, set or get the brightness of the device for the current app.
 * It returns a number between `0..1`, which represents the brightness of the screen.
 *
 * Changing this does not change the brightness of the system.
 * When the user exists the app, the brightness is reverted to the system brightness.
 *
 * @see https://docs.expo.io/versions/latest/sdk/brightness/#brightnessgetbrightnessasync
 */
export function useBrightness(options: BrightnessOptions = {}): UseBrightnessSignature {
	const [data, setData] = useState<number>();
	const { get = true } = options;

	const setBrightness = useCallback((brightness: number) => (
		setBrightnessAsync(brightness).then(() => setData(brightness))
	), [setData]);

	const getBrightness = useCallback(() => (
		getBrightnessAsync().then(setData)
	), [setData]);

	useEffect(() => {
		if (get) {
			getBrightness();
		}
	}, [get, getBrightness]);

	return [data, setBrightness, getBrightness];
}

type UseBrightnessSignature = [
	number | undefined,
	(brightness: number) => Promise<void>,
	() => Promise<void>,
];

export interface BrightnessOptions {
	/** If it should fetch the brightness when mounted, defaults to `true` */
	get?: boolean;
}
