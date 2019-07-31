import { ScreenOrientation, OrientationLock } from './mock';

jest.mock('expo', () => ({ ScreenOrientation }));

import { renderHook } from '@testing-library/react-hooks';
import { useScreenOrientationLock } from '../src/use-screen-orientation-lock';

test('locks the screen to orientation when mounted', () => {
	renderHook(() => useScreenOrientationLock(OrientationLock.PORTRAIT_UP));
	expect(ScreenOrientation.lockAsync).toBeCalledWith(OrientationLock.PORTRAIT_UP);
});

test('unlocks the screen to orientation when unmounted', () => {
	const hook = renderHook(() => useScreenOrientationLock(OrientationLock.PORTRAIT_UP));
	hook.unmount();
	expect(ScreenOrientation.unlockAsync).toBeCalled();
});

test('refreshes the lock when orientation is changed', () => {
	let orientation = OrientationLock.PORTRAIT_UP;
	const hook = renderHook(() => useScreenOrientationLock(orientation));

	orientation = OrientationLock.LANDSCAPE_RIGHT;
	hook.rerender();

	expect(ScreenOrientation.unlockAsync).toBeCalled();
	expect(ScreenOrientation.lockAsync).toBeCalledWith(OrientationLock.LANDSCAPE_RIGHT);
});
