import { useEffect, useState } from 'react';
import { getBatteryLevelAsync, addBatteryLevelListener } from 'expo-battery';

/**
 * Get or track the battery level of the device.
 * It returns a number between `0..1`, which represents the percentage of power left.
 *
 * @see https://docs.expo.io/versions/latest/sdk/battery/#batterygetbatterylevelasync
 * @remarks For older devices without this feature, it always returns `-1`.
 * @example const [batteryLevel, getBatteryLevel] = useBatteryLevel(...);
 */
export function useBatteryLevel(
	options: BatteryLevelOptions = {},
): [
	number | undefined,
	() => Promise<void>,
] {
	const [data, setData] = useState<number>();
	const {
		get = true,
		listen = true,
	} = options;

	function getBatteryLevel() {
		return getBatteryLevelAsync().then(setData);
	}

	useEffect(() => {
		if (get) {
			getBatteryLevel();
		}

		if (listen) {
			return addBatteryLevelListener(state => setData(state.batteryLevel)).remove;
		}
	}, [get, listen]);

	return [data, getBatteryLevel];
}

export interface BatteryLevelOptions {
	/** If it should fetch the battery level when mounted, defaults to `true` */
	get?: boolean;
	/** If it should listen to any change in battery level, defaults to `true` */
	listen?: boolean;
}
