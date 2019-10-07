import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//gets a specific nonprofit from the database
function* getNonprofit() {
    try {
        let response = yield axios.get(`/api/nonprofit/${action.payload}`);
        yield put({
            type: 'SET_SPECIFIC_NONPROFIT',
            payload: response.data
        });
    }catch(error) {
        console.log('error in getNonprofit', error)
    }
}

//gets the past events for a specific nonprofit
function* getPastEvents(action) {
    try {
        let response = yield axios.get(`/event/nonprofit/${action.payload}`)
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