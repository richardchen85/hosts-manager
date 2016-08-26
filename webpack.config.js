let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
let OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

let debug = process.env.NODE_ENV !== 'production'

module.exports = (() => {
    // entry声明
    let entries = {
        common: ['react', 'react-dom', 'redux', 'react-redux', 'immutable'],
        main: './client/index.jsx'
    }

    // plugin声明
    let plugins = [
        new HtmlWebpackPlugin({
            template: './client/index.html'
        }),
        new ExtractTextPlugin('[name].css'),
        new CommonsChunkPlugin({
            name: 'common'
        })
    ]
    if(debug) {
        entries.common.unshift(
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:3000'
        )
        plugins.push(new webpack.HotModuleReplacementPlugin())
    }
    if(!debug) {
        plugins.push(
            new UglifyJsPlugin(),
            new OccurenceOrderPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        )
    }

    let config = {
        entry: entries,
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: null,
            filename: '[name].js'
        },
        resolve: {
            extensions: ['', '.js', '.jsx', '.css']
        },
        module: {
            loaders: [
                { test: /\.json$/, loader: 'json' },
                {
                    test: /\.jsx?$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react']
                    }
                },
                { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
                { test: /\.(png|jpg|eot|svg|ttf|woff)\??.*$/, loader: 'url-loader?limit=8192&name=[path][name].[ext]' }
            ]
        },
        plugins: plugins,
        devServer: {
            colors: true,
            historyApiFallback: true,
            inline: true,
            hot: true,
            port: 3000
        }
    }

    return config
})()