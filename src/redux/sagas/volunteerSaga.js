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
    console.log('error in getSpecificVolunteers', error)
  }
}

//adds a new volunteers for specific event
function* addVolunteers(action) {
  try {
    yield axios.post(`/api/volunteer/addVolunteers`, action.payload)
    yield put({
      type: 'GET_EVENT_DETAILS'
    })
  }
  catch (error) {
    console.log('error in addVoluteers', error)
  }
}

//root saga
function* volunteerSaga() {
  yield takeLatest('GET_EVENT_DETAILS', getVolunteerRoles);
  yield takeLatest('GET_SPECIFIC_VOLUNTEERS', getSpecifcVolunteers);
  yield takeLatest('ADD_VOLUNTEERS', addVolunteers);
}

export default volunteerSaga;