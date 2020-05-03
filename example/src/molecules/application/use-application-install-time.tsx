import React from 'react';
import { Caption, Text } from 'react-native-paper';
import { useApplicationInstallTime } from '@use-expo/application';
import { Example, Information, Link, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UseApplicationInstallTime: React.SFC<MoleculeProps> = (props) => {
	const [installTime] = useApplicationInstallTime();

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example fetches the date when the app was installed with the <Link url={docs.application}>Application</Link> module.
			</Information>
			<Example>
				<Caption>App installed at:</Caption>
				{!installTime
					? <Text>-</Text>
					: <>
						<Text>{installTime.toDateString()}</Text>
						<Text>{installTime.toTimeString()}</Text>
					</>
				}
			</Example>
		</Page>
	);
};

UseApplicationInstallTime.defaultProps = {
	name: 'useApplicationInstallTime',
	description: 'get the time the app was installed on the device',
};
