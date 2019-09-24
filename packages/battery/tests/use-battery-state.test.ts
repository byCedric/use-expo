const Battery = jest.genMockFromModule<any>('expo-battery');
const Subscription = { remove: jest.fn() };

Battery.addBatteryStateListener.mockReturnValue(Subscription);
jest.mock('expo-battery', () => Battery);

import { renderHook, act } from '@testing-library/react-hooks';
import { useBatteryState } from '../src';

const DATA = 0;
const GET = 1;

test('returns state and get callbacks when mounted', () => {
	const hook = renderHook(() => useBatteryState({ get: false, listen: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

test('handles state with get callback', async () => {
	const hook = renderHook(() => useBatteryState({ get: false, listen: false }));

	Battery.getBatteryStateAsync.mockResolvedValue(Battery.BatteryState.FULL);

	act(() => { hook.result.current[GET]() });
	await hook.waitForNextUpdate();

	expect(hook.result.current[DATA]).toBe(Battery.BatteryState.FULL);
});

describe('default behavior', () => {
	test('get battery state when mounted', async () => {
		Battery.getBatteryStateAsync.mockResolvedValue(Battery.BatteryState.UNPLUGGED);

		const hook = renderHook(() => useBatteryState({ listen: false }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(Battery.BatteryState.UNPLUGGED);
		expect(Battery.getBatteryStateAsync).toBeCalled();
	});

	test('listen to battery state when mounted', async () => {
		const hook = renderHook(() => useBatteryState({ get: false }));
		const handler = Battery.addBatteryStateListener.mock.calls[0][0];

		act(() => handler({ batteryState: Battery.BatteryState.UNKNOWN }));

		expect(hook.result.current[DATA]).toBe(Battery.BatteryState.UNKNOWN);
		expect(Battery.addBatteryStateListener).toBeCalled();
	});
});

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(() => useBatteryState({ get: false, listen: true }));
		expect(Battery.addBatteryStateListener).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(() => useBatteryState({ get: false, listen: true }));

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});
});
