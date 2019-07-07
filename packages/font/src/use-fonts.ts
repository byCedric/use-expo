import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import { loadAsync } from 'expo-font';

export function useFonts(map: FontMap): UseFontsSignature {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		loadAsync(map).then(() => setLoaded(true));
	}, []);

	return [loaded];
}

interface FontMap {
	[name: string]: FontSource;
}

type FontSource = string | number | Asset;
type UseFontsSignature = [boolean];
