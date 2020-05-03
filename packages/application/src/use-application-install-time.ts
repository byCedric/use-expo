import { useCallback, useEffect, useState } from 'react';
import { getInstallationTimeAsync } from 'expo-application';

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
	() => Promise<void>,
] {
	const [applicationInstallTime, setApplicationInstallTime] = useState<Date>();
	const { get = true } = options;

	const getApplicationInstallTime = useCallback(() => (
		getInstallationTimeAsync().then(setApplicationInstallTime)
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
