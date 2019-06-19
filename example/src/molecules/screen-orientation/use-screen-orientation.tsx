import React from 'react';
import { Caption, Text } from 'react-native-paper';
import { useScreenOrientation } from 'use-expo';
import { docs } from '../../providers/urls';
import {
	ExampleContent,
	ExampleDescription,
	Link,
	Measurement,
	Page,
} from '../../atoms';

export const UseScreenOrientation: React.SFC = () => {
	const [orientation, sizeClass] = useScreenOrientation();

	return (
		<Page
			title='useScreenOrientation'
			subtitle='tracks changes in screen orientation'
		>
			<ExampleDescription>
				This example only uses the <Link url={docs.screenOrientation}>ScreenOrientation</Link>.
				It renders the current orientation and listens to changes.
			</ExampleDescription>
			<ExampleContent>
				<>
					<Caption>screen orientation</Caption>
					<Text>{orientation}</Text>
					{!sizeClass
						? <Caption>size class unavailable on this device</Caption>
						: (
							<>
								<Caption>size class</Caption>
								<Measurement name='horizontal' value={sizeClass.horizontal} precision={0} />
								<Measurement name='vertical' value={sizeClass.vertical} precision={0} />
							</>
						)}
				</>
			</ExampleContent>
		</Page>
	);
};
