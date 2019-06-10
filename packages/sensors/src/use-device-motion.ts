import { useEffect, useState } from 'react';
import { DeviceMotion, DeviceMotionMeasurement } from 'expo-sensors';

export function useDeviceMotion(options: DeviceMotionOptions = {}): UseDeviceMotionSignature {
	const [data, setData] = useState(options.initialData);
	const [available, setAvailable] = useState<boolean>();
	const { getAvailability = true } = options;

	useEffect(() => {
		if (getAvailability) {
			DeviceMotion.isAvailableAsync().then(setAvailable);
		}

		if (options.updateInterval !== undefined) {
			DeviceMotion.setUpdateInterval(options.updateInterval);
		}

		return DeviceMotion.addListener(setData).remove;
	}, []);

	return [data, available];
}

type UseDeviceMotionSignature = [
	DeviceMotionMeasurement | undefined,
	boolean | undefined,
];

export interface DeviceMotionOptions {
	/** The initial data to use before the first update. */
	initialData?: DeviceMotionMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	getAvailability?: boolean;
	/**
	 * The interval, in ms, to update the device motion data.
	 * Note, this is set globally through `DeviceMotion.setUpdateInterval`.
	 */
	updateInterval?: number;
}
