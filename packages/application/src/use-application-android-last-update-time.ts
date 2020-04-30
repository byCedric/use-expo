import { useCallback, useEffect, useState } from 'react';
import * as Application from 'expo-application';

/**
 * Get the time the app was last updated via the Google Play Store
 *
 * @see https://docs.expo.io/versions/latest/sdk/application/
 * @example const [lastUpdateTime, getLastUpdateTime] = useApplicationAndroidLastUpdateTime(...);
 */
export function useApplicationAndroidLastUpdateTime(
	options: ApplicationAndroidLastUpdateTimeOptions = {},
): [
	Date | undefined,
	() => Promise<Date>,
] {
	const [applicationLastUpdateTime, setApplicationLastUpdateTime] = useState<Date>();
	const { get = true } = options;

	const getApplicationLastUpdateTime = useCallback(() => (
		Application.getLastUpdateTimeAsync().then(date => {
			setApplicationLastUpdateTime(date);
			return date;
		})
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
