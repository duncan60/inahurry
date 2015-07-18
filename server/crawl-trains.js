import request from 'request';
import fs from 'fs';
import cheerio from 'cheerio';
import moment from 'moment';

let crawlTrains =  {
	getTrainsData(stations, callback) {
		this.stations = stations;
		this.postRequest('north', callback);
		this.postRequest('south', callback);
		//console.log('result', this.result);
	},

	templateURL(type) {
		const {targetStation, northStation, southStation} = this.stations;
		let momentDate    = moment(),
			searchDate    =  momentDate.format('YYYY/MM/DD'),
			fromCityId    =  targetStation.city,
			fromStationId =  targetStation.id,
			toCityId      =  type === 'north' ? northStation.city : southStation.city,
			toStationId   =  type === 'north' ? northStation.id : southStation.id,
			nowTime       = momentDate.format('hhmm'),
			totime        = momentDate.add(1, 'hours').format('hhmm');
		return `http://twtraffic.tra.gov.tw/twrail/SearchResult.aspx?searchtype=0&searchdate=${searchDate}&fromcity=${fromCityId}&tocity=${toCityId}&fromstation=${fromStationId}&tostation=${toStationId}&trainclass=2&fromtime=${nowTime}&totime=${totime}`;
	},
	postRequest(type, callback) {
		request({
	        url: this.templateURL(type),
	        method: "GET"
	    }, (e,r,b) => {
	    	console.log('url' ,this.templateURL('north'));
	    	if(e || !b) { return; }
	    	let $ = cheerio.load(b),
	        	result = [],
	        	train = {},
	        	trainRow = $(".Grid_Row"),
	        	$trainTarget;

	        for (var i = 1; i < trainRow.length; i ++) {
	            train = {};
	            $trainTarget= $(trainRow[i]);
	            train.type = $trainTarget.find('.SearchResult_TrainType span').text();
	            train.startTime = $trainTarget.find('.SearchResult_Time').eq(0).text();
	            train.router = $trainTarget.find('td').eq(3).text();
	            result.push(train);
	        }
	        callback(type, result)
	    });
	}
}

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
