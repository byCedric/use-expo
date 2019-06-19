import React from 'react';
import { Caption } from 'react-native-paper';
import { usePedometer, usePedometerHistory } from 'use-expo';
import { docs } from '../../providers/urls';
import {
	ExampleContent,
	ExampleDescription,
	Link,
	Measurement,
	Page,
} from '../../atoms';

export const UsePedometer: React.SFC = () => {
	const [live, liveAvailable] = usePedometer();
	const [history, historyAvailable] = usePedometerHistory(
		new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
		new Date(),
	);

	return (
		<Page
			title='usePedometer'
			subtitle='tracks user step count'
		>
			<ExampleDescription>
				This example fetches the data from the <Link url={docs.pedometer}>Pedometer</Link>.
				It renders the current "live" steps as well as the fetched steps for the past week.
			</ExampleDescription>
			<ExampleContent>
				<Caption>Live</Caption>
				{!liveAvailable && (
					<Caption>unavailable on this device</Caption>
				)}
				{(liveAvailable && live) && (
					<>
						<Measurement name='steps' value={live.steps} precision={0} />
					</>
				)}

				<Caption>Last two weeks</Caption>
				{!historyAvailable && (
					<Caption>unavailable on this device</Caption>
				)}
				{(historyAvailable && history) && (
					<>
						<Measurement name='steps' value={history.steps} precision={0} />
					</>
				)}
			</ExampleContent>
		</Page>
	);
};
