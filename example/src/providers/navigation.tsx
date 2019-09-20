import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { startCase } from 'lodash';
import { Overview, molecules } from '../molecules/overview';

const createScreens = () => {
	const stack: any = {};

	Object.entries(molecules).forEach(([moleculeName, molecule]) => {
		const title = startCase(moleculeName);

		Object.values(molecule).forEach(screen => {
			stack[screen.defaultProps!.name!] = {
				screen,
				navigationOptions: { title },
			};
		});
	});

	return stack;
};

const AppNavigator = createStackNavigator(
	{
		overview: {
			screen: Overview,
			navigationOptions: { header: null }
		},
		...createScreens(),
	},
	{
		initialRouteName: 'overview',
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
