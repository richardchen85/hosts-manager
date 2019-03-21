let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
let OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin

let debug = process.env.NODE_ENV !== 'production'

let port = 3030

module.exports = (() => {
    // entry声明
    let entries = {
        main: [debug ? './client/index.test.js' : './client/index.prod.js']
    }

    // plugin声明
    let plugins = [
        new HtmlWebpackPlugin({
            env: debug ? 'debug' : 'production',
            template: './client/index.html'
        }),
        new ExtractTextPlugin('[name].css')
    ]
    if(debug) {
        entries.main.unshift(
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:' + port
        )
        plugins.push(
            new webpack.HotModuleReplacementPlugin()
        )
    } else {
        plugins.push(
            new UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: false
            }),
            new OccurenceOrderPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        )
    }

    return {
        entry: entries,
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: debug ? '/' : '',
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
                { test: /\.(png|jpg|eot|svg|ttf|woff)\??.*$/, loader: 'url-loader?limit=18192&name=[path][name].[ext]' }
            ]
        },
        plugins: plugins,
        devServer: {
            port: port
        }
    }
})()