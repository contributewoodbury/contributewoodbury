import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getNonprofit() {
    try {
        let response = yield axios.get('/:id');
        yield put({
            type: 'SET_SPECIFIC_NONPROFIT',
            payload: response.data
        })
    }catch(error) {
        console.log('error in getNonprofit', error)
    }
}

//root saga
function* nonprofitSaga() {
    yield takeLatest('GET_NONPROFIT', getNonprofit)
}

export default nonprofitSaga;