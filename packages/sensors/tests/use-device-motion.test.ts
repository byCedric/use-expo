import { renderHook, act } from '@testing-library/react-hooks';
import * as Sensors from 'expo-sensors';
import { useDeviceMotion } from '../src/use-device-motion';

const DATA = 0;
const AVAILABLE = 1;

it('returns data and availability when mounted', () => {
	const hook = renderHook(() => useDeviceMotion({ availability: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

it('updates device motion availability', async () => {
	jest.spyOn(Sensors.DeviceMotion, 'isAvailableAsync').mockResolvedValue(true);

	const hook = renderHook(useDeviceMotion);
	await hook.waitForNextUpdate();

	expect(hook.result.current[AVAILABLE]).toBe(true);
});

it('updates device motion data', async () => {
	const listener = jest.spyOn(Sensors.DeviceMotion, 'addListener');
	const data = {
		acceleration: { x: 0.5, y: 0, z: 0.25 },
		accelerationIncludingGravity: { x: 0.4, y: -0.3, z: 0.25 },
		rotation: { alpha: 0, beta: 1, gamma: 0 },
		rotationRate: { alpha: 1, beta: 0, gamma: 0 },
		orientation: 5,
	};

	const hook = renderHook(() => useDeviceMotion({ availability: false }));
	const handler = listener.mock.calls[0][0];
	act(() => handler(data));

	expect(hook.result.current[DATA]).toMatchObject(data);
});

describe('event listener', () => {
	it('subscribes when mounted', () => {
		const listener = jest.spyOn(Sensors.DeviceMotion, 'addListener');

		renderHook(() => useDeviceMotion({ availability: false }));

		expect(listener).toBeCalled();
	});

	it('unsubscribes when unmounted', () => {
		const subscription = { remove: jest.fn() };
		jest.spyOn(Sensors.DeviceMotion, 'addListener').mockReturnValue(subscription);

		const hook = renderHook(() => useDeviceMotion({ availability: false }));
		hook.unmount();

		expect(subscription.remove).toBeCalled();
	});
});

describe('options', () => {
	it('uses initial data', () => {
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

	it('uses interval duration', () => {
		const setter = jest.spyOn(Sensors.DeviceMotion, 'setUpdateInterval');

		renderHook(() => useDeviceMotion({ interval: 1500, availability: false }));

		expect(setter).toBeCalledWith(1500);
	});

	it('skips availability check', () => {
		const checker = jest.spyOn(Sensors.DeviceMotion, 'isAvailableAsync');

		renderHook(() => useDeviceMotion({ availability: false }));

		expect(checker).not.toBeCalled();
	});
});
