import { createSlice } from '@reduxjs/toolkit';

const initialValues = {
    user: null,
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
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.success = true;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        logout: (state) => {
            state.user = null;
            state.jwt = null;
            state.success = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
