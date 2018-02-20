const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

// HTML Templates
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackReloadPlugin = require('reload-html-webpack-plugin');
const HtmlWebpackPolyfillIOPlugin = require('html-webpack-polyfill-io-plugin')

// CSS File Handling
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');


// External Assets (copy only)
const CopyWebpackPlugin = require('copy-webpack-plugin');

// External Assets (include)
//require('./src/js/vendor/ResizeSensor.js')


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
        app: './src/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].js',
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
                test: /\.(png|jpg|gif|json|wakkl)$/,
                use: 'file-loader?name=[name].[ext]&outputPath=images/'
            },
            {
                test: /\.svg$/,
                use: 'svg-inline-loader?removeTags=true'
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
            chunks: ['app'],
            hash: true
        }),
        new HtmlWebpackHarddiskPlugin(),
        new HtmlWebpackReloadPlugin(),
        new HtmlWebpackPolyfillIOPlugin(),

        new CopyWebpackPlugin([ // Those files become copied to dist
            {
                context: path.resolve(__dirname, './src/'),
                from: 'images/*/*', 
                to: path.resolve(__dirname, './dist/')
            },
            {
                context: path.resolve(__dirname, './src/'),
                from: 'js/vendor/headtrackr.js', 
                to: path.resolve(__dirname, './dist/js/')
            },
            {
                context: path.resolve(__dirname, './src/'),
                from: 'js/vendor/matchMedia.js', 
                to: path.resolve(__dirname, './dist/js/')
            }
        ]),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
}