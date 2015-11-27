import { SET_TRAIN_TIMETABLE } from 'constants/ActionTypes';

const states = {
    trainsTimetableData: {},
    closestStation     : {},
    isReady            : false
};

let postByTimetable = (state = states, action) => {
    switch (action.type) {
        case SET_TRAIN_TIMETABLE:
            return {
                ...state,
                trainsTimetableData: state.trainsTimetableData,
                closestStation     : state.closestStation,
                isReady            : true
            };
        default:
            return state;
    }
};

export default postByTimetable;
