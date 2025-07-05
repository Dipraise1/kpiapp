const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Optimize for performance without invalid options
config.resolver = {
  ...config.resolver,
  blockList: [
    /node_modules\/.*\/node_modules\/react-native\/.*/,
  ],
  sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json'],
};

module.exports = config; 