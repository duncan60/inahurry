import * as types from 'constants/ActionTypes';

let fetchSuccessed = (responData) => {
    return {
        type: types.SET_TRAIN_TIMETABLE,
        data: responData.data
    };
};

let fetchFailed = () => {
    return {
        type: types.SERVER_ERROR
    };
};

export function getTrainTimetable(latitude, longitude, type = 'twtraffic') {
    return {
        types   : [fetchSuccessed, fetchFailed],
        fetchAPI: type === 'twtraffic' ? `/api/twtraffic?latitude=${latitude}&longitude=${longitude}` : `/api/thsrc?latitude=${latitude}&longitude=${longitude}`
    };
}