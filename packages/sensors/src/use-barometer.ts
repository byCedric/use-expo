import { useEffect, useState } from 'react';
import { Barometer, BarometerMeasurement } from 'expo-sensors';

export function useBarometer(options: BarometerOptions = {}) {
	const [data, setData] = useState(options.initialData);

	useEffect(() => {
		const subscription = Barometer.addListener(setData);

		if (options.updateInterval !== undefined) {
			Barometer.setUpdateInterval(options.updateInterval);
		}

		return subscription.remove;
	});

	return data;
};

export interface BarometerOptions {
	/** The initial data to use before the first update. */
	initialData?: BarometerMeasurement;
	/**
	 * The interval, in ms, to update the barometer data.
	 * Note, this is set globally through `Barometer.setUpdateInterval`.
	 */
	updateInterval?: number;
}
