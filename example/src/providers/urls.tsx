import { sample } from 'lodash';

export const docs = {
	accelerometer: 'https://docs.expo.io/versions/latest/sdk/accelerometer/',
	barometer: 'https://docs.expo.io/versions/latest/sdk/barometer/',
	brightness: 'https://docs.expo.io/versions/latest/sdk/brightness/',
	camera: 'https://docs.expo.io/versions/latest/sdk/camera/',
	deviceMotion: 'https://docs.expo.io/versions/latest/sdk/devicemotion/',
	font: 'https://docs.expo.io/versions/latest/sdk/font/',
	gyroscope: 'https://docs.expo.io/versions/latest/sdk/gyroscope/',
	magnetometer: 'https://docs.expo.io/versions/latest/sdk/magnetometer/',
	pedometer: 'https://docs.expo.io/versions/latest/sdk/pedometer/',
	permissions: 'https://docs.expo.io/versions/latest/sdk/permissions/',
	screenOrientation: 'https://docs.expo.io/versions/latest/sdk/screen-orientation/',
};

export const permissions = {
	camera: 'https://docs.expo.io/versions/latest/sdk/permissions/#permissionscamera',
	systemBrightness: 'https://docs.expo.io/versions/latest/sdk/permissions/#permissionssystem_brightness',
};

export const expo = {
	permissions: 'https://github.com/expo/expo/tree/master/packages/expo-permissions#readme',
};

export const repo = 'https://github.com/bycedric/use-expo';

// please don't judge me for this...
export const author = () => sample([
	'https://finest.dev?ref=use-expo',
	'https://cedric.dev?ref=use-expo',
	'https://bycedric.dev?ref=use-expo',
	'https://dekoningdernederlanden.nl?ref=use-expo',
	'https://bycedric.com?ref=use-expo',
]);
