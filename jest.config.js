// module.exports = {
// 	preset: 'jest-expo',
// 	clearMocks: true,
// 	testMatch: [
// 		'<rootDir>/packages/**/*.test.ts',
// 	],
// 	moduleNameMapper: {
// 		'@use-expo/([^/]+)': '<rootDir>/packages/$1/src'
// 	},
// 	modulePathIgnorePatterns: [
// 		'<rootDir>/example',
// 	],
// };

module.exports = {
	testPathIgnorePatterns: ['.*'],
	projects: [
		'./packages/application',
		'./packages/battery',
		'./packages/brightness',
		'./packages/font',
		'./packages/permissions',
		'./packages/screen-orientation',
		'./packages/sensors',
		'./packages/store-review',
		'./packages/web-browser',
	],
};
