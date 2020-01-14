import { renderHook, act,  } from '@testing-library/react-hooks';
import * as Permissions from 'expo-permissions';
import { usePermissions } from '../src/use-permissions';

const DATA = 0;
const ASK = 1;
const GET = 2;

it('returns data, ask and get callbacks when mounted', async () => {
	const hook = renderHook(() => usePermissions(Permissions.CAMERA, { get: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[ASK]).toBeInstanceOf(Function);
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

it('updates data with get callback', async () => {
	const response = { status: 'granted' };
	jest.spyOn(Permissions, 'getAsync').mockResolvedValue(response as any);

	const hook = renderHook(() => usePermissions(Permissions.CAMERA, { get: false }));
	await act(() => hook.result.current[GET]());

	expect(hook.result.current[DATA]).toMatchObject(response);
});

it('updates data with ask callback', async () => {
	const response = { status: 'granted' };
	jest.spyOn(Permissions, 'askAsync').mockResolvedValue(response as any);

	const hook = renderHook(() => usePermissions(Permissions.CAMERA, { get: false }));
	await act(() => hook.result.current[ASK]());

	expect(hook.result.current[DATA]).toMatchObject(response);
});

it('accepts multiple permission types', async () => {
	const response = { status: 'granted' };
	const asker = jest.spyOn(Permissions, 'askAsync').mockResolvedValue(response as any);

	const permissions = [Permissions.CAMERA, Permissions.CAMERA_ROLL] as Permissions.PermissionType[];
	const hook = renderHook(() => usePermissions(permissions, { get: false }));

	await act(() => hook.result.current[ASK]());

	expect(asker).toBeCalledWith(...permissions);
});

describe('options', () => {
	it('gets the permissions when mounted', async () => {
		const response = { status: 'granted' };
		const getter = jest.spyOn(Permissions, 'getAsync').mockResolvedValue(response as any);

		const hook = renderHook(() => usePermissions(Permissions.CAMERA, { get: true }));
		await hook.waitForNextUpdate();

		expect(getter).toBeCalledWith(Permissions.CAMERA);
		expect(hook.result.current[DATA]).toMatchObject(response);
	});

	it('gets the permissions when rerendered', async () => {
		const response = { status: 'granted' };
		const getter = jest.spyOn(Permissions, 'getAsync').mockResolvedValue(response as any);

		const hook = renderHook(
			permissions => usePermissions(permissions, { get: false }),
			{ initialProps: [Permissions.CAMERA] as Permissions.PermissionType[] },
		);
		hook.rerender([Permissions.CAMERA, Permissions.CAMERA_ROLL]);
		await act(() => hook.result.current[GET]());

		expect(getter).toBeCalledWith(Permissions.CAMERA, Permissions.CAMERA_ROLL);
		expect(hook.result.current[DATA]).toMatchObject(response);
	});

	it('asks the permissions when mounted', async () => {
		const response = { status: 'granted' };
		const asker = jest.spyOn(Permissions, 'askAsync').mockResolvedValue(response as any);

		const hook = renderHook(() => usePermissions(Permissions.CAMERA, { ask: true }));
		await hook.waitForNextUpdate();

		expect(asker).toBeCalledWith(Permissions.CAMERA);
		expect(hook.result.current[DATA]).toMatchObject(response);
	});

	it('asks the permissions when rerendered', async () => {
		const response = { status: 'granted' };
		const asker = jest.spyOn(Permissions, 'askAsync').mockResolvedValue(response as any);

		const hook = renderHook(
			permissions => usePermissions(permissions, { get: false, ask: false }),
			{ initialProps: [Permissions.CAMERA] as Permissions.PermissionType[] },
		);
		hook.rerender([Permissions.CAMERA, Permissions.CAMERA_ROLL]);
		await act(() => hook.result.current[ASK]());

		expect(asker).toBeCalledWith(Permissions.CAMERA, Permissions.CAMERA_ROLL);
		expect(hook.result.current[DATA]).toMatchObject(response);
	});
});
