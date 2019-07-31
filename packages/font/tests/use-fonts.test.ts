import { renderHook, act,  } from '@testing-library/react-hooks';
import * as Font from 'expo-font';
import { useFonts } from '../src/use-fonts';

jest.mock('expo-font');

const DATA = 0;
const FONTS = { 'OpenSans-Regular': require('./assets/open-sans-regular.ttf') };

test('returns load state when mounted', () => {
	(Font.loadAsync as jest.Mock).mockResolvedValue(undefined);

	const hook = renderHook(() => useFonts(FONTS));

	expect(hook.result.current[DATA]).toBe(false);
});

test('handles load state', async () => {
	(Font.loadAsync as jest.Mock).mockResolvedValue(undefined);

	const hook = renderHook(() => useFonts(FONTS));
	await hook.waitForNextUpdate();

	expect(hook.result.current[DATA]).toBe(true);
});
