import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//worker Saga: requests all details on a specific event
function* getEventDetails (action){
  try {
    let response = yield axios.get(`/api/event/${action.payload}`);
    console.log(response.data)
    yield put ({ type: 'SET_EVENT_DETAILS', payload: response.data });
    yield put({ type: 'GET_NONPROFIT', payload: response.data[0].non_profit_id });
  } catch (error) {
    console.log('error in getEventDetails', error);
  }
}

//adds a new event for a specific nonprofit
function* addEvent(action) {
  try{
    let response = yield axios.post(`/api/event/addEvent`, action.payload);

    if (action.payload.volunteers_needed === true) {
      yield action.history.push(`/addvolunteers/${response.data.id}`)
    }
    yield put({
      type: 'GET_EVENT_DETAILS',
      payload: response.data.id
    })
  }
  catch(error) {
    console.log('error in addEvent', error);
  }
}


//root saga
function* eventSaga(){
  yield takeEvery('GET_EVENT_DETAILS', getEventDetails);
  yield takeLatest('ADD_EVENT', addEvent);
}

export default eventSaga;