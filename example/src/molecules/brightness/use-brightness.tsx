import React from 'react';
import { Slider } from 'react-native';
import { Caption } from 'react-native-paper';
import { round } from 'lodash';
import { useBrightness } from 'use-expo';
import { docs } from '../../providers/urls';
import {
	ExampleContent,
	ExampleDescription,
	Link,
	Page,
} from '../../atoms';

export const UseBrightness: React.SFC = () => {
	const [brightness, setBrightness] = useBrightness();

	return (
		<Page
			title='useBrightness'
			subtitle='change the screen brightness'
		>
			<ExampleDescription>
				This example only uses the <Link url={docs.brightness}>Brightness</Link>.
				It renders the current screen's brightness and a slider to change that.
			</ExampleDescription>
			<ExampleContent>
				<>
					<Caption>{round(Number(brightness) * 100, 1).toFixed(1)}%</Caption>
					<Slider
						style={{ width: '100%' }}
						value={brightness}

						onValueChange={setBrightness}
						step={0.001}
						minimumValue={0.001}
						maximumValue={1}
						minimumTrackTintColor="#333"
						thumbTintColor="#333"
					/>
				</>
			</ExampleContent>
		</Page>
	);
};
