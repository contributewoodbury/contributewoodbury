// import { put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';

// //approves nonprofits
// function* approveNonprofit (action) {
//     try {
//         yield axios.put(`/api/admin/approve/${action.payload}`);
//         yield put({
//             type: 'GET_NONPROFIT'
//         })
//     } catch (error) {
//         console.log('error in approveNonprofit PUT', error)
//     }
// }

//deletes declined nonprofit requests
// function declineNonprofit(action) {
//     try {
//         yield axios.delete(`/api/admin/decline/${action.payload}`);
//         yield put({
//             type: 'GET_NONPROFIT'
//         })
//     }
//     catch(error) {
//         console.log('error in declineNonprofit', error)
//     }
// }

//root saga
// function* adminSaga () {
//     yield takeLatest('APPROVE_NONPROFIT', approveNonprofit);
//     yield takeLatest('DECLINE_NONPROFIT', declineNonprofit);
// }