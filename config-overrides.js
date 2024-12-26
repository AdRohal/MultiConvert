const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    process: require.resolve('process/browser.js'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/'),
    crypto: require.resolve('crypto-browserify'),
    url: require.resolve('url/'),
    vm: require.resolve('vm-browserify'),
  };
  config.resolve.extensions = ['.js', '.jsx', '.json'];
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    })
  );
  return config;
};