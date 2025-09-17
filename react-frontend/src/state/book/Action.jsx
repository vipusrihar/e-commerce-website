import axios from 'axios';
import { publicApi, securedApi } from '../../config/API';
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
        const response = await securedApi.post('/books', bookData);
        const data = response.data;
        dispatch(addBookSuccess(data));
    } catch (error) {
        dispatch(addBookFailure(error.message));
        alert(`Error creating book: ${error.message}`);
    }
};

export const updateBook = (hashid, bookData) => async (dispatch) => {
    dispatch(updateBookStart());
    try {
        if (!token) {
            throw new Error('User is not authenticated');
        }
        const response = await securedApi.put(`/books/${hashid}`,bookData);
        const data = response.data;
        dispatch(updateBookSuccess(data));
        alert('Book updated successfully!');
    } catch (error) {
        console.error("Update book error:", error.message);
        dispatch(updateBookFailure(error.message));
        alert(`Error updating book: ${error.message}`);
    }
};


export const getAllBooks = () => async (dispatch) => {
    dispatch(getAllBooksStart()); 
    try {
        const response = await publicApi.get(`/books/`); 
        dispatch(getAllBooksSuccess({ books: response.data })); 
    } catch (error) {
        const message = error.response?.data?.message || error.message || "Failed to fetch books";
        dispatch(getAllBooksFailure(message)); // 4. Set error state
        console.error("Fetch books error:", message);
    }
};


export const getBookById = (hashid) => async (dispatch) => {
    dispatch(getBookByIdStart()); 

    if (!hashid) {
        const message = "hashid is required to fetch book details";
        dispatch(getBookByIdFailure(message)); 
        console.error("Fetch book error:", message);
        return;
    }

    try {
        const response = await publicApi.get(`/books/${hashid}`); 
        dispatch(getBookByIdSuccess(response.data));
    } catch (error) {
        const message = error.response?.data?.message || error.message || "Failed to fetch book";
        dispatch(getBookByIdFailure(message)); 
        console.error("Fetch book error:", message);
    }
};

export const deleteBookById = (hashid) => async (dispatch) => {
    dispatch(deleteBookStart());
    try {
      
        const response = await securedApi.delete(`/books/${hashid}`);
        const data = response.data;
        alert('Book deleted successfully!');
    } catch (error) {
        console.error("Delete book error:", error.message);
        alert(`Error deleting book: ${error.message}`);
    }
}
