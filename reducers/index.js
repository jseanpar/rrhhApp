import { combineReducers } from 'redux'

import navigation from './navigation'
import userReducer from './user-reducer'
import authReducer from './auth-reducer'
import employeReducer from './employe-reducer'

const reducer = combineReducers ({ navigation, userReducer, employeReducer, authReducer })

export default reducer;