const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, './index.js'),
    output: {
        path: path.join(__dirname, './lib'),
        filename: "libjs.[hash:6].js"
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}