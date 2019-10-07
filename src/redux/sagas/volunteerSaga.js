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
function* getSpecificVolunteers(action) {
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

//worker saga: request that new volunteer be added to the database and request for email data/calendar event to be sent out
function* volunteerSignUp(action) {
  try {
    yield axios.post(`/api/volunteer/signup`, action.payload);
  } catch (error) {
    console.log('error in volunteerSignUp', error);
  }
}

//root saga
function* volunteerSaga() {
  yield takeLatest('GET_EVENT_DETAILS', getVolunteerRoles);
  yield takeLatest('GET_SPECIFIC_VOLUNTEERS', getSpecificVolunteers);
  yield takeLatest('ADD_VOLUNTEERS', addVolunteers);
  yield takeLatest('VOLUNTEER_SIGNUP', volunteerSignUp);
}

export default volunteerSaga;