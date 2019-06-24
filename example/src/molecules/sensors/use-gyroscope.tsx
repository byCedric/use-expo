import React from 'react';
import { Caption } from 'react-native-paper';
import { useGyroscope } from 'use-expo';
import { Example, Information, Link, Measurement, Page } from '../../atoms';
import { docs } from '../../providers/urls';

export const UseGyroscope: React.SFC = () => {
	const [data, available] = useGyroscope({ interval: 100 });

	return (
		<Page
			title='useGyroscope'
			subtitle='tracks changes in rotation'
		>
			<Information>
				This example fetches the data from the <Link url={docs.gyroscope}>Gyroscope</Link> module.
				It renders the three-dimensional data in a list, prefixed with the axis.
			</Information>
			<Example>
				{!available && (
					<Caption>Gyroscope is unavailable on this device.</Caption>
				)}
				{(available && data) && (
					<>
						<Measurement name='x' value={data.x} precision={5} />
						<Measurement name='y' value={data.y} precision={5} />
						<Measurement name='z' value={data.z} precision={5} />
					</>
				)}
			</Example>
		</Page>
	);
};
