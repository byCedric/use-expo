import { renderHook, act } from '@testing-library/react-hooks';
import * as Battery from 'expo-battery';
import { useBatteryLevel } from '../src';

const DATA = 0;
const GET = 1;

it('returns data and get callback when mounted', () => {
	const hook = renderHook(() => useBatteryLevel({ get: false, listen: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

it('updates data with get callback', async () => {
	jest.spyOn(Battery, 'getBatteryLevelAsync').mockResolvedValue(1);

	const hook = renderHook(() => useBatteryLevel({ get: false, listen: false }));
	await act(() => hook.result.current[GET]());

	expect(hook.result.current[DATA]).toBe(1);
});

describe('default behavior', () => {
	it('gets battery level when mounted', async () => {
		jest.spyOn(Battery, 'getBatteryLevelAsync').mockResolvedValue(0.1337);

		const hook = renderHook(() => useBatteryLevel({ listen: false }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(0.1337);
		expect(Battery.getBatteryLevelAsync).toBeCalled();
	});

	it('listens to battery level when mounted', async () => {
		const subscription = { remove: jest.fn() };
		const listener = jest.spyOn(Battery, 'addBatteryLevelListener').mockReturnValue(subscription);

		const hook = renderHook(() => useBatteryLevel({ get: false }));
		const handler = listener.mock.calls[0][0];
		act(() => handler({ batteryLevel: 0.75 }));

		expect(hook.result.current[DATA]).toBe(0.75);
		expect(Battery.addBatteryLevelListener).toBeCalled();
	});
});

describe('event listener', () => {
	it('subscribes when mounted', () => {
		const listener = jest.spyOn(Battery, 'addBatteryLevelListener');

		renderHook(() => useBatteryLevel({ get: false, listen: true }));

		expect(listener).toBeCalled();
	});

	it('unsubscribes when unmounted', () => {
		const subscription = { remove: jest.fn() };
		jest.spyOn(Battery, 'addBatteryLevelListener').mockReturnValue(subscription);

		const hook = renderHook(() => useBatteryLevel({ get: false, listen: true }));
		hook.unmount();

		expect(subscription.remove).toBeCalled();
	});
});
