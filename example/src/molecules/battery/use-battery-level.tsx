import React from 'react';
import { Caption } from 'react-native-paper';
import { useBatteryLevel } from 'use-expo';
import { Example, Information, Link, Measurement, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UseBatteryLevel: React.SFC<MoleculeProps> = (props) => {
	const [batteryLevel] = useBatteryLevel();

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example only uses the <Link url={docs.battery}>Battery</Link> module.
				It renders the current battery level, received from the listener.
			</Information>
			<Example>
				<Caption>Battery level</Caption>
				<Measurement name='' value={(batteryLevel || 0) * 100} unit='%' precision={0} />
			</Example>
		</Page>
	);
};

UseBatteryLevel.defaultProps = {
	name: 'useBatteryLevel',
	description: 'get and/or listen to the battery level',
};
