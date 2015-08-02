require('node-jsx').install();

import express from 'express';
import opn from 'opn';

import closestTrainStations from './closest-train-stations';
import crawlTrains from './crawl-trains';

import React from 'react';
import DefaultPage from './default-page';
import bundle from'./webpack-server';

let app = express();

bundle();

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
	    let trainsTimetableData = {};
		let closestTrains = closestTrainStations.search(req.query.latitude, req.query.longitude);
		crawlTrains.getTrainsData(closestTrains, (type, trainsData) => {
			trainsTimetableData[type] = trainsData;
			if (trainsTimetableData.north !== undefined && trainsTimetableData.south !== undefined) {
				res.json({
	            	data : {
	            		trainsTimetableData: trainsTimetableData,
	            		closestTrains      : closestTrains
	            	},
	            	message: 'search trains ok!'
	        	});
			}
		});
    });

app.listen(3000, () => {
  	opn('http://localhost:3000');
} );
