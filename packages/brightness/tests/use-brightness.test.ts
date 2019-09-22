import { renderHook, act } from '@testing-library/react-hooks';
import * as Brightness from 'expo-brightness';
import { useBrightness } from '../src/use-brightness';

jest.mock('expo-brightness');

const DATA = 0
const SET = 1;
const GET = 2;

test('returns state, set and get callbacks when mounted', async () => {
	(Brightness.getBrightnessAsync as jest.Mock).mockResolvedValue(1);

	const hook = renderHook(useBrightness);
	await hook.waitForNextUpdate();

	// expect(hook.result.current[DATA]).toBe(1);
	expect(hook.result.current[SET]).toBeInstanceOf(Function);
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

test('handles state with set callback', async () => {
	(Brightness.getBrightnessAsync as jest.Mock).mockResolvedValue(1);
	(Brightness.setBrightnessAsync as jest.Mock).mockResolvedValue(undefined);

	const hook = renderHook(useBrightness);
	act(() => { hook.result.current[SET](0.5) });
	await hook.waitForNextUpdate();

	expect(Brightness.setBrightnessAsync).toBeCalledWith(0.5);
	expect(hook.result.current[DATA]).toBe(0.5);
});

test('handles state with get callback', async () => {
	(Brightness.getBrightnessAsync as jest.Mock)
		.mockResolvedValueOnce(1)
		.mockResolvedValueOnce(0.5);

	const hook = renderHook(useBrightness);
	act(() => { hook.result.current[GET]() });
	await hook.waitForNextUpdate();

	expect(Brightness.getBrightnessAsync).toBeCalledTimes(2);
	expect(hook.result.current[DATA]).toBe(0.5);
});

test('gets is skipped', () => {
	renderHook(() => useBrightness({ get: false }));
	expect(Brightness.getBrightnessAsync).not.toBeCalled();
});
