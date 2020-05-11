import { useCallback } from 'react';
import * as StoreReview from 'expo-store-review';

/**
 * Request a store review if the app manifest has the appropriate fields.
 * Ideally, this will open a native modal with the rating form without leaving the app.
 * On Android and iOS <10.3, this will link the user to the store URL.
 *   - On Android, this is the `android.playStoreUrl` field.
 *   - For iOS, this is the `ios.appStoreUrl` field.
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
