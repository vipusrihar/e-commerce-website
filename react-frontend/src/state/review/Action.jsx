import { api } from "../../config/API";
import { getAllReviewsFailure, getAllReviewsStart, getAllReviewsSuccess } from "./reviewSlice";


export const getAllReviews = () => async (dispatch) => {
    dispatch(getAllReviewsStart());
    console.log("Fetching all reviews...");

    const token = localStorage.getItem("token");
    if (!token) {
        const message = "No authentication token found. Please log in.";
        dispatch(getAllReviewsFailure(message));
        console.error("Fetch reviews error:", message);
        return;
    }

    try {
        const response = await api.get("/reviews", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Reviews fetched:", response.data);
        dispatch(getAllReviewsSuccess({ reviews: response.data }));
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to fetch reviews";
        dispatch(getAllReviewsFailure(message));
        console.error("Fetch reviews error:", message);
    }
};
