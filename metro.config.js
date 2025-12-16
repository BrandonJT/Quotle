const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.blockList = [
  /node_modules\/.*\/node_modules/,
  /\.git\//,
  /ios\//,
  /android\//,
  /\.expo\//,
  /build\//,
  /dist\//,
];

config.resolver.nodeModulesPaths = [
  __dirname + '/node_modules'
];

module.exports = config;