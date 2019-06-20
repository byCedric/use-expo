import React from 'react';
import { Caption } from 'react-native-paper';
import { useAccelerometer } from 'use-expo';
import { Example, Information, Link, Measurement, Page } from '../../atoms';
import { docs } from '../../providers/urls';

export const UseAccelerometer: React.SFC = () => {
	const [data, available] = useAccelerometer({ interval: 100 });

	return (
		<Page
			title='useAccelerometer'
			subtitle='tracks changes in acceleration'
		>
			<Information>
				This example fetches the data from the <Link url={docs.accelerometer}>Accelerometer</Link>.
				It renders the three dimensional data in a list, prefixed with the axis.
			</Information>
			<Example>
				{!available && (
					<Caption>accelerometer is unavailable on this device</Caption>
				)}
				{(available && data) && (
					<>
						<Measurement name='x' unit='m/s²' value={data.x} precision={5} />
						<Measurement name='y' unit='m/s²' value={data.y} precision={5} />
						<Measurement name='z' unit='m/s²' value={data.z} precision={5} />
					</>
				)}
			</Example>
		</Page>
	);
};
