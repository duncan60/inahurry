var Webpack = require('webpack'),
    path = require('path'),
    util = require('util'),
    pkg = require('./package.json'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    buildPath = path.resolve(__dirname, 'server', 'assets'),
    indexPath = path.resolve(__dirname, 'app', 'index', 'entry.js'),
    cssBundleName = util.format('assets/styles/style.bundle.%s.css', pkg.version);

process.env.UV_THREADPOOL_SIZE = 100;

var config = {
    devtool: 'source-map',
    entry: {
        index: [indexPath]
    },
    output: {
        path: buildPath,
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                loader: 'babel',
                exclude: nodeModulesPath
            },
            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url?limit=8192&name=assets/images/[name].[ext]'
            },
            {
                test : /\.(woff|woff2|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=8192&name=assets/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(cssBundleName),
        new Webpack.ProvidePlugin({}),
        new Webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss']
    }
};

module.exports = config;
