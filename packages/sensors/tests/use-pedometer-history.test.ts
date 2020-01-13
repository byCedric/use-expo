import { renderHook } from '@testing-library/react-hooks';
import * as Sensors from 'expo-sensors';
import { usePedometerHistory } from '../src/use-pedometer-history';

const DATA = 0;
const AVAILABLE = 1;

const start = new Date();
const end = new Date(Number(start) + 5000);

it('returns data and availability when mounted', async () => {
	const getter = jest.spyOn(Sensors.Pedometer, 'getStepCountAsync').mockResolvedValue({ steps: 1 });

	const hook = renderHook(() => usePedometerHistory(start, end, { availability: false }));
	await hook.waitForNextUpdate();

	expect(getter).toBeCalledWith(start, end);
	expect(hook.result.current[DATA]).toMatchObject({ steps: 1 });
	expect(hook.result.current[AVAILABLE]).toBeUndefined();
});

it('updates pedometer availability', async () => {
	jest.spyOn(Sensors.Pedometer, 'isAvailableAsync').mockResolvedValue(true);

	const hook = renderHook(() => usePedometerHistory(start, end));
	await hook.waitForNextUpdate();

	expect(hook.result.current[AVAILABLE]).toBe(true);
});

describe('options', () => {
	// todo: refactor fetching data async loop to avoid warnings
	it('uses initial data', () => {
		const initial = { steps: 10 };
		const hook = renderHook(() => usePedometerHistory(start, end, { initial, availability: false }));

		expect(hook.result.current[DATA]).toMatchObject(initial);
	});

	// todo: refactor fetching data async loop to avoid warnings
	it('skips availability check', () => {
		const checker = jest.spyOn(Sensors.Pedometer, 'isAvailableAsync');

		renderHook(() => usePedometerHistory(start, end, { availability: false }));

		expect(checker).not.toBeCalled();
	});
});
