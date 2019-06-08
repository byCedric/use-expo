const { Barometer } = jest.genMockFromModule('expo-sensors');
const Subscription = { remove: jest.fn() };

Barometer.addListener.mockReturnValue(Subscription);
jest.mock('expo-sensors', () => ({ Barometer }));

import { renderHook, act } from 'react-hooks-testing-library';
import { useBarometer } from '../src/use-barometer';

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(useBarometer);
		expect(Barometer.addListener).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(useBarometer);

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});

	test('handles new data', async () => {
		const hook = renderHook(useBarometer);
		const handler = Barometer.addListener.mock.calls[0][0];
		const newData = { x: 0, y: 1, z: 0.5 };

		act(() => handler(newData));
		expect(hook.result.current).toMatchObject(newData);
	});
});

describe('options', () => {
	test('initial data is returned', () => {
		const initialData = { pressure: 5, relativeAltitude: 0 };
		const hook = renderHook(() => useBarometer({ initialData }));

		expect(hook.result.current).toMatchObject(initialData);
	});

	test('update interval is set', () => {
		renderHook(() => useBarometer({ updateInterval: 1500 }));
		expect(Barometer.setUpdateInterval).toBeCalledWith(1500);
	});
});
