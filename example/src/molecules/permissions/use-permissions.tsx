import React from 'react';
import { StyleSheet } from 'react-native';
import { Caption } from 'react-native-paper';
import { Camera, Constants as CameraConstants } from 'expo-camera';
import { CAMERA } from 'expo-permissions';
import { usePermissions } from 'use-expo';
import { Example, Information, Link, Page, Space, MissingPermissions } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import * as url from '../../providers/urls';

export const UsePermissions: React.SFC<MoleculeProps> = (props) => {
	const [permission, askPermission] = usePermissions(CAMERA);

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				Here you can see an example using both the <Link url={url.docs.permissions}>Permissions</Link> and <Link url={url.docs.camera}>Camera</Link> modules.
				When you grant the <Link url={url.permissions.camera}>CAMERA</Link> permission, it renders a simple camera with a text overlay.
			</Information>
			<Example space={false}>
				{(permission?.status !== 'granted') && (
					<MissingPermissions canConfirm={permission?.canAskAgain} onConfirm={askPermission}>
						We need permission to use the camera.
					</MissingPermissions>
				)}
				{(permission?.status === 'granted') && (
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

UsePermissions.defaultProps = {
	name: 'usePermissions',
	description: 'get or ask permissions',
};

const styles = StyleSheet.create({
	camera: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
});
