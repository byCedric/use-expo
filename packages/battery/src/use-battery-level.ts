import { useEffect, useState } from 'react';
import { getBatteryLevelAsync, addBatteryLevelListener } from 'expo-battery';

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
