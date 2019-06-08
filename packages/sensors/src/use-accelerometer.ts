import { useEffect, useState } from 'react';
import { Accelerometer, ThreeAxisMeasurement } from 'expo-sensors';

export function useAccelerometer(options: AccelerometerOptions = {}) {
	const [data, setData] = useState(options.initialData);

	useEffect(() => {
		const subscription = Accelerometer.addListener(setData);

		if (options.updateInterval !== undefined) {
			Accelerometer.setUpdateInterval(options.updateInterval);
		}

		return subscription.remove;
	}, []);

	return data;
}

export interface AccelerometerOptions {
	/** The initial data to use before the first update. */
	initialData?: ThreeAxisMeasurement;
	/**
	 * The interval, in ms, to update the accelerometer data.
	 * Note, this is set globally through `Accelerometer.setUpdateInterval`.
	 */
	updateInterval?: number;
}
