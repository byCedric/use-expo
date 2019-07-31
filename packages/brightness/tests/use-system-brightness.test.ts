import { renderHook, act } from '@testing-library/react-hooks';
import * as Brightness from 'expo-brightness';
import { useSystemBrightness } from '../src/use-system-brightness';

jest.mock('expo-brightness');

const DATA = 0
const SET = 1;
const GET = 2;

test('returns state, set and get callbacks when mounted', async () => {
	(Brightness.getSystemBrightnessAsync as jest.Mock).mockResolvedValue(1);

	const hook = renderHook(useSystemBrightness);
	await hook.waitForNextUpdate();

	expect(hook.result.current[DATA]).toBe(1);
	expect(hook.result.current[SET]).toBeInstanceOf(Function);
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

test('handles state with set callback', async () => {
	(Brightness.getSystemBrightnessAsync as jest.Mock).mockResolvedValue(1);
	(Brightness.setSystemBrightnessAsync as jest.Mock).mockResolvedValue(undefined);

	const hook = renderHook(useSystemBrightness);
	act(() => { hook.result.current[SET](0.5) });
	await hook.waitForNextUpdate();

	expect(Brightness.setSystemBrightnessAsync).toBeCalledWith(0.5);
	expect(hook.result.current[DATA]).toBe(0.5);
});

test('handles state with get callback', async () => {
	(Brightness.getSystemBrightnessAsync as jest.Mock)
		.mockResolvedValueOnce(1)
		.mockResolvedValueOnce(0.5);

	const hook = renderHook(useSystemBrightness);
	act(() => { hook.result.current[GET]() });
	await hook.waitForNextUpdate();

	expect(Brightness.getSystemBrightnessAsync).toBeCalledTimes(2);
	expect(hook.result.current[DATA]).toBe(0.5);
});

test('gets is skipped', () => {
	renderHook(() => useSystemBrightness({ get: false }));
	expect(Brightness.getSystemBrightnessAsync).not.toBeCalled();
});
