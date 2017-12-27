const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

// HTML Templates
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackReloadPlugin = require('reload-html-webpack-plugin');

// CSS File Handling
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');

// Configurations
var cssDev = [
    'style-loader',
    'css-loader',
    'sass-loader'
];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader','sass-loader']
});

// Production or Development
var isProd = process.env.NODE_ENV === 'prod'; // true or false
var cssConfig = isProd ? cssProd : cssDev;


module.exports = {
    entry: {
        app: './src/js/app.js',
        index: './src/js/index.js',
        laden: './src/js/laden.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].bundle.js',
        library: 'wakkl',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/, 
                use: cssConfig
            },
            {
                test: /\.js$/, 
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader?name=[name].[ext]&outputPath=images/'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true, // gzip compression
        stats: "errors-only",
        hot: true,
        open: true
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/style.css',
            disable: !isProd
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),

        new HtmlWebpackPlugin({
            title: 'Demo',
            template: './src/index.ejs',
            chunks: ['index', 'app'],
            hash: true
        }),
        new HtmlWebpackPlugin({
            title: 'Laden',
            filename: './laden.html',
            template: './src/laden.html',
            chunks: ['laden'],
            hash: true
        }),
        new HtmlWebpackHarddiskPlugin(),
        new HtmlWebpackReloadPlugin(),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
}