import React from 'react';
import { Caption } from 'react-native-paper';
import { useMagnetometer, useMagnetometerUncalibrated } from 'use-expo';
import { Example, Information, Link, Measurement, Page } from '../../atoms';
import { docs } from '../../providers/urls';

export const UseMagnetometer: React.SFC = () => {
	const [calibrated, calibratedAvailable] = useMagnetometer({ interval: 200 });
	const [uncalibrated, uncalibrartedAvailable] = useMagnetometerUncalibrated({ interval: 200 });

	return (
		<Page
			title='useMagnetometer'
			subtitle='tracks changes in the magnetic field'
		>
			<Information>
				This example fetches the data from the <Link url={docs.magnetometer}>Magnetometer</Link>.
				It renders the three dimensional data in a list, prefixed with the axis.
			</Information>
			<Example>
				<Caption>Calibrated</Caption>
				{!calibratedAvailable && (
					<Caption>unavailable on this device</Caption>
				)}
				{(calibratedAvailable && calibrated) && (
					<>
						<Measurement name='x' value={calibrated.x} precision={2} />
						<Measurement name='y' value={calibrated.y} precision={2} />
						<Measurement name='z' value={calibrated.z} precision={2} />
					</>
				)}

				<Caption>Uncalibrated</Caption>
				{!uncalibrartedAvailable && (
					<Caption>unavailable on this device</Caption>
				)}
				{(uncalibrartedAvailable && uncalibrated) && (
					<>
						<Measurement name='x' value={uncalibrated.x} precision={2} />
						<Measurement name='y' value={uncalibrated.y} precision={2} />
						<Measurement name='z' value={uncalibrated.z} precision={2} />
					</>
				)}
			</Example>
		</Page>
	);
};
