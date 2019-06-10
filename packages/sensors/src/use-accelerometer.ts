import { useEffect, useState } from 'react';
import { Accelerometer, ThreeAxisMeasurement } from 'expo-sensors';

export function useAccelerometer(options: AccelerometerOptions = {}): UseAccelerometerSignature {
	const [data, setData] = useState(options.initialData);
	const [available, setAvailable] = useState<boolean>();
	const { getAvailability = true } = options;

	useEffect(() => {
		if (getAvailability) {
			Accelerometer.isAvailableAsync().then(setAvailable);
		}

		if (options.updateInterval !== undefined) {
			Accelerometer.setUpdateInterval(options.updateInterval);
		}

		return Accelerometer.addListener(setData).remove;
	}, []);

	return [data, available];
}

type UseAccelerometerSignature = [
	ThreeAxisMeasurement | undefined,
	boolean | undefined,
];

export interface AccelerometerOptions {
	/** The initial data to use before the first update. */
	initialData?: ThreeAxisMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	getAvailability?: boolean;
	/**
	 * The interval, in ms, to update the accelerometer data.
	 * Note, this is set globally through `Accelerometer.setUpdateInterval`.
	 */
	updateInterval?: number;
}
