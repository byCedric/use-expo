import { useEffect } from 'react';
import { ScreenOrientation } from 'expo';

export function useScreenOrientationLock(orientation: ScreenOrientation.OrientationLock): void {
	useEffect(() => {
		ScreenOrientation.lockAsync(orientation);
		return () => ScreenOrientation.unlockAsync();
	}, [orientation]);
}
