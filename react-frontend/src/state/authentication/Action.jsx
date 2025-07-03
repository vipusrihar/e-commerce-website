import {
  loginStart,  loginFailure,  loginSuccess,
  registerStart,  registerSuccess,  registerFailure,
  logout
} from "./authSlice";
import { API_URL } from "../../config/API";
import axios from "axios";
import { clearBookState } from "../book/bookSlice";
import { clearCartState } from "../cart/carttSlice";
import { clearOrderState } from "../order/orderSlice";
import { clearReviewState } from "../review/reviewSlice";
import { clearUserState } from "../user/userSlice";

export const loginUser = (email, password, navigate) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });

    dispatch(loginSuccess(response.data));

    localStorage.setItem("token", response.data.token);  // to solve the logout on refresh
    // redux state lives in memory so when the page is refreshed, it is cleared.
    //That’s why whenever we press refresh  we are logged out,our Redux state resets.

    localStorage.setItem("auth", JSON.stringify(response.data));

    const role = response?.data?.selectedUser?.role || response?.data?.user?.role;
    if (role === "ADMIN") {
      navigate("/adminDashboard");
    } else {
      navigate("/dashboard");
    }
    alert("Login successful!");
  } catch (error) {
    const message = error.response?.data?.message || "Login failed. Please try again.";
    dispatch(loginFailure(message));
    alert(message);
  }
};


export const registerUser = (userData, navigate) => async (dispatch) => {
  dispatch(registerStart());
  console.log("Registering user:", userData);
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    console.log("Registration response:", response.data);
    dispatch(registerSuccess(response.data));
    alert("Registration successful. Please login.");
    navigate("/login");
  } catch (error) {
    console.error("Registration failed:", error);
    const message = error.response?.data?.message || "Registration failed. Please try again.";
    dispatch(registerFailure(message));
    alert(message);
  }
};

export const logoutUser = (navigate) => async (dispatch) => {
  localStorage.removeItem("auth");
  localStorage.removeItem("token");
  dispatch(logout());
  dispatch(clearBookState());
  dispatch(clearCartState());
  dispatch(clearOrderState());
  dispatch(clearReviewState());
  dispatch(clearUserState());
  alert("You have been logged out.");
  navigate("/");
}
