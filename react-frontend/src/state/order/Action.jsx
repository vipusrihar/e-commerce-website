import {
    getAllOrdersStart, getAllOrdersFailure, getAllOrdersSuccess,
    changeOrderStatusStart, changeOrderStatusFailure, changeOrderStatusSuccess,
    getOrderByIdSuccess, getOrderByIdStart, getOrderByIdFailure,
    getOrderByUserIDStart, getOrderByUserIDSuccess, getOrderByUserIDFailure,
    createOrderStart,
    createOrderSuccess
} from '../order/orderSlice'
import { api, API_URL } from '../../config/API';
import { clearCartState } from '../cart/carttSlice';

export const createOrder = (orderDetails) => async (dispatch) => {
    console.log(orderDetails);
    dispatch(createOrderStart());
    try {
        const token = localStorage.getItem('token');
        const response = await api.post('/orders/', orderDetails ,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(response.status === 201){
            
        }
        dispatch(createOrderSuccess(response.data));
        dispatch(clearCartState());
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to create order";
        dispatch(getAllOrdersFailure(message));
        console.error("Fetch orders error:", message);
        
    }
}

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
    dispatch(getOrderByUserIDStart());
    console.log("Fetching orders of ", userId);
    const token = localStorage.getItem("token");
    console.log("Token is present");

    try {
        const response = await api.get(`/orders/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Orders fetched :", response.data);
        dispatch(getOrderByUserIDSuccess({ orders: response.data }));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to fetch orders";
        dispatch(getOrderByUserIDFailure(message));
        console.error("Fetch orders error:", message);
    }
}

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch(getOrderByIdStart());
    console.log("Fetching order by ID:", orderId);

    try {
        const token = localStorage.getItem("token");
        console.log("Token is present");
        const response = await api.get(`/orders/${orderId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        console.log("Order fetched:", response.data);
        dispatch(getOrderByIdSuccess({ orders: [response.data] }));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to fetch order";
        dispatch(getOrderByIdFailure(message));
        console.error("Fetch order error:", message);
    }
}

export const changeOrderStatus = (orderId, orderStatus) => async (dispatch) => {
    dispatch(changeOrderStatusStart());
    console.log("Fetching order by ID:", orderId);
    try {
        const token = localStorage.getItem("token");
        console.log("Token is present");

        const response = await api.put(`/orders/${orderId}`, { orderStatus }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        );
        console.log("Order change:", response);
        dispatch(changeOrderStatusSuccess(response.data));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to change order status";
        dispatch(changeOrderStatusFailure(message));
        console.error("Fetch order error:", message);
    }
};

