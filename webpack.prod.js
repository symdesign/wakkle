
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.(css|scss)$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                })
            },
        ]
    },
    plugins: [

        new ExtractTextPlugin({
            filename: './css/wakkle.css'
        }),

        new UglifyJsPlugin({
            include: /\.min\.js$/
        }),

    ],
});