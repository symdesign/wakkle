const ExtractTextPlugin = require("extract-text-webpack-plugin");

var cssDev = [
    'style-loader',
    'css-loader',
    'sass-loader'
];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader','sass-loader']
});

module.exports = {
    dev: cssDev,
    prod: cssProd
}