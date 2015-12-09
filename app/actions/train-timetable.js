import 'isomorphic-fetch';
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

function fetchTrainTimetable(latitude, longitude, type) {
    let api = type === 'twtraffic' ? `/api/twtraffic?latitude=${latitude}&longitude=${longitude}` : `/api/thsrc?latitude=${latitude}&longitude=${longitude}`;
    return dispatch => {
        return fetch(api)
                .then(response =>response.json().then(json => ({ json, response })))
                .then(({ json, response }) => {
                    if (response.status === 200) {
                        dispatch(fetchSuccessed(json));
                    } else {
                        dispatch(fetchFailed());
                    }

                })
                .catch((err) => {
                    dispatch(fetchFailed(err));
                });
    };
}

export function getTrainTimetable(latitude, longitude, type = 'twtraffic') {
    return (dispatch) => {
        return dispatch(fetchTrainTimetable(latitude, longitude, type));
    };
}

