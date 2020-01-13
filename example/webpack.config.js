/* eslint-disable @typescript-eslint/no-var-requires */
// see: https://github.com/react-navigation/navigation-ex/blob/a23dfd419dceaf070948903ae70ab2170dd18769/example/webpack.config.js
const path = require('path');
const fs = require('fs');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const nodeModules = path.resolve(__dirname, '..', 'node_modules');
const packages = path.resolve(__dirname, '..', 'packages');

// todo: check why we receive this error:
// TypeError: Object.defineProperties called on non-object
// Module: expo-battery/build/Battery.js
// src/Battery.ts:21
// > 20 | export declare const isSupported: boolean;
// > 21 | Object.defineProperties(module.exports, {
// > 22 |   isSupported: {
module.exports = async function (env, argv) {
	const config = await createExpoWebpackConfigAsync(env, argv);

	config.module.rules.push({
		test: /\.(ts|tsx|js|jsx)$/,
		include: /(packages|example)\/.+/,
		exclude: /node_modules/,
		use: 'babel-loader',
	});

	config.resolve.plugins = config.resolve.plugins.filter(
		p => !(p instanceof ModuleScopePlugin)
	);

	Object.assign(config.resolve.alias, {
		react: path.resolve(nodeModules, 'react'),
		'react-native': path.resolve(nodeModules, 'react-native-web'),
		'react-native-web': path.resolve(nodeModules, 'react-native-web'),
		'@expo/vector-icons': path.resolve(nodeModules, '@expo/vector-icons'),
	});

	fs.readdirSync(packages).forEach(name => {
		config.resolve.alias[`@use-expo/${name}`] = path.resolve(
			packages,
			name,
			'src'
		);
	});

	return config;
};
