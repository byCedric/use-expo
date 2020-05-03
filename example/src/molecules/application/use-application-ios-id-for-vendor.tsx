import React from 'react';
import { Caption, Text } from 'react-native-paper';
import { useApplicationIosIdForVendor } from '@use-expo/application';
import { Example, Information, Link, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UseApplicationIosIdForVendor: React.SFC<MoleculeProps> = (props) => {
	const [vendorId] = useApplicationIosIdForVendor();

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example fetches the iOS vendor identifier (IDFV) with the <Link url={docs.application}>Application</Link> module.
			</Information>
			<Example>
				<Caption>App vendor ID:</Caption>
				{!vendorId
					? <Text>-</Text>
					: <Text>{vendorId}</Text>
				}
			</Example>
		</Page>
	);
};

UseApplicationIosIdForVendor.defaultProps = {
	name: 'useApplicationIosIdForVendor',
	description: 'get the time the app was installed on the device',
};
