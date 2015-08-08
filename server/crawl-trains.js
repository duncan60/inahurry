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
        let north = this.promise(this.templateURL(stations, 'north'), 'GET'),
            south = this.promise(this.templateURL(stations, 'south'), 'GET');
        Promise.all([north, south]).then((res) => {
            this.model.north = this.parseData(res[0]);
            this.model.south = this.parseData(res[1]);
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
    templateURL(stations, type) {
        const {targetStation, northStation, southStation} = stations;
        let momentDate    = moment(),
            searchDate    = momentDate.format('YYYY/MM/DD'),
            fromCityId    = targetStation.city,
            fromStationId = targetStation.id,
            toCityId      = type === 'north' ? northStation.city : southStation.city,
            toStationId   = type === 'north' ? northStation.id : southStation.id,
            nowTime       = momentDate.format('HHmm'),
            totime        = momentDate.add(1, 'hours').format('HH') === '00' ? '24' + momentDate.format('mm') : momentDate.format('HHmm');
        return `http://twtraffic.tra.gov.tw/twrail/SearchResult.aspx?searchtype=0&searchdate=${searchDate}&fromcity=${fromCityId}&tocity=${toCityId}&fromstation=${fromStationId}&tostation=${toStationId}&trainclass=2&fromtime=${nowTime}&totime=${totime}`;
    },
    parseData(data) {
        let $        = cheerio.load(data),
            result   = [],
            train    = {},
            trainRow = $('.Grid_Row'),
            $trainTarget;
        for (var i = 1; i < trainRow.length; i++) {
            train = {};
            $trainTarget = $(trainRow[i]);
            train.type = $trainTarget.find('.SearchResult_TrainType span').text();
            train.startTime = $trainTarget.find('.SearchResult_Time').eq(0).text();
            train.router = $trainTarget.find('td').eq(3).text();
            result.push(train);
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
export default crawlTrains;
