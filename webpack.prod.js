
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const autoprefixer = require('autoprefixer');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.(css|scss)$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader:'css-loader',
                        options: { minimize: true }
                    },{
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => autoprefixer({
                                browsers: ['last 3 versions', '> 1%']
                            })
                        }
                    }, 'sass-loader' ]
                }),
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