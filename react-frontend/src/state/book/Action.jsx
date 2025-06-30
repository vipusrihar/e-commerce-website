import axios from 'axios';
import { API_URL } from '../../config/API';
import {
    addBookStart, addBookSuccess, addBookFailure,
    updateBookStart, updateBookSuccess, updateBookFailure,
    getAllBooksStart, getAllBooksSuccess, getAllBooksFailure
} from './bookSlice';

export const createBook = (bookData) => async (dispatch) => {
    dispatch(addBookStart());
    try {
        const response = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(bookData)
        });

        if (!response.ok) {
            throw new Error('Failed to create book');
        }

        const data = await response.json();
        dispatch(addBookSuccess(data));
        alert('Book created successfully!');
    } catch (error) {
        dispatch(addBookFailure(error.message));
        alert(`Error creating book: ${error.message}`);
    }
};

export const updateBook = (bookId, bookData) => async (dispatch) => {
    dispatch(updateBookStart());
    console.log("Fetching books....");
    try {
        const response = await fetch(`${API_URL}/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(bookData)
        });

        if (!response.ok) {
            throw new Error('Failed to update book');
        }

        const data = await response.json();
        dispatch(updateBookSuccess(data));
        alert('Book updated successfully!');
    } catch (error) {
        dispatch(updateBookFailure(error.message));
        alert(`Error updating book: ${error.message}`);
    }
};


export const getAllBooks = () => async (dispatch) => {
    dispatch(getAllBooksStart());
    console.log("Fetching all books...");
    const token = localStorage.getItem('token');
    if (!token) {
        const message = "No authentication token found. Please log in.";
        dispatch(getAllBooksFailure(message));
        console.error("Fetch books error:", message);
        return;
    }
    console.log("Token:", token);
    try {
        const response = await axios.get(`${API_URL}/books/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Books fetched", response.data);
        dispatch(getAllBooksSuccess({ books: response.data }));


    } catch (error) {
        const message =
            error.response?.data?.message || error.message || "Failed to fetch books";
        dispatch(getAllBooksFailure(message));
        console.error("Fetch books error:", message);
    }

}
