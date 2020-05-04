import { useCallback } from 'react';
import * as StoreReview from 'expo-store-review';

/**
 * Request a store review if available
 *
 * @see https://docs.expo.io/versions/latest/sdk/storereview/#storereviewrequestreview
 * @example const requestReview = useStoreReviewRequest();
 */
export function useStoreReviewRequest(): () => Promise<boolean> {
	return useCallback(async () => {
		const hasAction = await StoreReview.hasAction();
		if (hasAction) {
			await StoreReview.requestReview();
		}

		return hasAction;
	}, []);
}
