# Reload HTML Webpack Plugin

This is a webpack plugin that works alongside html-webpack-plugin. Its purpose is to automatically refresh your browser whenever you make changes to templates consumed by [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin). It should only be used in development.

## Usage

```javascript
// in webpack.config.js

var ReloadPlugin = require('reload-html-webpack-plugin');

//

plugins: [
    new ReloadPlugin()
]

//


```
