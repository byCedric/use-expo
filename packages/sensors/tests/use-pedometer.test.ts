const { Pedometer } = jest.genMockFromModule('expo-sensors');
const Subscription = { remove: jest.fn() };

Pedometer.watchStepCount.mockReturnValue(Subscription);
jest.mock('expo-sensors', () => ({ Pedometer }));

import { renderHook, act } from 'react-hooks-testing-library';
import { usePedometer } from '../src/use-pedometer';

const DATA = 0;
const AVAILABLE = 1;

test('returns state and availability when mounted', () => {
	const hook = renderHook(() => usePedometer({ getAvailability: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

test('handles new pedometer availability', async () => {
	(Pedometer.isAvailableAsync as jest.Mock).mockResolvedValue(true);
	const hook = renderHook(usePedometer);

	await hook.waitForNextUpdate();

	expect(hook.result.current[AVAILABLE]).toBe(true);
});

test('handles new pedometer data', async () => {
	const hook = renderHook(() => usePedometer({ getAvailability: false }));
	const handler = Pedometer.watchStepCount.mock.calls[0][0];
	const newData = { steps: 5 };

	act(() => handler(newData));
	expect(hook.result.current[DATA]).toMatchObject(newData);
});

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(() => usePedometer({ getAvailability: false }));
		expect(Pedometer.watchStepCount).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(() => usePedometer({ getAvailability: false }));

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});

	test('checks availability when mounted', () => {
		renderHook(usePedometer);
		expect(Pedometer.isAvailableAsync).toBeCalled();
	});
});

describe('options', () => {
	test('initial data is returned', () => {
		const initialData = { steps: 10 };
		const hook = renderHook(() => usePedometer({ initialData, getAvailability: false }));

		expect(hook.result.current[DATA]).toMatchObject(initialData);
	});

	test('availability check is skipped', () => {
		renderHook(() => usePedometer({ getAvailability: false }));
		expect(Pedometer.isAvailableAsync).not.toBeCalled();
	});
});
