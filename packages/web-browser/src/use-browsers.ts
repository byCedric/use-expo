import { getCustomTabsSupportingBrowsersAsync } from "expo-web-browser";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

/**
 * Get a list of valid browser packages on Android.
 *
 * @see https://docs.expo.io/versions/latest/sdk/webbrowser/#webbrowsergetcustomtabssupportingbrowsers
 * @remarks This only works on Android.
 * @example const browsers = useBrowsers();
 */
export function useBrowsers(): string[] | null {
	const [browsers, setBrowsers] = useState<string[] | null>(null);

	useEffect(() => {
		if (Platform.OS !== "android") {
			return;
		}
		getCustomTabsSupportingBrowsersAsync().then(({ browserPackages }) =>
			setBrowsers(browserPackages)
		);
	}, []);

	return browsers;
}
