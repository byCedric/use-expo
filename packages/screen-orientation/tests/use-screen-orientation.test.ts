import { renderHook, act } from '@testing-library/react-hooks';
import * as Expo from 'expo';
import { useScreenOrientation } from '../src/use-screen-orientation';
import { Orientation, OrientationLock, SizeClassIOS } from './types';

const ORIENTATION = 0;
const SIZE_CLASS = 1;

// todo: figure out why this throws so many warnings
it('returns orientation and size class data when mounted', async () => {
	jest.spyOn(Expo.ScreenOrientation, 'getOrientationAsync').mockResolvedValue({
		orientation: Orientation.LANDSCAPE_RIGHT,
		horizontalSizeClass: SizeClassIOS.COMPACT,
		verticalSizeClass: SizeClassIOS.REGULAR,
	});

	const hook = renderHook(() => useScreenOrientation({ get: true }));
	await hook.waitForNextUpdate();

	expect(hook.result.current[ORIENTATION]).toBe(Orientation.LANDSCAPE_RIGHT);
	expect(hook.result.current[SIZE_CLASS]).toMatchObject({
		horizontal: SizeClassIOS.COMPACT,
		vertical: SizeClassIOS.REGULAR,
	});
});

// todo: figure out why this throws so many warnings
it('returns orientation data without size class when mounted', async () => {
	jest.spyOn(Expo.ScreenOrientation, 'getOrientationAsync').mockResolvedValue({
		orientation: Orientation.LANDSCAPE_RIGHT,
	});

	const hook = renderHook(() => useScreenOrientation({ get: true }));
	await hook.waitForNextUpdate();

	expect(hook.result.current[ORIENTATION]).toBe(Orientation.LANDSCAPE_RIGHT);
	expect(hook.result.current[SIZE_CLASS]).toBeUndefined();
});

it('updates orientation data with size class from orientation listener', async () => {
	const subscription = { remove: jest.fn() };
	const listener = jest.spyOn(Expo.ScreenOrientation, 'addOrientationChangeListener').mockReturnValue(subscription);

	const hook = renderHook(() => useScreenOrientation({ get: false }));
	const handler = listener.mock.calls[0][0];

	expect(hook.result.current[ORIENTATION]).toBeUndefined();
	expect(hook.result.current[SIZE_CLASS]).toBeUndefined();

	await act(() => {
		handler({
			orientationLock: OrientationLock.ALL,
			orientationInfo: {
				orientation: Orientation.PORTRAIT_UP,
				horizontalSizeClass: SizeClassIOS.REGULAR,
				verticalSizeClass: SizeClassIOS.REGULAR,
			},
		});

		return hook.waitForNextUpdate();
	});

	expect(hook.result.current[ORIENTATION]).toBe(Orientation.PORTRAIT_UP);
	expect(hook.result.current[SIZE_CLASS]).toMatchObject({
		horizontal: SizeClassIOS.REGULAR,
		vertical: SizeClassIOS.REGULAR,
	});
});

it('updates orientation data from orientation listener without size class', async () => {
	const subscription = { remove: jest.fn() };
	const listener = jest.spyOn(Expo.ScreenOrientation, 'addOrientationChangeListener').mockReturnValue(subscription);

	const hook = renderHook(() => useScreenOrientation({ get: false }));
	const handler = listener.mock.calls[0][0];

	expect(hook.result.current[ORIENTATION]).toBeUndefined();
	expect(hook.result.current[SIZE_CLASS]).toBeUndefined();

	await act(() => {
		handler({
			orientationLock: OrientationLock.ALL,
			orientationInfo: {
				orientation: Orientation.LANDSCAPE_RIGHT,
			},
		});

		return hook.waitForNextUpdate();
	});

	expect(hook.result.current[ORIENTATION]).toBe(Orientation.LANDSCAPE_RIGHT);
	expect(hook.result.current[SIZE_CLASS]).toBeUndefined();
});

describe('event listener', () => {
	it('subscribes when mounted', () => {
		const listener = jest.spyOn(Expo.ScreenOrientation, 'addOrientationChangeListener');

		renderHook(() => useScreenOrientation());

		expect(listener).toBeCalled();
	});

	it('unsubscribes when unmounted', () => {
		const subscription = { remove: jest.fn() };
		jest.spyOn(Expo.ScreenOrientation, 'addOrientationChangeListener').mockReturnValue(subscription);

		const hook = renderHook(() => useScreenOrientation());
		hook.unmount();

		expect(subscription.remove).toBeCalled();
	});
});
