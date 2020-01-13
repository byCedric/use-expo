import { renderHook, act } from '@testing-library/react-hooks';
import * as Brightness from 'expo-brightness';
import { useSystemBrightness } from '../src/use-system-brightness';

const DATA = 0
const SET = 1;
const GET = 2;

it('returns data, set and get callbacks when mounted', async () => {
	const hook = renderHook(() => useSystemBrightness({ get: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[SET]).toBeInstanceOf(Function);
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

it('updates data with set callback', async () => {
	const setter = jest.spyOn(Brightness, 'setSystemBrightnessAsync').mockResolvedValue();

	const hook = renderHook(() => useSystemBrightness({ get: false }));
	await act(() => hook.result.current[SET](0.5));

	expect(setter).toBeCalledWith(0.5);
	expect(hook.result.current[DATA]).toBe(0.5);
});

it('updates data with get callback', async () => {
	const getter = jest.spyOn(Brightness, 'getSystemBrightnessAsync')
		.mockResolvedValueOnce(1)
		.mockResolvedValueOnce(0.5);

	const hook = renderHook(() => useSystemBrightness());
	await hook.waitForNextUpdate();

	expect(hook.result.current[DATA]).toBe(1);

	await act(() => hook.result.current[GET]());

	expect(getter).toBeCalledTimes(2);
	expect(hook.result.current[DATA]).toBe(0.5);
});

describe('options', () => {
	it('updates data with get callback, after initial render', async () => {
		jest.spyOn(Brightness, 'getSystemBrightnessAsync').mockResolvedValue(0.75);

		const hook = renderHook(
			props => useSystemBrightness(props),
			{ initialProps: { get: false } },
		);

		expect(hook.result.current[DATA]).toBeUndefined();

		hook.rerender({ get: true });
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(0.75);
	});
});
