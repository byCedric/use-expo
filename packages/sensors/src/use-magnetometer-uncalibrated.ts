import { useEffect, useState } from 'react';
import { MagnetometerUncalibrated, ThreeAxisMeasurement } from 'expo-sensors';

export function useMagnetometerUncalibrated(options: MagnetometerUncalibratedOptions = {}) {
	const [data, setData] = useState(options.initialData);

	useEffect(() => {
		const subscription = MagnetometerUncalibrated.addListener(setData);

		if (options.updateInterval !== undefined) {
			MagnetometerUncalibrated.setUpdateInterval(options.updateInterval);
		}

		return subscription.remove;
	}, []);

	return data;
}

export interface MagnetometerUncalibratedOptions {
	/** The initial data to use before the first update. */
	initialData?: ThreeAxisMeasurement;
	/**
	 * The interval, in ms, to update the uncalibrated magnetometer data.
	 * Note, this is set globally through `MagnetometerUncalibrated.setUpdateInterval`.
	 */
	updateInterval?: number;
}
