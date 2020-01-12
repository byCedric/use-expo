import { renderHook, act } from '@testing-library/react-hooks';
import * as Sensors from 'expo-sensors';
import { usePedometer } from '../src/use-pedometer';

const DATA = 0;
const AVAILABLE = 1;

it('returns data and availability when mounted', () => {
	const hook = renderHook(() => usePedometer({ availability: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

it('updates pedometer availability', async () => {
	jest.spyOn(Sensors.Pedometer, 'isAvailableAsync').mockResolvedValue(true);

	const hook = renderHook(() => usePedometer());
	await hook.waitForNextUpdate();

	expect(hook.result.current[AVAILABLE]).toBe(true);
});

it('updates pedometer data', async () => {
	const listener = jest.spyOn(Sensors.Pedometer, 'watchStepCount');
	const data = { steps: 5 };

	const hook = renderHook(() => usePedometer({ availability: false }));
	const handler = listener.mock.calls[0][0];
	act(() => handler(data));

	expect(hook.result.current[DATA]).toMatchObject(data);
});

describe('event listener', () => {
	it('subscribes when mounted', () => {
		const listener = jest.spyOn(Sensors.Pedometer, 'watchStepCount');

		renderHook(() => usePedometer({ availability: false }));

		expect(listener).toBeCalled();
	});

	it('unsubscribes when unmounted', () => {
		const subscription = { remove: jest.fn() };
		jest.spyOn(Sensors.Pedometer, 'watchStepCount').mockReturnValue(subscription);

		const hook = renderHook(() => usePedometer({ availability: false }));
		hook.unmount();

		expect(subscription.remove).toBeCalled();
	});
});

describe('options', () => {
	it('uses initial data', () => {
		const initial = { steps: 10 };
		const hook = renderHook(() => usePedometer({ initial, availability: false }));

		expect(hook.result.current[DATA]).toMatchObject(initial);
	});

	it('skips availability check', () => {
		const checker = jest.spyOn(Sensors.Pedometer, 'isAvailableAsync');

		renderHook(() => usePedometer({ availability: false }));

		expect(checker).not.toBeCalled();
	});
});
