import { useEffect, useState } from 'react';
import { DeviceMotion, DeviceMotionMeasurement } from 'expo-sensors';

/**
 * Track the motion of the device using multiple sensors.
 * It returns a `DeviceMotionMeasurement`, with acceleration, rotation, and orientation.
 * Optionally, you can provide the update interval (in ms).
 *
 * @see https://docs.expo.io/versions/latest/sdk/devicemotion/
 * @remarks Changing the update interval will affect all device motion listeners.
 * @example const [data, isAvailable] = useDeviceMotion(...);
 */
export function useDeviceMotion(
	options: DeviceMotionOptions = {}
): [
	DeviceMotionMeasurement | undefined,
	boolean | undefined,
] {
	const [data, setData] = useState(options.initial);
	const [available, setAvailable] = useState<boolean>();
	const {
		availability = true,
		interval,
	} = options;

	useEffect(() => {
		if (availability) {
			DeviceMotion.isAvailableAsync().then(setAvailable);
		}

		if (interval !== undefined) {
			DeviceMotion.setUpdateInterval(interval);
		}

		return DeviceMotion.addListener(setData).remove;
	}, [availability, interval]);

	return [data, available];
}

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
