import React from 'react';
import { Caption, Text } from 'react-native-paper';
import { useBatteryLowPowerMode } from 'use-expo';
import { Example, Information, Link, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UseBatteryLowPowerMode: React.SFC<MoleculeProps> = (props) => {
	const [isLowPowerMode] = useBatteryLowPowerMode();

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example only uses the <Link url={docs.battery}>Battery</Link> module.
				It renders the current battery low power mode, received from the listener.
			</Information>
			<Example>
				<Caption>Battery low power mode?</Caption>
				<Text>{isLowPowerMode ? 'yes' : 'no'}</Text>
			</Example>
		</Page>
	);
};

UseBatteryLowPowerMode.defaultProps = {
	name: 'useBatteryLowPowerMode',
	description: 'get and/or listen to the battery low power mode',
};
