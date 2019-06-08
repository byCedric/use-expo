import { useEffect, useState } from 'react';
import { DeviceMotion, DeviceMotionMeasurement } from 'expo-sensors';

export function useDeviceMotion(options: DeviceMotionOptions = {}) {
	const [data, setData] = useState(options.initialData);

	useEffect(() => {
		const subscription = DeviceMotion.addListener(setData);

		if (options.updateInterval !== undefined) {
			DeviceMotion.setUpdateInterval(options.updateInterval);
		}

		return subscription.remove;
	}, []);

	return data;
}

export interface DeviceMotionOptions {
	/** The initial data to use before the first update. */
	initialData?: DeviceMotionMeasurement;
	/**
	 * The interval, in ms, to update the device motion data.
	 * Note, this is set globally through `DeviceMotion.setUpdateInterval`.
	 */
	updateInterval?: number;
}
