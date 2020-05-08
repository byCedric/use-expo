import { renderHook, act } from '@testing-library/react-hooks';
import * as StoreReview from 'expo-store-review';
import { useStoreReviewIsAvailable } from '../src';

const DATA = 0;
const GET = 1;

it('returns data and get callback when mounted', () => {
	const hook = renderHook(() => useStoreReviewIsAvailable({ get: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

describe('get callback', () => {
	it('updates data with get callback', async () => {
		expect.assertions(2);

		jest.spyOn(StoreReview, 'isAvailableAsync').mockResolvedValue(true);

		const hook = renderHook(() => useStoreReviewIsAvailable({ get: false }));
		expect(hook.result.current[DATA]).toBeUndefined();
		await act(() => hook.result.current[GET]());

		expect(hook.result.current[DATA]).toEqual(true);
	});

	it('uses the same get callback when rerendered', async () => {
		const hook = renderHook(() => useStoreReviewIsAvailable({ get: false }));
		const getter = hook.result.current[GET];
		hook.rerender({ get: false });

		expect(getter).toBe(hook.result.current[GET]);
	});
});

describe('get option', () => {
	it('gets store review is available when mounted', async () => {
		expect.assertions(1);

		jest.spyOn(StoreReview, 'isAvailableAsync').mockResolvedValue(true);

		const hook = renderHook(() => useStoreReviewIsAvailable({ get: true }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(true);
	});

	it('updates data with get option when rerendered', async () => {
		expect.assertions(2);

		jest.spyOn(StoreReview, 'isAvailableAsync').mockResolvedValue(true);

		const hook = renderHook(useStoreReviewIsAvailable, { initialProps: { get: false } });
		expect(hook.result.current[DATA]).toBeUndefined();
		hook.rerender({ get: true })
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(true);
	});
});
