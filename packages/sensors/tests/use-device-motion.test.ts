const { DeviceMotion } = jest.genMockFromModule('expo-sensors');
const Subscription = { remove: jest.fn() };

DeviceMotion.addListener.mockReturnValue(Subscription);
jest.mock('expo-sensors', () => ({ DeviceMotion }));

import { renderHook, act } from 'react-hooks-testing-library';
import { useDeviceMotion } from '../src/use-device-motion';

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(useDeviceMotion);
		expect(DeviceMotion.addListener).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(useDeviceMotion);

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});

	test('handles new data', async () => {
		const hook = renderHook(useDeviceMotion);
		const handler = DeviceMotion.addListener.mock.calls[0][0];
		const newData = { x: 0, y: 1, z: 0.5 };

		act(() => handler(newData));
		expect(hook.result.current).toMatchObject(newData);
	});
});

describe('options', () => {
	test('initial data is returned', () => {
		const initialData = {
			acceleration: { x: 0.5, y: 0, z: 0.25 },
			accelerationIncludingGravity: { x: 0.4, y: -0.3, z: 0.25 },
			rotation: { alpha: 0, beta: 1, gamma: 0 },
			rotationRate: { alpha: 1, beta: 0, gamma: 0 },
			orientation: 5,
		};

		const hook = renderHook(() => useDeviceMotion({ initialData }));

		expect(hook.result.current).toMatchObject(initialData);
	});

	test('update interval is set', () => {
		renderHook(() => useDeviceMotion({ updateInterval: 1500 }));
		expect(DeviceMotion.setUpdateInterval).toBeCalledWith(1500);
	});
});
