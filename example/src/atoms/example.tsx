import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

class ExampleComponent extends Component<ExampleProps & NavigationInjectedProps, ExampleState> {
	state: ExampleState = {
		ready: false,
	};

	componentDidMount() {
		const subscription = this.props.navigation.addListener(
			'didFocus',
			() => {
				subscription.remove();
				this.setState({ ready: true });
			}
		);
	}

	render() {
		if (!this.state.ready) {
			return null;
		}

		return (
			<View style={styles.content}>
				{this.props.children}
			</View>
		);
	}
}

export const Example = withNavigation(ExampleComponent);

export interface ExampleProps {
	children: React.ReactNode;
}

export interface ExampleState {
	ready: boolean;
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f2f2f2',
		borderRadius: 5,
	},
});
