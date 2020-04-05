import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

/**
 * Get or lock the screen orientation of the device.
 * This hook will always fetch the current device lock.
 * It will also apply the device lock when this is provided.
 *
 * @see https://docs.expo.io/versions/latest/sdk/screen-orientation/
 * @example const [lockInfo, lockError] = useScreenOrientationLock(...);
 */
export function useScreenOrientationLock(
	lock?: ScreenOrientation.OrientationLock,
): [
	ScreenOrientation.OrientationLock | undefined,
	Error | undefined,
] {
	const [lockInfo, setLockInfo] = useState<ScreenOrientation.OrientationLock>();
	const [lockError, setLockError] = useState<Error>();

	useEffect(() => {
		ScreenOrientation.getOrientationLockAsync().then(setLockInfo);

		if (lock) {
			ScreenOrientation
				.lockAsync(lock)
				.then(() => setLockInfo(lock))
				.catch(setLockError);

			return () => {
				ScreenOrientation.unlockAsync();
			};
		}
	}, [lock]);

	return [lockInfo, lockError];
}

