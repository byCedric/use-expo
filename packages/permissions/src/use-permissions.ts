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
		autoAsk = false,
		autoGet = true,
	} = options;

	function askPermissions() {
		return askAsync(...types).then(setData);
	}

	function getPermissions() {
		return getAsync(...types).then(setData);
	}

	useEffect(() => {
		if (autoAsk) askPermissions();
		if (!autoAsk && autoGet) getPermissions();
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
	autoAsk?: boolean;
	/** If it should fetch information about the permissions when mounted, defaults to `true` */
	autoGet?: boolean;
}
