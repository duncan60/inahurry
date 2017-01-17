var webpack = require('webpack'),
    path = require('path'),
    util = require('util'),
    pkg = require('./package.json'),
    autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    buildPath = path.resolve(__dirname, 'server', 'assets'),
    twtrafficPath = path.resolve(__dirname, 'app', 'page', 'twtraffic', 'entry.js'),
    thsrcPath = path.resolve(__dirname, 'app', 'page', 'thsrc', 'entry.js'),
    cssBundleName = util.format('styles/style.bundle.%s.css', pkg.version),
    jsBundleName = util.format('js/[name].%s.js', pkg.version);

process.env.UV_THREADPOOL_SIZE = 100;

module.exports = {
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
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
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
        new webpack.ProvidePlugin({}),
        new webpack.optimize.CommonsChunkPlugin(util.format('js/common.%s.js', pkg.version)),
        new webpack.DefinePlugin({
              'process.env': {
                'NODE_ENV': JSON.stringify('production')
              }
            }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        modulesDirectories: [
            'app',
            'node_modules'
        ],
        extensions: ['', '.js', '.jsx', '.css', '.scss']
    },
    postcss: function () {
        return [autoprefixer];
    }
};
