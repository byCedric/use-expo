import React from 'react';
import { Caption, Text } from 'react-native-paper';
import { useApplicationAndroidLastUpdateTime } from '@use-expo/application';
import { Example, Information, Link, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UseApplicationAndroidLastUpdateTime: React.SFC<MoleculeProps> = (props) => {
	const [lastUpdateTime] = useApplicationAndroidLastUpdateTime();

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example fetches the last update time from Google Play, with the <Link url={docs.application}>Application</Link> module.
			</Information>
			<Example>
				<Caption>App installed at:</Caption>
				{!lastUpdateTime
					? <Text>-</Text>
					: <>
						<Text>{lastUpdateTime.toDateString()}</Text>
						<Text>{lastUpdateTime.toTimeString()}</Text>
					</>
				}
			</Example>
		</Page>
	);
};

UseApplicationAndroidLastUpdateTime.defaultProps = {
	name: 'useApplicationAndroidLastUpdateTime',
	description: 'get the time the app was last updated via the Google Play Store',
};
