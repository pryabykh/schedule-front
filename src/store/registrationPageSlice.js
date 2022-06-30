import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { register } from '../api/UserApi';

export const registerUser = createAsyncThunk(
    'registerUser',
    async (user) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await register(user)
        const json = await response.json()
        return json;
    }
);

const registrationPageSlice = createSlice({
    name: 'registrationPage',
    initialState: {
        loading: 'idle',
        error: null,
        notificationSuccessOpened: false,
        notificationSuccessText: ""
    },
    reducers: {
        showNotificationSuccessRegistrationPage: (state, action) => {
            state.notificationSuccessText = action.payload;
            state.notificationSuccessOpened = true;
        }
    },
    extraReducers: (builder) => {
        builder
            // Вызывается прямо перед выполнением запроса
            .addCase(registerUser.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            // Вызывается в том случае если запрос успешно выполнился
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = 'idle'
                state.error = null
                console.log(action.payload)
            
            })
            // Вызывается в случае ошибки
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = 'failed';
                // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
                state.error = action.error;
            });
    },
})

export const { showNotificationSuccessRegistrationPage } = registrationPageSlice.actions;

export default registrationPageSlice.reducer;