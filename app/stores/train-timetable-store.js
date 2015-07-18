import AppDispatcher from '../dispatcher/app-dispatcher';
import Constants from '../constants/constants';
import UtilsStore from './utils-store.js';

let trainsTimetableData = {
    south: [
            {
                type: "區間車",
                startTime: "09:35",
                router: "基隆→苗栗"
            },
            {
                type: "區間車",
                startTime: "09:49",
                router: "蘇澳→樹林"
            },
            {
                type: "區間車",
                startTime: "10:00",
                router: "基隆→苗栗"
            }
        ],
        north: [
            {
                type: "區間車",
                startTime: "09:37",
                router: "苗栗→基隆"
            },
            {
                type: "區間車",
                startTime: "09:51",
                router: "嘉義→瑞芳"
            },
            {
                type: "區間車",
                startTime: "09:56",
                router: "樹林→基隆"
            },
            {
                type: "區間車",
                startTime: "10:12",
                router: "樹林→蘇澳"
            },
            {
                type: "區間車",
                startTime: "10:21",
                router: "新竹→基隆"
            },
            {
                type: "區間車",
                startTime: "10:27",
                router: "苗栗→基隆"
            }
        ]
    };
let closestTrains = {
    targetStation: {
        id: "1011",
        city: "0",
        name: "板橋",
        lat: 25.014051,
        long: 121.463814,
        dist: 2.1222
    },
    northStation: {
        id: "1009",
        city: "0",
        name: "萬華",
        lat: 25.033378,
        long: 121.500285,
        dist: 2.7157
    },
    southStation: {
        id: "1032",
        city: "0",
        name: "浮洲",
        lat: 25.004192,
        long: 121.444737
    }
};
let dataReady = true;

class TrainTimetableStore extends UtilsStore {
    constructor() {
        super();
    }
    setList(data) {
        let resData = JSON.parse(data).data;
        trainsTimetableData = resData.trainsTimetableData;
        closestTrains = resData.closestTrains;
        dataReady = true ;
    }
    getTrainsTimetable() {
        return trainsTimetableData;
    }
    getClosestTrains() {
        return closestTrains;
    }
    getDataReady() {
        return dataReady;
    }
}

let _TrainTimetableStore = new TrainTimetableStore();

_TrainTimetableStore.dispatchToken = AppDispatcher.register((payload) => {
    let action = payload.action,
        type   = '';
    switch(action.actionType){
        case Constants.SET_TRAIN_TIMETABLE:
            _TrainTimetableStore.setList(action.data);
        break;
    default:
        return true;
    }
    _TrainTimetableStore.emitChange(type);
    return true;
});


export default _TrainTimetableStore;