import { useCallback, useEffect, useState } from 'react';
import { isLowPowerModeEnabledAsync, addLowPowerModeListener } from 'expo-battery';

/**
 * Get or track the low power mode of the device.
 * It returns `true` when enabled, or `false` when disabled.
 * This feature is also known as battery save mode.
 *
 * @see https://docs.expo.io/versions/latest/sdk/battery/#batteryislowpowermodeenabledasync
 * @remarks For older devices without this feature, it always returns `false`.
 * @example const [isLowPowerMode, getLowPowerMode] = useBatteryLowPowerMode(...);
 */
export function useBatteryLowPowerMode(
	options: BatteryLowPowerModeOptions = {},
): [
	boolean | undefined,
	() => Promise<void>,
] {
	const [data, setData] = useState<boolean>();
	const {
		get = true,
		listen = true,
	} = options;

	const getBatteryLowPowerMode = useCallback(() => (
		isLowPowerModeEnabledAsync().then(setData)
	), []);

	useEffect(() => {
		if (get) {
			getBatteryLowPowerMode();
		}

		if (listen) {
			return addLowPowerModeListener(state => setData(state.lowPowerMode)).remove;
		}
	}, [get, getBatteryLowPowerMode, listen]);

	return [data, getBatteryLowPowerMode];
}

export interface BatteryLowPowerModeOptions {
	/** If it should fetch the battery low power mode status when mounted, defaults to `true` */
	get?: boolean;
	/** If it should listen to any change in battery low power mode status, defaults to `true` */
	listen?: boolean;
}
