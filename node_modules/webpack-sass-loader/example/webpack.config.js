module.exports = {
    entry: "./sass/main.scss",
    output: {
        filename: "out.js"
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: "webpack-sass"
            }
        ]
    }
}