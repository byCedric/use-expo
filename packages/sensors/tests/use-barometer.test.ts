const { Barometer } = jest.genMockFromModule('expo-sensors');
const Subscription = { remove: jest.fn() };

Barometer.addListener.mockReturnValue(Subscription);
jest.mock('expo-sensors', () => ({ Barometer }));

import { renderHook, act } from 'react-hooks-testing-library';
import { useBarometer } from '../src/use-barometer';

const DATA = 0;
const AVAILABLE = 1;

test('returns state and availability when mounted', () => {
	const hook = renderHook(() => useBarometer({ availability: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

test('handles new barometer availability', async () => {
	(Barometer.isAvailableAsync as jest.Mock).mockResolvedValue(true);
	const hook = renderHook(useBarometer);

	await hook.waitForNextUpdate();

	expect(hook.result.current[AVAILABLE]).toBe(true);
});

test('handles new barometer data', () => {
	const hook = renderHook(() => useBarometer({ availability: false }));
	const handler = Barometer.addListener.mock.calls[0][0];
	const newData = { pressure: 5, relativeAltitude: 0 };

	act(() => handler(newData));
	expect(hook.result.current[DATA]).toMatchObject(newData);
});

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(() => useBarometer({ availability: false }));
		expect(Barometer.addListener).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(() => useBarometer({ availability: false }));

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});

	test('checks availability when mounted', () => {
		renderHook(useBarometer);
		expect(Barometer.isAvailableAsync).toBeCalled();
	});
});

describe('options', () => {
	test('initial data is returned', () => {
		const initial = { pressure: 5, relativeAltitude: 0 };
		const hook = renderHook(() => useBarometer({ initial, availability: false }));

		expect(hook.result.current[DATA]).toMatchObject(initial);
	});

	test('update interval is set', () => {
		renderHook(() => useBarometer({ interval: 1500, availability: false }));
		expect(Barometer.setUpdateInterval).toBeCalledWith(1500);
	});

	test('availability check is skipped', () => {
		renderHook(() => useBarometer({ availability: false }));
		expect(Barometer.isAvailableAsync).not.toBeCalled();
	});
});
