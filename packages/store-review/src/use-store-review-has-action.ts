import { useCallback, useEffect, useState } from 'react';
import { hasAction } from 'expo-store-review';

/**
 * Determines if the store review can perform any action.
 * This hook returns `false` when the app manifest doesn't have the store URLs for the platform.
 *   - On Android, this is the `android.playStoreUrl` field.
 *   - For iOS, this is the `ios.appStoreUrl` field.
 *
 * @see https://docs.expo.io/versions/latest/sdk/storereview/#storereviewhasaction
 * @example const [hasAction, getHasAction] = useStoreReviewHasAction(...);
 */
export function useStoreReviewHasAction(
	options: StoreReviewHasActionOptions = {},
): [
	boolean | undefined,
	() => Promise<void>,
] {
	const [storeReviewHasAction, setStoreReviewHasAction] = useState<boolean>();
	const { get = true } = options;

	const getStoreReviewHasAction = useCallback(() => (
		hasAction().then(setStoreReviewHasAction)
	), []);

	useEffect(() => {
		if (get) {
			getStoreReviewHasAction();
		}
	}, [get, getStoreReviewHasAction]);

	return [storeReviewHasAction, getStoreReviewHasAction];
}

export interface StoreReviewHasActionOptions {
	/** If it should fetch the store review has action when mounted, defaults to `true` */
	get?: boolean;
}
