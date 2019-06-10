import { useEffect, useState } from 'react';
import { MagnetometerUncalibrated, ThreeAxisMeasurement } from 'expo-sensors';

export function useMagnetometerUncalibrated(
	options: MagnetometerUncalibratedOptions = {}
): UseMagnetometerUncalibratedSignature {
	const [data, setData] = useState(options.initialData);
	const [available, setAvailable] = useState<boolean>();
	const { getAvailability = true } = options;

	useEffect(() => {
		if (getAvailability) {
			MagnetometerUncalibrated.isAvailableAsync().then(setAvailable);
		}

		if (options.updateInterval !== undefined) {
			MagnetometerUncalibrated.setUpdateInterval(options.updateInterval);
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
	initialData?: ThreeAxisMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	getAvailability?: boolean;
	/**
	 * The interval, in ms, to update the uncalibrated magnetometer data.
	 * Note, this is set globally through `MagnetometerUncalibrated.setUpdateInterval`.
	 */
	updateInterval?: number;
}
