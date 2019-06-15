const { ScreenOrientation } = jest.genMockFromModule('expo');
const Subscription = { remove: jest.fn() };

ScreenOrientation.addOrientationChangeListener.mockReturnValue(Subscription);
jest.mock('expo', () => ({ ScreenOrientation }));

import { renderHook, act } from 'react-hooks-testing-library';
import { useScreenOrientation } from '../src/use-screen-orientation';

const ORIENTATION = 0;
const SIZE_CLASS = 1;

test('returns orientation and size class state when mounted', async () => {
	(ScreenOrientation.getOrientationAsync as jest.Mock).mockResolvedValue({
		orientation: ScreenOrientation.Orientation.LANDSCAPE_RIGHT,
		horizontalSizeClass: ScreenOrientation.SizeClassIOS.COMPACT,
		verticalSizeClass: ScreenOrientation.SizeClassIOS.REGULAR,
	});

	const hook = renderHook(useScreenOrientation);
	await hook.waitForNextUpdate();

	expect(hook.result.current[ORIENTATION]).toBe(ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
	expect(hook.result.current[SIZE_CLASS]).toMatchObject({
		horizontal: ScreenOrientation.SizeClassIOS.COMPACT,
		vertical: ScreenOrientation.SizeClassIOS.REGULAR,
	});
});

test('returns orientation state without size class when mounted', async () => {
	(ScreenOrientation.getOrientationAsync as jest.Mock).mockResolvedValue({
		orientation: ScreenOrientation.Orientation.LANDSCAPE_RIGHT,
	});

	const hook = renderHook(useScreenOrientation);
	await hook.waitForNextUpdate();

	expect(hook.result.current[ORIENTATION]).toBe(ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
	expect(hook.result.current[SIZE_CLASS]).toBeUndefined();
});

test('handles new orientation data', () => {
	(ScreenOrientation.getOrientationAsync as jest.Mock).mockResolvedValue({
		orientation: ScreenOrientation.Orientation.LANDSCAPE_RIGHT,
		horizontalSizeClass: ScreenOrientation.SizeClassIOS.COMPACT,
		verticalSizeClass: ScreenOrientation.SizeClassIOS.REGULAR,
	});

	const hook = renderHook(useScreenOrientation);
	const handler = ScreenOrientation.addOrientationChangeListener.mock.calls[0][0];
	const newData = {
		orientation: ScreenOrientation.Orientation.PORTRAIT_UP,
		horizontalSizeClass: ScreenOrientation.SizeClassIOS.REGULAR,
		verticalSizeClass: ScreenOrientation.SizeClassIOS.REGULAR,
	};

	act(() => handler({ orientationInfo: newData }));

	expect(hook.result.current[ORIENTATION]).toBe(ScreenOrientation.Orientation.PORTRAIT_UP);
	expect(hook.result.current[SIZE_CLASS]).toMatchObject({
		horizontal: ScreenOrientation.SizeClassIOS.REGULAR,
		vertical: ScreenOrientation.SizeClassIOS.REGULAR,
	});
});

test('handles new orientation data without screen class', () => {
	(ScreenOrientation.getOrientationAsync as jest.Mock).mockResolvedValue({
		orientation: ScreenOrientation.Orientation.LANDSCAPE_LEFT,
	});

	const hook = renderHook(useScreenOrientation);
	const handler = ScreenOrientation.addOrientationChangeListener.mock.calls[0][0];
	const newData = { orientation: ScreenOrientation.Orientation.LANDSCAPE_RIGHT };

	act(() => handler({ orientationInfo: newData }));

	expect(hook.result.current[ORIENTATION]).toBe(ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
	expect(hook.result.current[SIZE_CLASS]).toBeUndefined();
});

test('gets is skipped', () => {
	renderHook(() => useScreenOrientation({ get: false }));
	expect(ScreenOrientation.getOrientationAsync).not.toBeCalled();
});
