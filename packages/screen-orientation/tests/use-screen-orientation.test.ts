import { renderHook, act } from '@testing-library/react-hooks';
import * as Expo from 'expo';
import { useScreenOrientation } from '../src/use-screen-orientation';
import { Orientation, OrientationLock, SizeClassIOS } from './types';

const ORIENTATION = 0;
const SIZE_CLASS = 1;
const GET = 2;

it('returns default values when mounted', () => {
	const hook = renderHook(() => useScreenOrientation({ get: false, listen: false }));

	expect(hook.result.current[ORIENTATION]).toBeUndefined();
	expect(hook.result.current[SIZE_CLASS]).toBeUndefined();
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

it('updates orientation and size class data with get callback', async () => {
	jest.spyOn(Expo.ScreenOrientation, 'getOrientationAsync').mockResolvedValue({
		orientation: Orientation.PORTRAIT_UP,
		horizontalSizeClass: SizeClassIOS.REGULAR,
		verticalSizeClass: SizeClassIOS.REGULAR,
	});

	const hook = renderHook(() => useScreenOrientation({ get: false, listen: false }));
	await act(() => hook.result.current[GET]());

	expect(hook.result.current[ORIENTATION]).toBe(Orientation.PORTRAIT_UP);
	expect(hook.result.current[SIZE_CLASS]).toMatchObject({
		horizontal: SizeClassIOS.REGULAR,
		vertical: SizeClassIOS.REGULAR,
	});
});

describe('get option', () => {
	it('updates orientation and size class data when mounted', async () => {
		jest.spyOn(Expo.ScreenOrientation, 'getOrientationAsync').mockResolvedValue({
			orientation: Orientation.LANDSCAPE_LEFT,
			horizontalSizeClass: SizeClassIOS.COMPACT,
			verticalSizeClass: SizeClassIOS.REGULAR,
		});

		const hook = renderHook(() => useScreenOrientation({ get: true, listen: false }));
		await hook.waitForNextUpdate();

		expect(hook.result.current[ORIENTATION]).toBe(Orientation.LANDSCAPE_LEFT);
		expect(hook.result.current[SIZE_CLASS]).toMatchObject({
			horizontal: SizeClassIOS.COMPACT,
			vertical: SizeClassIOS.REGULAR,
		});
	});

	it('updates orientation data when rerendered', async () => {
		jest.spyOn(Expo.ScreenOrientation, 'getOrientationAsync').mockResolvedValue({
			orientation: Orientation.PORTRAIT_DOWN,
		});

		const hook = renderHook(useScreenOrientation, {
			initialProps: { get: false, listen: false },
		});
		await act(() => {
			hook.rerender({ get: true, listen: false })
			return hook.waitForNextUpdate();
		});

		expect(hook.result.current[ORIENTATION]).toBe(Orientation.PORTRAIT_DOWN);
		expect(hook.result.current[SIZE_CLASS]).toBeUndefined();
	});
});

describe('listen option', () => {
	it('subscribes when mounted', () => {
		const listener = jest.spyOn(Expo.ScreenOrientation, 'addOrientationChangeListener');

		renderHook(() => useScreenOrientation({ get: false, listen: true }));

		expect(listener).toBeCalled();
	});

	it('unsubscribes when unmounted', () => {
		const subscription = { remove: jest.fn() };
		jest.spyOn(Expo.ScreenOrientation, 'addOrientationChangeListener')
			.mockReturnValue(subscription);

		const hook = renderHook(() => useScreenOrientation({ get: false, listen: true }));
		hook.unmount();

		expect(subscription.remove).toBeCalled();
	});

	it('updates orientation and size class data when mounted', async () => {
		const subscription = { remove: jest.fn() };
		const listener = jest.spyOn(Expo.ScreenOrientation, 'addOrientationChangeListener')
			.mockReturnValue(subscription);

		const hook = renderHook(() => useScreenOrientation({ get: false, listen: true }));
		const handler = listener.mock.calls[0][0];
		await act(() => {
			handler({
				orientationLock: OrientationLock.ALL,
				orientationInfo: {
					orientation: Orientation.LANDSCAPE_RIGHT,
					horizontalSizeClass: SizeClassIOS.UNKNOWN,
					verticalSizeClass: SizeClassIOS.COMPACT,
				},
			});
			return hook.waitForNextUpdate();
		});

		expect(hook.result.current[ORIENTATION]).toBe(Orientation.LANDSCAPE_RIGHT);
		expect(hook.result.current[SIZE_CLASS]).toMatchObject({
			horizontal: SizeClassIOS.UNKNOWN,
			vertical: SizeClassIOS.COMPACT,
		});
	});

	it('updates orientation data when rerendered', async () => {
		const subscription = { remove: jest.fn() };
		const listener = jest.spyOn(Expo.ScreenOrientation, 'addOrientationChangeListener')
			.mockReturnValue(subscription);

		const hook = renderHook(useScreenOrientation, {
			initialProps: { get: false, listen: false },
		});
		hook.rerender({ get: false, listen: true });
		const handler = listener.mock.calls[0][0];
		await act(() => {
			handler({
				orientationLock: OrientationLock.ALL,
				orientationInfo: {
					orientation: Orientation.PORTRAIT_UP,
				},
			});
			return hook.waitForNextUpdate();
		});

		expect(hook.result.current[ORIENTATION]).toBe(Orientation.PORTRAIT_UP);
		expect(hook.result.current[SIZE_CLASS]).toBeUndefined();
	});
});
