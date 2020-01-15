import { useEffect, useState } from 'react';
import { getBatteryLevelAsync, addBatteryLevelListener } from 'expo-battery';

/**
 * Get or track the battery level of the device.
 * It returns a number between `0..1`, which represents the percentage of power left.
 * When the device doesn't provide this, it returns `-1`.
 *
 * @see https://docs.expo.io/versions/latest/sdk/battery/#batterygetbatterylevelasync
 */
export function useBatteryLevel(options: BatteryLevelOptions = {}): UseBatteryLevelSignature {
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

type UseBatteryLevelSignature = [
	number | undefined,
	() => Promise<void>,
];

export interface BatteryLevelOptions {
	/** If it should fetch the battery level when mounted, defaults to `true` */
	get?: boolean;
	/** If it should listen to any change in battery level, defaults to `true` */
	listen?: boolean;
}
