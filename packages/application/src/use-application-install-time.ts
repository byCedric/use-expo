import { useCallback, useEffect, useState } from 'react';
import * as Application from 'expo-application';

/**
 * Get the time the app was installed on the device.
 *
 * @see https://docs.expo.io/versions/latest/sdk/application/
 * @example const [installTime, getInstallTime] = useApplicationInstallTime(...);
 */
export function useApplicationInstallTime(
	options: ApplicationInstallTimeOptions = {},
): [
	Date | undefined,
	() => Promise<Date>,
] {
	const [applicationInstallTime, setApplicationInstallTime] = useState<Date>();
	const { get = true } = options;

	const getApplicationInstallTime = useCallback(() => (
		Application.getInstallationTimeAsync().then(date => {
			setApplicationInstallTime(date);
			return date;
		})
	), []);

	useEffect(() => {
		if (get) {
			getApplicationInstallTime();
		}
	}, [get, getApplicationInstallTime]);

	return [applicationInstallTime, getApplicationInstallTime];
}

export interface ApplicationInstallTimeOptions {
	/** If it should fetch the application install time when mounted, defaults to `true` */
	get?: boolean;
}
