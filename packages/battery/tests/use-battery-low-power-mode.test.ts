import { renderHook, act } from '@testing-library/react-hooks';
import * as Battery from 'expo-battery';
import { useBatteryLowPowerMode } from '../src';

const DATA = 0;
const GET = 1;

it('returns data and get callback when mounted', () => {
	const hook = renderHook(() => useBatteryLowPowerMode({ get: false, listen: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

describe('get callback', () => {
	it('updates data with get callback', async () => {
		jest.spyOn(Battery, 'isLowPowerModeEnabledAsync')
			.mockResolvedValue(true);

		const hook = renderHook(() => useBatteryLowPowerMode({ get: false, listen: false }));
		await act(() => hook.result.current[GET]());

		expect(hook.result.current[DATA]).toBe(true);
	});

	it('uses the same get callback when rerendered', async () => {
		const hook = renderHook(() => useBatteryLowPowerMode({ get: false, listen: false }));
		const getter = hook.result.current[GET];
		hook.rerender({ get: false, listen: false });

		expect(getter).toBe(hook.result.current[GET]);
	});
});

describe('get option', () => {
	it('gets battery low power mode when mounted', async () => {
		jest.spyOn(Battery, 'isLowPowerModeEnabledAsync')
			.mockResolvedValueOnce(true);

		const hook = renderHook(() => useBatteryLowPowerMode({ listen: false }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(true);
		expect(Battery.isLowPowerModeEnabledAsync).toBeCalled();
	});
});

describe('listen option', () => {
	it('subscribes when mounted', () => {
		const listener = jest.spyOn(Battery, 'addLowPowerModeListener');

		renderHook(() => useBatteryLowPowerMode({ get: false, listen: true }));
		expect(listener).toBeCalled();
	});

	it('unsubscribes when unmounted', () => {
		const subscription = { remove: jest.fn() };
		jest.spyOn(Battery, 'addLowPowerModeListener')
			.mockReturnValue(subscription);

		const hook = renderHook(() => useBatteryLowPowerMode({ get: false, listen: true }));
		hook.unmount();

		expect(subscription.remove).toBeCalled();
	});

	it('listens to battery low power mode when mounted', async () => {
		const subscription = { remove: jest.fn() };
		const listener = jest.spyOn(Battery, 'addLowPowerModeListener')
			.mockReturnValue(subscription);

		const hook = renderHook(() => useBatteryLowPowerMode({ get: false }));
		const handler = listener.mock.calls[0][0];
		act(() => handler({ lowPowerMode: false }));

		expect(hook.result.current[DATA]).toBe(false);
		expect(Battery.addLowPowerModeListener).toBeCalled();
	});
});
