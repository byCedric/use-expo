module.exports = {
	preset: 'jest-expo',
	clearMocks: true,
	testMatch: [
		'<rootDir>/packages/**/*.test.ts',
	],
	moduleNameMapper: {
		'@use-expo/([^/]+)': '<rootDir>/packages/$1/src'
	},
	modulePathIgnorePatterns: [
		'<rootDir>/example',
	],
};
