import React, { Component } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

export class AssetsProvider extends Component<{}, AssetsProviderState> {
	state: AssetsProviderState = {
		loaded: false,
	};

	async loadAssets() {
		await Font.loadAsync({
			'source-sans-pro-medium': require('../assets/fonts/source-sans-pro/medium.ttf'),
			'source-sans-pro-regular': require('../assets/fonts/source-sans-pro/regular.ttf'),
			'source-sans-pro-light': require('../assets/fonts/source-sans-pro/light.ttf'),
			'source-sans-pro-thin': require('../assets/fonts/source-sans-pro/thin.ttf'),
		});
	}

	render() {
		if (this.state.loaded) {
			return this.props.children;
		}

		return (
			<AppLoading
				startAsync={this.loadAssets}
				onFinish={() => this.setState({ loaded: true })}
			/>
		)
	}
}

interface AssetsProviderState {
	/** If all assets are loaded */
	loaded: boolean;
}
