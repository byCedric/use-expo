import { useEffect, useState } from 'react';
import { MagnetometerUncalibrated, ThreeAxisMeasurement } from 'expo-sensors';

export function useMagnetometerUncalibrated(
	options: MagnetometerUncalibratedOptions = {}
): UseMagnetometerUncalibratedSignature {
	const [data, setData] = useState(options.initial);
	const [available, setAvailable] = useState<boolean>();
	const { availability = true } = options;

	useEffect(() => {
		if (availability) {
			MagnetometerUncalibrated.isAvailableAsync().then(setAvailable);
		}

		if (options.interval !== undefined) {
			MagnetometerUncalibrated.setUpdateInterval(options.interval);
		}

		return MagnetometerUncalibrated.addListener(setData).remove;
	}, []);

	return [data, available];
}

type UseMagnetometerUncalibratedSignature = [
	ThreeAxisMeasurement | undefined,
	boolean | undefined,
];

export interface MagnetometerUncalibratedOptions {
	/** The initial data to use before the first update. */
	initial?: ThreeAxisMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	availability?: boolean;
	/**
	 * The interval, in ms, to update the uncalibrated magnetometer data.
	 * Note, this is set globally through `MagnetometerUncalibrated.setUpdateInterval`.
	 * When used in 2 or more components, only the last rendered component's interval will be used for all.
	 */
	interval?: number;
}
