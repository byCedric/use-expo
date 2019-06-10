import { useEffect, useState } from 'react';
import { Pedometer } from 'expo-sensors';

export function usePedometer(options: PedometerOptions = {}): UsePedometerSignature {
	const [data, setData] = useState(options.initialData);
	const [available, setAvailable] = useState<boolean>();
	const { getAvailability = true } = options;

	useEffect(() => {
		if (getAvailability) {
			Pedometer.isAvailableAsync().then(setAvailable);
		}

		return Pedometer.watchStepCount(setData).remove;
	}, []);

	return [data, available];
}

type UsePedometerSignature = [
	PedometerMeasurement | undefined,
	boolean | undefined,
];

export interface PedometerMeasurement {
	/** The amount of steps made */
	steps: number;
}

export interface PedometerOptions {
	/** The initial data to use before the first update. */
	initialData?: PedometerMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	getAvailability?: boolean;
}
