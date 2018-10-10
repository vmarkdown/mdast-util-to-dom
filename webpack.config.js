const path = require('path');

module.exports = {
    mode: 'none',
    entry: {
        'mdast-util-to-dom': path.resolve(__dirname, 'index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].common.js',
        libraryTarget: "commonjs2"
    },
    resolve: {
        alias: {
        }
    },
    module: {
        rules: [
        ]
    },
    externals: {
    },
    plugins: [
    ]
};

