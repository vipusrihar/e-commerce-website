import { createSlice } from '@reduxjs/toolkit';

const initialValues = {
    reviews: [],
    selectedReview: null,
    isLoading: false,
    error: null,
    success: null,
};

const reviewSlice = createSlice({
    name: 'review',
    initialState: initialValues,
    reducer: {
        fetchReviewsStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchReviewsSuccess: (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload;
            state.success = true;
        },
        fetchReviewsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        selectReview: (state, action) => {
            state.selectedReview = action.payload;
        },
        clearSelectedReview: (state) => {
            state.selectedReview = null;
        },
        addReviewStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        addReviewSuccess: (state, action) => {
            state.isLoading = false;
            state.reviews.push(action.payload);
            state.success = true;
        },
        addReviewFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        updateReviewStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        updateReviewSuccess: (state, action) => {
            state.isLoading = false;
            const index = state.reviews.findIndex(review => review.id === action.payload.id);
            if (index !== -1) {
                state.reviews[index] = action.payload;
            }
            state.success = true;
        },
        updateReviewFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        deleteReviewStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        deleteReviewSuccess: (state, action) => {
            state.isLoading = false;
            state.reviews = state.reviews.filter(review => review.id !== action.payload);
            state.success = true;
        },
        deleteReviewFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
    }
});

export const {
    fetchReviewsStart, fetchReviewsSuccess, fetchReviewsFailure,
    selectReview, clearSelectedReview,
    addReviewStart, addReviewSuccess, addReviewFailure,
    updateReviewStart, updateReviewSuccess, updateReviewFailure,
    deleteReviewStart, deleteReviewSuccess, deleteReviewFailure 
} = reviewSlice.actions;

export default reviewSlice.reducer;