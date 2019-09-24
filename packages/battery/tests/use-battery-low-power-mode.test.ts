const Battery = jest.genMockFromModule<any>('expo-battery');
const Subscription = { remove: jest.fn() };

Battery.addLowPowerModeListener.mockReturnValue(Subscription);
jest.mock('expo-battery', () => Battery);

import { renderHook, act } from '@testing-library/react-hooks';
import { useBatteryLowPowerMode } from '../src';

const DATA = 0;
const GET = 1;

test('returns state and get callbacks when mounted', () => {
	const hook = renderHook(() => useBatteryLowPowerMode({ get: false, listen: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

test('handles state with get callback', async () => {
	const hook = renderHook(() => useBatteryLowPowerMode({ get: false, listen: false }));

	Battery.isLowPowerModeEnabledAsync.mockResolvedValue(1);

	act(() => { hook.result.current[GET]() });
	await hook.waitForNextUpdate();

	expect(hook.result.current[DATA]).toBe(1);
});

describe('default behavior', () => {
	test('get battery low power mode when mounted', async () => {
		Battery.isLowPowerModeEnabledAsync.mockResolvedValue(true);

		const hook = renderHook(() => useBatteryLowPowerMode({ listen: false }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(true);
		expect(Battery.isLowPowerModeEnabledAsync).toBeCalled();
	});

	test('listen to battery low power mode when mounted', async () => {
		const hook = renderHook(() => useBatteryLowPowerMode({ get: false }));
		const handler = Battery.addLowPowerModeListener.mock.calls[0][0];

		act(() => handler({ lowPowerMode: false }));

		expect(hook.result.current[DATA]).toBe(false);
		expect(Battery.addLowPowerModeListener).toBeCalled();
	});
});

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(() => useBatteryLowPowerMode({ get: false, listen: true }));
		expect(Battery.addLowPowerModeListener).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(() => useBatteryLowPowerMode({ get: false, listen: true }));

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});
});
