const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: './src/Game.ts',
    },
    mode: 'development',
    devServer: {
        contentBase: 'dist',
        host: '0.0.0.0'
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
    devtool: 'inline-source-map',
    plugins: [
        new CopyWebpackPlugin([{
            from: 'assets',
            to: 'assets'
        }]),
        new HTMLWebpackPlugin({
            title: "ZombieLand",
            meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
        })
    ]
}