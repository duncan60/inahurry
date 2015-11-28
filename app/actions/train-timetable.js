import * as types from 'constants/ActionTypes';

// export function getTrainTimetable(latitude, longitude, type = 'twtraffic') {
//     let request = new XMLHttpRequest();
//     let api = type === 'twtraffic' ? `/api/twtraffic?latitude=${latitude}&longitude=${longitude}` : `/api/thsrc?latitude=${latitude}&longitude=${longitude}`;
//     request.open('GET', api, true);
//     request.onreadystatechange = function() {
//         if (request.readyState === 4 && request.status === 200) {
//             return {
//                 type: types.SET_TRAIN_TIMETABLE,
//                 data: request.responseText
//             };
//         }
//     };

//     request.onerror = function() {
//         return {
//             type: types.SERVER_ERROR
//         };
//     };
//     request.send();
// }
export function getTrainTimetable() {
    return {
            type: types.SERVER_ERROR
    };
}
