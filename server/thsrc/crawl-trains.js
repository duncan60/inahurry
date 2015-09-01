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
        console.log('stations', stations);
        Promise.all([getStationInfo]).then((res) => {
            this.parseData(res[0]);
            //this.model.north = this.parseData(res[0]).filter((item) => item.direction === '0');
            // this.model.south = this.parseData(res[0]).filter((item) => item.direction === '1');
            // this.model.code = 0;
            // this.model.msg = 'success';
            // callback(this.model);
        }, (error) => {
            console.log('>>>>error');
            this.model.code = 1;
            this.model.msg = error;
            callback(this.model);
        });
    },
    promise(targetStaton, type) {
        return new Promise((resolve, reject) => {
            request({
                url   : `http://www.thsrc.com.tw/tw/StationInfo/prospect/${targetStaton.id}`,
                method: type
            }, (e, r, b) => {
                if (e || !b) {
                    reject();
                } else {
                    resolve(b);
                }
            });
        });
    },
    parseData(data) {
        let $        = cheerio.load(data),
            southRow = $('#southbound');
        console.log('data', southRow.find('li').text());
        // let southStation = southRow.map((item) => {
        //     let id   = $(item).find('em').text(),
        //         time = $(item).find('strong').text();
        //     return {id, time}

        // });
       // console.log('southStation', southStation);
        // let $          = cheerio.load(data),
        //     scriptAry  = $('#form1').find('script').text().split(';'),
        //     loopNum    = scriptAry.length / 7,
        //     train      = {},
        //     result     = [],
        //     multiple   = 0,
        //     momentDate = moment(),
        //     nowTime    = momentDate.format('YYYY-MM-DD HH:mm'),
        //     totime     = momentDate.add(1, 'hours').format('YYYY-MM-DD HH:mm');
        // for (let i = 0; i < loopNum - 1; i += 1) {
        //     train = {};
        //     multiple = i * 7;
        //     train.startTime = scriptAry[multiple + 2].split('\'')[1];
        //     let time = moment(train.startTime, 'HH:mm').format('YYYY-MM-DD HH:mm');
        //     if ( moment(time).isBetween(nowTime, totime, 'milliseconds')) {
        //         train.type = scriptAry[multiple].split('\'')[1];
        //         train.router = scriptAry[multiple + 3].split('\'')[1];
        //         train.direction = scriptAry[multiple + 4].split('\'')[1];
        //         train.state = scriptAry[multiple + 5].split('\'')[1];
        //         result.push(train);
        //     }
        // }
        // return result;
    }
};


export default crawlTrains;
