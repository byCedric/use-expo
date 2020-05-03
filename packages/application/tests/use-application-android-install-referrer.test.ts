import { renderHook, act } from '@testing-library/react-hooks';
import * as Application from 'expo-application';
import { useApplicationAndroidInstallReferrer } from '../src';

const DATA = 0;
const GET = 1;

const referrer = 'utm_source=google-play&utm_medium=organic';

it('returns data and get callback when mounted', () => {
	const hook = renderHook(() => useApplicationAndroidInstallReferrer({ get: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

describe('get callback', () => {
	it('updates data with get callback', async () => {
		jest.spyOn(Application, 'getInstallReferrerAsync')
			.mockResolvedValue(referrer);

		const hook = renderHook(() => useApplicationAndroidInstallReferrer({ get: false }));
		expect(hook.result.current[DATA]).toBeUndefined();
		await act(() => hook.result.current[GET]());

		expect(hook.result.current[DATA]).toEqual(referrer);
	});

	it('uses the same get callback when rerendered', async () => {
		const hook = renderHook(() => useApplicationAndroidInstallReferrer({ get: false }));
		const getter = hook.result.current[GET];
		hook.rerender({ get: false });

		expect(getter).toBe(hook.result.current[GET]);
	});
});

describe('get option', () => {
	it('gets application install referrer when mounted', async () => {
		jest.spyOn(Application, 'getInstallReferrerAsync')
			.mockResolvedValue(referrer);

		const hook = renderHook(() => useApplicationAndroidInstallReferrer({ get: true }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(referrer);
	});

	it('updates data with get option when rerendered', async () => {
		jest.spyOn(Application, 'getInstallReferrerAsync')
			.mockResolvedValue(referrer);

		const hook = renderHook(useApplicationAndroidInstallReferrer, { initialProps: { get: false } });
		expect(hook.result.current[DATA]).toBeUndefined();
		hook.rerender({ get: true })
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(referrer);
	});
});
