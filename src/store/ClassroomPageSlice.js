import { createSlice } from '@reduxjs/toolkit';

const classroomPageSlice = createSlice({
    name: 'classroomPage',
    initialState: {
        classrooms: [],
        pageSizeRequest: {},
        totalElements: 0,
        totalPages: 0,
        currentPage: 0
    },
    reducers: {
        setClassrooms: (state, action) => {
            state.classrooms = action.payload;
        },
        setPageSizeRequest: (state, action) => {
            state.pageSizeRequest = action.payload;
        },
        setPages: (state, action) => {
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
        }
    },
});

export const { 
    setClassrooms,
    setPageSizeRequest,
    setPages
} = classroomPageSlice.actions;

export default classroomPageSlice.reducer;