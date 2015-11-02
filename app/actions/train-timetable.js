import * as types from 'constants/ActionTypes';

export function getTrainTimetable(text) {
    return {
        type: types.SET_TRAIN_TIMETABLE,
        text
    };
}
