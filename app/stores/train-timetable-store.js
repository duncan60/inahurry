import AppDispatcher from '../dispatcher/app-dispatcher';
import Constants from '../constants/constants';
import UtilsStore from './utils-store.js';

let list = {}
let dataReady = false;

class TrainTimetableStore extends UtilsStore {
    constructor() {
        super();
    }
    setList(data) {
        list = JSON.parse(data).data;
        dataReady = true ;
    }
    getList() {
        return list;
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