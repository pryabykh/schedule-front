import {combineReducers} from 'redux';
import appReducer from './appSlice';
import loginPageReducer from './loginPageSlice';

export const rootReducer = combineReducers({
    appReducer, loginPageReducer
  })