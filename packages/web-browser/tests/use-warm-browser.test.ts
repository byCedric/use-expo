import { renderHook } from '@testing-library/react-hooks';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { useWarmBrowser } from '../src/use-warm-browser';

const originalPlatform = Platform.OS;

afterEach(() => {
	Platform.OS = originalPlatform;
});

it('does not warm or cool browser for ios', async () => {
	const warmer = jest.spyOn(WebBrowser, 'warmUpAsync');
	const cooler = jest.spyOn(WebBrowser, 'coolDownAsync');

	Platform.OS = 'ios';

	renderHook(useWarmBrowser, {
		initialProps: 'com.android.chrome',
	});

	expect(warmer).not.toBeCalled();
	expect(cooler).not.toBeCalled();
});

it('warms and cools the browser for android when (un)mounted', async () => {
	const warmer = jest
		.spyOn(WebBrowser, 'warmUpAsync')
		.mockResolvedValue({ servicePackage: 'com.android.chrome' });

	const cooler = jest
		.spyOn(WebBrowser, 'coolDownAsync')
		.mockResolvedValue({ servicePackage: 'com.android.chrome' });

	Platform.OS = 'android';

	const hook = renderHook(useWarmBrowser, {
		initialProps: 'com.android.chrome',
	});

	expect(warmer).toBeCalledWith('com.android.chrome');
	hook.unmount();
	expect(cooler).toBeCalledWith('com.android.chrome');
});

it('warms and cools the browser for android when rerendered', async () => {
	const warmer = jest
		.spyOn(WebBrowser, 'warmUpAsync')
		.mockResolvedValue({ servicePackage: 'com.android.chrome' });

	jest.spyOn(WebBrowser, 'coolDownAsync')
		.mockResolvedValue({ servicePackage: 'com.android.chrome' });

	Platform.OS = 'android';

	const hook = renderHook(useWarmBrowser, {
		initialProps: 'com.android.chrome',
	});

	hook.rerender('com.microsoft.ie8');
	expect(warmer).toBeCalledWith('com.microsoft.ie8');
});
