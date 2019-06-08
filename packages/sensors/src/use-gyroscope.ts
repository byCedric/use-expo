import { useEffect, useState } from 'react';
import { Gyroscope, ThreeAxisMeasurement } from 'expo-sensors';

export function useGyroscope(options: GyroscopeOptions = {}) {
	const [data, setData] = useState(options.initialData);

	useEffect(() => {
		const subscription = Gyroscope.addListener(setData);

		if (options.updateInterval !== undefined) {
			Gyroscope.setUpdateInterval(options.updateInterval);
		}

		return subscription.remove;
	}, []);

	return data;
}

export interface GyroscopeOptions {
	/** The initial data to use before the first update. */
	initialData?: ThreeAxisMeasurement;
	/**
	 * The interval, in ms, to update the gyroscope data.
	 * Note, this is set globally through `Gyroscope.setUpdateInterval`.
	 */
	updateInterval?: number;
}
