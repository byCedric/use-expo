import { renderHook, act } from '@testing-library/react-hooks';
import * as Brightness from 'expo-brightness';
import { useSystemBrightnessMode } from '../src/use-system-brightness-mode';

jest.mock('expo-brightness');

const DATA = 0
const SET = 1;
const GET = 2;

test('returns state, set and get callbacks when mounted', async () => {
	(Brightness.getSystemBrightnessModeAsync as jest.Mock).mockResolvedValue(Brightness.BrightnessMode.MANUAL);

	const hook = renderHook(useSystemBrightnessMode);
	await hook.waitForNextUpdate();

	expect(hook.result.current[DATA]).toBe(Brightness.BrightnessMode.MANUAL);
	expect(hook.result.current[SET]).toBeInstanceOf(Function);
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

test('handles state with set callback', async () => {
	(Brightness.getSystemBrightnessModeAsync as jest.Mock).mockResolvedValue(Brightness.BrightnessMode.MANUAL);
	(Brightness.setSystemBrightnessModeAsync as jest.Mock).mockResolvedValue(undefined);

	const hook = renderHook(useSystemBrightnessMode);
	act(() => { hook.result.current[SET](Brightness.BrightnessMode.AUTOMATIC) });
	await hook.waitForNextUpdate();

	expect(Brightness.setSystemBrightnessModeAsync).toBeCalledWith(Brightness.BrightnessMode.AUTOMATIC);
	expect(hook.result.current[DATA]).toBe(Brightness.BrightnessMode.AUTOMATIC);
});

test('handles state with get callback', async () => {
	(Brightness.getSystemBrightnessModeAsync as jest.Mock)
		.mockResolvedValueOnce(Brightness.BrightnessMode.AUTOMATIC)
		.mockResolvedValueOnce(Brightness.BrightnessMode.MANUAL);

	const hook = renderHook(useSystemBrightnessMode);
	act(() => { hook.result.current[GET]() });
	await hook.waitForNextUpdate();

	expect(Brightness.getSystemBrightnessModeAsync).toBeCalledTimes(2);
	expect(hook.result.current[DATA]).toBe(Brightness.BrightnessMode.MANUAL);
});

test('gets is skipped', () => {
	renderHook(() => useSystemBrightnessMode({ get: false }));
	expect(Brightness.getSystemBrightnessModeAsync).not.toBeCalled();
});
