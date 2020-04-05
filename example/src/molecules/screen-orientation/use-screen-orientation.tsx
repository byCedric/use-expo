import React from 'react';
import { Caption, Text } from 'react-native-paper';
import { useScreenOrientation } from 'use-expo';
import { Orientation, SizeClassIOS } from 'expo-screen-orientation';
import { Example, Information, Link, Measurement, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UseScreenOrientation: React.SFC<MoleculeProps> = (props) => {
	const [orientation] = useScreenOrientation();

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example only uses the <Link url={docs.screenOrientation}>ScreenOrientation</Link> module.
				It renders the current orientation and listens to changes.
			</Information>
			<Example>
				<Caption>screen orientation</Caption>
				{orientation?.orientation
					? <Text>{orientationNames[orientation.orientation]}</Text>
					: <Text>unknown</Text>
				}
				{(!orientation?.verticalSizeClass || !orientation?.horizontalSizeClass)
					? <Caption>size class unavailable on this device</Caption>
					: (
						<>
							<Caption>size class</Caption>
							<Measurement name='horizontal' value={sizeClassNames[orientation.horizontalSizeClass]} />
							<Measurement name='vertical' value={sizeClassNames[orientation.verticalSizeClass]} />
						</>
					)}
			</Example>
		</Page>
	);
};

UseScreenOrientation.defaultProps = {
	name: 'useScreenOrientation',
	description: 'tracks changes in screen orientation',
};

const orientationNames = {
	[Orientation.UNKNOWN]: 'unknown',
	[Orientation.PORTRAIT_UP]: 'portrait-up',
	[Orientation.PORTRAIT_DOWN]: 'portrait-down',
	[Orientation.LANDSCAPE_LEFT]: 'landscape-left',
	[Orientation.LANDSCAPE_RIGHT]: 'landscape-right',
};

const sizeClassNames = {
	[SizeClassIOS.REGULAR]: 'regular',
	[SizeClassIOS.COMPACT]: 'compact',
	[SizeClassIOS.UNKNOWN]: 'unknown',
};
