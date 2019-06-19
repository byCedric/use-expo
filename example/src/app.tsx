import React from 'react';
import { AssetsProvider } from './providers/assets';
import { NavigationProvider } from './providers/navigation';
import { ThemeProvider } from './providers/theme';

export const App: React.SFC = () => (
	<AssetsProvider>
		<ThemeProvider>
			<NavigationProvider />
		</ThemeProvider>
	</AssetsProvider>
);
