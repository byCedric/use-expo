import { renderHook, act } from '@testing-library/react-hooks';
import * as Application from 'expo-application';
import { useApplicationAndroidLastUpdateTime } from '../src';

const DATA = 0;
const GET = 1;

const lastUpdateTime = new Date('2020-04-26 00:00:00');

it('returns data and get callback when mounted', () => {
	const hook = renderHook(() => useApplicationAndroidLastUpdateTime({ get: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

describe('get callback', () => {
	it('updates data with get callback', async () => {
		jest.spyOn(Application, 'getLastUpdateTimeAsync')
			.mockResolvedValue(lastUpdateTime);

		const hook = renderHook(() => useApplicationAndroidLastUpdateTime({ get: false }));
		expect(hook.result.current[DATA]).toBeUndefined();
		await act(() => hook.result.current[GET]());

		expect(hook.result.current[DATA]).toMatchObject(lastUpdateTime);
	});

	it('uses the same get callback when rerendered', async () => {
		const hook = renderHook(() => useApplicationAndroidLastUpdateTime({ get: false }));
		const getter = hook.result.current[GET];
		hook.rerender({ get: false });

		expect(getter).toBe(hook.result.current[GET]);
	});
});

describe('get option', () => {
	it('gets application last update time when mounted', async () => {
		jest.spyOn(Application, 'getLastUpdateTimeAsync')
			.mockResolvedValue(lastUpdateTime);

		const hook = renderHook(() => useApplicationAndroidLastUpdateTime({ get: true }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(lastUpdateTime);
	});

	it('updates data with get option when rerendered', async () => {
		jest.spyOn(Application, 'getLastUpdateTimeAsync')
			.mockResolvedValue(lastUpdateTime);

		const hook = renderHook(useApplicationAndroidLastUpdateTime, { initialProps: { get: false } });
		expect(hook.result.current[DATA]).toBeUndefined();
		hook.rerender({ get: true })
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(lastUpdateTime);
	});
});
