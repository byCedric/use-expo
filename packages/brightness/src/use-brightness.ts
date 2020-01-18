import { useCallback, useEffect, useState } from 'react';
import { getBrightnessAsync, setBrightnessAsync } from 'expo-brightness';

/**
 * Track, set, or get the brightness of the device for the current app.
 * It returns a number between `0..1`, which represents the brightness of the screen.
 *
 * @see https://docs.expo.io/versions/latest/sdk/brightness/#brightnessgetbrightnessasync
 * @remarks This does not change the system brightness, and will revert when exiting the app.
 * @example const [brightness, setBrightness, getBrightness] = useBrightness(...);
 */
export function useBrightness(
	options: BrightnessOptions = {},
): [
	number | undefined,
	(brightness: number) => Promise<void>,
	() => Promise<void>,
] {
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

export interface BrightnessOptions {
	/** If it should fetch the brightness when mounted, defaults to `true` */
	get?: boolean;
}
