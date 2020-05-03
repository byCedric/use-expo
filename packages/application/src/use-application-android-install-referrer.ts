import { useCallback, useEffect, useState } from 'react';
import { getInstallReferrerAsync } from 'expo-application';

/**
 * Get the referrer URL of the installed app from the Google Play Store.
 * This URL may not be a complete or absolute URL.
 *
 * @see https://docs.expo.io/versions/latest/sdk/application/#applicationgetinstallreferrerasync
 * @see https://developer.android.com/google/play/installreferrer
 * @example const [installReferrer, getInstallReferrer] = useApplicationAndroidInstallReferrer(...);
 */
export function useApplicationAndroidInstallReferrer(
	options: ApplicationAndroidInstallReferrerOptions = {},
): [
	string | undefined,
	() => Promise<void>,
] {
	const [applicationInstallReferrer, setApplicationInstallReferrer] = useState<string>();
	const { get = true } = options;

	const getApplicationInstallReferrer = useCallback(() => (
		getInstallReferrerAsync().then(setApplicationInstallReferrer)
	), []);

	useEffect(() => {
		if (get) {
			getApplicationInstallReferrer();
		}
	}, [get, getApplicationInstallReferrer]);

	return [applicationInstallReferrer, getApplicationInstallReferrer];
}

export interface ApplicationAndroidInstallReferrerOptions {
	/** If it should fetch the application install referrer when mounted, defaults to `true` */
	get?: boolean;
}
