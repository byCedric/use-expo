const { Accelerometer } = jest.genMockFromModule('expo-sensors');
const Subscription = { remove: jest.fn() };

Accelerometer.addListener.mockReturnValue(Subscription);
jest.mock('expo-sensors', () => ({ Accelerometer }));

import { renderHook, act } from 'react-hooks-testing-library';
import { useAccelerometer } from '../src/use-accelerometer';

const DATA = 0;
const AVAILABLE = 1;

test('returns state and availability when mounted', () => {
	const hook = renderHook(() => useAccelerometer({ getAvailability: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

test('handles new accelerometer availability', async () => {
	(Accelerometer.isAvailableAsync as jest.Mock).mockResolvedValue(true);
	const hook = renderHook(useAccelerometer);

	await hook.waitForNextUpdate();

	expect(hook.result.current[AVAILABLE]).toBe(true);
});

test('handles new accelerometer data', () => {
	const hook = renderHook(() => useAccelerometer({ getAvailability: false }));
	const handler = Accelerometer.addListener.mock.calls[0][0];
	const newData = { x: 0, y: 1, z: 0.5 };

	act(() => handler(newData));
	expect(hook.result.current[DATA]).toMatchObject(newData);
});

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(() => useAccelerometer({ getAvailability: false }));
		expect(Accelerometer.addListener).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(() => useAccelerometer({ getAvailability: false }));

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});

	test('checks availability when mounted', () => {
		renderHook(useAccelerometer);
		expect(Accelerometer.isAvailableAsync).toBeCalled();
	});
});

describe('options', () => {
	test('initial data is returned', () => {
		const initialData = { x: 0.5, y: 0.2, z: 0.3 };
		const hook = renderHook(() => useAccelerometer({ initialData, getAvailability: false }));

		expect(hook.result.current[DATA]).toMatchObject(initialData);
	});

	test('update interval is set', () => {
		renderHook(() => useAccelerometer({ updateInterval: 1500, getAvailability: false }));
		expect(Accelerometer.setUpdateInterval).toBeCalledWith(1500);
	});

	test('availability check is skipped', () => {
		renderHook(() => useAccelerometer({ getAvailability: false }));
		expect(Accelerometer.isAvailableAsync).not.toBeCalled();
	});
});
