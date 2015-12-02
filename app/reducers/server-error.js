import { SERVER_ERROR } from 'constants/ActionTypes';

const initialState = {
    isError: false
};

let postByError = (state = initialState, action) => {
	console.log('>>>>>>>>postByError', action);
    switch (action.type) {
        case SERVER_ERROR:
        	console.log('LLLLLL');
            return {
            	...initialState,
                isError: true
            };
        default:
            return state;
    }
};

export default postByError;
