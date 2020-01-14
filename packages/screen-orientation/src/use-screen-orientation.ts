import { useEffect, useState, useCallback } from 'react';
import { ScreenOrientation } from 'expo';

export function useScreenOrientation(
	options: ScreenOrientationOptions = {},
): UseScreenOrientationSignature {
	const [orientation, setOrientation] = useState<ScreenOrientation.Orientation>();
	const [sizeClass, setSizeClass] = useState<ScreenOrientationSizeClass>();
	const {
		get = true,
		listen = true,
	} = options;

	const setInfo = useCallback((info: ScreenOrientation.OrientationInfo) => {
		setOrientation(info.orientation);

		if (info.horizontalSizeClass && info.verticalSizeClass) {
			setSizeClass({
				horizontal: info.horizontalSizeClass,
				vertical: info.verticalSizeClass,
			});
		}
	}, []);

	const getScreenOrientation = useCallback(
		() => ScreenOrientation.getOrientationAsync().then(setInfo),
		[setInfo],
	);

	useEffect(() => {
		if (get) {
			getScreenOrientation();
		}

		if (listen) {
			const subscription = ScreenOrientation.addOrientationChangeListener(
				event => setInfo(event.orientationInfo)
			);

			return subscription.remove;
		}
	}, [get, getScreenOrientation, listen, setInfo]);

	return [orientation, sizeClass, getScreenOrientation];
}

type UseScreenOrientationSignature = [
	ScreenOrientation.Orientation | undefined,
	ScreenOrientationSizeClass | undefined,
	() => Promise<void>,
];

export interface ScreenOrientationOptions {
	/** If it should fetch the screen orientation when mounted, defaults to `true` */
	get?: boolean;
	/** If it should listen to screen orientation changes, defaults to `true` */
	listen?: boolean;
}

/** Both the horizontal and vertical size class, only available on iOS */
export interface ScreenOrientationSizeClass {
	horizontal: ScreenOrientation.SizeClassIOS;
	vertical: ScreenOrientation.SizeClassIOS;
}
