import { renderHook } from '@testing-library/react-hooks';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useScreenOrientationLock } from '../src/use-screen-orientation-lock';

const INFO = 0;
const ERROR = 1;

it('fetches the device lock', async () => {
	const { getter, locker } = createSpies(ScreenOrientation.OrientationLock.PORTRAIT);

	const hook = renderHook(() => useScreenOrientationLock());
	await hook.waitForNextUpdate();

	expect(hook.result.current[INFO]).toBe(ScreenOrientation.OrientationLock.PORTRAIT);
	expect(hook.result.current[ERROR]).toBeUndefined();

	expect(getter).toBeCalled();
	expect(locker).not.toBeCalled();
});

it('fetches and set the device lock', async () => {
	const { getter, locker } = createSpies(ScreenOrientation.OrientationLock.OTHER);
	const hook = renderHook(useScreenOrientationLock, {
		initialProps: ScreenOrientation.OrientationLock.LANDSCAPE,
	});

	await hook.waitForNextUpdate();

	expect(getter).toBeCalled();
	expect(locker).toBeCalledWith(ScreenOrientation.OrientationLock.LANDSCAPE);

	expect(hook.result.current[INFO]).toBe(ScreenOrientation.OrientationLock.LANDSCAPE);
	expect(hook.result.current[ERROR]).toBeUndefined();
});

it('unlocks when unmounted', async () => {
	const { unlocker } = createSpies(ScreenOrientation.OrientationLock.PORTRAIT);
	const hook = renderHook(useScreenOrientationLock, {
		initialProps: ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT,
	});

	await hook.waitForNextUpdate();
	hook.unmount();

	expect(unlocker).toBeCalled();
});

it('unlocks and relocks when rerendered', async () => {
	const { unlocker } = createSpies(ScreenOrientation.OrientationLock.PORTRAIT);
	const hook = renderHook(useScreenOrientationLock, {
		initialProps: ScreenOrientation.OrientationLock.PORTRAIT,
	});

	await hook.waitForNextUpdate();
	hook.rerender(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
	await hook.waitForNextUpdate();

	expect(unlocker).toBeCalledTimes(1);
});

it('returns encountered error', async () => {
	const error = new Error();
	const { locker } = createSpies(ScreenOrientation.OrientationLock.PORTRAIT);

	locker.mockRejectedValue(error);

	const hook = renderHook(useScreenOrientationLock, {
		initialProps: ScreenOrientation.OrientationLock.PORTRAIT_DOWN
	});
	await hook.waitForNextUpdate();

	expect(hook.result.current[INFO]).toBe(ScreenOrientation.OrientationLock.PORTRAIT);
	expect(hook.result.current[ERROR]).toBe(error);
});

function createSpies(lock: ScreenOrientation.OrientationLock) {
	const getter = jest
		.spyOn(ScreenOrientation, 'getOrientationLockAsync')
		.mockResolvedValue(lock);

	const locker = jest
		.spyOn(ScreenOrientation, 'lockAsync')
		.mockResolvedValue();

	const unlocker = jest
		.spyOn(ScreenOrientation, 'unlockAsync')
		.mockResolvedValue();

	return { getter, locker, unlocker };
}
