const path = require('path');

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
    }
};