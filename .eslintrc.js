module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'jest',
		'react-hooks'
	],
	env: {
		'jest/globals': true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'react-hooks/exhaustive-deps': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'react/no-unescaped-entities': 'off',
		'react/prop-types': 'off',
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
};
