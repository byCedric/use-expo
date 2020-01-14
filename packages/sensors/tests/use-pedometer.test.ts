import { renderHook, act } from '@testing-library/react-hooks';
import * as Sensors from 'expo-sensors';
import { usePedometer, PedometerResult } from '../src/use-pedometer';

const DATA = 0;
const AVAILABLE = 1;

const fakeData = (): PedometerResult => ({
	steps: Math.round(1000 * Math.random()),
});

it('returns default values when mounted', async () => {
	const hook = renderHook(() => usePedometer({ availability: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

describe('listener', () => {
	it('subscribes when mounted', async () => {
		const listener = jest.spyOn(Sensors.Pedometer, 'watchStepCount');

		renderHook(() => usePedometer({ availability: false }));

		expect(listener).toBeCalled();
	});

	it('unsubscribes when unmounted', async () => {
		const subscription = { remove: jest.fn() };
		jest.spyOn(Sensors.Pedometer, 'watchStepCount').mockReturnValue(subscription);

		const hook = renderHook(() => usePedometer({ availability: false }));
		hook.unmount();

		expect(subscription.remove).toBeCalled();
	});

	it('updates data from subscription', async () => {
		const data = fakeData();
		const listener = jest.spyOn(Sensors.Pedometer, 'watchStepCount');

		const hook = renderHook(() => usePedometer({ availability: false }));
		const handler = listener.mock.calls[0][0];
		await act(() => {
			handler(data);
			return hook.waitForNextUpdate();
		});

		expect(hook.result.current[DATA]).toBe(data);
	});
});

describe('availability option', () => {
	it('gets availability info when mounted', async () => {
		jest.spyOn(Sensors.Pedometer, 'isAvailableAsync').mockResolvedValue(true);

		const hook = renderHook(() => usePedometer({ availability: true }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[AVAILABLE]).toBe(true);
	});

	it('gets availability when rerendered', async () => {
		jest.spyOn(Sensors.Pedometer, 'isAvailableAsync').mockResolvedValue(true);

		const hook = renderHook(usePedometer, { initialProps: { availability: false } });
		hook.rerender({ availability: true })
		await hook.waitForNextUpdate();

		expect(hook.result.current[AVAILABLE]).toBe(true);
	});
});

describe('initial option', () => {
	it('uses initial data when mounted', async () => {
		const data = fakeData();
		const hook = renderHook(() => usePedometer({ availability: false, initial: data }));

		expect(hook.result.current[DATA]).toMatchObject(data);
	});

	it('does not change initial data when rerendered', async () => {
		const data = { old: fakeData(), new: fakeData() };
		const hook = renderHook(() => usePedometer({ availability: false, initial: data.old }));
		hook.rerender({ availability: false, initial: data.new })

		expect(hook.result.current[DATA]).toMatchObject(data.old);
	});
});
