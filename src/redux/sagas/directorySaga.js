import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//worker saga: requests all approved nonprofits from the database and sends the list to the directory reducer
function* getDirectory() {
  try {
    let response = yield axios.get('/api/directory');
    yield put({ type: 'SET_DIRECTORY', payload: response.data});
  } catch (error) {
    console.log('error in getDirectory', error);
  }
}

//root saga
function* directorySaga(){
  yield takeLatest('GET_DIRECTORY', getDirectory)
}

export default directorySaga;