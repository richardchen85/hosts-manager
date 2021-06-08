const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';
const port = 3030;

module.exports = (() => {
  // entry声明
  const entries = {
    main: [dev ? './client/index.test.js' : './client/index.prod.js'],
  };

  // plugin声明
  const plugins = [
    new HtmlWebpackPlugin({
      env: dev ? 'dev' : 'production',
      template: './client/index.html',
    }),
  ];
  if (dev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
    );
  }

  return {
    mode: dev ? 'development' : 'production',
    entry: entries,
    output: {
      clean: true,
      path: path.resolve(__dirname, 'dist'),
      publicPath: dev ? '/' : '',
      filename: '[name].js',
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.css'],
    },
    module: {
      rules: [
        { test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/ },
        { test: /\.(png|jpg|eot|svg|ttf|woff)\??.*$/, type: 'asset/resource' },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      ],
    },
    plugins: plugins,
    devServer: {
      port: port,
      hot: dev,
      inline: true,
    },
  };
})();
