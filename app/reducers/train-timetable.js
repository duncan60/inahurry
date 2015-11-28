import { SET_TRAIN_TIMETABLE } from 'constants/ActionTypes';

const initialState = {
    trainsTimetableData: {},
    closestStation     : {},
    isReady            : false
};

let postByTimetable = (state = initialState, action) => {
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
