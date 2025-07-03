import { API_URL } from "../../config/API";
import {
    addCartItemStart, addCartItemSuccess, addCartItemFailure,
    getCartItemsStart, getCartItemsSuccess, getCartItemsFailure
} from "./carttSlice"


export const addCartItem = (productId, quantity, userId) => async (dispatch) => {
    dispatch(addCartItemStart());
    console.log("Adding item to cart:", productId, "Quantity:", quantity, "User ID:", userId);

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/users/${userId}/cart/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId, quantity }),
        });

        // Check if the request was successful
        if (!response.ok) {
            const errorData = await response.json(); // parse error response if any
            throw new Error(errorData.message || 'Failed to add item to cart');
        }

        const data = await response.json();
        dispatch(addCartItemSuccess(data.cartItems));
        console.log("Item added to cart successfully:", data);
    } catch (error) {
        console.error("Add to cart error:", error.message);
        dispatch(addCartItemFailure(error.message));
    }
}

export const getCartByUserId = (userId) => async (dispatch) => {
    dispatch(getCartItemsStart());
    console.log("Fetching cart for user ID:", userId);
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/users/${userId}/cart/getCart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        // if (!response.ok) {
        //     const errorData = await response.json();
        //     throw new Error(errorData.message || 'Failed to fetch cart items');
        // }

        const data = await response.json();
        dispatch(getCartItemsSuccess(data));
        console.log("Cart items fetched successfully:", data.items);
    } catch (error) {
        console.error("Fetch cart error:", error.message);
        dispatch(getCartItemsFailure(error.message));
    }
}