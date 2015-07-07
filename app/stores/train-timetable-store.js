import AppDispatcher from '../dispatcher/app-dispatcher';
import Constants from '../constants/constants';
import UtilsStore from './utils-store.js';

let list = [];

class TrainTimetableStore extends UtilsStore {
    constructor() {
        super();
    }
    setList(data) {
        list = data;
    }
    getList() {
        return list;
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