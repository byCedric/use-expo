import { coolDownAsync, warmUpAsync } from "expo-web-browser";
import { useEffect } from "react";
import { Platform } from "react-native";

/**
 * Warm the provided browser. A list of browsers can be found by invoking `WebBrowser.getCustomTabsSupportingBrowsersAsync()`.
 *
 * @see https://docs.expo.io/versions/latest/sdk/webbrowser/#webbrowserwarmupasyncbrowserpackage
 * @remarks This only works on Android.
 * @example useWarmBrowser('com.android.chrome')
 */
export function useWarmBrowser(browser?: string): void {
	useEffect(() => {
		if (Platform.OS !== "android") {
			return;
		}
		if (browser) {
			warmUpAsync(browser);
		}
		return () => {
			coolDownAsync(browser);
		}
	}, [browser]);
}
