import React from 'react';
import { Caption } from 'react-native-paper';
import { useDeviceMotion } from 'use-expo';
import { Example, Information, Link, Measurement, Page } from '../../atoms';
import { docs } from '../../providers/urls';

const DEFAULT_3D = { x: 0, y: 0, z: 0 };
const DEFAULT_RATE = { alpha: 0, beta: 0, gamma: 0 };

export const UseDeviceMotion: React.SFC = () => {
	const [data, available] = useDeviceMotion({ interval: 100 });
	const {
		orientation = 0,
		acceleration = DEFAULT_3D,
		accelerationIncludingGravity = DEFAULT_3D,
		rotation = DEFAULT_RATE,
		rotationRate = DEFAULT_RATE,
	} = data || {};

	return (
		<Page
			title='useDeviceMotion'
			subtitle='tracks device motion and orientation'
		>
			<Information>
				This example fetches the data from the <Link url={docs.deviceMotion}>DeviceMotion</Link> module.
				It renders all categories in a list with additional captions.
			</Information>
			<Example>
				{!available && (
					<Caption>Device motion is unavailable on this device.</Caption>
				)}
				{(available && data) && (
					<>
						<Caption>orientation</Caption>
						<Measurement name='∠' unit='°' value={orientation} precision={0} />

						<Caption>acceleration</Caption>
						<Measurement name='x' unit='m/s²' value={acceleration.x} precision={5} />
						<Measurement name='y' unit='m/s²' value={acceleration.y} precision={5} />
						<Measurement name='z' unit='m/s²' value={acceleration.z} precision={5} />

						<Caption>acceleration with gravity</Caption>
						<Measurement name='x' unit='m/s²' value={accelerationIncludingGravity.x} precision={5} />
						<Measurement name='y' unit='m/s²' value={accelerationIncludingGravity.y} precision={5} />
						<Measurement name='z' unit='m/s²' value={accelerationIncludingGravity.z} precision={5} />

						<Caption>rotation</Caption>
						<Measurement name='α' value={rotation.alpha} precision={5} />
						<Measurement name='β' value={rotation.beta} precision={5} />
						<Measurement name='γ' value={rotation.gamma} precision={5} />

						<Caption>rotation rate</Caption>
						<Measurement name='α' value={rotationRate.alpha} precision={5} />
						<Measurement name='β' value={rotationRate.beta} precision={5} />
						<Measurement name='γ' value={rotationRate.gamma} precision={5} />
					</>
				)}
			</Example>
		</Page>
	);
};
