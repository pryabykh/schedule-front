import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        
    },
    reducers: {
        register(state, action) {
            
        }
    },
});

export const {register} = appSlice.actions;

export default appSlice.reducer;