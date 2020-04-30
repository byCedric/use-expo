import { useCallback, useEffect, useState } from 'react';
import * as Application from 'expo-application';

/**
 * Get the referrer URL of the installed app.
 *
 * @see https://docs.expo.io/versions/latest/sdk/application/
 * @example const [installReferrer, getInstallReferrer] = useApplicationAndroidInstallReferrer(...);
 */
export function useApplicationAndroidInstallReferrer(
	options: ApplicationAndroidInstallReferrerOptions = {},
): [
	string | undefined,
	() => Promise<string>,
] {
	const [applicationInstallReferrer, setApplicationInstallReferrer] = useState<string>();
	const { get = true } = options;

	const getApplicationInstallReferrer = useCallback(() => (
		Application.getInstallReferrerAsync().then(referrer => {
			setApplicationInstallReferrer(referrer);
			return referrer;
		})
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
