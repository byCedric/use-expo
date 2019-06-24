import React from 'react';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Title, Paragraph } from 'react-native-paper';
import { Link } from './link';
import { Space } from './space';

export const ListHeader: React.SFC = (props) => (
	<Space bottom='large'>
		<Title>{props.children}</Title>
	</Space>
);

const ListItemComponent: React.SFC<ListItemProps & NavigationInjectedProps> = (props) => (
	<TouchableOpacity onPress={() => props.navigation.navigate(props.route || props.name)}>
		<Space style={styles.item} bottom='large'>
			<Text>&mdash;  </Text>
			<View>
				<Link>{props.name}</Link>
				<Paragraph>{props.description}</Paragraph>
			</View>
		</Space>
	</TouchableOpacity>
);

export const ListItem = withNavigation(ListItemComponent);

export interface ListItemProps {
	name: string;
	description: React.ReactNode;
	route?: string;
}

const styles = StyleSheet.create({
	item: {
		flex: 0,
		flexDirection: 'row',
	},
});
