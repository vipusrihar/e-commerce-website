import axios from "axios";
import { securedApi } from "../../config/API";
import {
    getAllUsersFailure, getAllUsersStart, getAllUsersSuccess,
    getUserByIdFailure, getUserByIdStart, getUserByIdSuccess,
    updateUserFailure, updateUserStart, updateUserSuccess
} from "./userSlice";
import { toast } from "react-toastify";


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
        const response = await securedApi.get('/users');

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

        const response = await securedApi.get(`/users/${id}`);

        dispatch(getUserByIdSuccess(response.data.user));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to fetch users";
        dispatch(getUserByIdFailure(message));
        console.error("Fetch users error:", message);
    }
};


export const updateUser = (id, updatedData) => async (dispatch) => {
    dispatch(updateUserStart());
    try {
        const response = await securedApi.put(`/users/${id}`, updatedData);
        const data = response.data;
        dispatch(updateUserSuccess(data));
        toast.success("Updated sucessfully")

    } catch (error) {
        // Extract just the error message
        const errorMessage = error?.response?.data?.message || error.message || "Update failed";

        console.error("Update failed:", errorMessage);
        dispatch(updateUserFailure(errorMessage));
        toast.error(errorMessage)
    }
};

