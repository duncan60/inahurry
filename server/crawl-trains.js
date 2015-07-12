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


export default crawlTrains;