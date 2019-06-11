import { useEffect, useState } from 'react';
import { Barometer, BarometerMeasurement } from 'expo-sensors';

export function useBarometer(options: BarometerOptions = {}): UseBarometerSignature {
	const [data, setData] = useState(options.initial);
	const [available, setAvailable] = useState<boolean>();
	const { availability = true } = options;

	useEffect(() => {
		if (availability) {
			Barometer.isAvailableAsync().then(setAvailable);
		}

		if (options.interval !== undefined) {
			Barometer.setUpdateInterval(options.interval);
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
	initial?: BarometerMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	availability?: boolean;
	/**
	 * The interval, in ms, to update the barometer data.
	 * Note, this is set globally through `Barometer.setUpdateInterval`.
	 * When used in 2 or more components, only the last rendered component's interval will be used for all.
	 */
	interval?: number;
}
