import { combineReducers } from 'redux';

const volunteerRoleList = (state = [], action) => {
  switch (action.type) {
    case 'SET_VOLUNTEER_ROLES':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  volunteerRoleList,
});