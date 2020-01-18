import { useEffect, useState } from 'react';
import { Pedometer } from 'expo-sensors';

/**
 * Track the current step count from the device.
 * It returns an object with a `steps` number.
 *
 * @see https://docs.expo.io/versions/latest/sdk/pedometer/
 * @example const [data, isAvailable] = usePedometer(...);
 */
export function usePedometer(options: PedometerOptions = {}): UsePedometerSignature {
	const [data, setData] = useState(options.initial);
	const [available, setAvailable] = useState<boolean>();
	const { availability = true } = options;

	useEffect(() => {
		if (availability) {
			Pedometer.isAvailableAsync().then(setAvailable);
		}

		return Pedometer.watchStepCount(setData).remove;
	}, [availability]);

	return [data, available];
}

type UsePedometerSignature = [
	PedometerResult | undefined,
	boolean | undefined,
];

// note: this isn't exported from expo, so we need to duplicate it
export interface PedometerResult {
	/** The amount of steps made */
	steps: number;
}

export interface PedometerOptions {
	/** The initial data to use before the first update. */
	initial?: PedometerResult;
	/** If it should check the availability of the sensor, defaults to `true`. */
	availability?: boolean;
}
