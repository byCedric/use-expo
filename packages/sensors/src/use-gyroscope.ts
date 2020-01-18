import { useEffect, useState } from 'react';
import { Gyroscope, ThreeAxisMeasurement } from 'expo-sensors';

/**
 * Track the gyroscope sensor data from the device.
 * It returns a `ThreeAxisMeasurement`, with x, y, and z properties.
 * Optionally, you can provide the update interval (in ms).
 *
 * @see https://docs.expo.io/versions/latest/sdk/gyroscope/
 * @remarks Changing the update interval will affect all gyroscope listeners.
 * @example const [data, isAvailable] = useGyroscope(...);
 */
export function useGyroscope(options: GyroscopeOptions = {}): UseGyroscopeSignature {
	const [data, setData] = useState(options.initial);
	const [available, setAvailable] = useState<boolean>();
	const {
		availability = true,
		interval,
	} = options;

	useEffect(() => {
		if (availability) {
			Gyroscope.isAvailableAsync().then(setAvailable);
		}

		if (interval !== undefined) {
			Gyroscope.setUpdateInterval(interval);
		}

		return Gyroscope.addListener(setData).remove;
	}, [availability, interval]);

	return [data, available];
}

type UseGyroscopeSignature = [
	ThreeAxisMeasurement | undefined,
	boolean | undefined,
];

export interface GyroscopeOptions {
	/** The initial data to use before the first update. */
	initial?: ThreeAxisMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	availability?: boolean;
	/**
	 * The interval, in ms, to update the gyroscope data.
	 * Note, this is set globally through `Gyroscope.setUpdateInterval`.
	 * When used in 2 or more components, only the last rendered component's interval will be used for all.
	 */
	interval?: number;
}
