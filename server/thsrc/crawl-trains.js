import request from 'request';

let crawlTrains =  {
    async getTrainsData(stations, callback) {
        this.model = {
            code : -1,
            north: [],
            south: [],
            msg  : ''
        };

        let result = await this.promise(stations.targetStation, 'GET');
        try {
            let resJson = JSON.parse(JSON.parse(result));
            this.model.north = resJson.northbound.map((item) => {
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
        } catch(error) {
            this.model.code = -1;
            this.model.msg = error;
            callback(this.model);
        }
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
