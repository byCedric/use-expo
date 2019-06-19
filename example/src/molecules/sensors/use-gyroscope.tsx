import React from 'react';
import { Caption } from 'react-native-paper';
import { useGyroscope } from 'use-expo';
import { docs } from '../../providers/urls';
import {
	ExampleContent,
	ExampleDescription,
	Link,
	Measurement,
	Page,
} from '../../atoms';

export const UseGyroscope: React.SFC = () => {
	const [data, available] = useGyroscope({ interval: 100 });

	return (
		<Page
			title='useGyroscope'
			subtitle='tracks changes in rotation'
		>
			<ExampleDescription>
				This example fetches the data from the <Link url={docs.gyroscope}>Gyroscope</Link>.
				It renders the three dimensional data in a list, prefixed with the axis.
			</ExampleDescription>
			<ExampleContent>
				{!available && (
					<Caption>gyroscope is unavailable on this device</Caption>
				)}
				{(available && data) && (
					<>
						<Measurement name='x' value={data.x} precision={5} />
						<Measurement name='y' value={data.y} precision={5} />
						<Measurement name='z' value={data.z} precision={5} />
					</>
				)}
			</ExampleContent>
		</Page>
	);
};
