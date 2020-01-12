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

it('updates data with get callback', async () => {
	jest.spyOn(Battery, 'isLowPowerModeEnabledAsync').mockResolvedValue(true);

	const hook = renderHook(() => useBatteryLowPowerMode({ get: false, listen: false }));
	await act(() => hook.result.current[GET]());

	expect(hook.result.current[DATA]).toBe(true);
});

describe('default behavior', () => {
	it('gets battery low power mode when mounted', async () => {
		jest.spyOn(Battery, 'isLowPowerModeEnabledAsync').mockResolvedValueOnce(true);

		const hook = renderHook(() => useBatteryLowPowerMode({ listen: false }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(true);
		expect(Battery.isLowPowerModeEnabledAsync).toBeCalled();
	});

	it('listens to battery low power mode when mounted', async () => {
		const subscription = { remove: jest.fn() };
		const listener = jest.spyOn(Battery, 'addLowPowerModeListener').mockReturnValue(subscription);

		const hook = renderHook(() => useBatteryLowPowerMode({ get: false }));
		const handler = listener.mock.calls[0][0];
		act(() => handler({ lowPowerMode: false }));

		expect(hook.result.current[DATA]).toBe(false);
		expect(Battery.addLowPowerModeListener).toBeCalled();
	});
});

describe('event listener', () => {
	it('subscribes when mounted', () => {
		const listener = jest.spyOn(Battery, 'addLowPowerModeListener');

		renderHook(() => useBatteryLowPowerMode({ get: false, listen: true }));
		expect(listener).toBeCalled();
	});

	it('unsubscribes when unmounted', () => {
		const subscription = { remove: jest.fn() };
		jest.spyOn(Battery, 'addLowPowerModeListener').mockReturnValue(subscription);

		const hook = renderHook(() => useBatteryLowPowerMode({ get: false, listen: true }));
		hook.unmount();

		expect(subscription.remove).toBeCalled();
	});
});
