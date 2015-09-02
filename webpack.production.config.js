var Webpack = require('webpack'),
    path = require('path'),
    util = require('util'),
    pkg = require('./package.json'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    buildPath       = path.resolve(__dirname, 'server', 'assets'),
    twtrafficPath   = path.resolve(__dirname, 'app', 'page', 'twtraffic', 'entry.js'),
    thsrcPath       = path.resolve(__dirname, 'app', 'page', 'thsrc', 'entry.js'),
    cssBundleName   = util.format('styles/style.bundle.%s.css', pkg.version),
    jsBundleName    = util.format('js/[name].%s.js', pkg.version);

process.env.UV_THREADPOOL_SIZE = 100;

var config = {
    devtool: 'source-map',
    entry: {
        twtraffic: [twtrafficPath],
        thsrc    : [thsrcPath]
    },
    output: {
        path: buildPath,
        filename: jsBundleName
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
        new Webpack.optimize.CommonsChunkPlugin(util.format('js/common.%s.js', pkg.version)),
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
