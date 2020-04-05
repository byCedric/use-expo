import { renderHook } from '@testing-library/react-hooks';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useScreenOrientationPlatformLock } from '../src/use-screen-orientation-platform-lock';

const INFO = 0;
const ERROR = 1;

const infoStub: ScreenOrientation.PlatformOrientationInfo = {
	screenOrientationConstantAndroid: ScreenOrientation.OrientationLock.PORTRAIT_UP,
	screenOrientationLockWeb: ScreenOrientation.WebOrientationLock.PORTRAIT,
	screenOrientationArrayIOS: [
		ScreenOrientation.Orientation.PORTRAIT_UP,
	],
};

// note: this is similar to the info, but in a new object for validation
const lockStub = { ...infoStub, screenOrientationConstantAndroid: ScreenOrientation.OrientationLock.LANDSCAPE };

it('fetches the platform lock', async () => {
	const { getter, locker } = createSpies(infoStub);
	const hook = renderHook(useScreenOrientationPlatformLock);

	await hook.waitForNextUpdate();

	expect(hook.result.current[INFO]).toBe(infoStub);
	expect(hook.result.current[ERROR]).toBeUndefined();

	expect(getter).toBeCalled();
	expect(locker).not.toBeCalled();
});

it('fetches and set the platform lock', async () => {
	const { getter, locker } = createSpies(infoStub);
	const hook = renderHook(useScreenOrientationPlatformLock, {
		initialProps: lockStub,
	});

	await hook.waitForNextUpdate();

	expect(getter).toBeCalled();
	expect(locker).toBeCalledWith(lockStub);

	expect(hook.result.current[INFO]).toBe(lockStub);
	expect(hook.result.current[ERROR]).toBeUndefined();
});

it('unlocks when unmounted', async () => {
	const { unlocker } = createSpies(infoStub);
	const hook = renderHook(() => useScreenOrientationPlatformLock(lockStub));

	await hook.waitForNextUpdate();
	hook.unmount();

	expect(unlocker).toBeCalled();
});

it('unlocks and relocks when rerendered', async () => {
	const { unlocker } = createSpies(infoStub);
	const hook = renderHook(useScreenOrientationPlatformLock, {
		initialProps: lockStub,
	});

	await hook.waitForNextUpdate();
	hook.rerender({
		...lockStub,
		screenOrientationConstantAndroid: ScreenOrientation.OrientationLock.OTHER,
	});
	await hook.waitForNextUpdate();

	expect(unlocker).toBeCalledTimes(1);
});

it('returns encountered error', async () => {
	const error = new Error();
	const { locker } = createSpies(infoStub);

	locker.mockRejectedValue(error);

	const hook = renderHook(() => useScreenOrientationPlatformLock(lockStub));
	await hook.waitForNextUpdate();

	expect(hook.result.current[INFO]).toBe(infoStub);
	expect(hook.result.current[ERROR]).toBe(error);
});

function createSpies(info: ScreenOrientation.PlatformOrientationInfo) {
	const getter = jest
		.spyOn(ScreenOrientation, 'getPlatformOrientationLockAsync')
		.mockResolvedValue(info);

	const locker = jest
		.spyOn(ScreenOrientation, 'lockPlatformAsync')
		.mockResolvedValue();

	const unlocker = jest
		.spyOn(ScreenOrientation, 'unlockAsync')
		.mockResolvedValue();

	return { getter, locker, unlocker };
}
