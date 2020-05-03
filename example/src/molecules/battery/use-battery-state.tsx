import React from 'react';
import { Caption, Text } from 'react-native-paper';
import { useBatteryState } from '@use-expo/battery';
import { Example, Information, Link, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';
import { batteryStates } from './battery-states';
import { BatteryState } from 'expo-battery';

export const UseBatteryState: React.SFC<MoleculeProps> = (props) => {
	const [batteryState] = useBatteryState();

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example only uses the <Link url={docs.battery}>Battery</Link> module.
				It renders the current battery state, received from the listener.
			</Information>
			<Example>
				<Caption>Battery state</Caption>
				<Text>{batteryStates[batteryState || BatteryState.UNKNOWN]}</Text>
			</Example>
		</Page>
	);
};

UseBatteryState.defaultProps = {
	name: 'useBatterySate',
	description: 'get and/or listen to the battery state',
};
