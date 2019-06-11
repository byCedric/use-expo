import { useEffect, useState } from 'react';
import { DeviceMotion, DeviceMotionMeasurement } from 'expo-sensors';

export function useDeviceMotion(options: DeviceMotionOptions = {}): UseDeviceMotionSignature {
	const [data, setData] = useState(options.initial);
	const [available, setAvailable] = useState<boolean>();
	const { availability = true } = options;

	useEffect(() => {
		if (availability) {
			DeviceMotion.isAvailableAsync().then(setAvailable);
		}

		if (options.interval !== undefined) {
			DeviceMotion.setUpdateInterval(options.interval);
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
	initial?: DeviceMotionMeasurement;
	/** If it should check the availability of the sensor, defaults to `true`. */
	availability?: boolean;
	/**
	 * The interval, in ms, to update the device motion data.
	 * Note, this is set globally through `DeviceMotion.setUpdateInterval`.
	 * When used in 2 or more components, only the last rendered component's interval will be used for all.
	 */
	interval?: number;
}
