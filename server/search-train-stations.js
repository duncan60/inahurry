var request = require("request");

import trainsTimetableData from './trains-timetable-data';

class SearchTrainStations {
	constructor(lan, long) {
		this.GOOGLE_Map_API_Key = 'AIzaSyAE9R8Z-dnPBvYvF6To0_0_I_R66bv4vmQ';
	    this.key = '';
		request({
	        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=25.033888,121.468605&language=zh-TW&radius=5000&types=train_station&name='+ this.key +'&key=AIzaSyAE9R8Z-dnPBvYvF6To0_0_I_R66bv4vmQ&sensor=true',
	        method: 'GET'
	    }, function(e,r,b) {
	        console.log('b', b);
		});


	}

}


export default SearchTrainStations;