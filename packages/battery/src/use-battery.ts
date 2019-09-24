import { useEffect, useState } from 'react';
import { PowerState, getPowerStateAsync } from 'expo-battery';

export function useBattery(options: BatteryOptions = {}): UseBatterySignature {
	const [data, setData] = useState<PowerState>();
	const { get = true } = options;

	function getBatteryPowerState() {
		return getPowerStateAsync().then(setData);
	}

	useEffect(() => {
		if (get) getBatteryPowerState();
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
