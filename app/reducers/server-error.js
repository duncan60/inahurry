import { SERVER_ERROR } from 'constants/ActionTypes';

const states = {
    isError: false
};

let postByError = (state = states, action) => {
    switch (action.type) {
        case SERVER_ERROR:
            return {
            	isError: true
            };
        default:
            return state;
    }
};

export default postByError;
