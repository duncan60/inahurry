import AppDispatcher from '../dispatcher/app-dispatcher';
import Constants from '../constants/constants';

let TrainTimetableActions = {
    getTrainTimetable(coords) {
    	console.log('coords', coords);
    	AppDispatcher.viewHandleAction({
            actionType: Constants.SET_TRAIN_TIMETABLE,
            data      : coords
        });
    }
};

export default TrainTimetableActions;
