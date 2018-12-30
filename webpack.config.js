/**
 * Created by Yunzhe on 2018/12/30.
 */

'use strict';
const path = require('path');
// 导入插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (env = {}) {
    const isProduction = env['production'];

    const plugins = [
        new MiniCssExtractPlugin({
            // 为了不被serviceWorker影响，hash必须加上
            filename: 'main.[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].css',
        }),
        new VueLoaderPlugin(),
        // 必须在GenerateSW之前生成
        new HtmlWebpackPlugin({
            title: 'NostalgiA',
        }),
    ];

    if (isProduction) {
        plugins.push(new CleanWebpackPlugin([`../dist`], {
            exclude: ['favicon.ico'],
            allowExternal: true,
        }));
    }

    return {
        entry: {
            // 相对CWD
            main: './src/main.js',
        },
        output: {
            // __dirname是当前文件所在位置
            path: path.join(__dirname, '..', 'dist'),
            publicPath: '/',
            // 为了不被serviceWorker影响，hash必须加上
            filename: 'main.[hash:8].js',
            chunkFilename: '[name].[hash:8].js',
        },
        // webpack 4起设置mode之后不需要设置DefinePlugin来定义process.env.NODE_ENV
        mode: isProduction ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.(css|less)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'less-loader',
                    ],
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.vue']
        },
        optimization: isProduction ? {
            splitChunks: {
                // include all types of chunks
                chunks: 'all',
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                }),
                new OptimizeCSSAssetsPlugin(),
            ],
        } : undefined,
        plugins: plugins,
        devServer: {
            open: true,
            contentBase: path.join(__dirname, `../dist`),
            historyApiFallback: {
                rewrites: [
                    {
                        from: /./,
                        to: '/index.html',
                    },
                ],
            },
        },
        devtool: isProduction ? false : 'source-map',
        target: 'web',
    };
};