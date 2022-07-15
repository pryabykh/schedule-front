import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        showLoader: false,
        alertSuccessText: "",
        alertWarningText: "",
        alertDangerText: "",
        activeNavItemKey: 1
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
        },
        setActiveNavItemKey: (state, action) => {
            state.activeNavItemKey = action.payload;
        }
    },
});

export const { 
    showLoader, 
    hideLoader, 
    setAlertSuccessText, 
    setAlertSuccess,
    setAlertWarning,
    setAlertDanger,
    setActiveNavItemKey
} = appSlice.actions;

export default appSlice.reducer;