const nonprofit = ((state = [], action) => {
    switch (action.type) {
        case 'SET_SPECIFIC_NONPROFIT' :
            return action.payload;
        default :
        return state;
    }
})

export default nonprofit;