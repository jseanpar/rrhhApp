function employeReducer ( state = {}, action ) {
    switch( action.type ) {
        
        case 'SET_EMPLOYE_LIST' : {
            return { ...state, ...action.payload }
        } 
        case 'SET_CONTRACT_LIST' : {
            return { ...state, ...action.payload }
        } 

        case 'SET_PERMISSION_LIST' : {
            return { ...state, ...action.payload }
        }

        case 'SET_HOLIDAY_LIST' : {
            return { ...state, ...action.payload }
        } 
        
        case 'SET_IMAGE_EMPLOYEE' : {
            return { ...state, ...action.payload }
        }  

        case 'SET_SETTLEMENT_LIST' : {
            return { ...state, ...action.payload }
        } 

        case 'SET_FAMILY_LIST' : {
            return { ...state, ...action.payload }
        } 

        case 'SET_LICENSE_LIST' : {
            return { ...state, ...action.payload }
        }

        case 'SET_SELECTED_LICENSE' : {
            return { ...state, ...action.payload.selectedLicense }
        }

        case 'SET_TYPE_PERMISSION_LIST' : {
            return { ...state, ...action.payload }
        }

        default : 
            return state
    }
}

export default employeReducer;