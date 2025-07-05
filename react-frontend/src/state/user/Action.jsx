import axios from "axios";
import { API_URL } from "../../config/API";
import {
    getAllUsersFailure, getAllUsersStart,getAllUsersSuccess,
     getUserByIdFailure, getUserByIdStart, getUserByIdSuccess,
     updateUserFailure,
     updateUserStart,
     updateUserSuccess
} from "./userSlice";


export const getAllUsers = () => async (dispatch) => {
    dispatch(getAllUsersStart());
    const token = localStorage.getItem("token");
    if (!token) {
        const message = "No authentication token found. Please log in.";
        dispatch(getAllUsersFailure(message));
        console.error("Fetch users error:", message);
        return;
    }

    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(getAllUsersSuccess({ users: response.data }));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to fetch users";
        dispatch(getAllUsersFailure(message));
        console.error("Fetch users error:", message);
    }
};


export const getUserById = (id) => async (dispatch) => {
    dispatch(getUserByIdStart());
    const token = localStorage.getItem("token");
    if (!token) {
        const message = "No authentication token found. Please log in.";
        dispatch(getUserByIdFailure(message));
        console.error("Fetch users error:", message);
        return;
    }

    try {
        const response = await axios.get(`${API_URL}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(getUserByIdSuccess(response.data.user));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to fetch users";
        dispatch(getUserByIdFailure(message));
        console.error("Fetch users error:", message);
    }
};


export const updateUser = (id, updatedData) => async (dispatch) => {
    console.log(id,"ed",updatedData)
    dispatch(updateUserStart());
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.put(`${API_URL}/users/${id}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Update success:", data);
        dispatch(updateUserSuccess(data));

    } catch (error) {
        // Extract just the error message
        const errorMessage = error?.response?.data?.message || error.message || "Update failed";
        
        console.error("Update failed:", errorMessage);
        dispatch(updateUserFailure(errorMessage));  // pass only the message
    }
};

