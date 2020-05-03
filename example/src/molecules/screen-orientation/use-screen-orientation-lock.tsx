import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { OrientationLock } from 'expo-screen-orientation';
import { useScreenOrientationLock } from '@use-expo/screen-orientation';
import { Example, Information, Link, Page, Space } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

const orientations: OrientationLock[] = [
	OrientationLock.ALL,
	OrientationLock.LANDSCAPE,
	OrientationLock.LANDSCAPE_LEFT,
	OrientationLock.LANDSCAPE_RIGHT,
	OrientationLock.PORTRAIT,
	OrientationLock.PORTRAIT_UP,
];

export const UseScreenOrientationLock: React.SFC<MoleculeProps> = (props) => {
	const [orientation, setOrientation] = useState(OrientationLock.ALL);
	useScreenOrientationLock(orientation);

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example only uses the <Link url={docs.screenOrientation}>ScreenOrientation</Link> module.
				It renders multiple buttons to change the current screen orientation lock.
			</Information>
			<Example>
				{orientations.map(type => (
					<Space size='small' key={`orientation-${type}`}>
						<Button
							color='#333'
							mode={orientation === type ? 'contained' : 'outlined'}
							onPress={() => setOrientation(type)}
						>
							{orientationName[type]}
						</Button>
					</Space>
				))}
			</Example>
		</Page>
	);
};

UseScreenOrientationLock.defaultProps = {
	name: 'useScreenOrientationLock',
	description: 'locks the screen to an orientation with',
};

const orientationName: Record<OrientationLock, string> = {
	[OrientationLock.DEFAULT]: 'default',
	[OrientationLock.ALL]: 'all',
	[OrientationLock.PORTRAIT]: 'portrait',
	[OrientationLock.PORTRAIT_UP]: 'portrait up',
	[OrientationLock.PORTRAIT_DOWN]: 'portrait down',
	[OrientationLock.LANDSCAPE]: 'landscape',
	[OrientationLock.LANDSCAPE_LEFT]: 'landscape left',
	[OrientationLock.LANDSCAPE_RIGHT]: 'landscape right',
	[OrientationLock.OTHER]: 'other',
	[OrientationLock.UNKNOWN]: 'unknown',
};
