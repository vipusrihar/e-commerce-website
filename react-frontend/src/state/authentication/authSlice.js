import { createSlice } from '@reduxjs/toolkit';

const initialValues = {
    selectedUser: null,
    isLoading: false,
    error: null,
    token: null,
    success: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialValues,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.selectedUser = action.payload.user;
            state.token = action.payload.token;
            state.success = true;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        registerStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        registerSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
            state.success = true;
        },
        registerFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        logout: (state) => {
            state.selectedUser = null;
            state.token = null;
            state.isLoading = false;
            state.success = null;
            state.error = null;
        },
    },
});

export const {
    loginStart, loginSuccess, loginFailure,
    registerStart, registerSuccess, registerFailure,
    logout
} = authSlice.actions;

export default authSlice.reducer;
