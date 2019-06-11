const { DeviceMotion } = jest.genMockFromModule('expo-sensors');
const Subscription = { remove: jest.fn() };

DeviceMotion.addListener.mockReturnValue(Subscription);
jest.mock('expo-sensors', () => ({ DeviceMotion }));

import { renderHook, act } from 'react-hooks-testing-library';
import { useDeviceMotion } from '../src/use-device-motion';

const DATA = 0;
const AVAILABLE = 1;

test('returns state and availability when mounted', () => {
	const hook = renderHook(() => useDeviceMotion({ availability: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

test('handles new device motion availability', async () => {
	(DeviceMotion.isAvailableAsync as jest.Mock).mockResolvedValue(true);
	const hook = renderHook(useDeviceMotion);

	await hook.waitForNextUpdate();

	expect(hook.result.current[AVAILABLE]).toBe(true);
});

test('handles new device motion data', async () => {
	const hook = renderHook(() => useDeviceMotion({ availability: false }));
	const handler = DeviceMotion.addListener.mock.calls[0][0];
	const newData = {
		acceleration: { x: 0.5, y: 0, z: 0.25 },
		accelerationIncludingGravity: { x: 0.4, y: -0.3, z: 0.25 },
		rotation: { alpha: 0, beta: 1, gamma: 0 },
		rotationRate: { alpha: 1, beta: 0, gamma: 0 },
		orientation: 5,
	};

	act(() => handler(newData));
	expect(hook.result.current[DATA]).toMatchObject(newData);
});

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(() => useDeviceMotion({ availability: false }));
		expect(DeviceMotion.addListener).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(() => useDeviceMotion({ availability: false }));

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});

	test('checks availability when mounted', () => {
		renderHook(useDeviceMotion);
		expect(DeviceMotion.isAvailableAsync).toBeCalled();
	});
});

describe('options', () => {
	test('initial data is returned', () => {
		const initial = {
			acceleration: { x: 0.5, y: 0, z: 0.25 },
			accelerationIncludingGravity: { x: 0.4, y: -0.3, z: 0.25 },
			rotation: { alpha: 0, beta: 1, gamma: 0 },
			rotationRate: { alpha: 1, beta: 0, gamma: 0 },
			orientation: 5,
		};

		const hook = renderHook(() => useDeviceMotion({ initial, availability: false }));

		expect(hook.result.current[DATA]).toMatchObject(initial);
	});

	test('update interval is set', () => {
		renderHook(() => useDeviceMotion({ interval: 1500, availability: false }));
		expect(DeviceMotion.setUpdateInterval).toBeCalledWith(1500);
	});

	test('availability check is skipped', () => {
		renderHook(() => useDeviceMotion({ availability: false }));
		expect(DeviceMotion.isAvailableAsync).not.toBeCalled();
	});
});
