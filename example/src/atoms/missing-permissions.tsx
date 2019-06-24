import React from 'react';
import { Button, Caption } from 'react-native-paper';
import { Space } from './space';

export const MissingPermissions: React.SFC<MissingPermissionsProps> = (props) => (
	<>
		<Space bottom>
			<Caption>{props.children}</Caption>
		</Space>
		<Button onPress={props.onConfirm} mode='outlined' color='#333'>
			Give permission
		</Button>
	</>
);

export interface MissingPermissionsProps {
	/** Some information which permissions and why they are necessary. */
	children: React.ReactNode;
	/** A callback invoked when the user wants to grant the permission(s). */
	onConfirm: () => any;
}
