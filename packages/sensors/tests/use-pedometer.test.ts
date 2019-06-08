const { Pedometer } = jest.genMockFromModule('expo-sensors');
const Subscription = { remove: jest.fn() };

Pedometer.watchStepCount.mockReturnValue(Subscription);
jest.mock('expo-sensors', () => ({ Pedometer }));

import { renderHook, act } from 'react-hooks-testing-library';
import { usePedometer } from '../src/use-pedometer';

describe('event listener', () => {
	test('is added when mounted', () => {
		renderHook(usePedometer);
		expect(Pedometer.watchStepCount).toBeCalled();
	});

	test('is removed when unmounted', () => {
		const hook = renderHook(usePedometer);

		hook.unmount();
		expect(Subscription.remove).toBeCalled();
	});

	test('handles new data', async () => {
		const hook = renderHook(usePedometer);
		const handler = Pedometer.watchStepCount.mock.calls[0][0];
		const newData = { steps: 5 };

		act(() => handler(newData));
		expect(hook.result.current).toMatchObject(newData);
	});
});

describe('options', () => {
	test('initial data is returned', () => {
		const initialData = { steps: 10 };
		const hook = renderHook(() => usePedometer({ initialData }));

		expect(hook.result.current).toMatchObject(initialData);
	});
});
