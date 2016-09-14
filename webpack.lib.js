const webpack = require('webpack')

const vendors = [
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'immutable'
]

module.exports = {
    output: {
        path: 'dist',
        filename: '[name].min.js',
        library: '[name]'
    },
    entry: {
        'lib': vendors
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
}