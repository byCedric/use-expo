import { useEffect } from 'react';
import { ScreenOrientation } from 'expo';

/**
 * Lock the screen orientation of the device to a lock mode.
 * It accepts any value from the `OrientationLock` enum and unlocks the screen when unmounted.
 * This hook is similar to the `useKeepAwake` hook and does not return anything.
 *
 * @see https://docs.expo.io/versions/latest/sdk/screen-orientation/
 * @example
 * useScreenOrientationLock(...);
 */
export function useScreenOrientationLock(orientation: ScreenOrientation.OrientationLock): void {
	useEffect(() => {
		ScreenOrientation.lockAsync(orientation);
		return () => {
			ScreenOrientation.unlockAsync();
		};
	}, [orientation]);
}
