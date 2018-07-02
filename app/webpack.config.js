const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: {
        AWS: 'aws-sdk'
    },
    node: {
        fs: 'empty',
        tls: 'empty'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{loader: 'css-loader', options: {url: false}}, 'sass-loader'],
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
    ]
};