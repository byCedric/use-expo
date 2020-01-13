import { useEffect, useState } from 'react';
import {
	BrightnessMode,
	getSystemBrightnessModeAsync,
	setSystemBrightnessModeAsync,
} from 'expo-brightness';

export function useSystemBrightnessMode(
	options: SystemBrightnessModeOptions = {}
): UseSystemBrightnessModeSignature {
	const [data, setData] = useState<BrightnessMode>();
	const { get = true } = options;

	function getSystemBrightnessMode() {
		return getSystemBrightnessModeAsync().then(setData);
	}

	function setSystemBrightnessMode(mode: BrightnessMode) {
		return setSystemBrightnessModeAsync(mode).then(() => setData(mode));
	}

	useEffect(() => {
		if (get) {
			getSystemBrightnessMode();
		}
	}, [get]);

	return [data, setSystemBrightnessMode, getSystemBrightnessMode];
}

type UseSystemBrightnessModeSignature = [
	BrightnessMode | undefined,
	(brightness: BrightnessMode) => Promise<void>,
	() => Promise<void>,
];

export interface SystemBrightnessModeOptions {
	/** If it should fetch the brightness mode when mounted, defaults to `true` */
	get?: boolean;
}
