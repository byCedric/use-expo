import { useEffect, useState } from 'react';
import { Pedometer } from 'expo-sensors';
import { PedometerMeasurement, PedometerOptions } from './use-pedometer';

export function usePedometerHistory(
	start: Date,
	end: Date,
	options: PedometerOptions = {},
): UsePedometerHistorySignature {
	const [data, setData] = useState(options.initialData);
	const [available, setAvailable] = useState<boolean>();
	const { getAvailability = true } = options;

	useEffect(() => {
		if (getAvailability) {
			Pedometer.isAvailableAsync().then(setAvailable);
		}

		Pedometer.getStepCountAsync(start, end).then(setData);
	}, []);

	return [data, available];
}

type UsePedometerHistorySignature = [
	PedometerMeasurement | undefined,
	boolean | undefined,
];
