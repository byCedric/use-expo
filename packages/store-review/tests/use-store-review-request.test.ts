import { renderHook } from '@testing-library/react-hooks';
import * as StoreReview from 'expo-store-review';
import { useStoreReviewRequest } from '../src';

it('returns request function', () => {
	const hook = renderHook(() => useStoreReviewRequest());

	expect(hook.result.current).toBeInstanceOf(Function);
});

describe('request function', () => {
	it('calls request review if available', async () => {
		expect.assertions(3);

		const hasActionSpy = jest.spyOn(StoreReview, 'hasAction').mockResolvedValue(true);
		const requestReviewSpy = jest.spyOn(StoreReview, 'requestReview').mockResolvedValue();

		const hook = renderHook(() => useStoreReviewRequest());
		const isRequested = await hook.result.current();

		expect(hasActionSpy).toHaveBeenCalled();
		expect(requestReviewSpy).toHaveBeenCalled();
		expect(isRequested).toEqual(true);
	});

	it('does not call request review if not available', async () => {
		expect.assertions(3);

		const hasActionSpy = jest.spyOn(StoreReview, 'hasAction').mockResolvedValue(false);
		const requestReviewSpy = jest.spyOn(StoreReview, 'requestReview').mockResolvedValue();

		const hook = renderHook(() => useStoreReviewRequest());
		const isRequested = await hook.result.current();

		expect(hasActionSpy).toHaveBeenCalled();
		expect(requestReviewSpy).not.toHaveBeenCalled();
		expect(isRequested).toEqual(false);
	});
});
