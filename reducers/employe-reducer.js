function employeReducer ( state = {}, action ) {
    switch( action.type ) {
        
        case 'SET_EMPLOYE_LIST' : {
            return { ...state, employeList : action.payload.employeList } 
        } 
        case 'SET_CONTRACT_LIST' : {
            return { ...state, contractList : action.payload.contractList } 
        } 
        case 'SET_IMAGE_EMPLOYEE' : {
            return {...state, employeImage : action.payload.employeImage}
        }  

        case 'SET_PERMISSION_LIST' : {
            return { ...state, ...action.payload }
        }

        case 'SET_HOLIDAY_LIST' : {
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
            return { ...state, selectedLicense : action.payload.selectedLicense }
        }

        case 'SET_SELECTED_HOLIDAY' : {
            return { ...state, selectedHoliday : action.payload.selectedHoliday }
        }

        case 'SET_SELECTED_SETTLEMENT' : {
            return { ...state, selectedSettlement : action.payload.selectedSettlement }
        }

        case 'SET_SELECTED_PERMISSION' : {
            return { ...state, selectedPermission : action.payload.selectedPermission }
        }

        case 'SET_TYPE_PERMISSION_LIST' : {  
            return { ...state, typepermission : action.payload.typepermission }
        }

        case 'SET_HOLIDAY' : {
            return { ...state, holiday : action.payload.holiday }
        }

        case 'SET_SETTLEMENT' : {
            return { ...state, settlement : action.payload.settlement }
        }

        case 'SET_PERMISSION' : {
            return { ...state, permission : action.payload.permission }
        } 

        case 'SET_HOLIDAY_PDF' : {
            return { ...state, holidayPdf : action.payload.holidayPdf }
        }

        case 'SET_ANTIQUE_PDF' : {
            return { ...state, antiquePdf : action.payload.antiquePdf }
        }

        case 'SET_FOREIGN_PDF' : {
            return {...state, foreignPdf : action.payload.foreignPdf}
        }

        case 'SET_INTERNSHIP_PDF' : {
            return {...state, internshipPdf : action.payload.internshipPdf}
        }

        default : 
            return state
    }
}

export default employeReducer;