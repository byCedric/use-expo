import { renderHook, act } from '@testing-library/react-hooks';
import * as Sensors from 'expo-sensors';
import { useAccelerometer } from '../src/use-accelerometer';

const DATA = 0;
const AVAILABLE = 1;

const fakeData = (): Sensors.ThreeAxisMeasurement => ({
	x: Math.random(),
	y: Math.random(),
	z: Math.random(),
});

it('returns default values when mounted', async () => {
	const hook = renderHook(() => useAccelerometer({ availability: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

describe('listener', () => {
	it('subscribes when mounted', async () => {
		const listener = jest.spyOn(Sensors.Accelerometer, 'addListener');

		renderHook(() => useAccelerometer({ availability: false }));

		expect(listener).toBeCalled();
	});

	it('unsubscribes when unmounted', async () => {
		const subscription = { remove: jest.fn() };
		jest.spyOn(Sensors.Accelerometer, 'addListener').mockReturnValue(subscription);

		const hook = renderHook(() => useAccelerometer({ availability: false }));
		hook.unmount();

		expect(subscription.remove).toBeCalled();
	});

	it('updates data from subscription', async () => {
		const data = fakeData();
		const listener = jest.spyOn(Sensors.Accelerometer, 'addListener');

		const hook = renderHook(() => useAccelerometer({ availability: false }));
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
		jest.spyOn(Sensors.Accelerometer, 'isAvailableAsync').mockResolvedValue(true);

		const hook = renderHook(() => useAccelerometer({ availability: true }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[AVAILABLE]).toBe(true);
	});

	it('gets availability when rerendered', async () => {
		jest.spyOn(Sensors.Accelerometer, 'isAvailableAsync').mockResolvedValue(true);

		const hook = renderHook(useAccelerometer, { initialProps: { availability: false } });
		hook.rerender({ availability: true })
		await hook.waitForNextUpdate();

		expect(hook.result.current[AVAILABLE]).toBe(true);
	});
});

describe('initial option', () => {
	it('uses initial data when mounted', async () => {
		const data = fakeData();
		const hook = renderHook(() => useAccelerometer({ availability: false, initial: data }));

		expect(hook.result.current[DATA]).toMatchObject(data);
	});

	it('does not change initial data when rerendered', async () => {
		const data = { old: fakeData(), new: fakeData() };
		const hook = renderHook(() => useAccelerometer({ availability: false, initial: data.old }));
		hook.rerender({ availability: false, initial: data.new })

		expect(hook.result.current[DATA]).toMatchObject(data.old);
	});
});

describe('interval option', () => {
	it('sets interval duration when mounted', async () => {
		const setter = jest.spyOn(Sensors.Accelerometer, 'setUpdateInterval');

		renderHook(() => useAccelerometer({ availability: false, interval: 1500 }));

		expect(setter).toBeCalledWith(1500);
	});

	it('changes interval duration when rerendered', async () => {
		const setter = jest.spyOn(Sensors.Accelerometer, 'setUpdateInterval');

		const hook = renderHook(useAccelerometer, { initialProps: { availability: false } });
		hook.rerender({ availability: false, interval: 750 });

		expect(setter).toBeCalledWith(750);
	});
});
