import { useEffect, useState } from 'react';
import { Gyroscope, ThreeAxisMeasurement } from 'expo-sensors';

export function useGyroscope(options: GyroscopeOptions = {}): UseGyroscopeSignature {
	const [data, setData] = useState(options.initialData);
	const [available, setAvailable] = useState<boolean>();
	const { getAvailability = true } = options;

	useEffect(() => {
		if (getAvailability) {
			Gyroscope.isAvailableAsync().then(setAvailable);
		}

		if (options.updateInterval !== undefined) {
			Gyroscope.setUpdateInterval(options.updateInterval);
		}

		return Gyroscope.addListener(setData).remove;
	}, []);

	return [data, available];
}

type UseGyroscopeSignature = [
	ThreeAxisMeasurement | undefined,
	boolean | undefined,
];

export interface GyroscopeOptions {
	/** The initial data to use before the first update. */
	initialData?: ThreeAxisMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	getAvailability?: boolean;
	/**
	 * The interval, in ms, to update the gyroscope data.
	 * Note, this is set globally through `Gyroscope.setUpdateInterval`.
	 */
	updateInterval?: number;
}
