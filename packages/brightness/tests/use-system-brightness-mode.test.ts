import { renderHook, act } from '@testing-library/react-hooks';
import * as Brightness from 'expo-brightness';
import { useSystemBrightnessMode } from '../src/use-system-brightness-mode';

const DATA = 0
const SET = 1;
const GET = 2;

it('returns data, set and get callbacks when mounted', async () => {
	const hook = renderHook(() => useSystemBrightnessMode({ get: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[SET]).toBeInstanceOf(Function);
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

it('updates data with set callback', async () => {
	const setter = jest.spyOn(Brightness, 'setSystemBrightnessModeAsync').mockResolvedValue();

	const hook = renderHook(() => useSystemBrightnessMode({ get: false }));
	await act(() => hook.result.current[SET](Brightness.BrightnessMode.AUTOMATIC));

	expect(setter).toBeCalledWith(Brightness.BrightnessMode.AUTOMATIC);
	expect(hook.result.current[DATA]).toBe(Brightness.BrightnessMode.AUTOMATIC);
});

it('updates data with get callback', async () => {
	const getter = jest.spyOn(Brightness, 'getSystemBrightnessModeAsync')
		.mockResolvedValueOnce(Brightness.BrightnessMode.AUTOMATIC)
		.mockResolvedValueOnce(Brightness.BrightnessMode.MANUAL);

	const hook = renderHook(useSystemBrightnessMode);
	await hook.waitForNextUpdate();

	expect(hook.result.current[DATA]).toBe(Brightness.BrightnessMode.AUTOMATIC);

	await act(() => hook.result.current[GET]());

	expect(getter).toBeCalledTimes(2);
	expect(hook.result.current[DATA]).toBe(Brightness.BrightnessMode.MANUAL);
});
