const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

// HTML Templates
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

// External Assets (copy only)
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'wakkle': './src/js/app.js',
        'wakkle.min': './src/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].js',
        library: 'wakkle'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                loader: 'babel-loader',
                query: {
                    babelrc: false,
                    plugins: [
                      'transform-es2015-arrow-functions',
                      'transform-es2015-block-scoping',
                      'transform-es2015-parameters'
                    ]
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|json|wakkle|wkkl)$/,
                use: 'file-loader?name=[name].[ext]&outputPath=images/'
            },
            {
                test: /\.svg$/,
                use: 'svg-inline-loader?removeTags=true'
            }
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            title: 'Example',
            template: './src/index.ejs',
            chunks: ['wakkle'],
            css: ['wakkle.css'],
            hash: false,
            inject : false
        }),
        new HtmlWebpackHarddiskPlugin(),

        new CopyWebpackPlugin([ // Those files become copied to dist
            {
                context: path.resolve(__dirname, './src/'),
                from: 'images/*/*', 
                to: path.resolve(__dirname, './dist/')
            },
            {
                context: path.resolve(__dirname, './src/'),
                from: 'js/vendor/headtrackr.min.js', 
                to: path.resolve(__dirname, './dist/js/')
            },
        ]),
    ],
}