import React from 'react';
import { Paragraph } from 'react-native-paper';
import { Space } from './space';

export const Information: React.SFC = (props) => (
	<Space bottom='large'>
		<Paragraph>{props.children}</Paragraph>
	</Space>
);
