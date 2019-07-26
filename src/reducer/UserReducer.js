
function UserReducer(state = {loggedIn: false}, action) {
    // action.type triggers case
    switch(action.type) {
        case 'USER_LOGIN':
        // return state mutates global state
            return {...state, loggedIn: true, user: action.payload}
        default: 
            return state

    }
}

export default UserReducer