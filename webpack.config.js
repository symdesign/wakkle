var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './source/js/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: './js/index.bundle.js',
        library: 'wakkl',
        libraryTarget: 'umd'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Demo',
            template: './source/index.ejs'
        })
    ],
    externals: {
        // headtrackr
    }
}