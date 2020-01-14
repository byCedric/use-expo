import { useEffect, useState, useCallback } from 'react';
import {
	PermissionType,
	PermissionResponse,
	askAsync,
	getAsync,
} from 'expo-permissions';

export function usePermissions(
	type: PermissionType | PermissionType[],
	options: PermissionsOptions = {},
): UsePermissionsSignature {
	const [data, setData] = useState<PermissionResponse>();
	const types = Array.isArray(type) ? type : [type];
	const {
		ask = false,
		get = true,
	} = options;

	const askPermissions = useCallback(
		() => askAsync(...types).then(setData),
		[types],
	);

	const getPermissions = useCallback(
		() => getAsync(...types).then(setData),
		[types],
	);

	useEffect(() => {
		if (ask) {
			askPermissions();
		}

		if (!ask && get) {
			getPermissions();
		}
	}, [ask, askPermissions, get, getPermissions]);

	return [data, askPermissions, getPermissions];
}

type UsePermissionsSignature = [
	PermissionResponse | undefined,
	() => Promise<void>,
	() => Promise<void>,
];

export interface PermissionsOptions {
	/** If it should ask the permissions when mounted, defaults to `false` */
	ask?: boolean;
	/** If it should fetch information about the permissions when mounted, defaults to `true` */
	get?: boolean;
}
