import React from 'react';
import { Caption } from 'react-native-paper';
import { useBarometer } from 'use-expo';
import { docs } from '../../providers/urls';
import {
	ExampleContent,
	ExampleDescription,
	Link,
	Measurement,
	Page,
} from '../../atoms';

export const UseBarometer: React.SFC = () => {
	const [data, available] = useBarometer({ interval: 100 });

	return (
		<Page
			title='useBarometer'
			subtitle='tracks changes in air pressure'
		>
			<ExampleDescription>
				This example fetches the data from the <Link url={docs.barometer}>Barometer</Link>.
				It renders both the pressure and relative altitude in a list.
			</ExampleDescription>
			<ExampleContent>
				{!available && (
					<Caption>barometer is unavailable on this device</Caption>
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
			</ExampleContent>
		</Page>
	);
};
