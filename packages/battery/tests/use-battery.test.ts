import { renderHook, act } from '@testing-library/react-hooks';
import * as Battery from 'expo-battery';
import { useBattery } from '../src';

const DATA = 0;
const GET = 1;

const powerState: Battery.PowerState = {
	batteryLevel: 0.1337,
	batteryState: Battery.BatteryState.CHARGING,
	lowPowerMode: true,
};

it('returns data and get callback when mounted', () => {
	const hook = renderHook(() => useBattery({ get: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

it('updates data with get callback', async () => {
	jest.spyOn(Battery, 'getPowerStateAsync').mockResolvedValue(powerState);

	const hook = renderHook(() => useBattery({ get: false }));
	await act(() => hook.result.current[GET]());

	expect(hook.result.current[DATA]).toMatchObject(powerState);
});

describe('default behavior', () => {
	it('gets battery power state when mounted', async () => {
		const getter = jest.spyOn(Battery, 'getPowerStateAsync').mockResolvedValue(powerState);

		const hook = renderHook(() => useBattery());
		await hook.waitForNextUpdate();

		expect(getter).toBeCalled();
		expect(hook.result.current[DATA]).toBe(powerState);
	});
});
