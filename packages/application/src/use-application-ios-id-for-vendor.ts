import { useCallback, useEffect, useState } from 'react';
import { getIosIdForVendorAsync } from 'expo-application';

/**
 * Get the app's vendor ID.
 *
 * @see https://docs.expo.io/versions/latest/sdk/application/
 * @example const [vendorId, getVendorId] = useApplicationIosIdForVendor(...);
 */
export function useApplicationIosIdForVendor(
	options: ApplicationIosIdForVendorOptions = {},
): [
	string | undefined,
	() => Promise<void>,
] {
	const [applicationIdForVendor, setApplicationIdForVendor] = useState<string>();
	const { get = true } = options;

	const getApplicationIdForVendor = useCallback(() => (
		getIosIdForVendorAsync().then(setApplicationIdForVendor)
	), []);

	useEffect(() => {
		if (get) {
			getApplicationIdForVendor();
		}
	}, [get, getApplicationIdForVendor]);

	return [applicationIdForVendor, getApplicationIdForVendor];
}

export interface ApplicationIosIdForVendorOptions {
	/** If it should fetch the application vendor id when mounted, defaults to `true` */
	get?: boolean;
}
