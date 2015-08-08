require('node-jsx').install();

import express from 'express';
import opn from 'opn';

import closestTrainStations from './closest-train-stations';
import crawlTrains from './crawl-trains';

import React from 'react';
import DefaultPage from './default-page';


let app = express();

let renderPage = (entryPath) => {
    return React.renderToString(
                React.createElement(
                    DefaultPage,
                    {jsPath: entryPath}
                )
            );
};

app.get('/', (req, res) => {
    res.end(renderPage('//localhost:8080/build/index.js'));
});

app.route('/api/trains')
    .get((req, res) => {
        let closestTrains = closestTrainStations.search(req.query.latitude, req.query.longitude);
        crawlTrains.getTrainsData(closestTrains, (trainsData) => {
            if (trainsData.code === 0) {
                res.json({
                    data   : {
                        trainsTimetableData: trainsData,
                        closestTrains      : closestTrains
                    },
                    code   : 0,
                    message: 'search trains ok!'
                });
            } else {
                res.json({
                    data   : {
                        trainsTimetableData: trainsData,
                        closestTrains      : closestTrains
                    },
                    code   : 1,
                    message: 'search trains error!'
                });
            }
        });
    });

app.listen(3000, () => {
    //opn('http://localhost:3000');
} );
