import { useEffect, useState } from 'react';
import { FontSource, loadAsync } from 'expo-font';

/**
 * Load a map of custom fonts to use in textual elements.
 * The map keys are used as font names, and can be used with `fontFamily: <name>;`.
 * It returns a boolean describing if all fonts are loaded.
 *
 * @see https://docs.expo.io/versions/latest/sdk/font/
 * @example const [isLoaded] = useFonts(...);
 */
export function useFonts(map: FontMap): [boolean] {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		loadAsync(map).then(() => setLoaded(true));
		return () => setLoaded(false);
	}, [map]);

	return [loaded];
}

interface FontMap {
	[name: string]: FontSource;
}
