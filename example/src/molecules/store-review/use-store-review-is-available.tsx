import React from 'react';
import { Caption, Text } from 'react-native-paper';
import { useStoreReviewIsAvailable } from '@use-expo/store-review';
import { Example, Information, Link, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UseStoreReviewIsAvailable: React.SFC<MoleculeProps> = (props) => {
	const [isAvailable] = useStoreReviewIsAvailable();

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example determines if the platform has the capabilities to use request review with the <Link url={docs.storeReview}>StoreReview</Link> module.
			</Information>
			<Example>
				<Caption>Can request a review?</Caption>
				{isAvailable && <Text>{isAvailable ? 'Yes' : 'No'}</Text>}
			</Example>
		</Page>
	);
};

UseStoreReviewIsAvailable.defaultProps = {
	name: 'useStoreReviewIsAvailable',
	description: 'determines if the platform has the capabilities to use request review',
};
