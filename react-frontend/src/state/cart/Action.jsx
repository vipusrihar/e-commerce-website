import { API_URL } from "../../config/API";
import {
    addCartItemStart, addCartItemSuccess, addCartItemFailure,
    getCartItemsStart, getCartItemsSuccess, getCartItemsFailure,
    clearCartState
} from "./carttSlice"


export const addCartItem = (productId, quantity, userId) => async (dispatch) => {
    dispatch(addCartItemStart());
    console.info("Adding item to cart:", productId, "Quantity:", quantity, "User ID:", userId);

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
        // dispatch(addCartItemSuccess(data));

        dispatch(getCartByUserId(userId));
        console.info("Item added to cart successfully:", data);
    } catch (error) {
        console.error("Add to cart error:", error.message);
        dispatch(addCartItemFailure(error.message));
    }
}

export const getCartByUserId = (userId) => async (dispatch) => {
    dispatch(getCartItemsStart());
    console.info("Fetching cart for user ID:", userId);
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
        console.info("Cart items fetched successfully:", data.items);
    } catch (error) {
        console.error("Fetch cart error:", error.message);
        dispatch(getCartItemsFailure(error.message));
    }
}

export const clearCartByUserId = (userId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/users/${userId}/cart/clear`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error("Invalid JSON response:", jsonError);
      throw new Error("Unexpected response from server");
    }

    console.info("API response:", data);

    if (response.ok) {
      dispatch(clearCartState());
    } else {
      console.error("Failed with status:", response.status, data.message);
    }
  } catch (error) {
    console.error("Failed to clear cart error:", error.message);
  }
};

