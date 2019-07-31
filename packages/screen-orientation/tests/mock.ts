// see: https://github.com/expo/expo/blob/master/packages/expo/src/ScreenOrientation/ScreenOrientation.types.ts#L1-L9
export enum Orientation {
	UNKNOWN = 'UNKNOWN',
	PORTRAIT = 'PORTRAIT',
	PORTRAIT_UP = 'PORTRAIT_UP',
	PORTRAIT_DOWN = 'PORTRAIT_DOWN',
	LANDSCAPE = 'LANDSCAPE',
	LANDSCAPE_LEFT = 'LANDSCAPE_LEFT',
	LANDSCAPE_RIGHT = 'LANDSCAPE_RIGHT',
}

// see: https://github.com/expo/expo/blob/master/packages/expo/src/ScreenOrientation/ScreenOrientation.types.ts#L11-L23
export enum OrientationLock {
	DEFAULT = 'DEFAULT',
	ALL = 'ALL',
	PORTRAIT = 'PORTRAIT',
	PORTRAIT_UP = 'PORTRAIT_UP',
	PORTRAIT_DOWN = 'PORTRAIT_DOWN',
	LANDSCAPE = 'LANDSCAPE',
	LANDSCAPE_LEFT = 'LANDSCAPE_LEFT',
	LANDSCAPE_RIGHT = 'LANDSCAPE_RIGHT',
	OTHER = 'OTHER',
	UNKNOWN = 'UNKNOWN',
}

// see: https://github.com/expo/expo/blob/master/packages/expo/src/ScreenOrientation/ScreenOrientation.types.ts#L25-L29
export enum SizeClassIOS {
	REGULAR = 'REGULAR',
	COMPACT = 'COMPACT',
	UNKNOWN = 'UNKNOWN',
}

export const ScreenOrientation = {
	addOrientationChangeListener: jest.fn(),
	getOrientationAsync: jest.fn(),
	lockAsync: jest.fn(),
	unlockAsync: jest.fn(),
}

export const Subscription = {
	remove: jest.fn(),
}

// note: make sure orientation change listener returns the subscription mock
ScreenOrientation.addOrientationChangeListener.mockReturnValue(Subscription);
