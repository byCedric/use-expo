import { useCallback, useEffect, useState } from 'react';
import { isAvailableAsync } from 'expo-store-review';

/**
 * Determines if the platform has the capabilities to use request review
 *
 * @see https://docs.expo.io/versions/latest/sdk/storereview/#storereviewisavailableasync
 * @example const [isAvailable, getIsAvailable] = useStoreReviewIsAvailable(...);
 */
export function useStoreReviewIsAvailable(
	options: StoreReviewIsAvailableOptions = {},
): [
	boolean | undefined,
	() => Promise<void>,
] {
	const [storeReviewIsAvailable, setStoreReviewIsAvailable] = useState<boolean>();
	const { get = true } = options;

	const getStoreReviewIsAvailable = useCallback(() => (
		isAvailableAsync().then(setStoreReviewIsAvailable)
	), []);

	useEffect(() => {
		if (get) {
			getStoreReviewIsAvailable();
		}
	}, [get, getStoreReviewIsAvailable]);

	return [storeReviewIsAvailable, getStoreReviewIsAvailable];
}

export interface StoreReviewIsAvailableOptions {
	/** If it should fetch the store review is available when mounted, defaults to `true` */
	get?: boolean;
}
