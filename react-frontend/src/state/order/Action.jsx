import {
    getAllOrdersStart, getAllOrdersFailure, getAllOrdersSuccess,
    getOrderByIdStart
} from '../order/orderSlice'
import { api, API_URL } from '../../config/API';

export const getAllOrders = () => async (dispatch) => {
    dispatch(getAllOrdersStart());
    console.log("Fetching all orders......");
    const token = localStorage.getItem("token");
    if (!token) {
        const message = "No authentication token found. Please log in.";
        dispatch(getAllOrdersFailure(message));
        console.error("Fetch orders error:", message);
        return;
    }
    console.log("Token is present");

    try {
        const response = await api.get(`/orders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Orders fetched :", response.data);
        dispatch(getAllOrdersSuccess({ orders: response.data }));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to fetch orders";
        dispatch(getAllOrdersFailure(message));
        console.error("Fetch orders error:", message);
    }
}

export const getOrdersByUserID = (userId) => async (dispatch) => {
    dispatch(getOrderByIdStart());
    console.log("Fetching orders of ",userId);
    const token = localStorage.getItem("token");
    console.log("Token is present");

    try {
        const response = await api.get(`/orders/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Orders fetched :", response.data);
        dispatch(getAllOrdersSuccess({ orders: response.data }));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to fetch orders";
        dispatch(getAllOrdersFailure(message));
        console.error("Fetch orders error:", message);
    }
}

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch(getAllOrdersStart());
    console.log("Fetching order by ID:", orderId);
    const token = localStorage.getItem("token");
    if (!token) {
        const message = "No authentication token found. Please log in.";
        dispatch(getAllOrdersFailure(message));
        console.error("Fetch order error:", message);
        return;
    }
    console.log("Token is present");

    try {
        const response = await api.get(`/orders/${orderId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        console.log("Order fetched:", response.data);
        dispatch(getAllOrdersSuccess({ orders: [response.data] }));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to fetch order";
        dispatch(getAllOrdersFailure(message));
        console.error("Fetch order error:", message);
    }
}