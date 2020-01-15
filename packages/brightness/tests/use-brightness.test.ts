import { renderHook, act } from '@testing-library/react-hooks';
import * as Brightness from 'expo-brightness';
import { useBrightness } from '../src';

const DATA = 0
const SET = 1;
const GET = 2;

it('returns data, set and get callbacks when mounted', async () => {
	const hook = renderHook(() => useBrightness({ get: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[SET]).toBeInstanceOf(Function);
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

describe('set callback', () => {
	it('updates data with set callback', async () => {
		const setter = jest.spyOn(Brightness, 'setBrightnessAsync')
			.mockResolvedValue();

		const hook = renderHook(() => useBrightness({ get: false }));
		await act(() => hook.result.current[SET](0.5));

		expect(setter).toBeCalledWith(0.5);
		expect(hook.result.current[DATA]).toBe(0.5);
	});

	it('uses the same set callback when rerendered', async () => {
		const hook = renderHook(() => useBrightness({ get: false }));
		const setter = hook.result.current[SET];
		hook.rerender();

		expect(setter).toBe(hook.result.current[SET]);
	});
});

describe('get callback', () => {
	it('updates data with get callback', async () => {
		jest.spyOn(Brightness, 'getBrightnessAsync')
			.mockResolvedValue(1);

		const hook = renderHook(() => useBrightness({ get: false }));
		expect(hook.result.current[DATA]).toBeUndefined();
		await act(() => hook.result.current[GET]());

		expect(hook.result.current[DATA]).toBe(1);
	});

	it('uses the same get callback when rerendered', async () => {
		const hook = renderHook(() => useBrightness({ get: false }));
		const getter = hook.result.current[GET];
		hook.rerender();

		expect(getter).toBe(hook.result.current[GET]);
	});
});

describe('get option', () => {
	it('updates data with get option when mounted', async () => {
		jest.spyOn(Brightness, 'getBrightnessAsync')
			.mockResolvedValue(1);

		const hook = renderHook(() => useBrightness({ get: true }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(1);
	});

	it('updates data with get option when rerendered', async () => {
		jest.spyOn(Brightness, 'getBrightnessAsync')
			.mockResolvedValue(0.75);

		const hook = renderHook(useBrightness, {
			initialProps: { get: false },
		});
		expect(hook.result.current[DATA]).toBeUndefined();
		hook.rerender({ get: true });
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(0.75);
	});
});
