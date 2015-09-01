require('node-jsx').install();
var path = require('path');
import pkg from '../package.json';
import express from 'express';
import util from 'util';

//twtraffic
import closestTwtrafficStations from './twtraffic/closest-stations';
import crawlTwtrafficTrains from './twtraffic/crawl-trains';

//thsrc


import React from 'react';
import DefaultPage from './default-page';


let app    = express(),
    lhPath = '//localhost:8080/build/',
    indexJsPath,
    thsrcJsPath,
    stylePath,
    commonPath,
    port;

if (process.env.NODE_ENV) {
    stylePath  = util.format('styles/style.bundle.%s.css', pkg.version);
    commonPath = util.format('js/common.%s.js', pkg.version);
    indexJsPath = util.format('js/index.%s.js', pkg.version);
    thsrcJsPath = util.format('js/thrsc.%s.js', pkg.version);
    port = 8080;
} else {
    stylePath  = '';
    commonPath = `${lhPath}common.js`;
    indexJsPath = `${lhPath}index.js`;
    thsrcJsPath = `${lhPath}thsrc.js`;
    port = 3000;
}

let renderPage = (common, entry, style) => {
    return React.renderToString(
                React.createElement(
                    DefaultPage,
                    {
                        jsPath    : entry,
                        stylePath : style,
                        commonPath: common
                    }
                )
            );
};


//router
app.get('/', (req, res) => {
    res.end(renderPage(commonPath, indexJsPath, stylePath));
});
//
app.get('/thsrc', (req, res) => {
    res.end(renderPage(commonPath, thsrcJsPath, stylePath));
});


app.use(express.static(path.join(__dirname, 'assets')));


//api
app.route('/api/twtraffic').get((req, res) => {
    let closestStation = closestTwtrafficStations.search(req.query.latitude, req.query.longitude);
    crawlTwtrafficTrains.getTrainsData(closestStation, (trainsData) => {
        if (trainsData.code === 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.json({
                data   : {
                    trainsTimetableData: trainsData,
                    closestStation      : closestStation
                },
                code   : 0,
                message: 'search trains ok!'
            });
        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'text/plain');
            res.json({
                data   : {
                    trainsTimetableData: trainsData,
                    closestStation      : closestStation
                },
                code   : -1,
                message: 'search trains error!'
            });
        }
    });
});

app.route('/api/thsrc').get((req, res) => {

});
 app.listen(port, () => {
    console.log('Listening on ' + port);
 } );

