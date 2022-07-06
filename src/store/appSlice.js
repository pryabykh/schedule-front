import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        showLoader: false,
        alertSuccessText: "",
        alertWarningText: "",
        alertDangerText: ""
    },
    reducers: {
        showLoader: (state, action) => {
            state.showLoader = true;
        },
        hideLoader: (state, action) => {
            state.showLoader = false;
        },
        setAlertSuccess: (state, action) => {
            state.alertSuccessText = action.payload;
        },
        setAlertWarning: (state, action) => {
            state.alertWarningText = action.payload;
        },
        setAlertDanger: (state, action) => {
            state.alertDangerText = action.payload;
        }
    },
});

export const { 
    showLoader, 
    hideLoader, 
    setAlertSuccessText, 
    setAlertSuccess,
    setAlertWarning,
    setAlertDanger
} = appSlice.actions;

export default appSlice.reducer;