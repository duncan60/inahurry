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

    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
    app.use(webpackHotMiddleware(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
    app.listen(8080, 'localhost', function(error) {
        if (error) {
           console.error(error);
         } else {
           console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', 8080, 8080);
         }
    });
};

webpackBundle();
