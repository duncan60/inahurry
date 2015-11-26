import { combineReducers } from 'redux';
import trainTimetable from './train-timetable';
import serverError from './server-error';

const rootReducer = combineReducers({
  trainTimetable,
  serverError
});

export default rootReducer;
