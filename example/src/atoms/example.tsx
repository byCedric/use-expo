import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Space } from './space';

export const ExampleComponent: React.SFC<NavigationInjectedProps> = (props) => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const subscription = props.navigation.addListener(
			'didFocus',
			() => {
				subscription.remove();
				setReady(true);
			}
		);
	});

	if (!ready) return null;

	return (
		<Space style={styles.content} size='large'>
			{props.children}
		</Space>
	);
};

export const Example = withNavigation(ExampleComponent);

const styles = StyleSheet.create({
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f2f2f2',
		borderRadius: 5,
	},
});
