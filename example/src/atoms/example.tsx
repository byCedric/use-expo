import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Space, SpaceDimension } from './space';

export const ExampleComponent: React.SFC<ExampleProps & NavigationInjectedProps> = (props) => {
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
		<Space style={styles.content} horizontal={props.space} vertical={props.space}>
			{props.children}
		</Space>
	);
};

export const Example = withNavigation(ExampleComponent);

export interface ExampleProps {
	space?: SpaceDimension;
}

Example.defaultProps = {
	space: 'large',
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f2f2f2',
		borderRadius: 5,
	},
});
