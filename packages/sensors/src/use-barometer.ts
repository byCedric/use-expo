import { useEffect, useState } from 'react';
import { Barometer, BarometerMeasurement } from 'expo-sensors';

/**
 * Track the barometer sensor data from the device.
 * It returns the `BarometerMeasurement`, with the pressure and relative altitude (if possible).
 * Optionally, you can provide the update interval (in ms).
 *
 * @see https://docs.expo.io/versions/latest/sdk/barometer/
 * @remarks Changing the update interval will affect all barometer listeners.
 * @example const [data, isAvailable] = useBarometer(...);
 */
export function useBarometer(options: BarometerOptions = {}): UseBarometerSignature {
	const [data, setData] = useState(options.initial);
	const [available, setAvailable] = useState<boolean>();
	const {
		availability = true,
		interval,
	} = options;

	useEffect(() => {
		if (availability) {
			Barometer.isAvailableAsync().then(setAvailable);
		}

		if (interval !== undefined) {
			Barometer.setUpdateInterval(interval);
		}

		return Barometer.addListener(setData).remove;
	}, [availability, interval]);

	return [data, available];
}

type UseBarometerSignature = [
	BarometerMeasurement | undefined,
	boolean | undefined,
];

export interface BarometerOptions {
	/** The initial data to use before the first update. */
	initial?: BarometerMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	availability?: boolean;
	/**
	 * The interval, in ms, to update the barometer data.
	 * Note, this is set globally through `Barometer.setUpdateInterval`.
	 * When used in 2 or more components, only the last rendered component's interval will be used for all.
	 */
	interval?: number;
}
