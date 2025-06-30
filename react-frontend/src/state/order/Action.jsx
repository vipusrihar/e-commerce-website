import {
    getAllOrdersStart, getAllOrdersFailure, getAllOrdersSuccess
} from '../order/orderSlice'
import { api, API_URL } from '../../config/API';

export const getAllOrders = () => async (dispatch) => {
    dispatch(getAllOrdersStart());
    console.log("Fetching all orders......");
    const token = localStorage.getItem("token");
    if (!token) {
        const message = "No authentication token found. Please log in.";
        dispatch(getAllOrdersFailure(message));
        console.error("Fetch users error:", message);
        return;
    }
    console.log("Token:", token);

    try {
        const response = await api.get(`/orders`, {
            headers: {
                "Authorization": `Bearer ${token}`
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