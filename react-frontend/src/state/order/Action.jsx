import {
    getAllOrdersStart, getAllOrdersFailure, getAllOrdersSuccess,
    changeOrderStatusStart, changeOrderStatusFailure, changeOrderStatusSuccess,
    getOrderByIdSuccess, getOrderByIdStart, getOrderByIdFailure,
    getOrderByUserIDStart, getOrderByUserIDSuccess, getOrderByUserIDFailure,
    createOrderStart, createOrderSuccess
} from '../order/orderSlice'
import { securedApi } from '../../config/API';
import { clearCartState } from '../cart/carttSlice';
import { toast } from 'react-toastify';

export const createOrder = (orderDetails) => async (dispatch) => {
    dispatch(createOrderStart());
    try {
        const response = await securedApi.post(`/orders`, orderDetails);

        dispatch(createOrderSuccess(response.data));
        dispatch(clearCartState());
        toast.success("Order placed successfully!");
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to create order";
        dispatch(getAllOrdersFailure(message));
        console.error("Fetch orders error:", message);
        toast.error(message);

    }
}

export const getAllOrders = () => async (dispatch) => {
    dispatch(getAllOrdersStart());

    try {
        const response = await securedApi.get(`/orders`);

        dispatch(getAllOrdersSuccess(response.data));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to fetch orders";
        dispatch(getAllOrdersFailure(message));
        console.error("Fetch orders error:", message);
    }
}

export const getOrdersByUserID = (userId) => async (dispatch) => {
    dispatch(getOrderByUserIDStart());

    try {
        const response = await securedApi.get(`/orders/user/${userId}`);
        dispatch(getOrderByUserIDSuccess( response.data ));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to fetch orders";
        dispatch(getOrderByUserIDFailure(message));
        console.error("Fetch orders error:", message);
    }
}

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch(getOrderByIdStart());
    try {

        const response = await securedApi.get(`/orders/${orderId}`);
        dispatch(getOrderByIdSuccess( response.data ));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to fetch order";
        dispatch(getOrderByIdFailure(message));
        console.error("Fetch order error:", message);
    }
}

export const changeOrderStatus = (orderId, orderStatus) => async (dispatch) => {
    dispatch(changeOrderStatusStart());
    try {
        const response = await securedApi.put(`/orders/${orderId}`, { orderStatus });
        dispatch(changeOrderStatusSuccess(response.data));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to change order status";
        dispatch(changeOrderStatusFailure(message));
        console.error("Fetch order error:", message);
    }
};

