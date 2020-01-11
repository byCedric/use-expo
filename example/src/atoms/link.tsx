import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Linking } from 'expo';

export const Link: React.SFC<LinkProps> = (props) => {
	const onPress = props.url
		? () => Linking.openURL(props.url!)
		: undefined;

	return (
		<Text style={styles.link} onPress={onPress}>
			{props.children}
		</Text>
	);
};

interface LinkProps {
	url?: string;
}

const styles = StyleSheet.create({
	link: {
		fontFamily: 'source-sans-pro-medium',
	},
});
