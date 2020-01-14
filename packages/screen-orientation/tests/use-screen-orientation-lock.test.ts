import { renderHook } from '@testing-library/react-hooks';
import * as Expo from 'expo';
import { useScreenOrientationLock } from '../src/use-screen-orientation-lock';
import { OrientationLock } from './types';

it('locks the orientation when mounted', () => {
	const locker = jest.spyOn(Expo.ScreenOrientation, 'lockAsync').mockResolvedValue();

	renderHook(() => useScreenOrientationLock(OrientationLock.PORTRAIT_UP));
	expect(locker).toBeCalledWith(OrientationLock.PORTRAIT_UP);
});

it('unlocks the orientation when unmounted', () => {
	jest.spyOn(Expo.ScreenOrientation, 'lockAsync').mockResolvedValue();
	const unlocker = jest.spyOn(Expo.ScreenOrientation, 'unlockAsync').mockResolvedValue();

	const hook = renderHook(() => useScreenOrientationLock(OrientationLock.PORTRAIT_UP));
	hook.unmount();

	expect(unlocker).toBeCalled();
});

it('updates the lock when orientation is changed', () => {
	const locker = jest.spyOn(Expo.ScreenOrientation, 'lockAsync').mockResolvedValue();
	const unlocker = jest.spyOn(Expo.ScreenOrientation, 'unlockAsync').mockResolvedValue();

	const hook = renderHook(
		(props) => useScreenOrientationLock(props),
		{ initialProps: OrientationLock.PORTRAIT_UP },
	);
	hook.rerender(OrientationLock.LANDSCAPE_RIGHT);

	expect(locker).toBeCalledWith(OrientationLock.PORTRAIT_UP);
	expect(unlocker).toBeCalled();
	expect(locker).toBeCalledWith(OrientationLock.LANDSCAPE_RIGHT);
});
