import React from 'react';
import { Caption, Text } from 'react-native-paper';
import { useApplicationAndroidInstallReferrer } from '@use-expo/application';
import { Example, Information, Link, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UseApplicationAndroidInstallReferrer: React.SFC<MoleculeProps> = (props) => {
	const [installReferrer] = useApplicationAndroidInstallReferrer();

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example fetches the install referrer with the <Link url={docs.application}>Application</Link> module.
			</Information>
			<Example>
				<Caption>App install referrer:</Caption>
				<Text>{installReferrer}</Text>
			</Example>
		</Page>
	);
};

UseApplicationAndroidInstallReferrer.defaultProps = {
	name: 'useApplicationAndroidInstallReferrer',
	description: 'get the referrer URL of the installed app',
};
