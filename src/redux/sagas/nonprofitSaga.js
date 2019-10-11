import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//gets a specific nonprofit from the database
function* getNonprofit(action) {
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

//worker saga: requests editable information for a specific nonprofit
function* getNonprofitEdit(action) {
    try {
        let response = yield axios.get(`/api/nonprofit/edit/${action.payload}`);
        yield put({ type: 'SET_SPECIFIC_NONPROFIT', payload: response.data });
    } catch (error) {
        console.log('error in getNonprofitEdit', error);
    }
}

//edits nonprofits information for specific nonprofit
function* editNonprofit(action) {
    try {
        yield axios.put(`/api/nonprofit/editNonprofit`, action.payload)
        // yield put ({
        //     type: 'GET_NONPROFIT',
        // })
    }
    catch (error) {
        console.log('errror in editNonprofit', error)
    }
}

//root saga
function* nonprofitSaga() {
    yield takeLatest('GET_NONPROFIT', getNonprofit);
    yield takeLatest('GET_PAST_EVENTS', getPastEvents);
    yield takeLatest('GET_NONPROFIT_EDIT', getNonprofitEdit);
    yield takeLatest('EDIT_NONPROFIT', editNonprofit);
}

export default nonprofitSaga;