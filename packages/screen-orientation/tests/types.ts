// note: these types are not exported from the expo module, so we need to duplicate them

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
	ALL_BUT_UPSIDE_DOWN = 'ALL_BUT_UPSIDE_DOWN', // deprecated
}

// see: https://github.com/expo/expo/blob/master/packages/expo/src/ScreenOrientation/ScreenOrientation.types.ts#L25-L29
export enum SizeClassIOS {
	REGULAR = 'REGULAR',
	COMPACT = 'COMPACT',
	UNKNOWN = 'UNKNOWN',
}
