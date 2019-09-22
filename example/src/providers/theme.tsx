import React from 'react';
import merge from 'lodash/merge';
import {
	Theme,
	DefaultTheme,
	Provider as PaperProvider,
} from 'react-native-paper';

export const ThemeProvider: React.SFC = (props) => (
	<PaperProvider theme={theme}>
		{props.children}
	</PaperProvider>
);

export const theme = merge(DefaultTheme, {
	fonts: {
		medium: 'source-sans-pro-medium',
		regular: 'source-sans-pro-regular',
		light: 'source-sans-pro-light',
		thin: 'source-sans-pro-thin',
	},
	spaces: {
		small: 8,
		medium: 16,
		large: 32,
		huge: 64,
	},
} as UseExpoTheme);

export type ThemeSpace = 'small' | 'medium' | 'large' | 'huge';
export interface UseExpoTheme extends Theme {
	spaces: {
		small: number;
		medium: number;
		large: number;
		huge: number;
	};
}

export interface WithThemeProp {
	/** The use expo theme instance, injected by `withTheme` */
	theme: UseExpoTheme;
}
