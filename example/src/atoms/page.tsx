import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';
import { Author } from './author';
import { Space } from './space';

export const Page: React.SFC<PageProps> = (props) => (
	<ScrollView contentContainerStyle={styles.container}>
		{props.header}
		<Space horizontal='medium' vertical='huge'>
			<Title style={styles.title}>
				{props.title}
			</Title>
			<Paragraph style={styles.subtitle}>
				{props.subtitle}
			</Paragraph>
		</Space>
		<Space horizontal='large' style={styles.body}>
			{props.children}
		</Space>
		<View style={styles.footer}>
			<Author />
		</View>
	</ScrollView>
);

export interface PageProps {
	header?: React.ReactNode;
	title: React.ReactNode;
	subtitle: React.ReactNode;
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	body: {
		flexGrow: 1,
	},
	footer: {
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
		fontSize: 32,
	},
	subtitle: {
		textAlign: 'center',
		fontSize: 16,
	},
});
