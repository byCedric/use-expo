import { useEffect, useState } from 'react';
import { BatteryState, getBatteryStateAsync, addBatteryStateListener } from 'expo-battery';

export function useBatteryState(options: BatteryStateOptions = {}): UseBatteryStateSignature {
	const [data, setData] = useState<BatteryState>();
	const { get = true, listen = true } = options;

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
