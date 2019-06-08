import { useEffect, useState } from 'react';
import { Magnetometer, ThreeAxisMeasurement } from 'expo-sensors';

export function useMagnetometer(options: MagnetometerOptions = {}) {
	const [data, setData] = useState(options.initialData);

	useEffect(() => {
		const subscription = Magnetometer.addListener(setData);

		if (options.updateInterval !== undefined) {
			Magnetometer.setUpdateInterval(options.updateInterval);
		}

		return subscription.remove;
	}, []);

	return data;
}

export interface MagnetometerOptions {
	/** The initial data to use before the first update. */
	initialData?: ThreeAxisMeasurement;
	/**
	 * The interval, in ms, to update the magnetometer data.
	 * Note, this is set globally through `Magnetometer.setUpdateInterval`.
	 */
	updateInterval?: number;
}
