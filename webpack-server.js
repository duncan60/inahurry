var webpack          = require('webpack'),
    webpackConfig    = require('./webpack.config.js'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware');

var webpackBundle = function() {
    var bundleStart = null;
    var compiler = webpack(webpackConfig);
    var app = new (require('express'))();
    compiler.plugin('compile', function() {
        console.log('Bundling...');
        bundleStart = Date.now();
    });

    compiler.plugin('done', function() {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        headers: { 'X-Custom-Header': 'yes' },
        publicPath: '/build/',
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));
    app.listen(8080, 'localhost', function(error) {
        if (error) {
           console.error(error);
         } else {
           console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', 8080, 8080);
         }
    });
};

webpackBundle();
