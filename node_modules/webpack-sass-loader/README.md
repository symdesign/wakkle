# webpack-sass

Webpack sass loader

## Instalation

```
npm install webpack-sass --save-dev
```

## Usage

For SCSS
```
module.exports = {
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: "webpack-sass"
            }
        ]
    }
}
```