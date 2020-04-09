const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const build = require('../build.json')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: build.assetsFolder,
        quiet: true,
        clientLogLevel: 'silent',
        host: '0.0.0.0',
        overlay: true,
        compress: true,
        watchContentBase: true
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: build.indexHTML,
            templateParameters: build
        })
    ]
});
