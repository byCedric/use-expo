import React from 'react';
import { Header } from 'react-navigation';
import Constants from 'expo-constants';
import { Link, ListHeader, ListItem, Page, Space } from '../atoms';
import { repo } from '../providers/urls';

export const Overview: React.SFC = () => (
	<Page
		title='expo hooks'
		subtitle={<>Complementary hooks for <Link url={repo}>Expo</Link></>}
		header={<Space top={Constants.statusBarHeight + Header.HEIGHT} />}
	>
		<ListHeader>Brightness</ListHeader>
		<ListItem
			name='useBrightness'
			description='change the screen brightness'
		/>
		<ListItem
			name='useSystemBrightness'
			description='change the system brightness'
		/>
		<ListItem
			name='useSystemBrightnessMode'
			description='change the system brightness mode'
		/>

		<ListHeader>Permissions</ListHeader>
		<ListItem
			name='usePermissions'
			description='get or ask permissions'
		/>

		<ListHeader>Screen Orientation</ListHeader>
		<ListItem
			name='useScreenOrientation'
			description='tracks changes in screen orientation'
		/>

		<ListHeader>Sensors</ListHeader>
		<ListItem
			name='useAccelerometer'
			description='tracks changes in acceleration'
		/>
		<ListItem
			name='useBarometer'
			description='tracks changes in air pressure'
		/>
		<ListItem
			name='useDeviceMotion'
			description='tracks device motion and orientation'
		/>
		<ListItem
			name='useGyroscope'
			description='tracks changes in rotation'
		/>
		<ListItem
			name='useMagnetometer'
			description='tracks changes in rotation'
		/>
		<ListItem
			name='useMagnetometerUncalibrated'
			description='tracks changes in the magnetic field'
			route='useMagnetometer'
		/>
		<ListItem
			name='usePedometer'
			description='tracks user step count'
		/>
		<ListItem
			name='usePedometerHistory'
			description='get historical step count'
			route='usePedometer'
		/>
	</Page>
);
