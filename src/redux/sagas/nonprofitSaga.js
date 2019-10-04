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

function* getPastEvents() {
    try {
        let response = yield axios.get('/event/nonprofit/:id')
        yield put ({
            type: 'SET_PAST_EVENTS',
            payload: response.data
        })
    } catch (error) {
        console.log('error on getting past events', error)
    }
}

//root saga
function* nonprofitSaga() {
    yield takeLatest('GET_NONPROFIT', getNonprofit);
    yield takeLatest('GET_PAST_EVENTS', getPastEvents);
}

export default nonprofitSaga;