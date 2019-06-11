const { MagnetometerUncalibrated } = jest.genMockFromModule('expo-sensors');
const Subscription = { remove: jest.fn() };

MagnetometerUncalibrated.addListener.mockReturnValue(Subscription);
jest.mock('expo-sensors', () => ({ MagnetometerUncalibrated }));

import { renderHook, act } from 'react-hooks-testing-library';
import { useMagnetometerUncalibrated } from '../src/use-magnetometer-uncalibrated';

const DATA = 0;
const AVAILABLE = 1;

test('returns state and availability when mounted', () => {
	const hook = renderHook(() => useMagnetometerUncalibrated({ availability: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

test('handles new uncalibrated magnetometer availability', async () => {
	(MagnetometerUncalibrated.isAvailableAsync as jest.Mock).mockResolvedValue(true);
	const hook = renderHook(useMagnetometerUncalibrated);

	await hook.waitForNextUpdate();

	expect(hook.result.current[AVAILABLE]).toBe(true);
});

test('handles new uncalibrated magnetometer data', async () => {
	const hook = renderHook(useMagnetometerUncalibrated);
	const handler = MagnetometerUncalibrated.addListener.mock.calls[0][0];
	const newData = { x: 0, y: 1, z: 0.5 };

	act(() => handler(newData));
	expect(hook.result.current[DATA]).toMatchObject(newData);
});

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(() => useMagnetometerUncalibrated({ availability: false }));
		expect(MagnetometerUncalibrated.addListener).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(() => useMagnetometerUncalibrated({ availability: false }));

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});

	test('checks availability when mounted', () => {
		renderHook(useMagnetometerUncalibrated);
		expect(MagnetometerUncalibrated.isAvailableAsync).toBeCalled();
	});
});

describe('options', () => {
	test('initial data is returned', () => {
		const initial = { x: 0.5, y: 0.2, z: 0.3 };
		const hook = renderHook(() => useMagnetometerUncalibrated({ initial, availability: false }));

		expect(hook.result.current[DATA]).toMatchObject(initial);
	});

	test('update interval is set', () => {
		renderHook(() => useMagnetometerUncalibrated({ interval: 1500, availability: false }));
		expect(MagnetometerUncalibrated.setUpdateInterval).toBeCalledWith(1500);
	});

	test('availability check is skipped', () => {
		renderHook(() => useMagnetometerUncalibrated({ availability: false }));
		expect(MagnetometerUncalibrated.isAvailableAsync).not.toBeCalled();
	});
});
