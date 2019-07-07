import React from 'react';
import { Caption, Text } from 'react-native-paper';
import { useFonts } from 'use-expo';
import { Example, Information, Link, Page } from '../../atoms';
import { docs } from '../../providers/urls';

const customFonts = {
	ComicSans: require('../../assets/fonts/comic-sans-ms/regular.ttf'),
};

export const UseFonts: React.SFC = () => {
	const [loaded] = useFonts(customFonts);

	return (
		<Page
			title='useFonts'
			subtitle='load a map of fonts'
		>
			<Information>
				This example uses the <Link url={docs.font}>Font</Link> module.
				It loads the custom font and renders some text after it finished loading.
			</Information>
			<Example>
				{!loaded && <Caption>Loading font...</Caption>}
				{loaded && (
					<Text theme={{ fonts: { regular: 'ComicSans' } }}>
						Bow down for the almighty Comic Sans!
					</Text>
				)}
			</Example>
		</Page>
	);
};
