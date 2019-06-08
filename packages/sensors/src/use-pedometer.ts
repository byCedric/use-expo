import { useEffect, useState } from 'react';
import { Pedometer } from 'expo-sensors';

export function usePedometer(options: PedometerOptions = {}) {
	const [data, setData] = useState(options.initialData);

	useEffect(() => Pedometer.watchStepCount(setData).remove, []);

	return data;
}

export interface PedometerMeasurement {
	/** The amount of steps made */
	steps: number;
}

export interface PedometerOptions {
	/** The initial data to use before the first update. */
	initialData?: PedometerMeasurement;
}
