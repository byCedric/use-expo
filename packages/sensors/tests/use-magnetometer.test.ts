const { Magnetometer } = jest.genMockFromModule('expo-sensors');
const Subscription = { remove: jest.fn() };

Magnetometer.addListener.mockReturnValue(Subscription);
jest.mock('expo-sensors', () => ({ Magnetometer }));

import { renderHook, act } from 'react-hooks-testing-library';
import { useMagnetometer } from '../src/use-magnetometer';

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(useMagnetometer);
		expect(Magnetometer.addListener).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(useMagnetometer);

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});

	test('handles new data', async () => {
		const hook = renderHook(useMagnetometer);
		const handler = Magnetometer.addListener.mock.calls[0][0];
		const newData = { x: 0, y: 1, z: 0.5 };

		act(() => handler(newData));
		expect(hook.result.current).toMatchObject(newData);
	});
});

describe('options', () => {
	test('initial data is returned', () => {
		const initialData = { x: 0.5, y: 0.2, z: 0.3 };
		const hook = renderHook(() => useMagnetometer({ initialData }));

		expect(hook.result.current).toMatchObject(initialData);
	});

	test('update interval is set', () => {
		renderHook(() => useMagnetometer({ updateInterval: 1500 }));
		expect(Magnetometer.setUpdateInterval).toBeCalledWith(1500);
	});
});
