const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge');
const common = require('./webpack.common.js')
const build = require('../build.json')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const JavaScriptObfuscator = require('webpack-obfuscator')

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'js/[name].[contenthash].bundle.js',
        chunkFilename: 'js/[name].[contenthash].chunk.js'
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
        splitChunks: {
            cacheGroups: {
                commons: {
                    filename: '[name].[contenthash].bundle.js'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new JavaScriptObfuscator(
            {
                rotateStringArray: true,
                stringArray: true,
                stringArrayThreshold: 0.75
            },
            ['vendors.*.js']
        ),
        new CopyWebpackPlugin([{
            "from": build.assetsFolder,
            "ignore": [build.indexHTML]
        }]),
        new HTMLWebpackPlugin({
            template: build.indexHTML,
            templateParameters: build,
            minify: {
                collapseWhitespace: true
            }
        })
    ]
})