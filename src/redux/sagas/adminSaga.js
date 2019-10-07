import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//approves nonprofits
function* approveNonprofit (action) {
    try {
        yield axios.put(`/api/admin/approve/${action.payload}`);
        yield put({
            type: 'GET_NONPROFIT'
        })
    } catch (error) {
        console.log('error in approveNonprofit PUT', error)
    }
}

//root saga
function* adminSaga () {
    yield takeLatest('APPROVE_NONPROFIT', approveNonprofit);
}