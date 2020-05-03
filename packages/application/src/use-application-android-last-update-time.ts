import { useCallback, useEffect, useState } from 'react';
import { getLastUpdateTimeAsync } from 'expo-application';

/**
 * Get the time the app was last updated via the Google Play Store.
 *
 * @see https://docs.expo.io/versions/latest/sdk/application/#applicationgetlastupdatetimeasync
 * @example const [lastUpdateTime, getLastUpdateTime] = useApplicationAndroidLastUpdateTime(...);
 */
export function useApplicationAndroidLastUpdateTime(
	options: ApplicationAndroidLastUpdateTimeOptions = {},
): [
	Date | undefined,
	() => Promise<void>,
] {
	const [applicationLastUpdateTime, setApplicationLastUpdateTime] = useState<Date>();
	const { get = true } = options;

	const getApplicationLastUpdateTime = useCallback(() => (
		getLastUpdateTimeAsync().then(setApplicationLastUpdateTime)
	), []);

	useEffect(() => {
		if (get) {
			getApplicationLastUpdateTime();
		}
	}, [get, getApplicationLastUpdateTime]);

	return [applicationLastUpdateTime, getApplicationLastUpdateTime];
}

export interface ApplicationAndroidLastUpdateTimeOptions {
	/** If it should fetch the application last update time when mounted, defaults to `true` */
	get?: boolean;
}
