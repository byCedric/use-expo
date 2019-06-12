import { useEffect, useState } from 'react';
import {
	getBrightnessAsync,
	setBrightnessAsync,
} from 'expo-brightness';

export function useBrightness(options: BrightnessOptions = {}): UseBrightnessSignature {
	const [data, setData] = useState<number>();
	const { get = true } = options;

	function getBrightness() {
		return getBrightnessAsync().then(setData);
	}

	function setBrightness(brightness: number) {
		return setBrightnessAsync(brightness).then(() => setData(brightness));
	}

	useEffect(() => {
		if (get) getBrightness();
	}, []);

	return [data, setBrightness, getBrightness];
}

type UseBrightnessSignature = [
	number | undefined,
	(brightness: number) => Promise<void>,
	() => Promise<void>,
];

export interface BrightnessOptions {
	/** If it should fetch the brightness when mounted, defaults to `true` */
	get?: boolean;
}
