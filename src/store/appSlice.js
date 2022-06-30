import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        showLoader: false
    },
    reducers: {
        showLoader: (state, action) => {
            state.showLoader = true;
        },
        hideLoader: (state, action) => {
            state.showLoader = false;
        }
    },
});

export const { showLoader, hideLoader } = appSlice.actions;

export default appSlice.reducer;