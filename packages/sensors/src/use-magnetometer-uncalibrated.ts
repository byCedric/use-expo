import { useEffect, useState } from 'react';
import { MagnetometerUncalibrated, ThreeAxisMeasurement } from 'expo-sensors';

/**
 * Track the (uncalibrated) magnetometer sensor data from the device.
 * It returns a `ThreeAxisMeasurement`, with x, y, and z properties.
 * Optionally, you can provide the update interval (in ms).
 *
 * @see https://docs.expo.io/versions/latest/sdk/magnetometer/
 * @remarks Changing the update interval will affect all uncalibrated magnetometer listeners.
 * @example const [data, isAvailable] = useMagnetometerUncalibrated(...);
 */
export function useMagnetometerUncalibrated(
	options: MagnetometerUncalibratedOptions = {}
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
			MagnetometerUncalibrated.isAvailableAsync().then(setAvailable);
		}

		if (interval !== undefined) {
			MagnetometerUncalibrated.setUpdateInterval(interval);
		}

		return MagnetometerUncalibrated.addListener(setData).remove;
	}, [availability, interval]);

	return [data, available];
}

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
