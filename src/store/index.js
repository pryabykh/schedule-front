import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import thunk from 'redux-thunk';

export default configureStore({
    reducer: {
        rootReducer,
    },
    middleware: [thunk]
  });