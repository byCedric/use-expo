import React from 'react';
import { Linking } from 'react-native';
import { Button, Caption } from 'react-native-paper';
import { Space } from './space';

export const MissingPermissions: React.SFC<MissingPermissionsProps> = (props) => (
	<>
		<Space bottom>
			<Caption style={{ textAlign: 'center' }}>{props.children}</Caption>
		</Space>

		{(props.canConfirm && props.onConfirm)
			? <Button onPress={props.onConfirm} mode='outlined' color='#333'>Give permission</Button>
			: <Button onPress={Linking.openSettings} mode='outlined' color='#333'>Open app settings</Button>
		}
	</>
);

export interface MissingPermissionsProps {
	/** Some information which permissions and why they are necessary. */
	children: React.ReactNode;
	/** Determine if a user can give the permission using the `onConfirm` callback (defaults to `true`) */
	canConfirm?: boolean;
	/** A callback invoked when the user wants to grant the permission(s), if possible */
	onConfirm?: () => any;
}

MissingPermissions.defaultProps = {
	canConfirm: true,
};
