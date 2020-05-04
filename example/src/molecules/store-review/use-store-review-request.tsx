import React, { useEffect, useState } from 'react';
import { Caption, Text } from 'react-native-paper';
import { useStoreReviewRequest } from '@use-expo/store-review';
import { Example, Information, Link, Page } from '../../atoms';
import { MoleculeProps } from '../../providers/molecule';
import { docs } from '../../providers/urls';

export const UseStoreReviewRequest: React.SFC<MoleculeProps> = (props) => {
	const requestReview = useStoreReviewRequest();
	const [isRequested, setIsRequested] = useState<boolean>(false);

	useEffect(() => {
		requestReview().then(setIsRequested);
	}, [requestReview]);

	return (
		<Page
			title={props.name}
			subtitle={props.description}
		>
			<Information>
				This example requests a store review if available with the <Link url={docs.storeReview}>StoreReview</Link> module.
			</Information>
			<Example>
				<Caption>Is requested?</Caption>
				<Text>{isRequested ? 'Yes' : 'No'}</Text>
			</Example>
		</Page>
	);
};

UseStoreReviewRequest.defaultProps = {
	name: 'useStoreReviewRequest',
	description: 'request a store review if available',
};
