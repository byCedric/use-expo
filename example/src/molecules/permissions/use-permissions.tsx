import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Caption } from 'react-native-paper';
import { Camera, Constants as CameraConstants } from 'expo-camera';
import { CAMERA } from 'expo-permissions';
import { usePermissions } from 'use-expo';
import { Example, Information, Link, Page, Space } from '../../atoms';
import { docs } from '../../providers/urls';

export const UsePermissions: React.SFC = () => {
	const [permission, askPermission] = usePermissions(CAMERA);

	return (
		<Page
			title='usePermissions'
			subtitle='get or ask permissions with Permissions'
		>
			<Information>
				This is example uses both the <Link url={docs.permissions}>Permissions</Link> and <Link url={docs.camera}>Camera</Link>.
				When the permission is granted, it renders the camera with some captions.
				Else it shows a button with explaination for the required permission.
			</Information>
			<Example>
				{(permission && permission.status !== 'granted') && (
					<>
						<Caption>We need additional permissions to use the camera.</Caption>
						<Button onPress={askPermission} color='#333'>
							Give permission
						</Button>
					</>
				)}
				{(permission && permission.status === 'granted') && (
					<Camera
						style={styles.camera}
						type={CameraConstants.Type.front}
					>
						<Space>
							<Caption style={{ color: '#fff' }}>
								^ most handsome in the world
							</Caption>
						</Space>
					</Camera>
				)}
			</Example>
		</Page>
	);
};

const styles = StyleSheet.create({
	camera: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
});
