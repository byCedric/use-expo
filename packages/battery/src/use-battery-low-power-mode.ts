import { useEffect, useState } from 'react';
import { isLowPowerModeEnabledAsync, addLowPowerModeListener } from 'expo-battery';

/**
 * Get or track the low power mode of the device.
 * It returns `true` when enabled, or `false` when disabled.
 * This feature is also known as battery save mode.
 * For older devices without this feature, it always returns `false`.
 *
 * @see https://docs.expo.io/versions/latest/sdk/battery/#batteryislowpowermodeenabledasync
 */
export function useBatteryLowPowerMode(
	options: BatteryLowPowerModeOptions = {}
): UseBatteryLowPowerModeSignature {
	const [data, setData] = useState<boolean>();
	const {
		get = true,
		listen = true,
	} = options;

	function getBatteryLowPowerMode() {
		return isLowPowerModeEnabledAsync().then(setData);
	}

	useEffect(() => {
		if (get) {
			getBatteryLowPowerMode();
		}

		if (listen) {
			return addLowPowerModeListener(state => setData(state.lowPowerMode)).remove;
		}
	}, [get, listen]);

	return [data, getBatteryLowPowerMode];
}

type UseBatteryLowPowerModeSignature = [
	boolean | undefined,
	() => Promise<void>,
];

export interface BatteryLowPowerModeOptions {
	/** If it should fetch the battery low power mode status when mounted, defaults to `true` */
	get?: boolean;
	/** If it should listen to any change in battery low power mode status, defaults to `true` */
	listen?: boolean;
}
