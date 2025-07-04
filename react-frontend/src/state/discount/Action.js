import {
    createDiscountFailure, createDiscountStart, createDiscountSuccess,
    editDiscountFailure, editDiscountStart, editDiscountSuccess,
    getAllDiscountsFailure, getAllDiscountsStart, getAllDiscountsSuccess,
    getDiscountByBookIdFailure, getDiscountByBookIdStart, getDiscountByBookIdSuccess,
    updateDiscountStatusFailure, updateDiscountStatusStart, updateDiscountStatusSuccess,
} from './discountSlice'
import { API_URL } from '../../config/API';

export const createDiscount = (discount) => async (dispatch) => {
    dispatch(createDiscountStart());
    console.log("creating discount");

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/discounts/createDiscount`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ discount }),
        });
        // if (!response.ok) {
        //     const errorData = await response.json();
        //     throw new Error(errorData.message || 'Failed tocreate discount');
        // }
        
        const data = await response.json();
        console.log("order Created :",data)
        dispatch(createDiscountSuccess(data));
        console.log("discount created successfully:", data);
    } catch (error) {
        console.error("Create discount error:", error.message);
        dispatch(createDiscountFailure(error.message));
    }

}


export const getAllDiscounts = () => async (dispatch) => {
    dispatch(getAllDiscountsStart());
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/discounts`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch discounts');
        }
        const data = await response.json();
        console.log("All discounts ",data)
        dispatch(getAllDiscountsSuccess(data));
    } catch (error) {
        dispatch(getAllDiscountsFailure(error.message));
    }
};


export const editDiscount = (discountId, updatedData) => async (dispatch) => {
    dispatch(editDiscountStart());
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/discounts/${discountId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error('Failed to update discount');
        }
        const data = await response.json();
        dispatch(editDiscountSuccess(data));
    } catch (error) {
        dispatch(editDiscountFailure(error.message));
    }
};


export const updateDiscountStatusById = (discountId, newStatus) => async (dispatch) => {
    dispatch(updateDiscountStatusStart());
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/discounts/${discountId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus }),
        });
        if (!response.ok) {
            throw new Error('Failed to update discount status');
        }
        const data = await response.json();
        dispatch(updateDiscountStatusSuccess(data));
    } catch (error) {
        dispatch(updateDiscountStatusFailure(error.message));
    }
};


export const findDiscountByBookId = (bookId) => async (dispatch) => {
    dispatch(getDiscountByBookIdStart());
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/discounts/book/${bookId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to find discount by book ID');
        }
        const data = await response.json();
        dispatch(getDiscountByBookIdSuccess(data));
    } catch (error) {
        dispatch(getDiscountByBookIdFailure(error.message));
    }
};
