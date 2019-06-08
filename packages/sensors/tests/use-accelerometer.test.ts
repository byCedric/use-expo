const { Accelerometer } = jest.genMockFromModule('expo-sensors');
const Subscription = { remove: jest.fn() };

Accelerometer.addListener.mockReturnValue(Subscription);
jest.mock('expo-sensors', () => ({ Accelerometer }));

import { renderHook, act } from 'react-hooks-testing-library';
import { useAccelerometer } from '../src/use-accelerometer';

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(useAccelerometer);
		expect(Accelerometer.addListener).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(useAccelerometer);

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});

	test('handles new data', async () => {
		const hook = renderHook(useAccelerometer);
		const handler = Accelerometer.addListener.mock.calls[0][0];
		const newData = { x: 0, y: 1, z: 0.5 };

		act(() => handler(newData));
		expect(hook.result.current).toMatchObject(newData);
	});
});

describe('options', () => {
	test('initial data is returned', () => {
		const initialData = { x: 0.5, y: 0.2, z: 0.3 };
		const hook = renderHook(() => useAccelerometer({ initialData }));

		expect(hook.result.current).toMatchObject(initialData);
	});

	test('update interval is set', () => {
		renderHook(() => useAccelerometer({ updateInterval: 1500 }));
		expect(Accelerometer.setUpdateInterval).toBeCalledWith(1500);
	});
});
