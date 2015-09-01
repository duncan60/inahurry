import request from 'request';
import cheerio from 'cheerio';
import moment from 'moment';

let thsrcTrains =  {
    getTrainsData(stations, callback) {
        this.model = {
            code : -1,
            north: [],
            south: [],
            msg  : ''
        };
        let getStationInfo = this.promise(this.crawlURL(stations), 'GET');
        Promise.all([getStationInfo]).then((res) => {
            this.model.north = this.parseData(res[0]).filter((item) => item.direction === '0');
            this.model.south = this.parseData(res[0]).filter((item) => item.direction === '1');
            this.model.code = 0;
            this.model.msg = 'success';
            callback(this.model);
        }, (error) => {
            this.model.code = 1;
            this.model.msg = error;
            callback(this.model);
        });
    },
    promise(url, type) {
        //console.log('url', url);
        return new Promise((resolve, reject) => {
            request({
                url   : url,
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
    crawlURL(stations) {
        const {targetStation} = stations;
        let momentDate    = moment(),
            searchDate    = momentDate.format('YYYY/MM/DD'),
            fromStationId = targetStation.id;
        return `http://twtraffic.tra.gov.tw/twrail/mobile/StationSearchResult.aspx?fromstation=${fromStationId}&searchdate=${searchDate}`;
    },
    parseData(data) {
        let $          = cheerio.load(data),
            scriptAry  = $('#form1').find('script').text().split(';'),
            loopNum    = scriptAry.length / 7,
            train      = {},
            result     = [],
            multiple   = 0,
            momentDate = moment(),
            nowTime    = momentDate.format('YYYY-MM-DD HH:mm'),
            totime     = momentDate.add(1, 'hours').format('YYYY-MM-DD HH:mm');
        for (let i = 0; i < loopNum - 1; i += 1) {
            train = {};
            multiple = i * 7;
            train.startTime = scriptAry[multiple + 2].split('\'')[1];
            let time = moment(train.startTime, 'HH:mm').format('YYYY-MM-DD HH:mm');
            if ( moment(time).isBetween(nowTime, totime, 'milliseconds')) {
                train.type = scriptAry[multiple].split('\'')[1];
                train.router = scriptAry[multiple + 3].split('\'')[1];
                train.direction = scriptAry[multiple + 4].split('\'')[1];
                train.state = scriptAry[multiple + 5].split('\'')[1];
                result.push(train);
            }
        }
        return result;
    }
};

/* parameters rule
searchtype=0//0
searchdate=2015/05/31 //日期
fromcity=0 //地區起點ＩＤ
tocity=10//地區城市ＩＤ
fromstation=1008 // 火車起點站ＩＤ
tostation=1238   //火車終點ＩＤ
trainclass=2 //車種
fromtime=0000//搜尋時間起點[00 : 00]
totime=2359//搜尋時間終點[23 : 59]
*/
export default thsrcTrains;
