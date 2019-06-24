import React from 'react';
import { Caption } from 'react-native-paper';
import { useBarometer } from 'use-expo';
import { Example, Information, Link, Measurement, Page } from '../../atoms';
import { docs } from '../../providers/urls';

export const UseBarometer: React.SFC = () => {
	const [data, available] = useBarometer({ interval: 100 });

	return (
		<Page
			title='useBarometer'
			subtitle='tracks changes in air pressure'
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
