import React from 'react';
import { Caption } from 'react-native-paper';
import { useBarometer } from '@use-expo/sensors';
import { Example, Information, Link, Measurement, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UseBarometer: React.SFC<MoleculeProps> = (props) => {
	const [data, available] = useBarometer({ interval: 100 });

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example fetches the data from the <Link url={docs.barometer}>Barometer</Link> module.
				It renders both the pressure and relative altitude in a list.
			</Information>
			<Example>
				{!available && (
					<Caption>Barometer is unavailable on this device.</Caption>
				)}
				{(available && data) && (
					<>
						<Measurement
							name='pressure'
							unit='hPa'
							value={data.pressure}
							precision={2}
						/>
						<Measurement
							name='altitude'
							unit='   '
							value={data.relativeAltitude || '?'}
							precision={2}
						/>
					</>
				)}
			</Example>
		</Page>
	);
};

UseBarometer.defaultProps = {
	name: 'useBarometer',
	description: 'tracks changes in air pressure',
};
