require('node-jsx').install();
import path from 'path';
import util from 'util';
import express from 'express';
import pkg from '../package.json';

import React from 'react';
import DefaultPage from './default-page';
import api from './api';


let app    = express(),
    lhPath = '//localhost:8080/build/',
    activeRouter,
    twtrafficJsPath,
    thsrcJsPath,
    stylePath,
    commonPath,
    port;

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
    stylePath = util.format('styles/style.bundle.%s.css', pkg.version);
    commonPath = util.format('js/common.%s.js', pkg.version);
    twtrafficJsPath = util.format('js/twtraffic.%s.js', pkg.version);
    thsrcJsPath = util.format('js/thsrc.%s.js', pkg.version);
    port = 8080;
} else {
    stylePath = '';
    commonPath = `${lhPath}common.js`;
    twtrafficJsPath = `${lhPath}twtraffic.js`;
    thsrcJsPath = `${lhPath}thsrc.js`;
    port = 3000;
}

let renderPage = (common, entry, style) => {
    return React.renderToString(
                React.createElement(
                    DefaultPage,
                    {
                        jsPath      : entry,
                        stylePath   : style,
                        commonPath  : common,
                        tabData     : ROUTERCONFIG,
                        activeRouter: activeRouter
                    }
                )
            );
};


//router
app.get(ROUTERCONFIG[0].router, (req, res) => {
    activeRouter = ROUTERCONFIG[0].router;
    res.end(renderPage(commonPath, twtrafficJsPath, stylePath));
});
app.get(ROUTERCONFIG[1].router, (req, res) => {
    activeRouter = ROUTERCONFIG[1].router;
    res.end(renderPage(commonPath, thsrcJsPath, stylePath));
});

app.use(express.static(path.join(__dirname, 'assets')));
app.use(api);


 app.listen(port, () => {
    console.log('Listening on ' + port);
 } );

