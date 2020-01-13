import { renderHook, act } from '@testing-library/react-hooks';
import * as Sensors from 'expo-sensors';
import { useBarometer } from '../src/use-barometer';

const DATA = 0;
const AVAILABLE = 1;

it('returns data and availability when mounted', () => {
	const hook = renderHook(() => useBarometer({ availability: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

it('updates barometer availability', async () => {
	jest.spyOn(Sensors.Barometer, 'isAvailableAsync').mockResolvedValue(true);

	const hook = renderHook(() => useBarometer());
	await hook.waitForNextUpdate();

	expect(hook.result.current[AVAILABLE]).toBe(true);
});

it('updates barometer data', () => {
	const listener = jest.spyOn(Sensors.Barometer, 'addListener');
	const data = { pressure: 5, relativeAltitude: 0 };

	const hook = renderHook(() => useBarometer({ availability: false }));
	const handler = listener.mock.calls[0][0];
	act(() => handler(data));

	expect(hook.result.current[DATA]).toMatchObject(data);
});

describe('event listener', () => {
	it('subscribes when mounted', () => {
		const listener = jest.spyOn(Sensors.Barometer, 'addListener');

		renderHook(() => useBarometer({ availability: false }));

		expect(listener).toBeCalled();
	});

	it('unsubscribes when unmounted', () => {
		const subscription = { remove: jest.fn() };
		jest.spyOn(Sensors.Barometer, 'addListener').mockReturnValue(subscription);

		const hook = renderHook(() => useBarometer({ availability: false }));
		hook.unmount();

		expect(subscription.remove).toBeCalled();
	});
});

describe('options', () => {
	test('uses initial data', () => {
		const initial = { pressure: 5, relativeAltitude: 0 };
		const hook = renderHook(() => useBarometer({ initial, availability: false }));

		expect(hook.result.current[DATA]).toMatchObject(initial);
	});

	test('uses interval duration', () => {
		const setter = jest.spyOn(Sensors.Barometer, 'setUpdateInterval');

		renderHook(() => useBarometer({ interval: 1500, availability: false }));

		expect(setter).toBeCalledWith(1500);
	});

	test('skips availability check', () => {
		const checker = jest.spyOn(Sensors.Barometer, 'isAvailableAsync');

		renderHook(() => useBarometer({ availability: false }));

		expect(checker).not.toBeCalled();
	});
});
