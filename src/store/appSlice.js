import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        showLoader: false,
        alertSuccessText: "",
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
    setAlertDanger
} = appSlice.actions;

export default appSlice.reducer;