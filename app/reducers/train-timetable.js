import { SET_TRAIN_TIMETABLE, SERVER_ERROR } from 'constants/ActionTypes';

const initialState = {
    trainsTimetableData: {},
    closestStation     : {},
    isReady            : false,
    isError            : false
};

export default function todos(state = initialState, action) {
    switch (action.type) {
        case SET_TRAIN_TIMETABLE:
            return {
                trainsTimetableData: state.trainsTimetableData,
                closestStation     : state.closestStation,
                isReady            : true
            };
        case SERVER_ERROR:
            return {
                isError: true
            };
        default:
            return state;
    }
}
