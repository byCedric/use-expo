import React from 'react';
import { Caption, Text } from 'react-native-paper';
import { useBrowsers } from '@use-expo/web-browser';
import { Example, Information, Link, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';
import { View } from 'react-native';

export const UseBrowsers: React.SFC<MoleculeProps> = (props) => {
	const browsers = useBrowsers();

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example fetches the available Android browsers from <Link url={docs.webBrowser}>WebBrowser</Link> module.
				It renders all available browsers in a list.
			</Information>
			<Example>
				<Caption>Available browsers:</Caption>
				{browsers.map(name => (
					<View key={`browser-${name}`}>
						<Text>{name}</Text>
					</View>
				))}
			</Example>
		</Page>
	);
};

UseBrowsers.defaultProps = {
	name: 'useBrowsers',
	description: 'Get a list of Android browsers',
};
