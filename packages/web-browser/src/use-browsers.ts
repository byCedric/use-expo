import { getCustomTabsSupportingBrowsersAsync } from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

/**
 * Get a list of valid browser packages on Android.
 * This hook will always return an array, even when no browsers are available.
 *
 * @see https://docs.expo.io/versions/latest/sdk/webbrowser/#webbrowsergetcustomtabssupportingbrowsers
 * @remarks This only works on Android.
 * @example const browsers = useBrowsers();
 */
export function useBrowsers(): string[] {
	const [browsers, setBrowsers] = useState<string[]>([]);

	useEffect(() => {
		if (Platform.OS !== 'android') {
			return;
		}

		getCustomTabsSupportingBrowsersAsync().then(
			result => setBrowsers(result.browserPackages),
		);
	}, []);

	return browsers;
}
