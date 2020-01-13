import { renderHook } from '@testing-library/react-hooks';
import * as Font from 'expo-font';
import { useFonts } from '../src/use-fonts';

const DATA = 0;
const FONTS = {
	'OpenSans-Regular': require('./assets/open-sans-regular.ttf'),
};

it('loads font when mounted', async () => {
	jest.spyOn(Font, 'loadAsync').mockResolvedValue();

	const hook = renderHook(() => useFonts(FONTS));

	expect(hook.result.current[DATA]).toBe(false);

	await hook.waitForNextUpdate();

	expect(hook.result.current[DATA]).toBe(true);
});
