import { createSlice } from '@reduxjs/toolkit';

const loginPageSlice = createSlice({
    name: 'loginPage',
    initialState: {
        notificationSuccessOpened: false,
        notificationSuccessText: ""
    },
    reducers: {
        showNotificationSuccessLoginPage: (state, action) => {
            state.notificationSuccessText = action.payload;
            state.notificationSuccessOpened = true;
        }
    },
});

export const {showNotificationSuccessLoginPage} = loginPageSlice.actions;

export default loginPageSlice.reducer;