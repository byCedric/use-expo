import { useEffect, useState } from 'react';
import { ScreenOrientation } from 'expo';

export function useScreenOrientation(
	options: ScreenOrientationOptions = {},
): UseScreenOrientationSignature {
	const [orientation, setOrientation] = useState<ScreenOrientation.Orientation>();
	const [sizeClass, setSizeClass] = useState<ScreenOrientationSizeClass>();
	const { get = true } = options;

	function setInfo(info: ScreenOrientation.OrientationInfo) {
		setOrientation(info.orientation);

		if (info.horizontalSizeClass && info.verticalSizeClass) {
			setSizeClass({
				horizontal: info.horizontalSizeClass,
				vertical: info.verticalSizeClass,
			});
		}
	}

	useEffect(() => {
		if (get) {
			ScreenOrientation.getOrientationAsync().then(setInfo);
		}

		const subscription = ScreenOrientation.addOrientationChangeListener(
			event => setInfo(event.orientationInfo)
		);

		return subscription.remove;
	}, []);

	return [orientation, sizeClass];
}

type UseScreenOrientationSignature = [
	ScreenOrientation.Orientation | undefined,
	ScreenOrientationSizeClass | undefined,
];

export interface ScreenOrientationOptions {
	/** If it should fetch the screen orientation when mounted, defaults to `true` */
	get?: boolean;
}

/** Both the horizontal and vertical size class, only available on iOS */
export interface ScreenOrientationSizeClass {
	horizontal: ScreenOrientation.SizeClassIOS;
	vertical: ScreenOrientation.SizeClassIOS;
}
