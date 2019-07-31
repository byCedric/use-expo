import { renderHook, act,  } from '@testing-library/react-hooks';
import * as Permissions from 'expo-permissions';
import { usePermissions } from '../src/use-permissions';

jest.mock('expo-permissions');

const DATA = 0;
const ASK = 1;
const GET = 2;

test('returns state, ask and get callbacks when mounted', () => {
	const hook = renderHook(() => usePermissions(Permissions.CAMERA, { get: false }));

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[ASK]).toBeInstanceOf(Function);
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

test('handles state with get callback', async () => {
	const hook = renderHook(() => usePermissions(Permissions.CAMERA, { get: false }));
	const response = { status: 'granted' };

	(Permissions.getAsync as jest.Mock).mockResolvedValue(response);

	// this produces a warning about a side effect outside act
	// see: https://github.com/mpeyper/react-hooks-testing-library/issues/14#issuecomment-493021093
	act(() => { hook.result.current[GET]() });
	await hook.waitForNextUpdate();

	expect(hook.result.current[DATA]).toMatchObject(response);
});

test('handles state with ask callback', async () => {
	const hook = renderHook(() => usePermissions(Permissions.CAMERA, { get: false }));
	const response = { status: 'granted' };

	(Permissions.askAsync as jest.Mock).mockResolvedValue(response);

	// this produces a warning about a side effect outside act
	// see: https://github.com/mpeyper/react-hooks-testing-library/issues/14#issuecomment-493021093
	act(() => { hook.result.current[ASK]() });
	await hook.waitForNextUpdate();

	expect(hook.result.current[DATA]).toMatchObject(response);
});

test('accepts multiple permission types', () => {
	const hook = renderHook(() => usePermissions(
		[Permissions.CAMERA, Permissions.CAMERA_ROLL],
		{ get: false },
	));

	expect(hook.result.current[DATA]).toBeUndefined();
});

test('gets the permissions when mounted, by default', async () => {
	(Permissions.getAsync as jest.Mock).mockResolvedValue({ status: 'granted' });
	renderHook(() => usePermissions(Permissions.CAMERA));
	expect(Permissions.getAsync).toBeCalledWith(Permissions.CAMERA);
});


test('asks the permissions when mounted', async () => {
	(Permissions.askAsync as jest.Mock).mockResolvedValue({ status: 'granted' });
	renderHook(() => usePermissions(Permissions.CAMERA, { ask: true }));
	expect(Permissions.askAsync).toBeCalledWith(Permissions.CAMERA);
});
