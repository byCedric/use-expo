import { useEffect, useState } from 'react';
import { PowerState, getPowerStateAsync } from 'expo-battery';

/**
 * Get the battery power state from the device.
 * It returns a "snapshot" of the following data:
 *   - battery level (percentage of power left)
 *   - current battery state (e.g., charging or unplugged)
 *   - if low power mode is turned on (a.k.a battery saver)
 *
 * Note, this does not track "live" updates of these values.
 *
 * @see https://docs.expo.io/versions/latest/sdk/battery/#batterygetpowerstateasync
 */
export function useBattery(options: BatteryOptions = {}): UseBatterySignature {
	const [data, setData] = useState<PowerState>();
	const { get = true } = options;

	function getBatteryPowerState() {
		return getPowerStateAsync().then(setData);
	}

	useEffect(() => {
		if (get) {
			getBatteryPowerState();
		}
	}, [get]);

	return [data, getBatteryPowerState];
}

type UseBatterySignature = [
	PowerState | undefined,
	() => Promise<void>,
];

export interface BatteryOptions {
	/** If it should fetch the battery power state when mounted, defaults to `true` */
	get?: boolean;
}
