import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation'

/**
 * Get or lock the screen orientation on multiple platforms.
 * This hook will always fetch the current platform lock.
 * It will also apply the platform lock when this is provided.
 *
 * @see https://docs.expo.io/versions/latest/sdk/screen-orientation/
 * @example const [lockInfo, lockError] = useScreenOrientationPlatformLock(...);
 */
export function useScreenOrientationPlatformLock(
	platformInfo?: ScreenOrientation.PlatformOrientationInfo,
): [
	ScreenOrientation.PlatformOrientationInfo | undefined,
	Error | undefined,
] {
	const [platformLock, setPlatformLock] = useState<ScreenOrientation.PlatformOrientationInfo>();
	const [platformLockError, setPlatformLockError] = useState<Error>();

	useEffect(() => {
		ScreenOrientation.getPlatformOrientationLockAsync().then(setPlatformLock);

		if (platformInfo) {
			ScreenOrientation
				.lockPlatformAsync(platformInfo)
				.then(() => setPlatformLock(platformInfo))
				.catch(setPlatformLockError);

			return () => {
				ScreenOrientation.unlockAsync();
			};
		}
	}, [platformInfo]);

	return [platformLock, platformLockError];
}
