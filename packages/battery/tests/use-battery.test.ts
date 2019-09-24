import { renderHook, act } from '@testing-library/react-hooks';
import * as Battery from 'expo-battery';
import { useBattery } from '../src';

jest.mock('expo-battery');

const DATA = 0;
const GET = 1;

const powerState: Battery.PowerState = {
	batteryLevel: 0.1337,
	batteryState: Battery.BatteryState.CHARGING,
	lowPowerMode: true,
};

test('returns state and get callbacks when mounted', () => {
	const hook = renderHook(() => useBattery({ get: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

test('handles state with get callback', async () => {
	const hook = renderHook(() => useBattery({ get: false }));

	(Battery.getPowerStateAsync as jest.Mock).mockResolvedValue(powerState);

	// this produces a warning about a side effect outside act
	// see: https://github.com/mpeyper/react-hooks-testing-library/issues/14#issuecomment-493021093
	act(() => { hook.result.current[GET]() });
	await hook.waitForNextUpdate();

	expect(hook.result.current[DATA]).toMatchObject(powerState);
});

describe('default behavior', () => {
	test('get battery power state when mounted', async () => {
		(Battery.getPowerStateAsync as jest.Mock).mockResolvedValue(powerState);

		const hook = renderHook(useBattery);
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(powerState);
		expect(Battery.getPowerStateAsync).toBeCalled();
	});
});
