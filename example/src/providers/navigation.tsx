import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Overview } from '../molecules/overview';
import {
	UseBrightness,
	UseSystemBrightness,
	UseSystemBrightnessMode,
} from '../molecules/brightness';
import { UsePermissions } from '../molecules/permissions';
import {
	UseAccelerometer,
	UseBarometer,
	UseDeviceMotion,
	UseGyroscope,
	UseMagnetometer,
	UsePedometer,
} from '../molecules/sensors';
import {
	UseScreenOrientation,
	UseScreenOrientationLock,
} from '../molecules/screen-orientation';

const AppNavigator = createStackNavigator(
	{
		overview: {
			screen: Overview,
			navigationOptions: { header: null }
		},
		useBrightness: {
			screen: UseBrightness,
			navigationOptions: { title: 'Brightness' },
		},
		useSystemBrightness: {
			screen: UseSystemBrightness,
			navigationOptions: { title: 'Brightness' },
		},
		useSystemBrightnessMode: {
			screen: UseSystemBrightnessMode,
			navigationOptions: { title: 'Brightness' },
		},
		usePermissions: {
			screen: UsePermissions,
			navigationOptions: { title: 'Permissions' },
		},
		useScreenOrientation: {
			screen: UseScreenOrientation,
			navigationOptions: { title: 'Screen Orientation' },
		},
		useScreenOrientationLock: {
			screen: UseScreenOrientationLock,
			navigationOptions: { title: 'Screen Orientation' },
		},
		useAccelerometer: {
			screen: UseAccelerometer,
			navigationOptions: { title: 'Sensors' },
		},
		useBarometer: {
			screen: UseBarometer,
			navigationOptions: { title: 'Sensors' },
		},
		useDeviceMotion: {
			screen: UseDeviceMotion,
			navigationOptions: { title: 'Sensors' },
		},
		useGyroscope: {
			screen: UseGyroscope,
			navigationOptions: { title: 'Sensors' },
		},
		useMagnetometer: {
			screen: UseMagnetometer,
			navigationOptions: { title: 'Sensors' },
		},
		usePedometer: {
			screen: UsePedometer,
			navigationOptions: { title: 'Sensors' },
		},
	},
	{
		initialRouteName: 'overview',
		// cardStyle: {
		// 	height: '100%',
		// },
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#333',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontFamily: 'source-sans-pro-medium',
			},
		},
	},
);

export const NavigationProvider = createAppContainer(AppNavigator);
