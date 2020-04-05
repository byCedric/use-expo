import { useCallback, useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

/**
 * Get or track the screen orientation of the device.
 * It returns one of the `Orientation` enums, which represents the current orientation.
 * For iOS, it also returns both the horizontal and vertical size classes.
 *
 * @see https://docs.expo.io/versions/latest/sdk/screen-orientation/
 * @example const [orientation, getOrientation] = useScreenOrientation(...);
 */
export function useScreenOrientation(
	options: ScreenOrientationOptions = {},
): [
	ScreenOrientation.ScreenOrientationInfo | undefined,
	() => Promise<ScreenOrientation.Orientation>,
] {
	const [orientation, setOrientation] = useState<ScreenOrientation.ScreenOrientationInfo>();
	const {
		get = true,
		listen = true,
	} = options;

	const getOrientation = useCallback(() => (
		ScreenOrientation.getOrientationAsync().then(orientation => {
			setOrientation({ orientation });
			return orientation;
		})
	), []);

	useEffect(() => {
		if (get) {
			getOrientation();
		}

		if (listen) {
			const subscription = ScreenOrientation.addOrientationChangeListener(
				event => setOrientation(event.orientationInfo),
			);

			return subscription.remove;
		}
	}, [get, listen, getOrientation]);

	return [orientation, getOrientation];
}

export interface ScreenOrientationOptions {
	/** If it should fetch the screen orientation when mounted, defaults to `true` */
	get?: boolean;
	/** If it should listen to screen orientation changes, defaults to `true` */
	listen?: boolean;
}
