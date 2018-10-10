const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: {
        'example-main': path.resolve(__dirname, 'src/test.js')
    },
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
        }
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: [
            //         { loader: "style-loader" },
            //         { loader: "css-loader" }
            //     ]
            // },
            {
                test: /\.md$/,
                use: 'text-loader'
            }
        ]
    },
    externals: {
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'examples/index.html'
        })
    ],
    devServer: {
        // hotOnly: true,
        contentBase: path.join(__dirname, "www")
    }
};

