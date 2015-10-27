var path            = require('path'),
    Webpack         = require('webpack'),
    autoprefixer    = require('autoprefixer-core'),
    csswring        = require('csswring');

var nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    buildPath       = path.resolve(__dirname, 'server', 'build'),
    twtrafficPath   = path.resolve(__dirname, 'app', 'page', 'twtraffic', 'entry.js'),
    thsrcPath       = path.resolve(__dirname, 'app', 'page', 'thsrc', 'entry.js'),
    eslintrcPath    = path.resolve(__dirname, '.eslintrc');

module.exports = [
    {
        name: 'browser',
        entry: {
            twtraffic: [
                'webpack/hot/dev-server',
                'webpack-dev-server/client?http://localhost:8080',
                twtrafficPath
            ],
            thsrc: [
                'webpack/hot/dev-server',
                'webpack-dev-server/client?http://localhost:8080',
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
            new Webpack.HotModuleReplacementPlugin(),
            new Webpack.optimize.CommonsChunkPlugin('common.js')
        ],
        eslint: {
            configFile: eslintrcPath
        },
        postcss: function () {
            return [autoprefixer, csswring];
        }
    }
];
