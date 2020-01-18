import { renderHook, act } from '@testing-library/react-hooks';
import * as Sensors from 'expo-sensors';
import { PedometerResult } from '../src/use-pedometer';
import { usePedometerHistory, PedometerHistpryOptions } from '../src/use-pedometer-history';

const DATA = 0;
const AVAILABLE = 1;

const fakeInput = (): Pick<PedometerHistpryOptions, 'start' | 'end'> => {
	const limit = new Date('2016-01-01T12:00:00+00:00');
	const start = new Date(limit.getTime() + (Date.now() - limit.getTime()) * Math.random());
	const end = new Date(start.getTime() + (Date.now() - start.getTime()) * Math.random());

	return { start, end };
};

const fakeData = (): PedometerResult => ({
	steps: Math.round(1000 * Math.random()),
});

it('returns default values when mounted', async () => {
	const hook = renderHook(() => usePedometerHistory({ availability: false, ...fakeInput() }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

describe('availability option', () => {
	it('gets availability info when mounted', async () => {
		jest.spyOn(Sensors.Pedometer, 'isAvailableAsync').mockResolvedValue(true);

		const hook = renderHook(() => usePedometerHistory({ availability: true, ...fakeInput() }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[AVAILABLE]).toBe(true);
	});

	it('gets availability when rerendered', async () => {
		jest.spyOn(Sensors.Pedometer, 'isAvailableAsync').mockResolvedValue(true);

		const hook = renderHook(usePedometerHistory, { initialProps: { availability: false, ...fakeInput() } });
		hook.rerender({ availability: true, ...fakeInput() });
		await hook.waitForNextUpdate();

		expect(hook.result.current[AVAILABLE]).toBe(true);
	});
});

describe('initial option', () => {
	it('uses initial data when mounted', async () => {
		const data = fakeData();
		jest.spyOn(Sensors.Pedometer, 'getStepCountAsync').mockResolvedValue(fakeData());

		const hook = renderHook(() => usePedometerHistory({ availability: false, initial: data, ...fakeInput() }));

		expect(hook.result.current[DATA]).toMatchObject(data);

		// note: to prevent updates on hook outside test loop, wait for the hook to update
		await hook.waitForNextUpdate();
	});

	it('does not change initial data when rerendered', async () => {
		const data = { old: fakeData(), new: fakeData() };
		jest.spyOn(Sensors.Pedometer, 'getStepCountAsync').mockResolvedValue(data.old);

		const hook = renderHook(() => usePedometerHistory({ availability: false, initial: data.old, ...fakeInput() }));
		await act(() => {
			hook.rerender({ availability: false, initial: data.new, ...fakeInput() });
			return hook.waitForNextUpdate();
		});

		expect(hook.result.current[DATA]).toMatchObject(data.old);
	});
});

describe('start and end options', () => {
	it('uses data from date range when mounted', async () => {
		const data = fakeData();
		const input = fakeInput();
		const getter = jest.spyOn(Sensors.Pedometer, 'getStepCountAsync').mockResolvedValue(data);

		const hook = renderHook(() => usePedometerHistory({ availability: false, ...input }));
		await hook.waitForNextUpdate();

		expect(getter).toBeCalledWith(input.start, input.end);
		expect(hook.result.current[DATA]).toBe(data);
	});

	it('changes data from new date range when rerendered', async () => {
		const data = { old: fakeData(), new: fakeData() };
		const input = { old: fakeInput(), new: fakeInput() };
		const getter = jest.spyOn(Sensors.Pedometer, 'getStepCountAsync')
			.mockResolvedValueOnce(data.old)
			.mockResolvedValueOnce(data.new);

		const hook = renderHook(usePedometerHistory, { initialProps: { availability: false, ...input.old } });
		await hook.waitForNextUpdate();
		await act(() => {
			hook.rerender({ availability: false, ...input.new });
			return hook.waitForNextUpdate();
		});

		expect(getter).toBeCalledWith(input.new.start, input.new.end);
		expect(hook.result.current[DATA]).toBe(data.new);
	});
});
