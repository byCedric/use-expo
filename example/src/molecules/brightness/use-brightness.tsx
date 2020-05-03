import React, { useCallback } from 'react';
import { Slider } from 'react-native';
import { Caption } from 'react-native-paper';
import { debounce, round } from 'lodash';
import { useBrightness } from '@use-expo/brightness';
import { Example, Information, Link, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UseBrightness: React.SFC<MoleculeProps> = (props) => {
	const [brightness, setBrightness] = useBrightness();
	const setBrightnessDebounced = useCallback(
		debounce(setBrightness, 100),
		[setBrightness],
	);

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example only uses the <Link url={docs.brightness}>Brightness</Link> module.
				It renders the current screen brightness and a slider to change that.
			</Information>
			<Example>
				<Caption>{round(Number(brightness) * 100, 1).toFixed(1)}%</Caption>
				<Slider
					style={{ width: '100%' }}
					value={brightness}
					onValueChange={setBrightnessDebounced}
					step={0.001}
					minimumValue={0.001}
					maximumValue={1}
					minimumTrackTintColor="#333"
					thumbTintColor="#333"
				/>
			</Example>
		</Page>
	);
};

UseBrightness.defaultProps = {
	name: 'useBrightness',
	description: 'change the screen brightness',
};
