const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
require('dotenv').config({path: path.resolve(__dirname, '.env')});

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'public', 'build');

const config = {
    entry: path.join(SRC_PATH, 'index.js'),
    output: {
        path: BUILD_PATH,
        filename: '[name].[contenthash].js',
        publicPath: '/build/',
    },
    plugins: [
        new webpack.DefinePlugin({
            // Pass values from .env file to browser
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(SRC_PATH, 'index.html'),
            favicon: path.join(SRC_PATH, 'assets', 'favicon.ico'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        new PreloadWebpackPlugin({
            rel: 'prefetch',
        }),
    ],
    optimization: {
        minimize: true,
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\\/]node_modules[\\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|mp4|woff|woff2|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    devServer: {
        contentBase: BUILD_PATH,
        port: process.env.WEBPACK_PORT || 8081,
        host: '0.0.0.0',
        writeToDisk: true,
        open: false,
        proxy: {
            '/': 'http://nginx',
        },
    },
};

module.exports = (env, argv) => {
    if (argv.hot) {
        // contenthash isn't available when hot reloading.
        config.output.filename = '[name].[hash].js';
    }
    return config;
};
