import { renderHook } from '@testing-library/react-hooks';
import * as Font from 'expo-font';
import { useFonts } from '../src/use-fonts';

const DATA = 0;
const FONTS = {
	'OpenSans-Regular': require('./assets/open-sans-regular.ttf'),
	'ComicSans-Regular': require('./assets/comic-sans-regular.ttf'),
};

it('loads font when mounted', async () => {
	jest.spyOn(Font, 'loadAsync').mockResolvedValue();

	const hook = renderHook(() => useFonts(FONTS));

	expect(hook.result.current[DATA]).toBe(false);

	await hook.waitForNextUpdate();

	expect(hook.result.current[DATA]).toBe(true);
});

describe('options', () => {
	it('loads new font map, after initial render', async () => {
		const loader = jest.spyOn(Font, 'loadAsync').mockResolvedValue();
		const partialFonts = { ...FONTS };
		delete partialFonts['ComicSans-Regular'];

		const hook = renderHook(useFonts, { initialProps: partialFonts });
		await hook.waitForNextUpdate();

		expect(loader).toBeCalledWith(partialFonts);

		hook.rerender(FONTS);

		expect(hook.result.current[DATA]).toBe(false);

		await hook.waitForNextUpdate();

		expect(hook.result.current[DATA]).toBe(true);
		expect(loader).toBeCalledWith(FONTS);
	});
});
