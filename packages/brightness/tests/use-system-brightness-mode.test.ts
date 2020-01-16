import { renderHook, act } from '@testing-library/react-hooks';
import * as Brightness from 'expo-brightness';
import { useSystemBrightnessMode } from '../src';

const DATA = 0
const SET = 1;
const GET = 2;

it('returns data, set and get callbacks when mounted', async () => {
	const hook = renderHook(() => useSystemBrightnessMode({ get: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[SET]).toBeInstanceOf(Function);
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

describe('set callback', () => {
	it('updates data with set callback', async () => {
		const setter = jest.spyOn(Brightness, 'setSystemBrightnessModeAsync')
			.mockResolvedValue();

		const hook = renderHook(() => useSystemBrightnessMode({ get: false }));
		await act(() => hook.result.current[SET](Brightness.BrightnessMode.AUTOMATIC));

		expect(setter).toBeCalledWith(Brightness.BrightnessMode.AUTOMATIC);
		expect(hook.result.current[DATA]).toBe(Brightness.BrightnessMode.AUTOMATIC);
	});

	it('uses the same set callback when rerendered', async () => {
		const hook = renderHook(() => useSystemBrightnessMode({ get: false }));
		const setter = hook.result.current[SET];
		hook.rerender();

		expect(setter).toBe(hook.result.current[SET]);
	});
});

describe('get callback', () => {
	it('updates data with get callback', async () => {
		jest.spyOn(Brightness, 'getSystemBrightnessModeAsync')
			.mockResolvedValue(Brightness.BrightnessMode.AUTOMATIC);

		const hook = renderHook(() => useSystemBrightnessMode({ get: false }));
		expect(hook.result.current[DATA]).toBeUndefined();
		await act(() => hook.result.current[GET]());

		expect(hook.result.current[DATA]).toBe(Brightness.BrightnessMode.AUTOMATIC);
	});

	it('uses the same get callback when rerendered', async () => {
		const hook = renderHook(() => useSystemBrightnessMode({ get: false }));
		const getter = hook.result.current[SET];
		hook.rerender();

		expect(getter).toBe(hook.result.current[SET]);
	});
});

describe('get option', () => {
	it('updates data with get option when mounted', async () => {
		jest.spyOn(Brightness, 'getSystemBrightnessModeAsync')
			.mockResolvedValue(Brightness.BrightnessMode.MANUAL);

		const hook = renderHook(() => useSystemBrightnessMode({ get: true }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(Brightness.BrightnessMode.MANUAL);
	});

	it('updates data with get option when rerendered', async () => {
		jest.spyOn(Brightness, 'getSystemBrightnessModeAsync')
			.mockResolvedValue(Brightness.BrightnessMode.MANUAL);

		const hook = renderHook(useSystemBrightnessMode, {
			initialProps: { get: false },
		});
		expect(hook.result.current[DATA]).toBeUndefined();
		hook.rerender({ get: true });
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(Brightness.BrightnessMode.MANUAL);
	});
});
