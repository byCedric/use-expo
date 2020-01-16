import { useEffect, useState } from 'react';
import { BatteryState, getBatteryStateAsync, addBatteryStateListener } from 'expo-battery';

/**
 * Get or track the battery state of the device.
 * It returns the `BatteryState` enum with one of the following values:
 *   - 0 `UNKNOWN` if the battery state is unknown or unable to access
 *   - 1 `UNPLUGGED` if the battery is not charging or discharging
 *   - 2 `CHARGING` if the battery is charging
 *   - 3 `FULL` if the battery level is full
 *
 * @see https://docs.expo.io/versions/latest/sdk/battery/#batterygetbatterystateasync
 */
export function useBatteryState(options: BatteryStateOptions = {}): UseBatteryStateSignature {
	const [data, setData] = useState<BatteryState>();
	const {
		get = true,
		listen = true,
	} = options;

	function getBatteryState() {
		return getBatteryStateAsync().then(setData);
	}

	useEffect(() => {
		if (get) {
			getBatteryState();
		}

		if (listen) {
			return addBatteryStateListener(state => setData(state.batteryState)).remove;
		}
	}, [get, listen]);

	return [data, getBatteryState];
}

type UseBatteryStateSignature = [
	BatteryState | undefined,
	() => Promise<void>,
];

export interface BatteryStateOptions {
	/** If it should fetch the battery state when mounted, defaults to `true` */
	get?: boolean;
	/** If it should listen to any change in battery state, defaults to `true` */
	listen?: boolean;
}
