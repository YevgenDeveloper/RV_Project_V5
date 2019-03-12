/* eslint-disable import/no-extraneous-dependencies, global-require */

const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const mode =
  process.env.NODE_ENV === 'development' ? 'development' : 'production';
const distPath = resolve(__dirname, '../dist');
const nodeModules = resolve(__dirname, '../node_modules');

const alias = {
  client: resolve(__dirname, '../client'),
};

const postcssPlugins = [
  require('postcss-import')({
    resolve: require('postcss-import-webpack-resolver')({ alias }),
  }),
  require('postcss-partial-import'),
  require('stylelint'),
  require('precss'),
  require('postcss-calc'),
  require('postcss-svgo'),
  require('autoprefixer'),
  require('postcss-reporter')({ clearMessages: true }),
];
const appVersion = require('../package.json').version;

const plugins = [
  new webpack.EnvironmentPlugin(
    Object.assign(process.env, {
      NODE_ENV: mode,
      APP_VERSION: appVersion,
    }),
  ),
  new CaseSensitivePathsPlugin(),
  new HtmlWebpackPlugin({
    template: 'client/index.html',
    chunks: ['app', 'commons'],
    filename: 'index.html',
    alwaysWriteToDisk: true,
  }),
];

module.exports = {
  context: resolve(__dirname, '../'),

  entry: {
    app: 'client/index.js',
    commons: ['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk'],
  },

  output: {
    path: distPath,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [nodeModules, distPath],
        loader: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.js$/,
        exclude: [nodeModules, distPath],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader:
              mode === 'development'
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName:
                mode === 'development'
                  ? '[local]--[hash:base64:5]'
                  : '[hash:base64:5]',
              minimize: mode === 'production',
              sourceMap: mode === 'development',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: mode === 'development',
              plugins: postcssPlugins,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
      {
        test: /\.(jpe?g|png)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,
              name: 'assets/[name]-[hash:6].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins,

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          name: 'commons',
          test: 'commons',
          enforce: true,
        },
      },
    },
  },

  resolve: {
    modules: [nodeModules],
    extensions: ['.json', '.js'],
    alias,
  },
};
