import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import { loadAsync } from 'expo-font';

/**
 * Load a map of custom fonts to use in textual elements.
 * The map keys are used as font names, and can be used with `fontFamily: <name>;`.
 * It returns a boolean stating if all fonts are loaded.
 *
 * @see https://docs.expo.io/versions/latest/sdk/font/
 * @example
 * const [loaded] = useFonts({ ... });
 */
export function useFonts(map: FontMap): UseFontsSignature {
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

type FontSource = string | number | Asset;
type UseFontsSignature = [boolean];
