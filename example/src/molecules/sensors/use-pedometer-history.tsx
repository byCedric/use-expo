import React from 'react';
import { Caption } from 'react-native-paper';
import { usePedometerHistory } from '@use-expo/sensors';
import { Example, Information, Link, Measurement, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UsePedometerHistory: React.SFC<MoleculeProps> = (props) => {
	const [history, available] = usePedometerHistory({
		start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
		end: new Date(),
	});

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example fetches the "historical" steps count, within a date range,
				from the <Link url={docs.pedometer}>Pedometer</Link> module.
			</Information>
			<Example>
				<Caption>Last two weeks</Caption>
				{!available && (
					<Caption>Pedometer history is unavailable on this device</Caption>
				)}
				{(available && history) && (
					<Measurement name='steps' value={history.steps} precision={0} />
				)}
			</Example>
		</Page>
	);
};

UsePedometerHistory.defaultProps = {
	name: 'usePedometerHistory',
	description: 'get historical step count',
};
