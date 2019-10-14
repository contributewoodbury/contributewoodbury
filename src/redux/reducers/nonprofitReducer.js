import { combineReducers } from "redux";

const nonprofit = ((state = [], action) => {
    switch (action.type) {
        case 'SET_SPECIFIC_NONPROFIT' :
            return action.payload;
        case 'SET_EDITS_TO_NONPROFIT':
            console.log('edit nonprofit action made it to reducer');
            console.log(state);
            console.log(action.payload);
            return [{
                ...state[0],
                ...action.payload
            }]
            
        default :
            return state;
    }
});

const nonprofitPastEvents = ((state = [], action) => {
    switch (action.type) {
        case 'SET_PAST_EVENTS':
            return action.payload;
        default:
            return state;
    }
});

const categories = ((state = [], action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return action.payload;
        default:
            return state;
    }
})

export default combineReducers({
    nonprofit,
    nonprofitPastEvents,
    categories,
});
