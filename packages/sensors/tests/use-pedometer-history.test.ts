const { Pedometer } = jest.genMockFromModule('expo-sensors');
const Subscription = { remove: jest.fn() };

Pedometer.watchStepCount.mockReturnValue(Subscription);
jest.mock('expo-sensors', () => ({ Pedometer }));

import { renderHook } from '@testing-library/react-hooks';
import { usePedometerHistory } from '../src/use-pedometer-history';

const DATA = 0;
const AVAILABLE = 1;

const start = new Date();
const end = new Date(Number(start) + 5000);

test('returns state and availability when mounted', async () => {
	(Pedometer.getStepCountAsync as jest.Mock).mockResolvedValue({ steps: 1 });
	const hook = renderHook(() => usePedometerHistory(start, end, { availability: false }));

	await hook.waitForNextUpdate();

	expect(Pedometer.getStepCountAsync).toBeCalledWith(start, end);
	expect(hook.result.current[DATA]).toMatchObject({ steps: 1 });
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

test('handles new pedometer availability', async () => {
	(Pedometer.getStepCountAsync as jest.Mock).mockResolvedValue({ steps: 1 });
	(Pedometer.isAvailableAsync as jest.Mock).mockResolvedValue(true);

	const hook = renderHook(() => usePedometerHistory(start, end));
	await hook.waitForNextUpdate();

	expect(hook.result.current[AVAILABLE]).toBe(true);
});

describe('event listener', () => {
	test('checks availability when mounted', () => {
		(Pedometer.getStepCountAsync as jest.Mock).mockResolvedValue({ steps: 1 });

		renderHook(() => usePedometerHistory(start, end));
		expect(Pedometer.isAvailableAsync).toBeCalled();
	});
});

describe('options', () => {
	test('initial data is returned', () => {
		(Pedometer.getStepCountAsync as jest.Mock).mockResolvedValue({ steps: 1 });

		const initial = { steps: 10 };
		const hook = renderHook(() => usePedometerHistory(start, end, { initial, availability: false }));

		expect(hook.result.current[DATA]).toMatchObject(initial);
	});

	test('availability check is skipped', () => {
		(Pedometer.getStepCountAsync as jest.Mock).mockResolvedValue({ steps: 1 });
		(Pedometer.isAvailableAsync as jest.Mock).mockResolvedValue(true);

		renderHook(() => usePedometerHistory(start, end, { availability: false }));
		expect(Pedometer.isAvailableAsync).not.toBeCalled();
	});
});
