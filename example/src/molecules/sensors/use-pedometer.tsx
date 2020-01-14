import React from 'react';
import { Caption } from 'react-native-paper';
import { usePedometer, usePedometerHistory } from 'use-expo';
import { Example, Information, Link, Measurement, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UsePedometer: React.SFC<MoleculeProps> = (props) => {
	const [live, liveAvailable] = usePedometer();
	const [history, historyAvailable] = usePedometerHistory({
		start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
		end: new Date(),
	});

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example fetches the data from the <Link url={docs.pedometer}>Pedometer</Link> module.
				It renders the current "live" steps as well as the fetched steps for the past week.
			</Information>
			<Example>
				<Caption>Live</Caption>
				{!liveAvailable && (
					<Caption>Pedometer is unavailable on this device</Caption>
				)}
				{(liveAvailable && live) && (
					<Measurement name='steps' value={live.steps} precision={0} />
				)}

				<Caption>Last two weeks</Caption>
				{!historyAvailable && (
					<Caption>Pedometer history is unavailable on this device</Caption>
				)}
				{(historyAvailable && history) && (
					<Measurement name='steps' value={history.steps} precision={0} />
				)}
			</Example>
		</Page>
	);
};

UsePedometer.defaultProps = {
	name: 'usePedometer',
	description: 'tracks user step count',
};
