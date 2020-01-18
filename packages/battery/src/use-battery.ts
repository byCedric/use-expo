import { useEffect, useState, useCallback } from 'react';
import { PowerState, getPowerStateAsync } from 'expo-battery';

/**
 * Get the battery power state from the device.
 * It returns a "snapshot" of the following data:
 *   - battery level (percentage of power left)
 *   - current battery state (e.g., charging or unplugged)
 *   - if low power mode is turned on (a.k.a battery saver)
 *
 * @see https://docs.expo.io/versions/latest/sdk/battery/#batterygetpowerstateasync
 * @remarks This does not track "live" updates of these values.
 * @example const [powerState, getPowerState] = useBattery(...);
 */
export function useBattery(
	options: BatteryOptions = {},
): [
	PowerState | undefined,
	() => Promise<void>,
] {
	const [data, setData] = useState<PowerState>();
	const { get = true } = options;

	const getBatteryPowerState = useCallback(() => (
		getPowerStateAsync().then(setData)
	), []);

	useEffect(() => {
		if (get) {
			getBatteryPowerState();
		}
	}, [get, getBatteryPowerState]);

	return [data, getBatteryPowerState];
}

export interface BatteryOptions {
	/** If it should fetch the battery power state when mounted, defaults to `true` */
	get?: boolean;
}
