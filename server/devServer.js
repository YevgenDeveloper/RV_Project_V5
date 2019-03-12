const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../config/webpack.dev');

const webpackCompiler = webpack(webpackConfig);

module.exports = app => {
  app.use(
    webpackMiddleware(webpackCompiler, {
      https: 'true',
      hot: true,
      inline: true,
      logLevel: 'silent',
      publicPath: webpackConfig.output.publicPath,
    }),
  );

  app.use(
    webpackHotMiddleware(webpackCompiler, {
      log: false,
    }),
  );
};
