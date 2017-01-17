var path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),//({ browsers: ['safari >= 9, ie >= 10'] })
    nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    buildPath = path.resolve(__dirname, 'server', 'build'),
    twtrafficPath = path.resolve(__dirname, 'app', 'page', 'twtraffic', 'entry.js'),
    thsrcPath = path.resolve(__dirname, 'app', 'page', 'thsrc', 'entry.js'),
    eslintrcPath = path.resolve(__dirname, '.eslintrc');
var hotMiddlewareScript = 'webpack-hot-middleware/client';
module.exports = {
        name: 'browser',
        devtool: 'cheap-module-eval-source-map',
        entry: {
            twtraffic: [
                twtrafficPath,
                hotMiddlewareScript
            ],
            thsrc: [
                thsrcPath,
                hotMiddlewareScript
            ]
        },
        output: {
            path: buildPath,
            publicPath: '/build/',
            filename: '[name].js'
        },
        module: {
            preLoaders: [
                {
                    test: /\.js(x)?$/,
                    loader: 'eslint',
                    exclude: nodeModulesPath
                }
            ],
            loaders: [
                { test: /\.js$/, loader: 'jsx-loader' },
                { test: /\.png$/, loader: 'url-loader' },
                { test: /\.jpg$/, loader: 'file-loader' },
                {   test: /\.(css|scss)$/,
                    loader: 'style!css!sass!postcss'
                },
                {
                    test : /\.(woff|woff2|ttf|eot|svg)$/,
                    loader: 'url'
                },
                {
                    test: /\.js(x)?$/,
                    loader: 'babel',
                    exclude: nodeModulesPath,
                    query: {
                        presets: ['react','es2015', 'stage-0'],
                        plugins: ['transform-decorators-legacy'],
                        env: {
                            development: {
                                presets: ['react-hmre']
                            }
                        }
                    }
                }
            ]
        },
        resolve: {
            modulesDirectories: [
                'app',
                'node_modules'
            ],
            extensions: ['', '.js', '.jsx', '.css', '.scss']
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.CommonsChunkPlugin('common.js')
        ],
        eslint: {
            configFile: eslintrcPath
        },
        postcss: function () {
            return [autoprefixer];
        }
};
