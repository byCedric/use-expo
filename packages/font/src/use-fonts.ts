import { useEffect, useState } from 'react';
import { FontSource, loadAsync } from 'expo-font';

/**
 * Load a map of custom fonts to use in textual elements.
 * The map keys are used as font names, and can be used with `fontFamily: <name>;`.
 * It returns a boolean describing if all fonts are loaded.
 *
 * Note, the fonts are not "reloaded" when you dynamically change the font map.
 *
 * @see https://docs.expo.io/versions/latest/sdk/font/
 * @example const [isLoaded] = useFonts(...);
 */
export function useFonts(map: FontMap): [boolean] {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		loadAsync(map).then(() => setLoaded(true))
	}, []); // eslint-disable-line

	// note: to avoid any ambiguity fonts are only loaded once
	// since every rerender is a new object, we have no way of
	// detecting a new map and updating the loaded state based on that

	return [loaded];
}

interface FontMap {
	[name: string]: FontSource;
}
