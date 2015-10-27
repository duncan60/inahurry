//require('node-jsx').install();
import path from 'path';
import util from 'util';
import express from 'express';
import pkg from '../package.json';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import DefaultPage from './components/default-page';
import api from './api';


let app             = express(),
    lhPath          = '//localhost:8080/build/',
    commonPath      = `${lhPath}common.js`,
    twtrafficJsPath = `${lhPath}twtraffic.js`,
    thsrcJsPath     = `${lhPath}thsrc.js`,
    stylePath       = '',
    port            = 3000,
    activeRouter;

const ROUTERCONFIG = [
    {
        name  : '台鐵時刻表',
        router: '/'
    },
    {
        name  : '高鐵時刻表',
        router: '/thsrc'
    }
];

if (process.env.NODE_ENV) {
    stylePath = util.format('assets/styles/style.bundle.%s.css', pkg.version);
    commonPath = util.format('assets/js/common.%s.js', pkg.version);
    twtrafficJsPath = util.format('assets/js/twtraffic.%s.js', pkg.version);
    thsrcJsPath = util.format('assets/js/thsrc.%s.js', pkg.version);
    port = 8080;
}

let renderPage = (common, entry, style, host) => {
    return ReactDOMServer.renderToString(
                React.createElement(
                    DefaultPage,
                    {
                        jsPath      : entry,
                        stylePath   : style,
                        commonPath  : common,
                        tabData     : ROUTERCONFIG,
                        activeRouter: activeRouter,
                        host        : host
                    }
                )
            );
};

//router
app.get(ROUTERCONFIG[0].router, (req, res) => {
    activeRouter = ROUTERCONFIG[0].router;
    res.end(renderPage(commonPath, twtrafficJsPath, stylePath, req.headers.host));
});
app.get(ROUTERCONFIG[1].router, (req, res) => {
    activeRouter = ROUTERCONFIG[1].router;
    res.end(renderPage(commonPath, thsrcJsPath, stylePath, req.headers.host));
});

app.use(express.static(path.join(__dirname)));
app.use(api);

app.listen(port, () => {
    console.log('Listening on ' + port);
});

