import axios from 'axios';
import { API_URL } from '../../config/API';
import {
    addBookStart, addBookSuccess, addBookFailure,
    updateBookStart, updateBookSuccess, updateBookFailure,
    getAllBooksStart, getAllBooksSuccess, getAllBooksFailure,
    getBookByIdStart, getBookByIdSuccess, getBookByIdFailure,
    deleteBookStart, deleteBookSuccess, deleteBookFailure
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
    try {
        const response = await axios.get(`${API_URL}/books/`); 
        console.log("Books fetched", response.data);
        dispatch(getAllBooksSuccess({ books: response.data })); 
    } catch (error) {
        const message = error.response?.data?.message || error.message || "Failed to fetch books";
        dispatch(getAllBooksFailure(message)); // 4. Set error state
        console.error("Fetch books error:", message);
    }
};


export const getBookById = (hashid) => async (dispatch) => {
    dispatch(getBookByIdStart()); 
    console.log("Fetching book with ID:", hashid);

    if (!hashid) {
        const message = "hashid is required to fetch book details";
        dispatch(getBookByIdFailure(message)); 
        console.error("Fetch book error:", message);
        return;
    }

    try {
        const response = await axios.get(`${API_URL}/books/${hashid}`); 
        dispatch(getBookByIdSuccess(response.data));
        console.log("Book fetched successfully:", response.data);
    } catch (error) {
        const message = error.response?.data?.message || error.message || "Failed to fetch book";
        dispatch(getBookByIdFailure(message)); 
        console.error("Fetch book error:", message);
    }
};

export const deleteBookById = (bookid) => async (dispatch) => {
    dispatch(deleteBookStart());
    console.log("Deleting book with ID:", bookid);
    try {
        const response = await fetch(`${API_URL}/books/${bookid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete book');
        }

        const data = await response.json();
        console.log("Book deleted successfully:", data);
        alert('Book deleted successfully!');
    } catch (error) {
        console.error("Delete book error:", error.message);
        alert(`Error deleting book: ${error.message}`);
    }
}
