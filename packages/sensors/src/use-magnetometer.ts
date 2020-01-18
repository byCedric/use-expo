import { useEffect, useState } from 'react';
import { Magnetometer, ThreeAxisMeasurement } from 'expo-sensors';

/**
 * Track the (calibrated) magnetometer sensor data from the device.
 * It returns a `ThreeAxisMeasurement`, with x, y, and z properties.
 * Optionally, you can provide the update interval (in ms).
 *
 * @see https://docs.expo.io/versions/latest/sdk/magnetometer/
 * @remarks Changing the update interval will affect all magnetometer listeners.
 * @example const [data, isAvailable] = useMagnetometer(...);
 */
export function useMagnetometer(
	options: MagnetometerOptions = {}
): [
	ThreeAxisMeasurement | undefined,
	boolean | undefined,
] {
	const [data, setData] = useState(options.initial);
	const [available, setAvailable] = useState<boolean>();
	const {
		availability = true,
		interval,
	} = options;

	useEffect(() => {
		if (availability) {
			Magnetometer.isAvailableAsync().then(setAvailable);
		}

		if (interval !== undefined) {
			Magnetometer.setUpdateInterval(interval);
		}

		return Magnetometer.addListener(setData).remove;
	}, [availability, interval]);

	return [data, available];
}

export interface MagnetometerOptions {
	/** The initial data to use before the first update. */
	initial?: ThreeAxisMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	availability?: boolean;

	/**
	 * The interval, in ms, to update the magnetometer data.
	 * Note, this is set globally through `Magnetometer.setUpdateInterval`.
	 * When used in 2 or more components, only the last rendered component's interval will be used for all.
	 */
	interval?: number;
}
