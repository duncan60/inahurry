
import express from 'express';
//twtraffic
import closestTwtrafficStations from './twtraffic/closest-stations';
import crawlTwtrafficTrains from './twtraffic/crawl-trains';
//thsrc
import closestThsrcStation from './thsrc/closest-stations';
import crawlThsrcTrains from './thsrc/crawl-trains';
//thsrc

let router = express.Router();

//api
router.get('/api/twtraffic', (req, res) => {
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

router.get('/api/thsrc', (req, res) => {
    let closestStation = closestThsrcStation.search(req.query.latitude, req.query.longitude);
    crawlThsrcTrains.getTrainsData(closestStation, (trainsData)=> {
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

export default router;
