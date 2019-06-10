import { useEffect, useState } from 'react';
import { Barometer, BarometerMeasurement } from 'expo-sensors';

export function useBarometer(options: BarometerOptions = {}): UseBarometerSignature {
	const [data, setData] = useState(options.initialData);
	const [available, setAvailable] = useState<boolean>();
	const { getAvailability = true } = options;

	useEffect(() => {
		if (getAvailability) {
			Barometer.isAvailableAsync().then(setAvailable);
		}

		if (options.updateInterval !== undefined) {
			Barometer.setUpdateInterval(options.updateInterval);
		}

		return Barometer.addListener(setData).remove;
	});

	return [data, available];
};

type UseBarometerSignature = [
	BarometerMeasurement | undefined,
	boolean | undefined,
];

export interface BarometerOptions {
	/** The initial data to use before the first update. */
	initialData?: BarometerMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	getAvailability?: boolean;
	/**
	 * The interval, in ms, to update the barometer data.
	 * Note, this is set globally through `Barometer.setUpdateInterval`.
	 */
	updateInterval?: number;
}
