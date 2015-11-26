import { SERVER_ERROR } from 'constants/ActionTypes';

const states = {
    isError: false
};

let postByError = (state = {}, action) => {
    switch (action.type) {
        case SERVER_ERROR:
            states.isError = true;
            return states;
        default:
            return state;
    }
};

export default postByError;
