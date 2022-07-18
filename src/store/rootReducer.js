import {combineReducers} from 'redux';
import appReducer from './appSlice';
import loginPageReducer from './loginPageSlice';
import registrationPageReducer from './registrationPageSlice'
import classroomPageReducer from './ClassroomPageSlice'

export const rootReducer = combineReducers({
    appReducer, classroomPageReducer, loginPageReducer, registrationPageReducer
  })