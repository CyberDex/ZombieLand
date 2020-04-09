const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const path = require('path')
const build = require('../build.json')

module.exports = {
    entry: build.entryPoint,
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            include: path.join(__dirname, `../${build.sourceFolder}`),
            exclude: /node_modules/,
            options: {
                transpileOnly: true,
                happyPackMode: true
            }
        }]
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new CheckerPlugin(),
        new ForkTsCheckerWebpackPlugin({
            silent: true,
            checkSyntacticErrors: true
        })
    ]
}