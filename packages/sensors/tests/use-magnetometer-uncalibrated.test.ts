const { MagnetometerUncalibrated } = jest.genMockFromModule('expo-sensors');
const Subscription = { remove: jest.fn() };

MagnetometerUncalibrated.addListener.mockReturnValue(Subscription);
jest.mock('expo-sensors', () => ({ MagnetometerUncalibrated }));

import { renderHook, act } from 'react-hooks-testing-library';
import { useMagnetometerUncalibrated } from '../src/use-magnetometer-uncalibrated';

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(useMagnetometerUncalibrated);
		expect(MagnetometerUncalibrated.addListener).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(useMagnetometerUncalibrated);

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});

	test('handles new data', async () => {
		const hook = renderHook(useMagnetometerUncalibrated);
		const handler = MagnetometerUncalibrated.addListener.mock.calls[0][0];
		const newData = { x: 0, y: 1, z: 0.5 };

		act(() => handler(newData));
		expect(hook.result.current).toMatchObject(newData);
	});
});

describe('options', () => {
	test('initial data is returned', () => {
		const initialData = { x: 0.5, y: 0.2, z: 0.3 };
		const hook = renderHook(() => useMagnetometerUncalibrated({ initialData }));

		expect(hook.result.current).toMatchObject(initialData);
	});

	test('update interval is set', () => {
		renderHook(() => useMagnetometerUncalibrated({ updateInterval: 1500 }));
		expect(MagnetometerUncalibrated.setUpdateInterval).toBeCalledWith(1500);
	});
});
