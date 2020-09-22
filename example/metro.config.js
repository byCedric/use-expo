/* eslint-disable @typescript-eslint/no-var-requires */
const { createMetroConfiguration } = require('expo-yarn-workspaces');

const config = createMetroConfiguration(__dirname);

console.log(config);

module.exports = config;
