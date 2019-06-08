const { Gyroscope } = jest.genMockFromModule('expo-sensors');
const Subscription = { remove: jest.fn() };

Gyroscope.addListener.mockReturnValue(Subscription);
jest.mock('expo-sensors', () => ({ Gyroscope }));

import { renderHook, act } from 'react-hooks-testing-library';
import { useGyroscope } from '../src/use-gyroscope';

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(useGyroscope);
		expect(Gyroscope.addListener).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(useGyroscope);

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});

	test('handles new data', async () => {
		const hook = renderHook(useGyroscope);
		const handler = Gyroscope.addListener.mock.calls[0][0];
		const newData = { x: 0, y: 1, z: 0.5 };

		act(() => handler(newData));
		expect(hook.result.current).toMatchObject(newData);
	});
});

describe('options', () => {
	test('initial data is returned', () => {
		const initialData = { x: 1, y: 1, z: 1 };
		const hook = renderHook(() => useGyroscope({ initialData }));

		expect(hook.result.current).toMatchObject(initialData);
	});

	test('update interval is set', () => {
		renderHook(() => useGyroscope({ updateInterval: 1500 }));
		expect(Gyroscope.setUpdateInterval).toBeCalledWith(1500);
	});
});
