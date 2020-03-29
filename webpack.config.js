const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
    entry: {
        index: './src/main.ts',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // stats: "errors-only",
        quiet: true,
        contentBase: 'dist',
        host: '0.0.0.0',
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new CopyWebpackPlugin([{
            from: 'assets',
            to: 'assets'
        }]),
        new HTMLWebpackPlugin({
            template: 'index.html'
        })
    ]
}