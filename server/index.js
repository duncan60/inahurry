require('node-jsx').install();

import express from 'express';
import opn from 'opn';

import closestTrainStations from './closest-train-stations';

import React from 'react';
import DefaultPage from './default-page';
import bundle from'./webpack-server';

let app = express();

let closestTrains = closestTrainStations.search(25.033888, 121.468605);
console.log('closestTrains', closestTrains);

// bundle();

// let renderPage = (entryPath) => {
//     return React.renderToString(
//                 React.createElement(
//                     DefaultPage,
//                     {jsPath: entryPath}
//                 )
//             )
// }

app.get('/', (req, res) => {
  // res.end(renderPage('//localhost:8080/build/index.js'));
});

app.route('/api/trains')
    .get((req, res) => {
        // res.json({
        //     latitude : req.query.latitude,
        //     longitude: req.query.longitude,
        //     message  : "第一個API!"
        // });
    });

app.listen(3000, () => {
  // opn('http://localhost:3000');
} );
