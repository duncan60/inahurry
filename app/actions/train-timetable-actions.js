import AppDispatcher from 'dispatcher/app-dispatcher';
import Constants from 'constants/constants';

let TrainTimetableActions = {
    getTrainTimetable(latitude, longitude, type='twtraffic') {
        let request = new XMLHttpRequest();
        let api = type === 'twtraffic' ? `/api/twtraffic?latitude=${latitude}&longitude=${longitude}` : `/api/thsrc?latitude=${latitude}&longitude=${longitude}`;
        request.open('GET', api, true);
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200){
                AppDispatcher.viewHandleAction({
                    actionType: Constants.SET_TRAIN_TIMETABLE,
                    data      : request.responseText
                });
            }
        };

        request.onerror = function() {
            AppDispatcher.viewHandleAction({
                actionType: Constants.SERVER_ERROR,
                data      : null
            });
        };
        request.send();
    }
};

export default TrainTimetableActions;
