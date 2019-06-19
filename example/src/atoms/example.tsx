import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Paragraph } from 'react-native-paper';
import { Space } from './space';

class ExampleContentComponent extends Component<ExampleContentProps & NavigationInjectedProps, ExampleContentState> {
	state: ExampleContentState = {
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

export const ExampleContent = withNavigation(ExampleContentComponent);

export interface ExampleContentProps {
	children: React.ReactNode;
}

export interface ExampleContentState {
	ready: boolean;
}

export const ExampleDescription: React.SFC = (props) => (
	<Space bottom='large'>
		<Paragraph>{props.children}</Paragraph>
	</Space>
);

const styles = StyleSheet.create({
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f2f2f2',
		borderRadius: 5,
	},
});
