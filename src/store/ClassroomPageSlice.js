import { createSlice } from '@reduxjs/toolkit';
import { CLASSROOM_CAPACITY_INPUT_NAME_CREATE, CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE, CLASSROOM_NUMBER_INPUT_NAME_CREATE } from '../const/inputs';
import { DEFAULT_SIZE_OF_PAGE } from '../const/pagination';
import { INPUT_FOCUSED, INPUT_SHOW_VALIDATION_ERROR, INPUT_VALID } from '../const/validation';

const classroomPageSlice = createSlice({
    name: 'classroomPage',
    initialState: {
        classrooms: [],
        pageSizeRequest: {},
        sizeOfPage: DEFAULT_SIZE_OF_PAGE,
        totalElements: 0,
        totalPages: 0,
        currentPage: 0,

        [CLASSROOM_NUMBER_INPUT_NAME_CREATE + INPUT_FOCUSED]: false,
        [CLASSROOM_NUMBER_INPUT_NAME_CREATE + INPUT_VALID]: false,
        [CLASSROOM_NUMBER_INPUT_NAME_CREATE + INPUT_SHOW_VALIDATION_ERROR]: false,

        [CLASSROOM_CAPACITY_INPUT_NAME_CREATE + INPUT_FOCUSED]: false,
        [CLASSROOM_CAPACITY_INPUT_NAME_CREATE + INPUT_VALID]: false,
        [CLASSROOM_CAPACITY_INPUT_NAME_CREATE + INPUT_SHOW_VALIDATION_ERROR]: false,

        [CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE + INPUT_FOCUSED]: false,
        [CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE + INPUT_VALID]: false,
        [CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE + INPUT_SHOW_VALIDATION_ERROR]: false,

        showCreateModal: false,
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
        },

        resetCreateForm: (state, action) => {
            state[CLASSROOM_NUMBER_INPUT_NAME_CREATE + INPUT_FOCUSED] = false
            state[CLASSROOM_NUMBER_INPUT_NAME_CREATE + INPUT_VALID] = false
            state[CLASSROOM_NUMBER_INPUT_NAME_CREATE + INPUT_SHOW_VALIDATION_ERROR] = false
    
            state[CLASSROOM_CAPACITY_INPUT_NAME_CREATE + INPUT_FOCUSED] = false
            state[CLASSROOM_CAPACITY_INPUT_NAME_CREATE + INPUT_VALID] = false
            state[CLASSROOM_CAPACITY_INPUT_NAME_CREATE + INPUT_SHOW_VALIDATION_ERROR] = false
    
            state[CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE + INPUT_FOCUSED] = false
            state[CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE + INPUT_VALID] = false
            state[CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE + INPUT_SHOW_VALIDATION_ERROR] = false
        },

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
        },

        hideCreateModal: (state, action) => {
            state.showCreateModal = false
        },
        showCreateModal: (state, action) => {
            state.showCreateModal = true
        }
    },
});

export const { 
    setClassrooms,
    setPageSizeRequest,
    setPages, 
    setInputInvalid, 
    setInputValid, 
    setInputWasFocused, 
    showValidationError, 
    hideValidationError,
    hideCreateModal,
    showCreateModal,
    resetCreateForm
} = classroomPageSlice.actions;

export default classroomPageSlice.reducer;