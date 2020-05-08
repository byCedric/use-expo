import React from 'react';
import { Caption, Text } from 'react-native-paper';
import { useStoreReviewHasAction } from '@use-expo/store-review';
import { Example, Information, Link, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UseStoreReviewHasAction: React.SFC<MoleculeProps> = (props) => {
	const [hasAction] = useStoreReviewHasAction();

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example determines if the store review can perform any action with the <Link url={docs.storeReview}>StoreReview</Link> module.
			</Information>
			<Example>
				<Caption>Can perform an action for store review?</Caption>
				{hasAction && <Text>{hasAction ? 'Yes' : 'No'}</Text>}
			</Example>
		</Page>
	);
};

UseStoreReviewHasAction.defaultProps = {
	name: 'useStoreReviewHasAction',
	description: 'determines if the store review can perform any action',
};
