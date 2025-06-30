import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    orders: [],
    selectedOrder: null,
    isLoading: false,
    error: null,
    success: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState: initialValues,
    reducers: {
        getAllOrdersStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getAllOrdersSuccess: (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.orders;
            state.success = true;
        },
        getAllOrdersFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        getOrderByIdStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getOrderByIdSuccess: (state, action) => {
            state.isLoading = false;
            const order = state.orders.find(order => order.id === action.payload.id);
            if (order) {
                state.selectedOrder = order;
            }
            state.success = true;
        },
        getOrderByIdFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        addOrderStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        addOrderSuccess: (state, action) => {
            state.isLoading = false;
            state.orders.push(action.payload);
            state.success = true;
        },
        addOrderFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        changeOrderStatusStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        changeOrderStatusSuccess: (state, action) => {
            state.isLoading = false;
            const orderIndex = state.orders.findIndex(order => order.id === action.payload.id);
            if (orderIndex !== -1) {
                state.orders[orderIndex] = action.payload;
            }
            state.success = true;
        },
        changeOrderStatusFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
    },  
})

export const {
    getAllOrdersFailure,getAllOrdersStart,getAllOrdersSuccess,
    getOrderByIdStart,getOrderByIdSuccess,getOrderByIdFailure
} = orderSlice.actions;

export default orderSlice.reducer;