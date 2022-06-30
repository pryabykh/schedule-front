import {combineReducers} from 'redux';
import appReducer from './appSlice';
import loginPageReducer from './loginPageSlice';
import registrationPageReducer from './registrationPageSlice'

export const rootReducer = combineReducers({
    appReducer, loginPageReducer, registrationPageReducer
  })