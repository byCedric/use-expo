import { renderHook, act } from '@testing-library/react-hooks';
import * as Brightness from 'expo-brightness';
import { useBrightness } from '../src/use-brightness';

const DATA = 0
const SET = 1;
const GET = 2;

it('returns data, set and get callbacks when mounted', async () => {
	const hook = renderHook(() => useBrightness({ get: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[SET]).toBeInstanceOf(Function);
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

it('updates data with set callback', async () => {
	const setter = jest.spyOn(Brightness, 'setBrightnessAsync').mockResolvedValue();

	const hook = renderHook(() => useBrightness({ get: false }));
	await act(() => hook.result.current[SET](0.5));

	expect(setter).toBeCalledWith(0.5);
	expect(hook.result.current[DATA]).toBe(0.5);
});

it('updates data with get callback', async () => {
	const getter = jest.spyOn(Brightness, 'getBrightnessAsync')
		.mockResolvedValueOnce(1)
		.mockResolvedValueOnce(0.5);

	const hook = renderHook(() => useBrightness());
	await hook.waitForNextUpdate();

	expect(hook.result.current[DATA]).toBe(1);

	await act(() => hook.result.current[GET]());

	expect(getter).toBeCalledTimes(2);
	expect(hook.result.current[DATA]).toBe(0.5);
});
