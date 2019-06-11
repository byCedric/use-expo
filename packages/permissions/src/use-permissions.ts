import { useEffect, useState } from 'react';
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

	function askPermissions() {
		return askAsync(...types).then(setData);
	}

	function getPermissions() {
		return getAsync(...types).then(setData);
	}

	useEffect(() => {
		if (ask) askPermissions();
		if (!ask && get) getPermissions();
	}, []);

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
