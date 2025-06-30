import {
  loginStart,  loginFailure,  loginSuccess,
  registerStart,  registerSuccess,  registerFailure,
  logout
} from "./authSlice";
import { API_URL } from "../../config/API";
import axios from "axios";

export const loginUser = (email, password, navigate) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });

    dispatch(loginSuccess(response.data));

    const role = response?.data?.selectedUser?.role || response?.data?.user?.role;
    if (role === "ADMIN") {
      navigate("/adminDashboard");
    } else {
      navigate("/dashboard");
    }
    localStorage.setItem("token", response.data.token);
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
  localStorage.removeItem("token");
  dispatch(logout());
  alert("You have been logged out.");
  navigate("/");
}
