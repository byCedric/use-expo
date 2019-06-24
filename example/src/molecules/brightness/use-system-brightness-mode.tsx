import React from 'react';
import { Button } from 'react-native-paper';
import { SYSTEM_BRIGHTNESS } from 'expo-permissions';
import { BrightnessMode } from 'expo-brightness';
import { usePermissions, useSystemBrightnessMode } from 'use-expo';
import { Example, Information, Link, Page, Space, MissingPermissions } from '../../atoms';
import * as url from '../../providers/urls';

export const UseSystemBrightnessMode: React.SFC = () => {
	const [permission, askPermission] = usePermissions(SYSTEM_BRIGHTNESS);
	const [mode, setMode] = useSystemBrightnessMode();

	return (
		<Page
			title='useSystemBrightnessMode'
			subtitle='change the system brightness mode'
		>
			<Information>
				This example uses both the <Link url={url.docs.permissions}>Permissions</Link> and <Link url={url.docs.brightness}>Brightness</Link> modules.
				When you grant the <Link url={url.permissions.systemBrightness}>SYSTEM_BRIGHTNESS</Link> permission, it renders two buttons to switch the system brightness mode.
			</Information>
			<Example>
				{(permission && permission.status !== 'granted') && (
					<MissingPermissions onConfirm={askPermission}>
						We need permission to modify the system brightness.
					</MissingPermissions>
				)}
				{(permission && permission.status === 'granted') && (
					<>
						<Space size='small'>
							<Button
								color='#333'
								mode={mode === BrightnessMode.AUTOMATIC ? 'contained' : 'outlined'}
								onPress={() => setMode(BrightnessMode.AUTOMATIC)}
							>
								Automatic
							</Button>
						</Space>
						<Space size='small'>
							<Button
								color='#333'
								mode={mode === BrightnessMode.MANUAL ? 'contained' : 'outlined'}
								onPress={() => setMode(BrightnessMode.MANUAL)}
							>
								Manual
							</Button>
						</Space>
					</>
				)}
			</Example>
		</Page>
	);
};
