import { useEffect, useState } from 'react';
import { Pedometer } from 'expo-sensors';

export function usePedometer(options: PedometerOptions = {}): UsePedometerSignature {
	const [data, setData] = useState(options.initial);
	const [available, setAvailable] = useState<boolean>();
	const { availability = true } = options;

	useEffect(() => {
		if (availability) {
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
	initial?: PedometerMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	availability?: boolean;
}
