import React from 'react';
import { StyleSheet } from 'react-native';
import { Caption } from 'react-native-paper';
import { Camera, Constants as CameraConstants } from 'expo-camera';
import { CAMERA } from 'expo-permissions';
import { usePermissions } from 'use-expo';
import { Example, Information, Link, Page, Space, MissingPermissions } from '../../atoms';
import * as url from '../../providers/urls';

export const UsePermissions: React.SFC = () => {
	const [permission, askPermission] = usePermissions(CAMERA);

	return (
		<Page
			title='usePermissions'
			subtitle='get or ask permissions'
		>
			<Information>
				Here you can see an example using both the <Link url={url.docs.permissions}>Permissions</Link> and <Link url={url.docs.camera}>Camera</Link> modules.
				When you grant the <Link url={url.permissions.camera}>CAMERA</Link> permission, it renders a simple camera with a text overlay.
			</Information>
			<Example space={false}>
				{(permission && permission.status !== 'granted') && (
					<MissingPermissions onConfirm={askPermission}>
						We need permission to use the camera.
					</MissingPermissions>
				)}
				{(permission && permission.status === 'granted') && (
					<Camera
						style={styles.camera}
						type={CameraConstants.Type.front}
					>
						<Space bottom top='huge'>
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
