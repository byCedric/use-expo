import React from 'react';
import { Button, Caption } from 'react-native-paper';
import { useBattery } from 'use-expo';
import { Example, Information, Link, Measurement, Page, Space } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';
import { batteryStates } from './battery-states';

export const UseBattery: React.SFC<MoleculeProps> = (props) => {
	const [battery, getBattery] = useBattery();

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example only uses the <Link url={docs.battery}>Battery</Link> module.
				It renders the battery information it received.
				Note that this isn't "live" but can be updated using a callback.
			</Information>
			<Example>
				<Caption>Battery</Caption>
				{!!battery && (
					<>
						<Measurement name='level' value={battery.batteryLevel * 100} unit='%' precision={0} />
						<Measurement name='state' value={batteryStates[battery.batteryState]} />
						<Measurement name='low power mode' value={battery.lowPowerMode ? 'enabled' : 'disabled'} />
					</>
				)}
				<Space>
					<Button onPress={getBattery} mode='outlined' color='#333'>
						Update
					</Button>
				</Space>
			</Example>
		</Page>
	);
};

UseBattery.defaultProps = {
	name: 'useBattery',
	description: 'get the battery level, state and power mode',
};
