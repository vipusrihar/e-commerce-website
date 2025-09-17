import {
  loginStart, loginFailure, loginSuccess,
  registerStart, registerSuccess, registerFailure,
  logout
} from "./authSlice";
import { publicApi } from "../../config/API";
import { clearBookState } from "../book/bookSlice";
import { clearCartState } from "../cart/carttSlice";
import { clearOrderState } from "../order/orderSlice";
// import { clearReviewState } from "../review/reviewSlice";
import { clearUserState } from "../user/userSlice";

export const loginUser = (email, password, navigate) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await publicApi.post("/auth/login", { email, password });
  
    dispatch(loginSuccess(response.data));

    localStorage.setItem("token", response.data.token);  
    localStorage.setItem("auth", JSON.stringify(response.data));

    const role = response?.data?.selectedUser?.role || response?.data?.user?.role;
    if (role === "ADMIN") {
      navigate("/adminDashboard");
    } else {
      navigate("/home");
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
  try {
    const response = await publicApi.post("/auth/signup", userData);
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
  try {
    // Clear any app-managed storage (optional if you don't persist tokens yourself)
    localStorage.removeItem("auth");
    localStorage.removeItem("token");

    // Reset Redux state
    dispatch(logout());
    dispatch(clearBookState());
    dispatch(clearCartState());
    dispatch(clearOrderState());
    dispatch(clearUserState());

    // Inform the user (optional)
    alert("You have been logged out.");
    navigate("/home");

  } catch (error) {
    console.error("Asgardeo logout error:", error);
  }
};

