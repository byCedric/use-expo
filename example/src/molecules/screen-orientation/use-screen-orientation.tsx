import React from 'react';
import { Caption, Text } from 'react-native-paper';
import { useScreenOrientation } from 'use-expo';
import { Example, Information, Link, Measurement, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UseScreenOrientation: React.SFC<MoleculeProps> = (props) => {
	const [orientation, sizeClass] = useScreenOrientation();

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
				<Text>{orientation}</Text>
				{!sizeClass
					? <Caption>size class unavailable on this device</Caption>
					: (
						<>
							<Caption>size class</Caption>
							<Measurement name='horizontal' value={sizeClass.horizontal} precision={0} />
							<Measurement name='vertical' value={sizeClass.vertical} precision={0} />
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
