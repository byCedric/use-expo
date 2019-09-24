const Battery = jest.genMockFromModule<any>('expo-battery');
const Subscription = { remove: jest.fn() };

Battery.addBatteryLevelListener.mockReturnValue(Subscription);
jest.mock('expo-battery', () => Battery);

import { renderHook, act } from '@testing-library/react-hooks';
import { useBatteryLevel } from '../src';

const DATA = 0;
const GET = 1;

test('returns state and get callbacks when mounted', () => {
	const hook = renderHook(() => useBatteryLevel({ get: false, listen: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

test('handles state with get callback', async () => {
	const hook = renderHook(() => useBatteryLevel({ get: false, listen: false }));

	Battery.getBatteryLevelAsync.mockResolvedValue(1);

	act(() => { hook.result.current[GET]() });
	await hook.waitForNextUpdate();

	expect(hook.result.current[DATA]).toBe(1);
});

describe('default behavior', () => {
	test('get battery level when mounted', async () => {
		Battery.getBatteryLevelAsync.mockResolvedValue(0.1337);

		const hook = renderHook(() => useBatteryLevel({ listen: false }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(0.1337);
		expect(Battery.getBatteryLevelAsync).toBeCalled();
	});

	test('listen to battery level when mounted', async () => {
		const hook = renderHook(() => useBatteryLevel({ get: false }));
		const handler = Battery.addBatteryLevelListener.mock.calls[0][0];

		act(() => handler({ batteryLevel: 0.75 }));

		expect(hook.result.current[DATA]).toBe(0.75);
		expect(Battery.addBatteryLevelListener).toBeCalled();
	});
});

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(() => useBatteryLevel({ get: false, listen: true }));
		expect(Battery.addBatteryLevelListener).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(() => useBatteryLevel({ get: false, listen: true }));

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});
});
