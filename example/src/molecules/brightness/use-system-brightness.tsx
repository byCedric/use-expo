import React from 'react';
import { Slider } from 'react-native';
import { Caption } from 'react-native-paper';
import { SYSTEM_BRIGHTNESS } from 'expo-permissions';
import { usePermissions, useSystemBrightness } from 'use-expo';
import { round } from 'lodash';
import { Example, Information, Link, Page, MissingPermissions } from '../../atoms';
import { docs } from '../../providers/urls';

export const UseSystemBrightness: React.SFC = () => {
	const [permission, askPermission] = usePermissions(SYSTEM_BRIGHTNESS);
	const [brightness, setBrightness] = useSystemBrightness();

	return (
		<Page
			title='useSystemBrightness'
			subtitle='change the system brightness'
		>
			<Information>
				This is example uses both the <Link url={docs.brightness}>Brightness</Link> and <Link url={docs.permissions}>Permissions</Link> modules.
				When you grant the <Link url={docs.permissions}>SYSTEM_BRIGHTNESS</Link> permission, it renders a slider to change the system brightness.
			</Information>
			<Example>
				{(permission && permission.status !== 'granted') && (
					<MissingPermissions onConfirm={askPermission}>
						We need permission to modify the system brightness.
					</MissingPermissions>
				)}
				{(permission && permission.status === 'granted') && (
					<>
						<Caption>{round(Number(brightness) * 100, 1).toFixed(1)}%</Caption>
						<Slider
							style={{ width: '100%' }}
							value={brightness}
							onValueChange={setBrightness}
							step={0.001}
							minimumValue={0.001}
							maximumValue={1}
							minimumTrackTintColor="#333"
							thumbTintColor="#333"
						/>
					</>
				)}
			</Example>
		</Page>
	);
};
