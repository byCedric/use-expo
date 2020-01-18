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

describe('get callback', () => {
	it('updates data with get callback', async () => {
		jest.spyOn(Battery, 'getPowerStateAsync')
			.mockResolvedValue(powerState);

		const hook = renderHook(() => useBattery({ get: false }));
		expect(hook.result.current[DATA]).toBeUndefined();
		await act(() => hook.result.current[GET]());

		expect(hook.result.current[DATA]).toMatchObject(powerState);
	});

	it('uses the same get callback when rerendered', async () => {
		const hook = renderHook(() => useBattery({ get: false }));
		const getter = hook.result.current[GET];
		hook.rerender({ get: false });

		expect(getter).toBe(hook.result.current[GET]);
	});
});

describe('get option', () => {
	it('gets battery power state when mounted', async () => {
		jest.spyOn(Battery, 'getPowerStateAsync')
			.mockResolvedValue(powerState);

		const hook = renderHook(() => useBattery({ get: true }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(powerState);
	});

	it('updates data with get option when rerendered', async () => {
		jest.spyOn(Battery, 'getPowerStateAsync')
			.mockResolvedValue(powerState);

		const hook = renderHook(useBattery, { initialProps: { get: false } });
		expect(hook.result.current[DATA]).toBeUndefined();
		hook.rerender({ get: true })
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(powerState);
	});
});
