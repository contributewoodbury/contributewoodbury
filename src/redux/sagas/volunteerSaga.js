import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//worker saga: requests all volunteer roles for this specific event.
function* getVolunteerRoles(action) {
  try {
    let response = yield axios.get(`/api/volunteer/role/${action.payload}`);
    yield put({ type: 'SET_VOLUNTEER_ROLES', payload: response.data });
  } catch (error) {
    console.log('error in getVolunteerRoles', error);
  }
}

//requests all the volunteers that are signed up for this specific event
function* getSpecifcVolunteers(action) {
  try{
    let response = yield axios.get(`/api/volunteer/eventVolunteers/${action.payload}`)
    yield put({
      type: 'SET_SPECIFIC_VOLUNTEERS',
      payload: response.data
    })
  }
  catch (error) {
    console.log('error in getSpecificVolunteers')
  }
}

//root saga
function* volunteerSaga() {
  yield takeLatest('GET_EVENT_DETAILS', getVolunteerRoles);
  yield takeLatest('GET_SPECIFIC_VOLUNTEERS', getSpecifcVolunteers);
}

export default volunteerSaga;