import React from 'react';
import { Button, Caption } from 'react-native-paper';
import { SYSTEM_BRIGHTNESS } from 'expo-permissions';
import { usePermissions, useSystemBrightnessMode } from 'use-expo';
import { docs } from '../../providers/urls';
import {
	ExampleContent,
	ExampleDescription,
	Link,
	Page,
	Space,
} from '../../atoms';

const MODE_AUTOMATIC = 1;
const MODE_MANUAL = 2;

export const UseSystemBrightnessMode: React.SFC = () => {
	const [permission, askPermission] = usePermissions(SYSTEM_BRIGHTNESS);
	const [mode, setMode] = useSystemBrightnessMode();

	return (
		<Page
			title='useSystemBrightnessMode'
			subtitle='change the system brightness mode'
		>
			<ExampleDescription>
				This is example uses both the <Link url={docs.brightness}>Brightness</Link> and <Link url={docs.permissions}>Permissions</Link>.
				When the <Link url={docs.permissions}>SYSTEM_BRIGHTNESS</Link> permission is granted, it renders two buttons to change the system brightness mode.
				Else it shows a button with explaination for the required permission.
			</ExampleDescription>
			<ExampleContent>
				{(permission && permission.status !== 'granted') && (
					<>
						<Caption>we need additional permissions to modify the system brightness mode</Caption>
						<Button onPress={askPermission} color='#333'>
							give permission
						</Button>
					</>
				)}
				{(permission && permission.status === 'granted') && (
					<>
						<Space size='small'>
							<Button
								color='#333'
								mode={mode === MODE_AUTOMATIC ? 'contained' : 'outlined'}
								onPress={() => setMode(MODE_AUTOMATIC)}
							>
								Automatic
							</Button>
						</Space>
						<Space size='small'>
							<Button
								color='#333'
								mode={mode === MODE_MANUAL ? 'contained' : 'outlined'}
								onPress={() => setMode(MODE_MANUAL)}
							>
								Manual
							</Button>
						</Space>
					</>
				)}
			</ExampleContent>
		</Page>
	);
};
