import { renderHook, act } from '@testing-library/react-hooks';
import * as Sensors from 'expo-sensors';
import { useGyroscope } from '../src/use-gyroscope';

const DATA = 0;
const AVAILABLE = 1;

it('returns data and availability when mounted', () => {
	const hook = renderHook(() => useGyroscope({ availability: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

it('handles gyroscope availability', async () => {
	jest.spyOn(Sensors.Gyroscope, 'isAvailableAsync').mockResolvedValue(true);

	const hook = renderHook(useGyroscope);
	await hook.waitForNextUpdate();

	expect(hook.result.current[AVAILABLE]).toBe(true);
});

it('updates gyroscope data', async () => {
	const listener = jest.spyOn(Sensors.Gyroscope, 'addListener');
	const data = { x: 0, y: 1, z: 0.5 };

	const hook = renderHook(() => useGyroscope({ availability: false }));
	const handler = listener.mock.calls[0][0];
	act(() => handler(data));

	expect(hook.result.current[DATA]).toMatchObject(data);
});

describe('event listener', () => {
	it('subscribes when mounted', () => {
		const listener = jest.spyOn(Sensors.Gyroscope, 'addListener');

		renderHook(() => useGyroscope({ availability: false }));

		expect(listener).toBeCalled();
	});

	it('unsubscribes when unmounted', () => {
		const subscription = { remove: jest.fn() };
		jest.spyOn(Sensors.Gyroscope, 'addListener').mockReturnValue(subscription);

		const hook = renderHook(() => useGyroscope({ availability: false }));
		hook.unmount();

		expect(subscription.remove).toBeCalled();
	});
});

describe('options', () => {
	it('uses initial data', () => {
		const initial = { x: 1, y: 1, z: 1 };
		const hook = renderHook(() => useGyroscope({ initial, availability: false }));

		expect(hook.result.current[DATA]).toMatchObject(initial);
	});

	it('uses interval duration', () => {
		const setter = jest.spyOn(Sensors.Gyroscope, 'setUpdateInterval');

		renderHook(() => useGyroscope({ interval: 1500, availability: false }));

		expect(setter).toBeCalledWith(1500);
	});

	it('skips availability check', () => {
		const checker = jest.spyOn(Sensors.Gyroscope, 'isAvailableAsync');

		renderHook(() => useGyroscope({ availability: false }));

		expect(checker).not.toBeCalled();
	});
});
