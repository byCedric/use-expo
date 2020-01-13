import 'expo/build/Expo.fx';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { activateKeepAwake } from 'expo-keep-awake';

import { App } from './src/app.tsx';

if (global.__DEV__) {
	activateKeepAwake();
}

registerRootComponent(App);
