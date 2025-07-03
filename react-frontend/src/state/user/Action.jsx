import axios from "axios";
import { API_URL } from "../../config/API";
import {
    getAllUsersFailure,
    getAllUsersStart,
    getAllUsersSuccess,
} from "./userSlice";

export const getAllUsers = () => async (dispatch) => {
    dispatch(getAllUsersStart());
    console.log("Fetching all users...");
    const token = localStorage.getItem("token");
    if (!token) {
        const message = "No authentication token found. Please log in.";
        dispatch(getAllUsersFailure(message));
        console.error("Fetch users error:", message);
        return;
    }
    console.log("Token is present");

    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Users fetched:", response.data);
        dispatch(getAllUsersSuccess({ users: response.data }));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to fetch users";
        dispatch(getAllUsersFailure(message));
        console.error("Fetch users error:", message);
    }
};
