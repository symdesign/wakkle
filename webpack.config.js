const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const path = require('path');

module.exports = {
    entry: './source/js/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: './js/index.bundle.js',
        library: 'wakkl',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.scss/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Demo',
            template: './source/index.ejs'
        }),
        new ExtractTextPlugin({
            filename: 'css/app.css',
            disable: true,
            allChunks: true
        }),
    ],
    devServer: {
        proxy: {
            '/': {
                target: {
                    host: "localhost/wakkl.it/build/",
                    protocol: "http:",
                    port: 8888
                },
                open: false,
                hot: true,
                changeOrigin: true,
                secure: false
            }
        }
    }
}