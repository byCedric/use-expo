import React from 'react';
import { AppLoading } from 'expo';
import { useFonts } from 'use-expo';

const fonts = {
	'source-sans-pro-medium': require('../assets/fonts/source-sans-pro/medium.ttf'),
	'source-sans-pro-regular': require('../assets/fonts/source-sans-pro/regular.ttf'),
	'source-sans-pro-light': require('../assets/fonts/source-sans-pro/light.ttf'),
	'source-sans-pro-thin': require('../assets/fonts/source-sans-pro/thin.ttf'),
};

export const AssetsProvider: React.SFC<AssetsProviderProps> = (props) => {
	const [loaded] = useFonts(fonts);

	return !loaded
		? <AppLoading />
		: props.children;
};

interface AssetsProviderProps {
	children: React.ReactElement;
}
