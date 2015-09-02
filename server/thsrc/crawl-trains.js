import request from 'request';
import cheerio from 'cheerio';
import moment from 'moment';

let crawlTrains =  {
    getTrainsData(stations, callback) {
        this.model = {
            code : -1,
            north: [],
            south: [],
            msg  : ''
        };
        let getStationInfo = this.promise(stations.targetStation, 'GET');
        //console.log('stations', stations);
        Promise.all([getStationInfo]).then((res) => {
            let resJson = {};
            resJson = JSON.parse(JSON.parse(res[0]));
            this.model.north = resJson['northbound'].map((item) => {
                return {
                    trainNumber  : item.TrainNumber,
                    departureTime: item.DepartureTime
                };
            });
            this.model.south = resJson.southbound.map((item) => {
                return {
                    trainNumber  : item.TrainNumber,
                    departureTime: item.DepartureTime
                };
            });
            this.model.code = 0;
            this.model.msg = 'success';
            callback(this.model);
        }, (error) => {
            this.model.code = 1;
            this.model.msg = error;
            callback(this.model);
        });
    },
    promise(targetStaton, type) {
        return new Promise((resolve, reject) => {
            request({
                url   : `http://www.thsrc.com.tw/tw/StationInfo/LatestTrainTime?id=${targetStaton.id}`,
                method: type
            }, (e, r, b) => {
                if (e || !b) {
                    reject();
                } else {
                    resolve(b);
                }
            });
        });
    }
};


export default crawlTrains;
