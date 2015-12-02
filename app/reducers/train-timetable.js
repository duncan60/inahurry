import { SET_TRAIN_TIMETABLE } from 'constants/ActionTypes';

const initialState = {
    trainsTimetableData: {},
    closestStation     : {},
    isReady            : false
};

let postByTimetable = (state = initialState, action) => {
    console.log('action.type', action.type);
    switch (action.type) {
        case SET_TRAIN_TIMETABLE:
            console.log('switch SET_TRAIN_TIMETABLE');
            return {
                ...state,
                trainsTimetableData: state.trainsTimetableData,
                closestStation     : state.closestStation,
                isReady            : true
            };
        default:
            console.log('switch default');
            return state;
    }
};

export default postByTimetable;
