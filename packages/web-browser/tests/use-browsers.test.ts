import { renderHook } from '@testing-library/react-hooks';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { useBrowsers } from '../src/use-browsers';

const originalPlatform = Platform.OS;

afterEach(() => {
	Platform.OS = originalPlatform;
});

it('returns empty list for ios', async () => {
	const getter = jest.spyOn(WebBrowser, 'getCustomTabsSupportingBrowsersAsync');

	Platform.OS = 'ios';

	renderHook(useBrowsers);

	expect(getter).not.toBeCalled();
});

it('loads browser list for android when mounted', async () => {
	const browserPackages = ['com.android.chrome'];

	jest.spyOn(WebBrowser, 'getCustomTabsSupportingBrowsersAsync')
		.mockResolvedValue({
			browserPackages,
			defaultBrowserPackage: 'com.android.chrome',
			preferredBrowserPackage: 'com.android.chrome',
			servicePackages: ['com.android.chrome'],
		});

	Platform.OS = 'android';

	const hook = renderHook(useBrowsers);
	await hook.waitForNextUpdate();

	expect(hook.result.current).toBe(browserPackages);
});
