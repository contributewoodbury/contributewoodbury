import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//worker Saga: requests all details on a specific event
function* getEventDetails (action){
  try {
    let response = yield axios.get(`/api/event/${action.payload}`);
    yield put ({ type: 'SET_EVENT_DETAILS', payload: response.data });
  } catch (error) {
    console.log('error in getEventDetails', error);
  }
}

//adds a new event for a specific nonprofit
function* addEvent(action) {
  try{
    yield axios.post(`/api/event/addEvent`, action.payload);
    yield put({
      type: 'GET_EVENT_DETAILS'
    })
  }
  catch(error) {
    console.log('error in addEvent', error);
  }
}


//root saga
function* eventSaga(){
  yield takeLatest('GET_EVENT_DETAILS', getEventDetails);
  yield takeLatest('ADD_EVENT', addEvent);
}

export default eventSaga;