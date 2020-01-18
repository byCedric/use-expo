import { useEffect, useState } from 'react';
import { Accelerometer, ThreeAxisMeasurement } from 'expo-sensors';

/**
 * Track the accelerometer sensor data from the device.
 * It returns a `ThreeAxisMeasurement`, with x, y, and z properties.
 * Optionally, you can provide the update interval (in ms).
 *
 * @see https://docs.expo.io/versions/latest/sdk/accelerometer/
 * @remarks Changing the update interval will affect all accelerometer listeners.
 * @example const [data, isAvailable] = useAccelerometer(...);
 */
export function useAccelerometer(options: AccelerometerOptions = {}): UseAccelerometerSignature {
	const [data, setData] = useState(options.initial);
	const [available, setAvailable] = useState<boolean>();
	const {
		availability = true,
		interval,
	} = options;

	useEffect(() => {
		if (availability) {
			Accelerometer.isAvailableAsync().then(setAvailable);
		}

		if (interval !== undefined) {
			Accelerometer.setUpdateInterval(interval);
		}

		return Accelerometer.addListener(setData).remove;
	}, [available, availability, interval]);

	return [data, available];
}

type UseAccelerometerSignature = [
	ThreeAxisMeasurement | undefined,
	boolean | undefined,
];

export interface AccelerometerOptions {
	/** The initial data to use before the first update. */
	initial?: ThreeAxisMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	availability?: boolean;
	/**
	 * The interval, in ms, to update the accelerometer data.
	 * Note, this is set globally through `Accelerometer.setUpdateInterval`.
	 * When used in 2 or more components, only the last rendered component's interval will be used for all.
	 */
	interval?: number;
}
