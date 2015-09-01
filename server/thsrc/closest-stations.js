import stationData from './station-data';

let closestStations =  {
    search(lat, long) {
        let lowest = Number.POSITIVE_INFINITY,
            tmp,
            targetStation;

        stationData.stations.forEach((item) => {
           tmp = this.getDistance(lat, long, item.lat, item.long);
           if (tmp < lowest) {
                lowest = tmp;
                item.dist = tmp;
                targetStation = item;
           }
        });
        return {targetStation};
        //var minX = Math.min.apply(Math, stations.map(function(val) { return val.dist; }));
    },
    rad(d) {
        return d * Math.PI / 180.0;
    },
    getDistance(lat1, lng1, lat2, lng2) {
        let radLat1 = this.rad(lat1),
            radLat2 = this.rad(lat2);
        let a = radLat1 - radLat2,
            b = this.rad(lng1) - this.rad(lng2);
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin( b / 2), 2)));
        s = s * 6378.137;// EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return s;
    }
};

export default closestStations;
