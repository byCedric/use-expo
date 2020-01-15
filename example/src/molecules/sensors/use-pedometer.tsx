import React from 'react';
import { Caption } from 'react-native-paper';
import { usePedometer } from 'use-expo';
import { Example, Information, Link, Measurement, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UsePedometer: React.SFC<MoleculeProps> = (props) => {
	const [live, available] = usePedometer();

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example fetches the "live" steps count from the <Link url={docs.pedometer}>Pedometer</Link> module.
			</Information>
			<Example>
				{!available && (
					<Caption>Pedometer is unavailable on this device</Caption>
				)}
				{(available && live) && (
					<Measurement name='steps' value={live.steps} precision={0} />
				)}
			</Example>
		</Page>
	);
};

UsePedometer.defaultProps = {
	name: 'usePedometer',
	description: 'tracks live step count',
};
