const { Magnetometer } = jest.genMockFromModule('expo-sensors');
const Subscription = { remove: jest.fn() };

Magnetometer.addListener.mockReturnValue(Subscription);
jest.mock('expo-sensors', () => ({ Magnetometer }));

import { renderHook, act } from 'react-hooks-testing-library';
import { useMagnetometer } from '../src/use-magnetometer';

const DATA = 0;
const AVAILABLE = 1;

test('returns state and availability when mounted', () => {
	const hook = renderHook(() => useMagnetometer({ getAvailability: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

test('handles new magnetometer availability', async () => {
	(Magnetometer.isAvailableAsync as jest.Mock).mockResolvedValue(true);
	const hook = renderHook(useMagnetometer);

	await hook.waitForNextUpdate();

	expect(hook.result.current[AVAILABLE]).toBe(true);
});

test('handles new magnetometer data', async () => {
	const hook = renderHook(() => useMagnetometer({ getAvailability: false }));
	const handler = Magnetometer.addListener.mock.calls[0][0];
	const newData = { x: 0, y: 1, z: 0.5 };

	act(() => handler(newData));
	expect(hook.result.current[DATA]).toMatchObject(newData);
});

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(() => useMagnetometer({ getAvailability: false }));
		expect(Magnetometer.addListener).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(() => useMagnetometer({ getAvailability: false }));

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});

	test('checks availability when mounted', () => {
		renderHook(useMagnetometer);
		expect(Magnetometer.isAvailableAsync).toBeCalled();
	});
});

describe('options', () => {
	test('initial data is returned', () => {
		const initialData = { x: 0.5, y: 0.2, z: 0.3 };
		const hook = renderHook(() => useMagnetometer({ initialData, getAvailability: false }));

		expect(hook.result.current[DATA]).toMatchObject(initialData);
	});

	test('update interval is set', () => {
		renderHook(() => useMagnetometer({ updateInterval: 1500, getAvailability: false }));
		expect(Magnetometer.setUpdateInterval).toBeCalledWith(1500);
	});

	test('availability check is skipped', () => {
		renderHook(() => useMagnetometer({ getAvailability: false }));
		expect(Magnetometer.isAvailableAsync).not.toBeCalled();
	});
});
