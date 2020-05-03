import { useCallback, useEffect, useState } from 'react';
import { getIosIdForVendorAsync } from 'expo-application';

/**
 * Get the iOS "identifier for Vendor" (IDFV), an unique ID for device identificiation by app vendor.
 * This ID is changed when the user removed all apps from the vendor.
 *
 * Note, when the device is restarted before unlocking the device this may return no ID.
 *
 * @see https://docs.expo.io/versions/latest/sdk/application/#applicationgetiosidforvendorasync
 * @see https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor
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
