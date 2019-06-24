import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Linking } from 'expo';
import { Link } from './link';
import { Space } from './space';
import { author } from '../providers/urls';

export const Author: React.SFC = () => (
	<TouchableOpacity onPress={() => Linking.openURL(author())}>
		<Space size='large'>
			<Text>
				with ❤️ <Link>byCedric</Link>
			</Text>
		</Space>
	</TouchableOpacity>
);
