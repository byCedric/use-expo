module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'jest',
		'react-hooks',
	],
	env: {
		'jest/globals': true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'react-hooks/exhaustive-deps': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'react/no-unescaped-entities': 'off',
		'react/prop-types': 'off',

		// fix: temporary use the "normal" indent until the typescript version rewrite is complete
		// see: https://github.com/typescript-eslint/typescript-eslint/milestone/1
		// '@typescript-eslint/indent': ['error', 'tab'],
		'indent': ['error', 'tab', { SwitchCase: 1 }],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
