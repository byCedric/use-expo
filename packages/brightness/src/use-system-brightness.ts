import { useEffect, useState } from 'react';
import {
	getSystemBrightnessAsync,
	setSystemBrightnessAsync,
} from 'expo-brightness';

export function useSystemBrightness(options: SystemBrightnessOptions = {}): UseSystemBrightnessSignature {
	const [data, setData] = useState<number>();
	const { get = true } = options;

	function getSystemBrightness() {
		return getSystemBrightnessAsync().then(setData);
	}

	function setSystemBrightness(brightness: number) {
		return setSystemBrightnessAsync(brightness).then(() => setData(brightness));
	}

	useEffect(() => {
		if (get) getSystemBrightness();
	}, []);

	return [data, setSystemBrightness, getSystemBrightness];
}

type UseSystemBrightnessSignature = [
	number | undefined,
	(brightness: number) => Promise<void>,
	() => Promise<void>,
];

export interface SystemBrightnessOptions {
	/** If it should fetch the system brightness when mounted, defaults to `true` */
	get?: boolean;
}
