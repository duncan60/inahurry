var path = require("path");
var webpack = require('webpack')
var commonLoaders = [
    { test: /\.js$/, loader: "jsx-loader" },
    { test: /\.png$/, loader: "url-loader" },
    { test: /\.jpg$/, loader: "file-loader" },
];
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'server', 'build');
var indexPath = path.resolve(__dirname, 'app', 'index', 'entry.js');
var pageAPath = path.resolve(__dirname, 'app', 'pageA', 'entry.js');
var pageBPath = path.resolve(__dirname, 'app', 'pageB', 'entry.js');

module.exports = [
    {
        // The configuration for the client
        name: "browser",
        entry: {
            index: [
                'webpack/hot/dev-server',
                'webpack-dev-server/client?http://localhost:8080',
                indexPath
            ]
        },
        output: {
            path: buildPath,
            filename: "[name].js"
        },
        module: {
            loaders: commonLoaders.concat([
                { test: /\.css$/, loader: "style-loader!css-loader" },
                {
                    test: /\.js(x)?$/,
                    loader: 'babel',
                    exclude: nodeModulesPath
                }
            ])
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('common.js')
        ]
    }
];