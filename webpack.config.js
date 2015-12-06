var path            = require('path'),
    webpack         = require('webpack'),
    autoprefixer    = require('autoprefixer-core'),
    csswring        = require('csswring');

var nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    buildPath       = path.resolve(__dirname, 'server', 'build'),
    twtrafficPath   = path.resolve(__dirname, 'app', 'page', 'twtraffic', 'entry.js'),
    thsrcPath       = path.resolve(__dirname, 'app', 'page', 'thsrc', 'entry.js'),
    eslintrcPath    = path.resolve(__dirname, '.eslintrc');

module.exports = {
        name: 'browser',
        devtool: 'cheap-module-eval-source-map',
        entry: {
            twtraffic: [
                'webpack/hot/dev-server',
                'webpack-hot-middleware/client',
                twtrafficPath
            ],
            thsrc: [
                'webpack/hot/dev-server',
                'webpack-hot-middleware/client',
                thsrcPath
            ]
        },
        output: {
            path: buildPath,
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
                    exclude: nodeModulesPath
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
            new webpack.optimize.CommonsChunkPlugin('common.js')
        ],
        eslint: {
            configFile: eslintrcPath
        },
        postcss: function () {
            return [autoprefixer, csswring];
        }
};


