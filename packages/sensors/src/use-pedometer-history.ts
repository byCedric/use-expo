import { useEffect, useState } from 'react';
import { Pedometer } from 'expo-sensors';
import { PedometerMeasurement, PedometerOptions } from './use-pedometer';

export function usePedometerHistory(
	start: Date,
	end: Date,
	options: PedometerOptions = {},
): UsePedometerHistorySignature {
	const [data, setData] = useState(options.initial);
	const [available, setAvailable] = useState<boolean>();
	const { availability = true } = options;

	useEffect(() => {
		if (availability) {
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
