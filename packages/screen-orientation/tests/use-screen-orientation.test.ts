import { renderHook, act } from '@testing-library/react-hooks';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useScreenOrientation } from '../src/use-screen-orientation';

const DATA = 0;
const GET = 1;

it('returns default values when mounted', () => {
	const hook = renderHook(useScreenOrientation, {
		initialProps: { get: false, listen: false },
	});

	expect(hook.result.current[DATA]).toBeUndefined();
	expect(hook.result.current[GET]).toBeInstanceOf(Function);
});

it('updates orientation data with get callback', async () => {
	jest.spyOn(ScreenOrientation, 'getOrientationAsync')
		.mockResolvedValue(ScreenOrientation.Orientation.PORTRAIT_UP);

	const hook = renderHook(useScreenOrientation, {
		initialProps: { get: false, listen: false },
	});
	await act(async () => {
		await hook.result.current[GET]();
	});

	expect(hook.result.current[DATA]).toMatchObject({
		orientation: ScreenOrientation.Orientation.PORTRAIT_UP,
	});
});

describe('get option', () => {
	it('updates orientation and size class data when mounted', async () => {
		jest.spyOn(ScreenOrientation, 'getOrientationAsync')
			.mockResolvedValue(ScreenOrientation.Orientation.LANDSCAPE_LEFT);

		const hook = renderHook(useScreenOrientation, {
			initialProps: { get: true, listen: false },
		});
		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toMatchObject({
			orientation: ScreenOrientation.Orientation.LANDSCAPE_LEFT,
		});
	});

	it('updates orientation data when rerendered', async () => {
		jest.spyOn(ScreenOrientation, 'getOrientationAsync')
			.mockResolvedValue(ScreenOrientation.Orientation.PORTRAIT_DOWN);

		const hook = renderHook(useScreenOrientation, {
			initialProps: { get: false, listen: false },
		});
		await act(() => {
			hook.rerender({ get: true, listen: false })
			return hook.waitForNextUpdate();
		});

		expect(hook.result.current[DATA]).toMatchObject({
			orientation: ScreenOrientation.Orientation.PORTRAIT_DOWN,
		});
	});
});

describe('listen option', () => {
	it('subscribes when mounted', () => {
		const listener = jest.spyOn(ScreenOrientation, 'addOrientationChangeListener');

		renderHook(useScreenOrientation, {
			initialProps: { get: false, listen: true },
		});

		expect(listener).toBeCalled();
	});

	it('unsubscribes when unmounted', () => {
		const subscription = { remove: jest.fn() };
		jest.spyOn(ScreenOrientation, 'addOrientationChangeListener')
			.mockReturnValue(subscription);

		const hook = renderHook(useScreenOrientation, {
			initialProps: { get: false, listen: true },
		});
		hook.unmount();

		expect(subscription.remove).toBeCalled();
	});

	it('updates orientation and size class data when mounted', async () => {
		const subscription = { remove: jest.fn() };
		const event: ScreenOrientation.OrientationChangeEvent = {
			orientationLock: ScreenOrientation.OrientationLock.ALL,
			orientationInfo: {
				orientation: ScreenOrientation.Orientation.LANDSCAPE_RIGHT,
				horizontalSizeClass: ScreenOrientation.SizeClassIOS.UNKNOWN,
				verticalSizeClass: ScreenOrientation.SizeClassIOS.COMPACT,
			},
		};

		const listener = jest.spyOn(ScreenOrientation, 'addOrientationChangeListener')
			.mockReturnValue(subscription);

		const hook = renderHook(useScreenOrientation, {
			initialProps: { get: false, listen: true },
		});
		const handler = listener.mock.calls[0][0];
		await act(() => {
			handler(event);
			return hook.waitForNextUpdate();
		});

		expect(hook.result.current[DATA]).toMatchObject(event.orientationInfo);
	});

	it('updates orientation data when rerendered', async () => {
		const subscription = { remove: jest.fn() };
		const event: ScreenOrientation.OrientationChangeEvent = {
			orientationLock: ScreenOrientation.OrientationLock.ALL,
			orientationInfo: {
				orientation: ScreenOrientation.Orientation.LANDSCAPE_RIGHT,
			},
		};

		const listener = jest.spyOn(ScreenOrientation, 'addOrientationChangeListener')
			.mockReturnValue(subscription);

		const hook = renderHook(useScreenOrientation, {
			initialProps: { get: false, listen: true },
		});
		hook.rerender({ get: false, listen: true });
		const handler = listener.mock.calls[0][0];
		await act(() => {
			handler(event);
			return hook.waitForNextUpdate();
		});

		expect(hook.result.current[DATA]).toMatchObject(event.orientationInfo);
	});
});
