function authReducer ( state = {}, action) {
   
    switch ( action.type ) {
        
        case 'SET_AUTH' : {
            return {...action.payload}
        }

        case 'REMOVE_AUTH' : {
            return false
        }
        
        default:
            return state
    }
}

export default authReducer;