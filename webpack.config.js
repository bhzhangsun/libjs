const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './lib'),
        filename: "libjs.js",
        library: 'libjs',
        // libraryTarget: 'window'
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            use: 'babel-loader'
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin()
    ]
}