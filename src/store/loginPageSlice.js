import { createSlice } from '@reduxjs/toolkit';
import { EMAIL_INPUT_NAME, PASSWORD_INPUT_NAME } from '../const/inputs';
import { INPUT_FOCUSED, INPUT_SHOW_VALIDATION_ERROR, INPUT_VALID } from '../const/validation';

const loginPageSlice = createSlice({
    name: 'loginPage',
    initialState: {
        [EMAIL_INPUT_NAME + INPUT_FOCUSED]: false,
        [EMAIL_INPUT_NAME + INPUT_VALID]: false,
        [EMAIL_INPUT_NAME + INPUT_SHOW_VALIDATION_ERROR]: false,

        [PASSWORD_INPUT_NAME + INPUT_FOCUSED]: false,
        [PASSWORD_INPUT_NAME + INPUT_VALID]: false,
        [PASSWORD_INPUT_NAME + INPUT_SHOW_VALIDATION_ERROR]: false,
    },
    reducers: {
        setInputInvalid: (state, action) => {
            const inputName = action.payload;
            state[inputName + INPUT_VALID] = false;
        },
        setInputValid: (state, action) => {
            const inputName = action.payload;
            state[inputName + INPUT_VALID] = true;
        },
        setInputWasFocused: (state, action) => {
            const inputName = action.payload;
            state[inputName + INPUT_FOCUSED] = true;
        },
        showValidationError: (state, action) => {
            const inputName = action.payload;
            state[inputName + INPUT_SHOW_VALIDATION_ERROR] = true;
        },
        hideValidationError: (state, action) => {
            const inputName = action.payload;
            state[inputName + INPUT_SHOW_VALIDATION_ERROR] = false;
        }
    },
});

export const { setInputInvalid, setInputValid, setInputWasFocused, showValidationError, hideValidationError } = loginPageSlice.actions;

export default loginPageSlice.reducer;