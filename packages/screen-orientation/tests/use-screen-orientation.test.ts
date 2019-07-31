import { ScreenOrientation, Orientation, SizeClassIOS } from './mock';

jest.mock('expo', () => ({ ScreenOrientation }));

import { renderHook, act } from '@testing-library/react-hooks';
import { useScreenOrientation } from '../src/use-screen-orientation';

const ORIENTATION = 0;
const SIZE_CLASS = 1;

test('returns orientation and size class state when mounted', async () => {
	(ScreenOrientation.getOrientationAsync as jest.Mock).mockResolvedValue({
		orientation: Orientation.LANDSCAPE_RIGHT,
		horizontalSizeClass: SizeClassIOS.COMPACT,
		verticalSizeClass: SizeClassIOS.REGULAR,
	});

	const hook = renderHook(useScreenOrientation);
	await hook.waitForNextUpdate();

	expect(hook.result.current[ORIENTATION]).toBe(Orientation.LANDSCAPE_RIGHT);
	expect(hook.result.current[SIZE_CLASS]).toMatchObject({
		horizontal: SizeClassIOS.COMPACT,
		vertical: SizeClassIOS.REGULAR,
	});
});

test('returns orientation state without size class when mounted', async () => {
	(ScreenOrientation.getOrientationAsync as jest.Mock).mockResolvedValue({
		orientation: Orientation.LANDSCAPE_RIGHT,
	});

	const hook = renderHook(useScreenOrientation);
	await hook.waitForNextUpdate();

	expect(hook.result.current[ORIENTATION]).toBe(Orientation.LANDSCAPE_RIGHT);
	expect(hook.result.current[SIZE_CLASS]).toBeUndefined();
});

test('handles new orientation data', () => {
	(ScreenOrientation.getOrientationAsync as jest.Mock).mockResolvedValue({
		orientation: Orientation.LANDSCAPE_RIGHT,
		horizontalSizeClass: SizeClassIOS.COMPACT,
		verticalSizeClass: SizeClassIOS.REGULAR,
	});

	const hook = renderHook(useScreenOrientation);
	const handler = ScreenOrientation.addOrientationChangeListener.mock.calls[0][0];
	const newData = {
		orientation: Orientation.PORTRAIT_UP,
		horizontalSizeClass: SizeClassIOS.REGULAR,
		verticalSizeClass: SizeClassIOS.REGULAR,
	};

	act(() => handler({ orientationInfo: newData }));

	expect(hook.result.current[ORIENTATION]).toBe(Orientation.PORTRAIT_UP);
	expect(hook.result.current[SIZE_CLASS]).toMatchObject({
		horizontal: SizeClassIOS.REGULAR,
		vertical: SizeClassIOS.REGULAR,
	});
});

test('handles new orientation data without screen class', () => {
	(ScreenOrientation.getOrientationAsync as jest.Mock).mockResolvedValue({
		orientation: Orientation.LANDSCAPE_LEFT,
	});

	const hook = renderHook(useScreenOrientation);
	const handler = ScreenOrientation.addOrientationChangeListener.mock.calls[0][0];
	const newData = { orientation: Orientation.LANDSCAPE_RIGHT };

	act(() => handler({ orientationInfo: newData }));

	expect(hook.result.current[ORIENTATION]).toBe(Orientation.LANDSCAPE_RIGHT);
	expect(hook.result.current[SIZE_CLASS]).toBeUndefined();
});

test('gets is skipped', () => {
	renderHook(() => useScreenOrientation({ get: false }));
	expect(ScreenOrientation.getOrientationAsync).not.toBeCalled();
});
