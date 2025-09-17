import {securedApi } from "../../config/API";
import {
  addCartItemStart, addCartItemSuccess, addCartItemFailure,
  getCartItemsStart, getCartItemsSuccess, getCartItemsFailure,
  clearCartState
} from "./carttSlice";

// Add cart item
export const addCartItem = (productId, quantity, userId) => async (dispatch) => {
  dispatch(addCartItemStart());

  try {
    const response = await securedApi.post(`/users/${userId}/cart/addProduct`, { productId, quantity });
    const data = response.data;

    dispatch(getCartByUserId(userId));

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to add item to cart";
    console.error("Add to cart error:", errorMessage);
    dispatch(addCartItemFailure(errorMessage));
  }
};

// Get cart by user ID
export const getCartByUserId = (userId) => async (dispatch) => {
  if (!userId) {
    console.error("getCartByUserId called with invalid userId:", userId);
    dispatch(getCartItemsFailure("Invalid user ID"));
    return;
  }

  dispatch(getCartItemsStart());
  try {
    const response = await securedApi.get(`/users/${userId}/cart/getCart`);
    const data = response.data;

    dispatch(getCartItemsSuccess(data.items));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch cart";
    console.error("Fetch cart error:", errorMessage);
    dispatch(getCartItemsFailure(errorMessage));
  }
};

// Clear cart
export const clearCartByUserId = (userId) => async (dispatch) => {
  try {
    const response = await securedApi.put(`/users/${userId}/cart/clear`);
    const data = response.data;

    dispatch(clearCartState());
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to clear cart";
    console.error("Failed to clear cart error:", errorMessage);
  }
};
