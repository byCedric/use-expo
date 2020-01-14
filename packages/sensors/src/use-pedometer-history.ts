import { useEffect, useState } from 'react';
import { Pedometer } from 'expo-sensors';
import { PedometerResult, PedometerOptions } from './use-pedometer';

export function usePedometerHistory(options: PedometerHistpryOptions): UsePedometerHistorySignature {
	const [data, setData] = useState(options.initial);
	const [available, setAvailable] = useState<boolean>();
	const {
		availability = true,
		start,
		end,
	} = options;

	useEffect(() => {
		if (availability) {
			Pedometer.isAvailableAsync().then(setAvailable);
		}

		Pedometer.getStepCountAsync(start, end).then(setData);
	}, [availability, start, end]);

	return [data, available];
}

type UsePedometerHistorySignature = [
	PedometerResult | undefined,
	boolean | undefined,
];

export interface PedometerHistpryOptions extends PedometerOptions {
	/**
	 * The start of the range to fetch the step count.
	 *
	 * @see https://docs.expo.io/versions/latest/sdk/pedometer/#pedometergetstepcountasyncstart-end
	 */
	start: Date;

	/**
	 * The end of the range to fetch the step count.
	 *
	 * @see https://docs.expo.io/versions/latest/sdk/pedometer/#pedometergetstepcountasyncstart-end
	 */
	end: Date;
}
