
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const UglifyJS = require('uglify-js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin')

const autoprefixer = require('autoprefixer');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /(?!min)(?:^.{0,2}|.{3})(\.css|\.scss)$/, // .css or .scss
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader:'css-loader',
                        options: { minimize: false }
                    },{
                        loader: 'postcss-loader',
                        options: { plugins: () => autoprefixer({ browsers: ['last 3 versions', '> 1%'] }) }
                    }, 'sass-loader' ]
                }),
            },
            {
                test: /\.min\.(css|scss)$/, // .min.css or .min.scss
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader:'css-loader',
                        options: { minimize: true }
                    },{
                        loader: 'postcss-loader',
                        options: { plugins: () => autoprefixer({ browsers: ['last 3 versions', '> 1%'] }) }
                    }, 'sass-loader' ]
                }),
            },
        ]
    },
    plugins: [
        
        new ExtractTextPlugin({
            filename: './css/[name].css'
        }),
        
        new UglifyJsPlugin({
            include: /\.min\.js$/,
        }),

        // Use this for #24 'Convert components to plugins'
        new CopyWebpackPlugin([{
            from: './src/js/vendor/*',
            to: './js/[1].min.js',
            test: /(\w+)(?:\.\w+)*\.js$/,
            transform: function (content, path) {
                return UglifyJS.minify(content.toString()).code;
            },    
        }]),
        
    ],
});