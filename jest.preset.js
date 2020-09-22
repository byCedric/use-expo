const path = require('path');

const defaultPreset = {
	preset: 'jest-expo',
	clearMocks: true,
	coverageDirectory: '<rootDir>/coverage',
	testMatch: [
		'<rootDir>/**/*.test.ts',
	],
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/src/**/*.{ts,tsx,js,jsx}',
	],
};

function createPreset(dir) {
	return {
		...defaultPreset,
		rootDir: dir,
		displayName: require(path.join(dir, 'package.json')).name,
	}
}

module.exports = {
	defaultPreset,
	createPreset,
};
