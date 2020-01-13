import { renderHook, act } from '@testing-library/react-hooks';
import * as Sensors from 'expo-sensors';
import { useMagnetometer } from '../src/use-magnetometer';

const DATA = 0;
const AVAILABLE = 1;

it('returns data and availability when mounted', async () => {
	const hook = renderHook(() => useMagnetometer({ availability: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

it('updates magnetometer availability', async () => {
	jest.spyOn(Sensors.Magnetometer, 'isAvailableAsync').mockResolvedValue(true);

	const hook = renderHook(() => useMagnetometer());
	await hook.waitForNextUpdate();

	expect(hook.result.current[AVAILABLE]).toBe(true);
});

it('updates magnetometer data', async () => {
	const listener = jest.spyOn(Sensors.Magnetometer, 'addListener');
	const data = { x: 0, y: 1, z: 0.5 };

	const hook = renderHook(() => useMagnetometer({ availability: false }));
	const handler = listener.mock.calls[0][0];
	act(() => handler(data));

	expect(hook.result.current[DATA]).toMatchObject(data);
});

describe('event listener', () => {
	it('subscribes when mounted', () => {
		const listener = jest.spyOn(Sensors.Magnetometer, 'addListener');

		renderHook(() => useMagnetometer({ availability: false }));

		expect(listener).toBeCalled();
	});

	it('unsubscribes when unmounted', () => {
		const subscription = { remove: jest.fn() };
		jest.spyOn(Sensors.Magnetometer, 'addListener').mockReturnValue(subscription);

		const hook = renderHook(() => useMagnetometer({ availability: false }));
		hook.unmount();

		expect(subscription.remove).toBeCalled();
	});
});

describe('options', () => {
	it('uses initial data', () => {
		const initial = { x: 0.5, y: 0.2, z: 0.3 };
		const hook = renderHook(() => useMagnetometer({ initial, availability: false }));

		expect(hook.result.current[DATA]).toMatchObject(initial);
	});

	it('uses interval duration', () => {
		const setter = jest.spyOn(Sensors.Magnetometer, 'setUpdateInterval');

		renderHook(() => useMagnetometer({ interval: 1500, availability: false }));

		expect(setter).toBeCalledWith(1500);
	});

	it('skips availability check', () => {
		const checker = jest.spyOn(Sensors.Magnetometer, 'isAvailableAsync');

		renderHook(() => useMagnetometer({ availability: false }));

		expect(checker).not.toBeCalled();
	});
});
