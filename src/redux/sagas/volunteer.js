import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//worker saga: requests all volunteer roles for this specific event.
function* getVolunteerRoles(action) {
  try {
    let response = yield axios.get(`/volunteer/role/${action.payload}`);
    yield put({ type: 'SET_VOLUNTEER_ROLES', payload: response.data });
  } catch (error) {
    console.log('error in getVolunteerRoles', error);
  }
}

//root saga
function* volunteerSaga() {
  yield takeLatest('GET_VOLUNTEER_ROLES', getVolunteerRoles);
}

export default volunteerSaga;