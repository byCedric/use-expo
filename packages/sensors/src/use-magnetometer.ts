import { useEffect, useState } from 'react';
import { Magnetometer, ThreeAxisMeasurement } from 'expo-sensors';

export function useMagnetometer(options: MagnetometerOptions = {}): UseMagnetometerSignature {
	const [data, setData] = useState(options.initialData);
	const [available, setAvailable] = useState<boolean>();
	const { getAvailability = true } = options;

	useEffect(() => {
		if (getAvailability) {
			Magnetometer.isAvailableAsync().then(setAvailable);
		}

		if (options.updateInterval !== undefined) {
			Magnetometer.setUpdateInterval(options.updateInterval);
		}

		return Magnetometer.addListener(setData).remove;
	}, []);

	return [data, available];
}

type UseMagnetometerSignature = [
	ThreeAxisMeasurement | undefined,
	boolean | undefined,
];

export interface MagnetometerOptions {
	/** The initial data to use before the first update. */
	initialData?: ThreeAxisMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	getAvailability?: boolean;
	/**
	 * The interval, in ms, to update the magnetometer data.
	 * Note, this is set globally through `Magnetometer.setUpdateInterval`.
	 */
	updateInterval?: number;
}
