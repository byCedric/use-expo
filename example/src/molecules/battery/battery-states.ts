import { BatteryState } from 'expo-battery';

export const batteryStates = {
	[BatteryState.UNKNOWN]: 'unknown',
	[BatteryState.CHARGING]: 'charging',
	[BatteryState.FULL]: 'full',
	[BatteryState.UNPLUGGED]: 'unplugged',
};
