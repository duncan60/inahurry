import AppDispatcher from '../dispatcher/app-dispatcher';
import Constants from '../constants/constants';
import UtilsStore from './utils-store.js';

let trainsTimetableData = {},
    closestTrains       = {},
    isReady             = false,
    isError             = false;

class TrainTimetableStore extends UtilsStore {
    constructor() {
        super();
    }
    setList(data) {
        let resData = JSON.parse(data).data;
        trainsTimetableData = resData.trainsTimetableData;
        closestTrains = resData.closestTrains;
        isReady = true;
    }
    getTrainsTimetable() {
        return trainsTimetableData;
    }
    getClosestTrains() {
        return closestTrains;
    }
    getReady() {
        return isReady;
    }
    getError() {
        return isError;
    }
}

let _TrainTimetableStore = new TrainTimetableStore();

_TrainTimetableStore.dispatchToken = AppDispatcher.register((payload) => {
    let action = payload.action,
        type   = '';
    switch (action.actionType) {
        case Constants.SET_TRAIN_TIMETABLE:
            _TrainTimetableStore.setList(action.data);
        break;
        case Constants.SERVER_ERROR:
            isError = true;
        break;
    default:
        return true;
    }
    _TrainTimetableStore.emitChange(type);
    return true;
});


export default _TrainTimetableStore;
